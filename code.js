// Development Mode Toggle
// Set to true for development, false for production
const IS_DEVELOPMENT = false;

// Console wrapper - only logs in development mode
(function() {
    const originalConsole = {
        log: console.log,
        error: console.error,
        warn: console.warn,
        info: console.info,
        debug: console.debug
    };

    // Override console methods
    console.log = function(...args) {
        if (IS_DEVELOPMENT) originalConsole.log.apply(console, args);
    };
    console.error = function(...args) {
        if (IS_DEVELOPMENT) originalConsole.error.apply(console, args);
    };
    console.warn = function(...args) {
        if (IS_DEVELOPMENT) originalConsole.warn.apply(console, args);
    };
    console.info = function(...args) {
        if (IS_DEVELOPMENT) originalConsole.info.apply(console, args);
    };
    console.debug = function(...args) {
        if (IS_DEVELOPMENT) originalConsole.debug.apply(console, args);
    };
})();

figma.showUI(__html__, { width: 500, height: 800 });

// Send current page info to UI
// Note: figma.fileKey is not available in plugin sandbox, so we send page ID only
const currentPage = figma.currentPage;
const pageId = currentPage.id.replace(/:/g, '-');
const pageName = currentPage.name;

console.log('Current page:', pageName, 'ID:', pageId);

figma.ui.postMessage({
  type: 'current-page-info',
  pageId: pageId,
  pageName: pageName
});

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
  } else if (msg.type === 'save-clickup-token') {
    try {
      // If data is null, delete the key
      if (msg.data === null) {
        await figma.clientStorage.deleteAsync('clickup-access-token');
      } else {
        await figma.clientStorage.setAsync('clickup-access-token', msg.data);
      }
      figma.ui.postMessage({ type: 'save-clickup-token-success' });
    } catch (error) {
      figma.ui.postMessage({ type: 'save-clickup-token-error', error: error.message });
    }
  } else if (msg.type === 'load-clickup-token') {
    try {
      const data = await figma.clientStorage.getAsync('clickup-access-token');
      figma.ui.postMessage({ type: 'load-clickup-token-success', data });
    } catch (error) {
      figma.ui.postMessage({ type: 'load-clickup-token-error', error: error.message });
    }
  } else if (msg.type === 'save-clickup-user') {
    try {
      // If data is null, delete the key
      if (msg.data === null) {
        await figma.clientStorage.deleteAsync('clickup-user');
      } else {
        await figma.clientStorage.setAsync('clickup-user', msg.data);
      }
      figma.ui.postMessage({ type: 'save-clickup-user-success' });
    } catch (error) {
      figma.ui.postMessage({ type: 'save-clickup-user-error', error: error.message });
    }
  } else if (msg.type === 'load-clickup-user') {
    try {
      const data = await figma.clientStorage.getAsync('clickup-user');
      figma.ui.postMessage({ type: 'load-clickup-user-success', data });
    } catch (error) {
      figma.ui.postMessage({ type: 'load-clickup-user-error', error: error.message });
    }
  } else if (msg.type === 'save-clickup-config') {
    try {
      // If data is null, delete the key
      if (msg.data === null) {
        await figma.clientStorage.deleteAsync('clickup-config');
      } else {
        await figma.clientStorage.setAsync('clickup-config', msg.data);
      }
      figma.ui.postMessage({ type: 'save-clickup-config-success' });
    } catch (error) {
      figma.ui.postMessage({ type: 'save-clickup-config-error', error: error.message });
    }
  } else if (msg.type === 'load-clickup-config') {
    try {
      const data = await figma.clientStorage.getAsync('clickup-config');
      figma.ui.postMessage({ type: 'load-clickup-config-success', data });
    } catch (error) {
      figma.ui.postMessage({ type: 'load-clickup-config-error', error: error.message });
    }
  }
};
