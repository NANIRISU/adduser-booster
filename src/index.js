const api = `https://randomuser.me/api`;
const adduser = document.getElementById("add-btn");
const mainApp = document.getElementById("app");
console.log(adduser, "add");
adduser.addEventListener("click", async () => {
  const userData = await fetch(api, {
    method: "GET"
    // headers: {},
    // body: {}
  });
  const userJson = await userData.json();
  console.log(userJson.results[0], "json");
  const userElement = document.createElement("div");
  const user = userJson.results[0];
  userElement.innerHTML = `<div>
  ${user.name.title} ${user.name.first}
   </div>`; // newline
  mainApp.appendChild(userElement);
});
