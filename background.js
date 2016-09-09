chrome.contextMenus.create({"title": "Hide posts from user", "contexts":['selection'],"onclick": genericOnClick});

function genericOnClick(info, tab) {
	var selection = [info.selectionText];
	
	chrome.storage.sync.get('blockedUserNames', function(result){	
		if(result.blockedUserNames == "" || result.blockedUserNames == null) {        
			chrome.storage.sync.set({'blockedUserNames': selection}, function() {				
				chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
					chrome.tabs.sendMessage(tabs[0].id, {action: "refresh"}, function(response) {});  
				});
			});			
			return;
		}
	
		storedValues = result.blockedUserNames;
		storedValues.push(selection);
		chrome.storage.sync.set({'blockedUserNames': storedValues}, function() {			
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
					chrome.tabs.sendMessage(tabs[0].id, {action: "refresh"}, function(response) {});  
				});
		});
	});
}



 