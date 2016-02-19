//document.getElementById("demo").innerHTML = "Page location is: ";
var allTabs;
document.getElementById("create").addEventListener("click", createTab);
document.getElementById("window").addEventListener("click", createWindow);
document.getElementById("restore").addEventListener("click", restoreTab);
document.getElementById("save").addEventListener("click", save);


/*
chrome.windows.onCreated.addListener(function(createInfo) {
  chrome.tabs.reload();
});

chrome.windows.onRemoved.addListener(function(windowId){
  chrome.tabs.reload();
});

chrome.tabs.onCreated.addListener(function(tab){
  chrome.tabs.reload();
});

chrome.tabs.onRemoved.addListener(function(tabId){
  chrome.tabs.reload();
});
*/

function restoreTab(){
	chrome.sessions.restore(null,null);
  chrome.tabs.reload();
}

function alertMe(){
	alert('remove');
}
//.addEventListener("click", removeTab);
chrome.tabs.query({}, function (tabs) {
 	allTabs=tabs;
 		for(var i=0;i<tabs.length;i++){
 			var url=tabs[i].url;
 			//var rbuttonHTML='<button class="remove" id="'+tabs[i].id+'">Remove</button>';
 			//var sbuttonHTML='<button class="save" id="'+tabs[i].id+'">Save</button>';
      //document.getElementById("tabs").innerHTML+=rbuttonHTML+" "+sbuttonHTML+" "+url+'<br>';
 		  var buttonHTML='<input type="checkbox" class="save" id="'+tabs[i].id+'">';
      document.getElementById("tabs").innerHTML+=buttonHTML+" "+url+'<br>';
    }
 		var removes=document.getElementsByClassName("remove");
  for(var i=0;i<removes.length;i++){
	 removes[i].addEventListener("click", removeTab);
  }
  var url = tabs[0].url;
  console.log("URL from main.js", url);
});

// function createTab(){
// 	chrome.tabs.create(null, null) ;
// }

/*function removeTab() {
	var tabId=parseInt(this.id);
	console.log(tabId);
  try {
    chrome.tabs.remove(tabId, function() {
    console.log('tab: ' + tabId + ' removed.');
    chrome.tabs.reload();
    });
  } catch (e) {
    alert(e);
  }
}

function createTabData() {
  return {
   // 'index': parseInt(document.getElementById('index_' + id).value),
   // 'windowId': parseInt(document.getElementById('windowId_' + id).value),
   // 'index': parseInt(document.getElementById('index_' + id).value),
  //  'url': document.getElementById('url_' + id).value,
  //  'selected': document.getElementById('selected_' + id).value ? true : false
  }
}

function createTab() {
  var args = createTabData()

  //if (!isInt(args.windowId))
  //  delete args.windowId;
  //if (!isInt(args.index))
  //  delete args.index;

  try {
    chrome.tabs.create(args);
    chrome.tabs.reload();
  } catch (e) {
    alert(e);
  }
}

function createWindow() {
  var args = {
  //	'type':"normal"
  //  'left': parseInt(document.getElementById('new_window_left').value),
  //  'top': parseInt(document.getElementById('new_window_top').value),
  //  'width': parseInt(document.getElementById('new_window_width').value),
  //  'height': parseInt(document.getElementById('new_window_height').value),
  'width': 1200,
  'height': 800
  //  'url': document.getElementById('new_window_url').value
  }

  // if (!isInt(args.left))
  //   delete args.left;
  // if (!isInt(args.top))
  //   delete args.top;
  // if (!isInt(args.width))
  //   delete args.width;
  // if (!isInt(args.height))
  //   delete args.height;
  // if (!args.url)
  //   delete args.url;

  try {
    chrome.windows.create(args);
    chrome.tabs.reload();
  } catch(e) {
    alert(e);
  }
}*/

function saveTab() {
  var tabId=parseInt(this.id);
  console.log(tabId);
  try {
    savedTabs.add(this);
    chrome.tabs.remove(tabId, function() {
    console.log('tab: ' + tabId + ' saved.');
    chrome.tabs.reload();
    });
  } catch (e) {
    alert(e);
  }
}