
function ClearList(){
chrome.storage.sync.set({
    blockedUserNames: ""
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'List cleared saved.';
	PopulateList();
    setTimeout(function() {
      status.textContent = '';
	  
    }, 750);
  });

}

function PopulateList(){
chrome.storage.sync.get('blockedUserNames', function(result){
var storedValues = result.blockedUserNames;
var text = "<ul>";
for (i = 0; i < storedValues.length; i++) {
    text += "<li>" + storedValues[i] + "</li>";
}
text += "</ul>";
document.getElementById("users").innerHTML = text;
});
}
document.addEventListener('DOMContentLoaded', PopulateList);
document.getElementById('clearList').addEventListener('click',
    ClearList);