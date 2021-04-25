const api = `https://randomuser.me/api`;
const adduser = document.getElementById("add-btn");
const sortDes = document.getElementById("sort-des");
const sortAes = document.getElementById("sort-aes");
const userlist = document.getElementById("user-list");
const searchInput = document.getElementById("search");
console.log(adduser, "add");

const appState = [];

class Usercls {
  constructor(title, firstname, lastname, gender, email) {
    this.name = ` ${firstname} ${lastname}`;
    this.title = `${title}`;
    this.email = email;
    this.gender = gender;
  }
}

adduser.addEventListener("click", async () => {
  const userData = await fetch(api, {
    method: "GET"
    // headers: {},
    // body: {}
  });
  const userJson = await userData.json();
  console.log(userJson.results[0], "json");
  const user = userJson.results[0];

  const classUser = new Usercls(
    user.name.title,
    user.name.first,
    user.name.last,
    user.gender,
    user.email
  );

  appState.push(classUser);
  // console.log(appState, "appState");
  domRender(appState);
});

const domRender = (stateArr) => {
  userlist.innerHTML = null;
  stateArr.forEach((userObj) => {
    // const userElement = document.createElement("div");

    userlist.innerHTML += `<div class="userdata">
   <div class="user"> Email: ${userObj.email}</div>
 <div class="user"> Name:${userObj.name} </div>
 <div class="user">Gender:${userObj.gender}  </div>  </div>`; // newline
    // userlist.appendChild(userElement);
  });
};

searchInput.addEventListener("keyup", (e) => {
  //console.log(e, searchInput.value);

  const filteredAppState = appState.filter(
    (user) =>
      // user.name.first.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      //user.name.last.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      user.name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      user.gender.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchInput.value.toLowerCase())
  );

  domRender(filteredAppState);
});

sortDes.addEventListener("click", () => {
  var state = [...appState];
  state.sort((a, b) => (a.name.first < b.name.last ? -1 : 1));
  domRender(state);
});

sortAes.addEventListener("click", () => {
  var state = [...appState];
  state.sort((a, b) => (a.name.first < b.name.last ? 1 : -1));
  domRender(state);
});
