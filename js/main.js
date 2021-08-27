// Change the active and static class between 2 divs
// Show and hide inputs

const searchForm = document.querySelector(".search-form");
const btns = document.querySelectorAll(".swap");
const input = document.querySelectorAll(".input");

searchForm.addEventListener("click", function (e) {
  const id = e.target.dataset.id;
  if (id) {
    // remove selected from other buttons
    btns.forEach(function (btn) {
      btn.classList.remove("active");
      btn.classList.add("static");
    });
    e.target.classList.add("active");
    e.target.classList.remove("static");

    // hide other inputs
    input.forEach(function (input) {
      input.classList.remove("show");
    });
    const element = document.getElementById(id);
    element.classList.add("show");
  }
});

// Prevent the default popup message
document.addEventListener(
  "invalid",
  (function () {
    return function (e) {
      e.preventDefault();
      document.getElementById("email").focus();
    };
  })(),
  true
);

document.addEventListener(
  "invalid",
  (function () {
    return function (e) {
      e.preventDefault();
      document.getElementById("phone").focus();
    };
  })(),
  true
);

// Email and phone validation
const inputs = document.querySelectorAll("input");

// regex patterns
const patterns = {
  phone: /^\d{10}$/,
  // eg. 5555555555
  email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
  //             someemail@email.com ( .oneMoreExt(optional) )
};

// validation function
function validate(field, regex) {
  if (regex.test(field.value)) {
    field.className = "valid";
  } else {
    field.className = "invalid";
  }
}

// attach keyup events to inputs
inputs.forEach((input) => {
  input.addEventListener("keyup", (e) => {
    validate(e.target, patterns[e.target.attributes.name.value]);
    if (input.value == "") {
      input.classList.remove("invalid");
    }
  });
});

// Fetch data
const APIURL =
  "https://1f08fb8e-e614-4af1-ad39-4b6f85109731.mock.pstmn.io/testpostman";

const main = document.getElementById("user-result");
const form = document.querySelector("form");
const search = document.getElementById("search");

async function getUsers(url) {
  document.getElementById("loader-time").style.display = "block";

  const resp = await fetch(url);
  const respData = await resp.json();

  console.log(respData);
  showUsers(respData);
  document.getElementById("loader-time").style.display = "none";
  document.getElementById("container").style.display = "block";
  document.getElementById("headline-results").style.display = "block";
  document.getElementById("search-results").style.display = "none";
}

// Display fetched user in user-result div
function showUsers(user) {
  const { name, address, email, phone, relatives, relaives2 } = user;

  main.innerHTML = "";
  const userEl = document.createElement("div");
  userEl.innerHTML = `
    <div>
      <div class="user-result-headline">
        <h1>1 Result</h1>
        <p>Look at the result below to see the details of the person you’re searched for.</p>
      </div>
      <div class="user-card">
        <div class="card-image">
          <img src="img/icn_person@2x.png" alt="">
        </div>
        <div class="card-info">
          <div class="card-text">
            <h2>${name}</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
          <div class="card-address">
            <h2>Address</h2>
            <p>${address}</p>
          </div>
          <div class="card-email">
            <h2>Email</h2>
            <p>${email}</p>
          </div>
          <div class="card-number">
            <h2>Phone Numbers</h2>
            <p>${phone}</p>
            <p>${phone}</p>
            <p>${phone}</p>
          </div>
          <div class="card-relatives">
            <h2>Relatives</h2>
            <p>${relatives}</p>
            <p>${relaives2}</p>
          </div>
        </div>
      </div>
    </div>
    `;
  main.appendChild(userEl);
}
// Check if the email is someemail@email.com, if true run getUsers and fetch data, else display 0 results div
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm == "someemail@email.com") {
    document.getElementById("container").style.display = "none";
    document.getElementById("search-results").style.display = "none";
    document.getElementById("informaion").style.display = "none";
    document.getElementById("headline").style.display = "none";
    getUsers(APIURL);
    search.value = "";
  } else {
    document.getElementById("container").style.display = "none";
    document.getElementById("informaion").style.display = "none";
    document.getElementById("loader-time").style.display = "block";
    document.getElementById("search-results").style.display = "none";
    document.getElementById("headline").style.display = "none";

    setTimeout(function () {
      document.getElementById("search-results").style.display = "block";
      document.getElementById("informaion").style.display = "none";
      document.getElementById("loader-time").style.display = "none";
      document.getElementById("container").style.display = "block";
      document.getElementById("headline-results").style.display = "block";
    }, 1000);
  }
});
