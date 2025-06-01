const firstnameInput = document.querySelector(".input_firstname");
const lastnameInput = document.querySelector(".input_lastname");
const usernameInput = document.querySelector(".input_username");
const passwordInput = document.querySelector(".input_password");
const hiddenWarning = document.querySelector(".hidden_warning");

const signinBtn = document.querySelector(".signin_btn");

signinBtn.addEventListener("click", () => {
  const firstname = firstnameInput.value.trim();
  const lastname = lastnameInput.value.trim();
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!firstname || !lastname || !username || !password) {
    alert("Enter username and password");
    return;
  }

  axios
    .post(`http://localhost:4000/signup`, {
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: password,
    })
    .then((res) => {
      console.log("User registered sucessfully", res.data);
      window.location.href = '../index.html';
      hiddenWarning.style.display = "none"
    })
    .catch((error) => {
      if (error.response.status == 400) {
        hiddenWarning.style.display = "block";
      } else {
        console.log(error);
      }
    });
});
