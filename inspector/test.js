var allTabs, allWindows;
document.getElementById("restore").addEventListener("click", restoreRecentTab);
document.getElementById("reduce").addEventListener("click", reduceTabs);
//document.getElementsByClassName("restore_button").addEventListener("click", restoreTabs);

$( ".restore_button" ).click(function() {
  alert( "Handler for .click() called." );
});

var reducedTabsId = [];
var reducedTabs=[];

var storedTabs;


function getAllCheckedTabs(){
    for(var i = 0 ; i <allWindows.length;i++){
    var w = allWindows[i];
    var _tabs = w.tabs;

    for(var j=0;j<_tabs.length;j++){
    var title=_tabs[j].title;
    var id=_tabs[j].id;
    if(reducedTabsId.indexOf(id) > -1){
      reducedTabs.push(_tabs[j]);
      removeTabWithId(id);
    }
  }
  }
   var str = JSON.stringify(reducedTabs);
  var key_text = document.getElementById("store_key").value;
  
  var dict = {};
  dict[key_text] = reducedTabs;
  chrome.storage.sync.set(dict, function(){  
  });
}

function reduceTabs() {
  console.log("reduce");
  var x = document.getElementsByClassName("reduce");
  for(var i=0;i<x.length;i++){
    if(x[i].checked){
      var ID=parseInt(x[i].id);
      reducedTabsId.push(ID);
      
    }
    console.log(x[i].checked);
  }
  getAllCheckedTabs();

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


function escapeHTML(html) {
    return html.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

var allWindows;


chrome.windows.getAll({populate: true}, function(windows){
 
      allWindows = windows;
      
    var flag = false;
    for(var i = 0 ; i <allWindows.length;i++){
      console.log(allWindows.length);
      var w = allWindows[i];
      var _tabs = w.tabs;
      var windowHTML='<table class="table table-striped table-hover "><caption>Window '+i+ '</caption>';
      windowHTML+=' <thead> <tr> <th>check</th>  <th>Title</th> </tr> </thead><tbody>';
    //  var windowHTML='<div> Window '+i;
     // document.getElementById("tabs").innerHTML+=windowHTML;

      for(var j=0;j<_tabs.length;j++){
      var title=_tabs[j].title;
      title = escapeHTML(title);
  //      var buttonHTML='<tr><td><input type="checkbox"></td><td>'+title+'</td></tr>';
     var buttonHTML='<tr class="'+_tabs[j].id+'"><td class="col-md-1"><input type="checkbox" class="reduce" id="'+_tabs[j].id+'"></td><td class="col-md-9">'+title+'</td></tr>';
     windowHTML+=buttonHTML;
     // document.getElementById("tabs").innerHTML+=buttonHTML;
     // if(j==_tabs.length-1)
    //   document.getElementById("tabs").innerHTML+='</tbody></table>';
    console.log(title);
    }
    windowHTML+='</tbody></table>';
      document.getElementById("tabs").innerHTML+=windowHTML;

    }
});



chrome.storage.sync.get(null, function(items) {


  //  alert("current storage: "+str);

  //console.log("Storage");
  console.log(items);
  var allKeys = Object.keys(items);
  var i = allKeys.length;
  storedTabs = items;
  for(var j=0;j<i;j++){
    var storedUnit = '<p>'+allKeys[j]+'</p>';
    var storedUnit='<table class="table table-striped table-hover "><caption><button class="restore_button" type="button" id="'+allKeys[j]+ '">'+allKeys[j]+'</button></caption>';
      storedUnit+=' <thead> <tr>   <th>Title</th> </tr> </thead><tbody>';
    var tabs = items[allKeys[j]];
    for(var k=0;k<tabs.length;k++){
      var item = tabs[k];
      var title = item.title;
   //   var buttonHTML = '<input type="checkbox" class="restore" id="'+item.id+'">';
      var buttonHTML='<tr class="'+item.id+'"><td class="col-md-1"><td class="col-md-9">'+title+'</td></tr>';

      storedUnit+=buttonHTML;
    }
    storedUnit+='</tbody></table>';
    document.getElementById("reducedTabs").innerHTML+=storedUnit;


  }


});

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