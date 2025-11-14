figma.showUI(__html__, { width: 500, height: 800 });

// Handle messages from UI
figma.ui.onmessage = async (msg) => {
  if (msg.type === 'save-slack-users') {
    try {
      await figma.clientStorage.setAsync('slack-users', msg.data);
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
  }
};
