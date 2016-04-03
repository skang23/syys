// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var allWindows;
chrome.browserAction.onClicked.addListener(function(tab) {
//  chrome.tabs.create({url:chrome.extension.getURL("test.html")});
  chrome.windows.getAll({populate: true}, function(windows){
  	allWindows = windows;
  	  windows.forEach(function(window){

  	window.tabs.forEach(function(tab){
      //collect all of the urls here, I will just log them instead
      console.log(tab.url);
    });
      });

  	var flag = false;
  	for(var i = 0 ; i <allWindows.length;i++){
  		var w = allWindows[i];
  		console.log("this");
  		console.log(w.tabs[0].title);
  		if(w.tabs[0].title === "Tab Manager"){
  			console.log("tab manager exist");
  			flag = true;
  			chrome.windows.update(w.id,{"focused": true}, null);
  			break;
  		}
  	}
  	if(flag === false){
  		  chrome.windows.create({
  	'type':"panel",
  	'url':chrome.extension.getURL("test.html"),
  	'width':300,
  	'height':500
  });
  	}
  });
  // chrome.windows.create({
  // 	'type':"panel",
  // 	'url':chrome.extension.getURL("test.html"),
  // 	'width':300,
  // 	'height':500
  // });
});

