var allTabs, allWindows;
//document.getElementById("create").addEventListener("click", createTab);
//document.getElementById("window").addEventListener("click", createWindow);
document.getElementById("restore").addEventListener("click", restoreTab);
document.getElementById("reduce").addEventListener("click", reduceTabs);

var storedTabs = [];

function reduceTabs() {
  console.log("reduce");
  var x = document.getElementsByClassName("reduce");
  for(var i=0;i<x.length;i++){
    if(x[i].checked){
      var ID=parseInt(x[i].id);
      removeTabWithId(ID);
      //storedTabs.push(ID);
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


//document.getElementById("save").addEventListener("click", save);


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
  //storedTabs[storedTabs.length - 1] = null;
}

function alertMe(){
  alert('remove');
}

chrome.windows.getAll({populate: true}, function(windows){
  allWindows = windows;  
  var flag = false;
  for(var i = 0 ; i <allWindows.length;i++){
    console.log(allWindows.length);
    var w = allWindows[i];
    var _tabs = w.tabs;
    var windowHTML='<div> Window '+ (i+1);
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
 //   allTabs=tabs;
 //     for(var i=0;i<tabs.length;i++){
 //       var title=tabs[i].title;
 //       var buttonHTML='<input type="checkbox" class="reduce" id="'+tabs[i].id+'">';
 //       document.getElementById("tabs").innerHTML+=buttonHTML+title+'<br>';
 //     }
//      var removes=document.getElementsByClassName("remove");
// for(var i=0;i<removes.length;i++){
//  removes[i].addEventListener("click", removeTab);
// }
    //     var url = tabs[0].url;
    //     console.log("URL from main.js", url);
    // });
/*
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
*/
// function createTab(){
//  chrome.tabs.create(null, null) ;
// }
/*
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

}*/

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