const user = JSON.parse(localStorage.getItem("user"));

if(user) {
	window.location.href = `./pages/myPhotos.html`;
}

const usernameInput = document.querySelector(".input_username");
const warning_text = document.querySelector(".warning_text");
const passwordInput = document.querySelector(".input_password");
const loginBtn = document.querySelector(".login_btn");

loginBtn.addEventListener("click", () => {
  warning_text.style.display = "none";
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!username || !password) {
    alert("Enter username and password");
    return;
  }
  axios
    .post(`http://localhost:4000/login`, { username, password })
    .then((res) => {
      const status = res.status;
      const user = res.data.user;
      const token = res.data.token;

      if (status == 200) {
        console.log(user);
        console.log(token);
        localStorage.setItem("user", JSON.stringify(user));
        // window.location.href = "./pages/myPhotos.html";
      }
    })
    .catch((error) => {
      warning_text.style.display = "block";
      console.log("else is working");
      console.log(error);
    });
});
