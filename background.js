chrome.contextMenus.create({"title": "Hide posts from user", "contexts":['selection'],"onclick": genericOnClick});

function genericOnClick(info, tab) {
	//alert("info - " + JSON.stringify(info));
	//alert("tab - " + JSON.stringify(tab));

	var selection = [info.selectionText];
	//alert('selection - ' + selection);

	chrome.storage.sync.get('blockedUserNames', function(result){
	//alert("1");
	//alert(JSON.stringify(result));
		if(result.blockedUserNames == "" || result.blockedUserNames == null) {        
			chrome.storage.sync.set({'blockedUserNames': selection}, function() {
				// Notify that we saved.
				//alert('Settings saved 1 - ' + selection);
				chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
					chrome.tabs.sendMessage(tabs[0].id, {action: "refresh"}, function(response) {});  
				});
			});			
			return;
		}
	
		storedValues = result.blockedUserNames;
		storedValues.push(selection);
		chrome.storage.sync.set({'blockedUserNames': storedValues}, function() {
			// Notify that we saved.
			//alert('Settings saved 2 - ' + storedValues);
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
					chrome.tabs.sendMessage(tabs[0].id, {action: "refresh"}, function(response) {});  
				});
		});
	});
}



