document.addEventListener('DOMContentLoaded', function() {
  const sendBtn = document.getElementById('sendBtn');
  const status = document.getElementById('status');

  sendBtn.addEventListener('click', async function() {
    try {
      // Get stored commit data from Figma plugin
      const result = await chrome.storage.local.get(['lastCommit']);
      
      if (!result.lastCommit) {
        status.innerHTML = '<div class="error">No commit data found. Use Figma plugin first.</div>';
        return;
      }

      status.innerHTML = 'Sending to Slack...';
      
      const response = await fetch(result.lastCommit.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(result.lastCommit.payload)
      });

      if (response.ok) {
        status.innerHTML = '<div class="success">✅ Sent to Slack successfully!</div>';
      } else {
        throw new Error(`HTTP ${response.status}`);
      }

    } catch (error) {
      status.innerHTML = `<div class="error">❌ Error: ${error.message}</div>`;
    }
  });
});