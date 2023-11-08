var ourRequest = new XMLHttpRequest();
ourRequest.open("GET", "https://vishakha122.github.io/week4/cities1.json");
ourRequest.onload = function () {
  var ourData = JSON.parse(ourRequest.responseText);
  console.log(ourData[0]);
};
ourRequest.send();
