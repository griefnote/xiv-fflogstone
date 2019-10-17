var apikey;
chrome.storage.sync.get('fflogs_apikey', function(result){
      apikey = result.fflogs_apikey;
      if (typeof apikey !== 'undefined') document.getElementById("fflogs-apikey-input").value = apikey;
});

const parent = document.getElementById("commentWrapper");
const elem = document.createElement("p");
const reference = document.getElementById("open-fflogs-link");

window.addEventListener('load', function load(event) {
  var button = document.getElementById('apply-button');
  button.addEventListener('click', function() {
    var input = document.getElementById('fflogs-apikey-input').value;
    console.log(input);
      if (input != "") {
          chrome.storage.sync.set({'fflogs_apikey': input }, function() {
              elem.textContent = "Saved your API Key.";
              elem.setAttribute("class","alert alert-success");
              parent.insertBefore(elem, reference);
            });
      } else {
        elem.textContent = "field cannot be empty.";
        elem.setAttribute("class","alert alert-warning");
        parent.insertBefore(elem, reference);
      };
    }, false);
});
