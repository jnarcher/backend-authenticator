var xhr = null;

let loginForm = document.getElementById("login-form");

// loginForm.addEventListener("submit", e => {
function handleLoginSubmit(e) {
  console.log(e);
  let username = document.getElementById("username");
  let password = document.getElementById("password");

  if (username.value === "" || password.value === "") {
    alert("Please enter input in both fields.");
    return;
  }

  console.log("Sending data: ", {
    username: username.value,
    password: password.value,
    type: "login",
  });
  xhr = getXmlHttpRequestObject();
  xhr.onreadystatechange = sendDataCallback;
  // asynchronous requests
  xhr.open("POST", "http://localhost:6969/users", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  // Send the request over the network
  xhr.send(
    JSON.stringify({
      username: username.value,
      password: password.value,
      type: "login",
    })
  );
}

function handleSignupSubmit(e) {
  e.preventDefault;
  let username = document.getElementById("sign-up-username");
  let password = document.getElementById("sign-up-password");

  if (username.value === "" || password.value === "") {
    alert("Please enter input in both fields.");
    return;
  }

  console.log("Sending data: ", {
    username: username.value,
    password: password.value,
    type: "signup",
  });

  xhr = getXmlHttpRequestObject();
  xhr.onreadystatechange = sendDataCallback;
  // asynchronous requests
  xhr.open("POST", "http://localhost:6969/users", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  // Send the request over the network
  xhr.send(
    JSON.stringify({
      username: username.value,
      password: password.value,
      type: "signup",
    })
  );
}

getXmlHttpRequestObject = function () {
  if (!xhr) {
    // Create a new XMLHttpRequest object
    xhr = new XMLHttpRequest();
  }
  return xhr;
};

function dataCallback() {
  // Check response is ready or not
  if (xhr.readyState == 4 && xhr.status == 200) {
    console.log("User data received!");
    getDate();
    dataDiv = document.getElementById("result-container");
    // Set current data text
    dataDiv.innerHTML = xhr.responseText;
  }
}

function sendDataCallback() {
  if (xhr.readyState === 4 && xhr.status === 201) {
    console.log("Data creation response recieved!");
    // set current data text
    console.log(xhr.responseText);
    let response = JSON.parse(xhr.responseText);
    console.log(response);
    if (response.type == "login") {
      dataDiv = document.getElementById("login-status");
    } else {
      dataDiv = document.getElementById("sign-up-status");
    }
    dataDiv.innerHTML = xhr.responseText;
  }
}
