var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var newValue = document.getElementById("newValue");
var aboveElement = document.getElementById("aboveElement");

var productList = [];

if (localStorage.getItem("productList") != null) {
  productList = JSON.parse(localStorage.getItem("productList"));
  displayProduct(productList);
}

function addValue() {
  var product = {
    name: siteNameInput.value,
    url: siteUrlInput.value,
  };

  if (
    siteNameInput.classList.contains("is-valid") &&
    siteUrlInput.classList.contains("is-valid")
  ) {
    productList.push(product);

    localStorage.setItem("productList", JSON.stringify(productList));

    displayProduct(productList);
  } else {
    aboveElement.classList.remove("d-none");
  }

  clearForm();
  siteNameInput.classList.remove("is-valid");
  siteUrlInput.classList.remove("is-valid");
}

function clearForm() {
  siteNameInput.value = "";
  siteUrlInput.value = "";
}

function displayProduct(list) {
  var cartoon = "";

  for (var i = 1; i < list.length; i++) {
    cartoon += ` <div class="bg-light border fw-bold d-flex align-items-center py-2">
        <h6 class="w-25 fw-bold text-center">${i}</h6>
        <h6 class="w-25 fw-bold text-center">${list[i].name}</h6>
        <span class="d-inline-block w-25 text-center"><button class="btn btn-visit fw-bold text-center"><i class="fa-solid fa-eye"></i> <a href="${list[i].url}" target="_blank" class="link-light link-underline-opacity-0">Visit</a> </button></span>
        <span class="d-inline-block w-25 text-center"><button onclick="deleteIndex(${i})" class="btn btn-delete fw-bold text-center"><i class="fa-solid fa-trash-can"></i> Delete</button></span>
      </div> `;
  }
  newValue.innerHTML = cartoon;
}

function deleteIndex(index) {
  productList.splice(index, 1);

  localStorage.setItem("productList", JSON.stringify(productList));

  displayProduct(productList);
}

function validation(element) {
  var regex = {
    siteName: /^\w{3,}$/,
    siteUrl:
      /^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+[^\s]*$/i,
  };

  if (regex[element.id].test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
  }
}

function closeBtn() {
  aboveElement.classList.add("d-none");
}
