// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var current = 0;

function updateShowState() {
  chrome.browserAction.setIcon({path:"icon" + current + ".png"});
  current++;

  if (current > 1) {
  	current = 0;
  	chrome.tabs.executeScript(null, { file: "jquery-2.1.4.js" }, function() {
		chrome.tabs.executeScript(null, { code:"$('.outdated-diff-comment-container').addClass('open');" });
	});
  } else {
  	chrome.tabs.executeScript(null, { file: "jquery-2.1.4.js" }, function() {
		chrome.tabs.executeScript(null, { code:"$('.outdated-diff-comment-container').removeClass('open');" });
	});
  }

    
}

chrome.browserAction.onClicked.addListener(updateShowState);
updateShowState();
