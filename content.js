hidePosts();

function hidePosts(){
var posts = document.getElementsByClassName('username');
chrome.storage.sync.get('blockedUserNames', function(result){
var storedValues = result.blockedUserNames;
if(storedValues != null){
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


(function (){
// added JeffreyR v.1.0.3
// closure function to add simple Google Search
    var Google_Search   = document.createElement('div');
    var gs  =   '<form accept-charset="utf-8" target="_search" action="https://www.google.com/search">';
        gs  +=  '<input name="as_sitesearch" type="hidden" value="tesla.com/forum/forums">';
        gs  +=  '<input name="as_q" type="text" value="" placeholder="Enter text to find" style="width: auto; margin-top: 0.2em; margin-bottom: 0.3em; margin-left: 2px;">';
        gs  +=  '<input type="submit" value="Search" class="btn-primary" title="Google Custom Site Search for tesla.com Forums">';
        gs  +=  '</form>';

    Google_Search.innerHTML = gs;
    Google_Search.style.float   = "right";

    var OP_Right = document.getElementById('second_header');
    if(OP_Right != null) { 
        OP_Right.firstElementChild.appendChild(Google_Search);
    }

    var Posts_Right = document.getElementById('second-header');
    if(Posts_Right != null) {
        if(Posts_Right.firstElementChild.firstElementChild.className == "grid-6") {
            Google_Search.style.width   = "300px;";
            Posts_Right.firstElementChild.firstElementChild.appendChild(Google_Search);
        }
    }
})();

  (function (){
// added JeffreyR v.1.0.3
// closure function to add 1st Comment and Make a Comment links to the "Submitted by" section at the top of an OP
    var Sub_By_Div  = document.getElementsByClassName("submitted")[0];
    if(Sub_By_Div == null) { return; }

    var Start_Comments_Div  = document.getElementsByClassName("panel-pane pane-node-content")[0];
    if(Start_Comments_Div == null) { return; }
    var Target_Comments = document.createElement('a');
    Target_Comments.id  = "comments-start";
    Start_Comments_Div.appendChild(Target_Comments);


    var Comment_Anchors = document.createElement('em');
    Comment_Anchors.style.textAlign = "right";
    Comment_Anchors.innerHTML   = ' ' + '(<a href="#comments-start">1st Comment</a> | <a href="#comment-form">Make a Comment</a>)';

	var LastLink = document.getElementsByClassName('pager-last last');
	if(LastLink != null && LastLink.length > 0){
		var href = LastLink[0].childNodes[0].href;		
		Comment_Anchors.innerHTML   = ' ' + '(<a href="#comments-start">1st Comment</a> | <a href="#comment-form">Make a Comment</a> | <a href="' + href + '#comment-form">Last Comment</a>)';
	}
    Sub_By_Div.appendChild(Comment_Anchors);
})();