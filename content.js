hidePosts();

function hidePosts(){
var posts = document.getElementsByClassName('username');
chrome.storage.sync.get('blockedUserNames', function(result){
var storedValues = result.blockedUserNames;
for (var i = 0, l = posts.length; i < l; i++) {
  var username = posts[i].innerHTML;
  for (var j = 0, ll = storedValues.length; j < ll; j++) {
	if(username == storedValues[j]){
		var commentToHide = findAncestor(posts[i], 'comment');
		if(commentToHide != null){
			commentToHide.style.display = 'none';
		}
		if(posts[i].parentElement.classList.contains('created')){
			var evenThreadsToHide = findAncestor(posts[i], 'even');
			if(evenThreadsToHide != null){
				evenThreadsToHide.style.display = 'none';
			}
			var oddThreadsToHide = findAncestor(posts[i], 'odd');
			if(oddThreadsToHide != null){
				oddThreadsToHide.style.display = 'none';
			}
		}
	 } 
  }
}
var t=document.getElementsByTagName('table')[0];
if(t != null){
	FixAlternatingRowStyling(t);
}
});
}

function FixAlternatingRowStyling(table){
	var even = false;
	for(var i=0,r;r=table.rows[i];i++){
		if(r.style.display != 'none'){
			if(even == true){
				r.className = 'even';
			}else{
				r.className = 'odd';
			}
			even = !even;
		}
	}	
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

(
function ()
{ 
var newcss = '.pre { background: #f9f9f9; white-space: pre} blockquote { background: #f9f9f9; border-left: 10px solid #ccc; margin: 1.5em 10px; padding: 0.5em 10px; quotes: initial; } blockquote:before { color: #ccc; content: open-quote; font-size: 4em; line-height: 0.1em; margin-right: 0.25em; vertical-align: -0.4em; } blockquote p { display: inline; }'; 
if ('\v'=='v') /* ie only */ 
{   
document.createStyleSheet().cssText = newcss;   
} else 
{   
var tag = document.createElement('style'); 
tag.type = 'text/css'; 
document.getElementsByTagName('head')[0].appendChild(tag);    
tag[ (typeof document.body.style.WebkitAppearance=='string') /* webkit only */ ? 'innerText' : 'innerHTML'] = newcss;   
} 
}
)();

(
function ()
{
var searchElement = document.createElement('gcse:search'); 
var threadSearchElement = document.getElementsByClassName('right-column panel-panel sidebar');
if(threadSearchElement.length > 0){
threadSearchElement[0].appendChild(searchElement);
}
var mainSearchElement = document.getElementById('second-header');
if(mainSearchElement != null){
	if(mainSearchElement.firstElementChild.firstElementChild.className == "grid-6"){
		var mainSearchElementChild = mainSearchElement.firstElementChild.firstElementChild;
		var rightAlignedContainer = document.createElement('div');
		rightAlignedContainer.style.width = "300px";
		rightAlignedContainer.style.float = "right";
		rightAlignedContainer.appendChild(searchElement);
		mainSearchElementChild.appendChild(rightAlignedContainer);
	}
}

InitializeSearch();

}
)();


function InitializeSearch() {
    var cx = '003127763848949150573:j-nc4htca_e';
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
	gcse.addEventListener('load', ReStyleButton(), false);
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  }
  
  function ReStyleButton(){
	var searchElements = document.getElementsByClassName('gsc-search-button gsc-search-button-v2');
	if(searchElements.length > 0){
		searchElements[0].attr("type", "submit").attr("value", "submit");
	}
  }
