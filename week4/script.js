var ourRequest = new XMLHttpRequest();
ourRequest.open("GET", "https://vishakha122.github.io/week4/cities1.json");
ourRequest.onload = function () {
  var ourData = JSON.parse(ourRequest.responseText);
  console.log(ourData[0]);
};
ourRequest.send();

var btn = document.getElementById("btn");
btn.addEventListener("click", function () {
  var ourRequest = new XMLHttpRequest();
  ourRequest.open("GET", "https://vishakha122.github.io/week4/cities1.json");
  ourRequest.onload = function () {
    var ourData = JSON.parse(ourRequest.responseText);
    console.log(ourData[0]);
  };
  ourRequest.send();
});

var cityContainer = document.getElementById("city-info");
var btn = document.getElementById("btn");
btn.addEventListener("click", function () {
  var ourRequest = new XMLHttpRequest();
  ourRequest.open("GET", "https://vishakha122.github.io/week4/cities1.json");
  ourRequest.onload = function () {
    var ourData = JSON.parse(ourRequest.responseText);
    renderHTML(ourData);
  };
  ourRequest.send();
});
function renderHTML(data) {
  var htmlString = "this is a test";
  cityContainer.insertAdjacentHTML("beforeend", htmlString);
}

var cityContainer = document.getElementById("city-info");
var btn = document.getElementById("btn");
btn.addEventListener("click", function () {
  var ourRequest = new XMLHttpRequest();
  ourRequest.open("GET", "https://vishakha122.github.io/week4/cities1.json");
  ourRequest.onload = function () {
    var ourData = JSON.parse(ourRequest.responseText);
    renderHTML(ourData);
  };
  ourRequest.send();
});
function renderHTML(data) {
  var htmlString = "";
  for (i = 0; i < data.length; i++) {
    htmlString +=
      "<p>" + data[i].name + " is a city in " + data[i].country + ".</p>";
  }
  cityContainer.insertAdjacentHTML("beforeend", htmlString);
}
