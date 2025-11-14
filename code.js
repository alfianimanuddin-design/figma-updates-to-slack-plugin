figma.showUI(__html__, { width: 500, height: 800 });

// Handle messages from UI
figma.ui.onmessage = async (msg) => {
  if (msg.type === 'save-slack-users') {
    try {
      // If data is null, delete the key
      if (msg.data === null) {
        await figma.clientStorage.deleteAsync('slack-users');
      } else {
        await figma.clientStorage.setAsync('slack-users', msg.data);
      }
      figma.ui.postMessage({ type: 'save-slack-users-success' });
    } catch (error) {
      figma.ui.postMessage({ type: 'save-slack-users-error', error: error.message });
    }
  } else if (msg.type === 'load-slack-users') {
    try {
      const data = await figma.clientStorage.getAsync('slack-users');
      figma.ui.postMessage({ type: 'load-slack-users-success', data });
    } catch (error) {
      figma.ui.postMessage({ type: 'load-slack-users-error', error: error.message });
    }
  } else if (msg.type === 'save-channel-configs') {
    try {
      // If data is null, delete the key
      if (msg.data === null) {
        await figma.clientStorage.deleteAsync('channel-configs');
      } else {
        await figma.clientStorage.setAsync('channel-configs', msg.data);
      }
      figma.ui.postMessage({ type: 'save-channel-configs-success' });
    } catch (error) {
      figma.ui.postMessage({ type: 'save-channel-configs-error', error: error.message });
    }
  } else if (msg.type === 'load-channel-configs') {
    try {
      const data = await figma.clientStorage.getAsync('channel-configs');
      figma.ui.postMessage({ type: 'load-channel-configs-success', data });
    } catch (error) {
      figma.ui.postMessage({ type: 'load-channel-configs-error', error: error.message });
    }
  } else if (msg.type === 'save-slack-token') {
    try {
      // If data is null, delete the key
      if (msg.data === null) {
        await figma.clientStorage.deleteAsync('slack-bot-token');
      } else {
        await figma.clientStorage.setAsync('slack-bot-token', msg.data);
      }
      figma.ui.postMessage({ type: 'save-slack-token-success' });
    } catch (error) {
      figma.ui.postMessage({ type: 'save-slack-token-error', error: error.message });
    }
  } else if (msg.type === 'load-slack-token') {
    try {
      const data = await figma.clientStorage.getAsync('slack-bot-token');
      figma.ui.postMessage({ type: 'load-slack-token-success', data });
    } catch (error) {
      figma.ui.postMessage({ type: 'load-slack-token-error', error: error.message });
    }
  }
};
