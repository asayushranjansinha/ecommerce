import { useSelector } from "react-redux";
import { StarIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { selectUserInfo } from "../user/userSlice";
import { discountedPrice } from "../../app/constants";
function truncate(str) {
  return str.length > 50 ? str.substring(0, 50) + "..." : str;
}
const ProductCard = ({ product, link }) => {
  const user = useSelector(selectUserInfo);
  return (
    // container
    <div className="max-w-xs h-full rounded overflow-hidden shadow-lg mx-auto flex flex-col justify-between ">
      {/* upper  */}
      <Link  to={link}>
        {/* image */}
        <img
          className="w-full h-60 object-center"
          src={product.thumbnail}
          alt="Product"
        />
        {/* text */}
        <div className="px-4 py-2">
          <h3 className="font-bold text-xl mb-2">{product.title}</h3>
          <p className="text-gray-700 text-base">
            {truncate(String(product.description))}
          </p>
        </div>
        <div className="flex justify-between items-center px-4 py-2 ">
          <div className="bg-green-700 rounded-sm px-2 flex py-1 items-center gap-1">
            <StarIcon className="w-4 h-4 text-white"></StarIcon>
            <span className="text-sm font-bold text-white">
              {product.rating}
            </span>
          </div>
          <div className="space-x-1">
            <span className="py-1 text-sm font-bold text-black">
              ₹
              {discountedPrice(product)}
            </span>
            <span className="py-1 text-sm font-semibold line-through text-gray-700">
              ₹{product.price}
            </span>
          </div>
        </div>
      </Link>

      {/* Add to cart */}
      <div className="px-4 py-2">
        <button className="w-full bg-blue-600 items-center rounded-md hover:bg-blue-500 py-1 text-sm font-semibold text-white ">
          Add to Cart
        </button>
      </div>
      {user?.role === "admin" && (
        <div className="flex justify-between items-center px-4 py-2">
          <Link
            id={`edit-product-${product.id}`}
            to={`/admin/product-form/edit/${product.id}`}
          >
            <button className="py-1 text-sm font-semibold text-blue-700">
              Edit
            </button>
          </Link>
          {product.delete && (
            <span className="py-1 text-sm font-semibold text-red-700">
              Product Deleted
            </span>
          )}
        </div>
      )}
    </div>
  );
};
export default ProductCard;
