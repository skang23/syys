var allTabs, allWindows;
document.getElementById("restore").addEventListener("click", restoreRecentTab);
document.getElementById("reduce").addEventListener("click", reduceTabs);

var reducedTabs = [];
function reduceTabs() {
  console.log("reduce");
  var x = document.getElementsByClassName("reduce");
  for(var i=0;i<x.length;i++){
    if(x[i].checked){
      var ID=parseInt(x[i].id);
      
      chrome.tabs.get(ID, function(item) {
        var obj={};
        obj[ID]=item.title;
        //var tab = {"ID":ID, "Title":item.title};
        chrome.storage.sync.set(obj, function() {
          chrome.storage.sync.get('reduced', function(items){
        var str2 = JSON.stringify(items);
    console.log(str2);
    alert("reduced data"+str2);
    });
        });
        reducedTabs.push(item);
        alert(tab.Title)
      })
      removeTabWithId(ID);
    }
    console.log(x[i].checked);
  }
  // Get a value saved in a form.
  //var theValue = textarea.value;
  // Check that there's some code there.
  //if (!theValue) {
  //  message('Error: No value specified');
  //  return;
  //}
  // Save it using the Chrome extension storage API.
 /* chrome.storage.sync.set({'reduced': reducedTabs}, function() {
    // Notify that we saved.
    var str = JSON.stringify(reducedTabs);
    console.log(str);
    alert(str);
    chrome.storage.sync.get('reduced', function(items){
        var str2 = JSON.stringify(items);
    console.log(str2);
    alert("reduced data"+str2);
    });
    //alert(reducedTabs[0].ID);
    message('Settings saved');
  });*/
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

chrome.windows.onCreated.addListener(function(createInfo) {
  //chrome.tabs.reload();
});
chrome.windows.onRemoved.addListener(function(windowId){
  //chrome.tabs.reload();
});
chrome.tabs.onCreated.addListener(function(tab){
  //chrome.tabs.reload();
});
chrome.tabs.onRemoved.addListener(function(tabId){
  //chrome.tabs.reload();
});


//restore the most recently closed tab
function restoreRecentTab(){
  chrome.sessions.restore(null,null);
  chrome.tabs.reload();
  //storedTabs[storedTabs.length - 1] = null;
}

//restore selected tab(s) among the stored tabs
function restoreTabs() {

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



chrome.storage.sync.get(null, function(items) {

  var str = JSON.stringify(items);
    console.log(str);
    alert("current storage: "+str);

  //console.log("Storage");
  console.log(items);
  var allKeys = Object.keys(items);
  console.log("All Keys"+allKeys+" "+items["ID"]);
  console.log(items.reduced)
  for (var i=0; i<allKeys.length; i++) {
   // for(var j=0;j<items[allKeys[i]].length;j++){
      var item = items[allKeys[i]];

       var title = item;
      var buttonHTML='<input type="checkbox" class="restore" id="'+allKeys[i]+'">';
      document.getElementById("reducedTabs").innerHTML+=buttonHTML+title+'<br>';
   // }
    //chrome.storage.get(allKeys[i], function(item) {
    //  var title = item.Title;
    //  var buttonHTML='<input type="checkbox" class="restore" id="'+item.ID+'">';
    //  document.getElementById("reducedTabs").innerHTML+=buttonHTML+title+'<br>';
    //});
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