import {
  clearSelectedProduct,
  createProductAsync,
  fetchProductByIdAsync,
  selectBrands,
  selectCategories,
  selectProductById,
  updateProductAsync,
} from "../../product/productSlice";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ListBoxComponent from "../../shared/ListBoxComponent";

export default function ProductForm() {
  const dispatch = useDispatch();
  const params = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm();
  const availableBrands = useSelector(selectBrands);
  const availableCategories = useSelector(selectCategories);
  const selectedProduct = useSelector(selectProductById);

  const onSubmit = (data) => {
    const product = createProductFromData(data);
    if (params.id) {
      dispatch(updateProductAsync(product));
    } else {
      dispatch(createProductAsync(product));
    }
    reset();
  };

  const selectedBrand = watch("brand");
  const selectedCategory = watch("category");

  const createProductFromData = (data) => {
    const product = { ...data };
    product.images = [
      product.image1,
      product.image2,
      product.image3,
      product.image4,
      product.thumbnail,
    ];
    delete product["image1"];
    delete product["image2"];
    delete product["image3"];
    delete product["image4"];
    product.rating = 0;
    product.price = +product.price;
    product.stock = +product.stock;
    product.discountPercentage = +product.discountPercentage;

    if (params.id) {
      product.id = params.id;
      product.rating = selectedProduct.rating || 0;
    }
    return product;
  };
  const handleDeleteProduct = () => {
    const product = { ...selectedProduct };
    product.delete = true;
    dispatch(updateProductAsync(product));
  };
  useEffect(() => {
    if (params.id) dispatch(fetchProductByIdAsync(params.id));
    else dispatch(clearSelectedProduct);
  }, [params, dispatch]);
  useEffect(() => {
    if (selectedProduct && params.id) {
      setValue("title", selectedProduct.title);
      setValue("brand", selectedProduct.brand);
      setValue("category", selectedProduct.category);
      setValue("description", selectedProduct.description);
      setValue("price", selectedProduct.price);
      setValue("stock", selectedProduct.stock);
      setValue("discountPercentage", selectedProduct.discountPercentage);
      setValue("image1", selectedProduct.images[0]);
      setValue("image2", selectedProduct.images[1]);
      setValue("image3", selectedProduct.images[2]);
      setValue("image4", selectedProduct.images[3]);
      setValue("thumbnail", selectedProduct.thumbnail);
    }
  }, [selectedProduct, setValue, params]);

  return (
    <form
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 bg-white py-4"
      noValidate
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
      })}
    >
      <h2 className="text-xl font-bold tracking-tight text-gray-900">
        Add Product Information
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        This information will be displayed publicly so be careful what you
        share.
      </p>

      {/* Product Details input */}
      <section className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        {/* Product Name */}
        <div className="sm:col-span-full">
          <label
            htmlFor="title"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Product Name
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
              <input
                type="name"
                {...register("title", {
                  required: "Product Name is required",
                })}
                id="title"
                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="col-span-full">
          <label
            htmlFor="description"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Product Description
          </label>
          <div className="mt-2">
            <textarea
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
              rows={3}
              className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue={""}
            />
          </div>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            Write a complete description about the Product.
          </p>
        </div>

        {/* Brand List */}
        <div className="sm:col-span-2">
          <label
            htmlFor="brand"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Brand Name
          </label>
          <div className="mt-2">
            <ListBoxComponent
              selectedOption={selectedBrand}
              setValue={setValue}
              optionName={"brand"}
              options={availableBrands}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="sm:col-span-2">
          <label
            htmlFor="brand"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Product Category
          </label>
          <div className="mt-2">
            <ListBoxComponent
              selectedOption={selectedCategory}
              setValue={setValue}
              optionName={"category"}
              options={availableCategories}
            />
          </div>
        </div>

        {/* Price */}
        <div className="sm:col-span-2 sm:col-start-1">
          <label
            htmlFor="price"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Price
          </label>
          <div className="mt-2">
            <input
              type="number"
              {...register("price", {
                required: "Price is required",
                min: 1,
                max: 10000,
              })}
              id="price"
              className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        {/* Discount */}
        <div className="sm:col-span-2">
          <label
            htmlFor="discountPercentage"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Discount
          </label>
          <div className="mt-2">
            <input
              type="number"
              {...register("discountPercentage", {
                required: "Discount Percentage is required",
                min: 1,
                max: 10000,
              })}
              id="discountPercentage"
              className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        {/* Stock */}
        <div className="sm:col-span-2">
          <label
            htmlFor="stock"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Stock Available
          </label>
          <div className="mt-2">
            <input
              type="number"
              {...register("stock", { required: "Stock is required" })}
              id="stock"
              className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        {/* Image 1 */}
        <div className="sm:col-span-full">
          <label
            htmlFor="image1"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Link to Image
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
              <input
                type="text"
                {...register("image1", {
                  required: "Image is required",
                })}
                id="image1"
                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>

        {/* Image 2 */}
        <div className="sm:col-span-full">
          <label
            htmlFor="image2"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Link to Image
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
              <input
                type="text"
                {...register("image2", {
                  required: "Image is required",
                })}
                id="image2"
                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>

        {/* Image 3 */}
        <div className="sm:col-span-full">
          <label
            htmlFor="image3"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Link to Image
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
              <input
                type="text"
                {...register("image3", {
                  required: "Image is required",
                })}
                id="image3"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>

        {/* Image 4 */}
        <div className="sm:col-span-full">
          <label
            htmlFor="image4"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Link to Image
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
              <input
                type="text"
                {...register("image4", {
                  required: "Image is required",
                })}
                id="image4"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>

        {/* Thumbnail */}
        <div className="sm:col-span-full">
          <label
            htmlFor="thumbnail"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Link to Image
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
              <input
                type="text"
                {...register("thumbnail", {
                  required: "Thumbnail is required",
                })}
                id="thumbnail"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <fieldset>
            <legend className="text-sm font-semibold leading-6 text-gray-900">
              Email
            </legend>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              These are delivered via SMS to your mobile phone.
            </p>
            <div className="mt-6 space-y-6">
              <div className="relative flex gap-x-3">
                <div className="flex h-6 items-center">
                  <input
                    id="comments"
                    name="comments"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="text-sm leading-6">
                  <label
                    htmlFor="comments"
                    className="font-medium text-gray-900"
                  >
                    Comments
                  </label>
                  <p className="text-gray-500">
                    Get notified when someones posts a comment on a posting.
                  </p>
                </div>
              </div>
              <div className="relative flex gap-x-3">
                <div className="flex h-6 items-center">
                  <input
                    id="candidates"
                    name="candidates"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="text-sm leading-6">
                  <label
                    htmlFor="candidates"
                    className="font-medium text-gray-900"
                  >
                    Candidates
                  </label>
                  <p className="text-gray-500">
                    Get notified when a candidate applies for a job.
                  </p>
                </div>
              </div>
              <div className="relative flex gap-x-3">
                <div className="flex h-6 items-center">
                  <input
                    id="offers"
                    name="offers"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="text-sm leading-6">
                  <label htmlFor="offers" className="font-medium text-gray-900">
                    Offers
                  </label>
                  <p className="text-gray-500">
                    Get notified when a candidate accepts or rejects an offer.
                  </p>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        <div className="sm:col-span-3">
          <fieldset>
            <legend className="text-sm font-semibold leading-6 text-gray-900">
              Push Notifications
            </legend>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              These are delivered via SMS to your mobile phone.
            </p>
            <div className="mt-6 space-y-6">
              <div className="flex items-center gap-x-3">
                <input
                  id="push-everything"
                  name="push-notifications"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                  htmlFor="push-everything"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Everything
                </label>
              </div>
              <div className="flex items-center gap-x-3">
                <input
                  id="push-email"
                  name="push-notifications"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                  htmlFor="push-email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Same as email
                </label>
              </div>
              <div className="flex items-center gap-x-3">
                <input
                  id="push-nothing"
                  name="push-notifications"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                  htmlFor="push-nothing"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  No push notifications
                </label>
              </div>
            </div>
          </fieldset>
        </div>
      </section>

      {/* Save or Canel or delete */}
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
        {selectedProduct && (
          <button
            onClick={handleDeleteProduct}
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}
