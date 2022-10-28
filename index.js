let userNameList = document.getElementById("userNameList");

const displayUserNames = (userInfo) => {
  let userArray;
  axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      userArray = response.data;
      for (let i = 0; i < userArray.length; i++) {
        userNameList.innerHTML +=
          `<h3 id=${userArray[i].id} class=clickable>` +
          userArray[i].name +
          `</h3><div id=posts${userArray[i].id}></div><br>`;
        getPosts(userArray[i].id);
      }
      let clickable = document.querySelectorAll("h3");
      clickable.forEach((btn) =>
        btn.addEventListener("click", (e) => {
          let userChoice = e.currentTarget.id;
          togglePosts(userChoice);
        })
      );
    })
    .catch((error) => {
      console.log(error);
    });
};

const getPosts = (selectedUserId) => {
  let postArray;
  axios
    .get("https://jsonplaceholder.typicode.com/posts")
    .then((response) => {
      postArray = [];
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].userId == selectedUserId) {
          postArray.push(response.data[i]);
        }
      }
      let thisUser = document.getElementById(`posts${selectedUserId}`);
      for (let i = 0; i < postArray.length; i++) {
        thisUser.innerHTML +=
          `<p><b>` +
          postArray[i].title +
          `</b></p><p id=postBody>` +
          postArray[i].body +
          `</p><br>`;
      }
      console.log(postArray);
    })
    .catch((error) => {
      console.log(error);
    });
};

const togglePosts = (userChoice) => {
  let thisUser = document.getElementById(`posts${userChoice}`);
  let toggleSetting = thisUser.style.display;

  if (toggleSetting == "block") {
    thisUser.style.display = "none";
  } else {
    thisUser.style.display = "block";
  }
};

displayUserNames();
