// Api to Create a user
export function createUser(userdata) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/users", {
      method: "POST",
      body: JSON.stringify(userdata),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    // TODO: on server it will only return relevant information
    resolve({ data });
  });
}
// Api to check existing user
export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    const email = loginInfo.email;
    const password = loginInfo.password;

    const response = await fetch("http://localhost:8080/users?email=" + email);
    const data = await response.json();
console.log(data)
    if (data.length === 0) {
      reject({ message: "User not found" });
    } else if (password === data[0].password) {
      resolve({ data: data[0] });
    } else {
      reject({ message: "Wrong credentials" });
    }
  });
}
