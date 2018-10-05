const ICON_DIRECTORY = './icons/'
const ICON_SHOW = 'show.png'
const ICON_HIDE = 'hide.png'

function updateShowState() {
	chrome.tabs.executeScript({file: 'comments.js'})
}

function updateIcon(value) {
	let icon = value ? ICON_HIDE : ICON_SHOW
	chrome.browserAction.setIcon({path: ICON_DIRECTORY + icon})
}

function updateStorageState(tabId, value) {
	chrome.storage.local.set({[tabId]: value}, () => updateIcon(value))
}

function handleMessage(request, sender, sendResponse) {
	let action = request.action
	let tabId = sender.tab.id.toString()
	if (action === 'init') {
		updateStorageState(tabId, false)
	}
	else if (action === 'get') {
		chrome.storage.local.get(tabId, result => sendResponse({currentStatus: result[tabId]}))
	}
	else if (action === 'update') {
		let updatedStatus = request.updatedStatus
		updateStorageState(tabId, updatedStatus)
	}
	return true
}

chrome.tabs.onActivated.addListener(activeInfo => {
	let activeTabId = activeInfo.tabId.toString()
	chrome.storage.local.get(activeTabId, result => updateIcon(result[activeTabId]))
})
chrome.browserAction.onClicked.addListener(updateShowState)
chrome.runtime.onMessage.addListener(handleMessage)
