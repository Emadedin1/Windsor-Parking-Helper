chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'find-parking-near-address',
    title: 'Find parking near this address',
    contexts: ['selection']
  });
});

chrome.contextMenus.onClicked.addListener(async (info) => {
  if (info.menuItemId !== 'find-parking-near-address') {
    return;
  }

  const selectedText = typeof info.selectionText === 'string' ? info.selectionText.trim() : '';

  if (!selectedText) {
    return;
  }

  await chrome.storage.local.set({ pendingAddress: selectedText });

  try {
    await chrome.action.openPopup();
  } catch {
    chrome.tabs.create({ url: chrome.runtime.getURL('parking.html') });
  }
});
