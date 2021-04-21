const api = `https://randomuser.me/api`;
const adduser = document.getElementById("add-btn");
//const mainApp = document.getElementById("app");
const userlist = document.getElementById("user-list");
const searchInput = document.getElementById("search");
console.log(adduser, "add");

const appState = [];

adduser.addEventListener("click", async () => {
  const userData = await fetch(api, {
    method: "GET"
    // headers: {},
    // body: {}
  });
  const userJson = await userData.json();
  console.log(userJson.results[0], "json");
  const user = userJson.results[0];
  appState.push(user);
  console.log(appState, "appState");
  domRender(appState);
});

const domRender = (stateArr) => {
  userlist.innerHTML = null;
  stateArr.forEach((userObj) => {
    const userElement = document.createElement("div");

    userElement.innerHTML = `<div>
  ${userObj.name.title} ${userObj.name.first}
   </div>`; // newline
    userlist.appendChild(userElement);
  });
};

// const serchFilter=()=>{

// }
searchInput.addEventListener("keyup", (e) => {
  console.log(e, searchInput.value);
  const filteredAppState = appState.filter((user) =>
    user.name.first.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  domRender(filteredAppState);
});
