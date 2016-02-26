//document.getElementById("demo").innerHTML = "Page location is: ";
var allTabs;
document.getElementById("create").addEventListener("click", createTab);
document.getElementById("window").addEventListener("click", createWindow);
document.getElementById("restore").addEventListener("click", restoreTab);
document.getElementById("reduce").addEventListener("click", reduce);

function saveTabs() {

console.log("reduce");
  var x = document.getElementsByClassName("reduce");
  for(var i=0;i<x.length;i++){
    if(x[i].checked){
      var ID=parseInt(x[i].id);
      removeTabWithId(ID);

    }
    console.log(x[i].checked);
  }

        // Get a value saved in a form.
        var theValue = textarea.value;
        // Check that there's some code there.
        if (!theValue) {
          message('Error: No value specified');
          return;
        }
        // Save it using the Chrome extension storage API.
        chrome.storage.sync.set({'value': theValue}, function() {
          // Notify that we saved.
          message('Settings saved');
        });
  }

chrome.storage.onChanged.addListener(function(changes, namespace) {
        for (key in changes) {
          var storageChange = changes[key];
          console.log('Storage key "%s" in namespace "%s" changed. ' +
                      'Old value was "%s", new value is "%s".',
                      key,
                      namespace,
                      storageChange.oldValue,
                      storageChange.newValue);
        }
      });


function restoreTab(){
	chrome.sessions.restore(null,null);

}

function alertMe(){
	alert('remove');
}
var allWindows;
chrome.windows.getAll({populate: true}, function(windows){
    allWindows = windows;
      
    var flag = false;
    for(var i = 0 ; i <allWindows.length;i++){
      console.log(allWindows.length);
      var w = allWindows[i];
      var _tabs = w.tabs;
      var windowHTML='<div> Window '+i;
      document.getElementById("tabs").innerHTML+=windowHTML+'<br>';

      for(var j=0;j<_tabs.length;j++){
      var title=_tabs[j].title;
      var buttonHTML='<input type="checkbox" class="reduce" id="'+_tabs[j].id+'">';
      document.getElementById("tabs").innerHTML+=buttonHTML+title+'<br>';
    }
    windowHTML='</div>';
      document.getElementById("tabs").innerHTML+=windowHTML+'<br>';

    }
    
  });

//.addEventListener("click", removeTab);
 // chrome.tabs.query({}, function (tabs) {
 // 	allTabs=tabs;
 // 		for(var i=0;i<tabs.length;i++){
 // 			var title=tabs[i].title;
 // 			var buttonHTML='<input type="checkbox" class="reduce" id="'+tabs[i].id+'">';
 // 			document.getElementById("tabs").innerHTML+=buttonHTML+title+'<br>';
 // 		}
//  		var removes=document.getElementsByClassName("remove");
// for(var i=0;i<removes.length;i++){
// 	removes[i].addEventListener("click", removeTab);
// }
    //     var url = tabs[0].url;
    //     console.log("URL from main.js", url);
    // });

// function createTab(){
// 	chrome.tabs.create(null, null) ;
// }

function reduce(){
	console.log("reduce");
	var x = document.getElementsByClassName("reduce");
	for(var i=0;i<x.length;i++){
		if(x[i].checked){
			var ID=parseInt(x[i].id);
			removeTabWithId(ID);

		}
		console.log(x[i].checked);
	}

}

function removeTabWithId(tabId) {
console.log("ad");
  try {
    chrome.tabs.remove(tabId, function() {
      console.log('tab: ' + tabId + ' removed.');
      chrome.tabs.reload();
    });
  } catch (e) {
    alert(e);
  }
}

function removeTab() {
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
/*
  if (!isInt(args.windowId))
    delete args.windowId;
  if (!isInt(args.index))
    delete args.index;
*/
  try {
    chrome.tabs.create(args);
  } catch (e) {
    alert(e);
  }
}

function createWindow() {
  var args = {
  	'type':"panel"
  //  'left': parseInt(document.getElementById('new_window_left').value),
  //  'top': parseInt(document.getElementById('new_window_top').value),
  //  'width': parseInt(document.getElementById('new_window_width').value),
  //  'height': parseInt(document.getElementById('new_window_height').value),
   // 'url': document.getElementById('new_window_url').value
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
  } catch(e) {
    alert(e);
  }
}