window.addEventListener('message', function(event) {
  if (event.data.type === 'figma-commit-data') {
    // Store commit data for extension to use
    chrome.storage.local.set({
      lastCommit: event.data.data
    });
  }
});