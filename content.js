hidePosts();

function hidePosts(){
var posts = document.getElementsByClassName('username');
chrome.storage.sync.get('blockedUserNames', function(result){
var storedValues = result.blockedUserNames;
for (var i = 0, l = posts.length; i < l; i++) {
  var username = posts[i].innerHTML;
  for (var j = 0, ll = storedValues.length; j < ll; j++) {
  if(username == storedValues[j]){
	 var elementToHide = findAncestor(posts[i], 'comment');
	 if(elementToHide != null){
	 elementToHide.style.display = 'none';
	 }
	 }
  }
}
});
}

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
   if (msg.action == 'refresh') {
      //alert("Message recieved!");
	  hidePosts();
   }
});
									   
function findAncestor (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
}