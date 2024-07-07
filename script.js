document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  validateForm();
});
document
  .getElementById("togglePassword")
  .addEventListener("click", function (e) {
    const password = document.getElementById("password");
    const type =
      password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    this.classList.toggle("fa-eye");
    this.classList.toggle("fa-eye-slash");
  });

function validateForm() {
  const username = document.getElementById("username");
  const password = document.getElementById("password");

  let isValid = true;

  if (!isValidEmail(username.value)) {
    showError(username, "Username/Email is not valid");
    a;
    isValid = false;
  } else {
    showSuccess(username);
  }

  if (password.value.length < 6) {
    showError(password, "Password must be at least 6 characters");
    isValid = false;
  } else {
    showSuccess(password);
  }

  if (isValid) {
    login(username.value, password.value);
  }
}

function isValidEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function showError(input, message) {
  const formGroup = input.parentElement;
  const small = formGroup.querySelector("small");
  small.innerText = message;
  small.style.visibility = "visible";
  input.style.borderColor = "red";
}

function showSuccess(input) {
  const formGroup = input.parentElement;
  const small = formGroup.querySelector("small");
  small.style.visibility = "hidden";
  input.style.borderColor = "#ccc";
}

function login(username, password) {
  //  a login failure scenario
  if (username !== "user@example.com" || password !== "yourpassword") {
    alert("Login failed!");
    return;
  }

  // Make the fetch request if the credentials are correct
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "user@example.com",
      password: "yourpassword",
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      alert("Login successful");
      console.log(data);
      if (rememberMe) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
      } else {
        localStorage.removeItem("username");
        localStorage.removeItem("password");
      }
    })
    .catch((error) => {
      alert("Login failed!");
      console.error("Error:", error);
    });
}

// Populate fields if "Remember Me" was checked
document.addEventListener("DOMContentLoaded", (event) => {
  const rememberedUsername = localStorage.getItem("username");
  const rememberedPassword = localStorage.getItem("password");
  if (rememberedUsername && rememberedPassword) {
    document.getElementById("username").value = rememberedUsername;
    document.getElementById("password").value = rememberedPassword;
    document.getElementById("rememberMe").checked = true;
  }
});
