chrome.runtime.sendMessage({action: 'get'}, response => {
  let currentStatus = response.currentStatus
  let elements = document.getElementsByClassName('outdated-comment')
  for (let i = 0; i < elements.length; i++) {
    if (currentStatus)
      elements[i].removeAttribute('open')
    else 
      elements[i].setAttribute('open', '')
  }
  chrome.runtime.sendMessage({
      action: 'update', 
      updatedStatus: !currentStatus
  })
});
