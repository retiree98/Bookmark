//global variables
var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var submitBtn = document.getElementById("btnSubmit");
var alertBox = document.querySelector(".alert-box");
var closeBtn = document.getElementById("closeBtn");

//sites container
var sitesList = [];
//check if local storage has data stored prevs or not, if yes show them
if (localStorage.getItem("siteStorage") !== null) {
  sitesList = JSON.parse(localStorage.getItem("siteStorage"));
  displaySite();
}
//add the site to the list, store in local storage and display to the user
function addSite() {
  if (validateSite(siteName) && validateSite(siteUrl)) {
    var site = {
      name: capitalize(siteName.value),
      url: siteUrl.value,
    };
    sitesList.push(site);
    localStorage.setItem("siteStorage", JSON.stringify(sitesList));
    displaySite();
    clearData();
  } else {
    alertBox.classList.replace("d-none", "d-flex");
  }
}
//event for submission
submitBtn.addEventListener("click", addSite);

//display user input
function displaySite() {
  siteDetails = ``;
  for (var i = 0; i < sitesList.length; i++) {
    siteDetails += `
        <tr class="mb-2 pb-3">
            <td>${i + 1}</td>
            <td>${sitesList[i].name}</td>
            <td>
                <button class="btn btn-visit">
                    <i class="fa-regular fa-eye"></i>
                     <a href="${sitesList[i].url}" target="_blank">Visit</a>
                </button>
            </td>
            <td><button onclick="deleteSite(${i})" class="btn btn-delete">
                <i class="fa-regular fa-trash-can"></i>
                 Delete</button></td> 
        </tr>
        `;
  }
  document.getElementById("tableData").innerHTML = siteDetails;
}
//entries validation
function validateSite(siteEle) {
    var text = siteEle.value;
    var regex = {
      siteName: /^\w{3,}(\s+\w+)*$/,
      siteUrl:
        /((?:(?:http?|ftp)[s]*:\/\/)?[a-z0-9-%\/\&=?\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?)/gi,
    };
    if (regex[siteEle.id].test(text) == true) {
      siteEle.classList.add("is-valid");
      siteEle.classList.remove("is-invalid");
      return true;
    } else {
      siteEle.classList.add("is-invalid");
      siteEle.classList.remove("is-valid");
      return false;
    }
}

//clear entries
function clearData() {
  siteName.value = "";
  siteUrl.value = "";
  siteName.classList.remove("is-valid");
  siteUrl.classList.remove("is-valid");
}

//delete selected site
function deleteSite(index) {
  sitesList.splice(index, 1);
  localStorage.setItem("siteStorage", JSON.stringify(sitesList));
  displaySite();
}

//=======> closing the alert <========
//close alert
function closeAlert() {
    alertBox.classList.replace("d-flex", "d-none");
}
closeBtn.addEventListener("click", function () {
  closeAlert();
});

// close when clicking outside the alert
document.addEventListener("click", function (e) {
  if (e.target == alertBox) {
    closeAlert();
  }
});
//close using escape
document.addEventListener("keyup", function (e) {
  if (e.key == "Escape") {
    closeAlert();
  }
});

//capitalize site name
function capitalize(sName){
    return sName.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); } );
};