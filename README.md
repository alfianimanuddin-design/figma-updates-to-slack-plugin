# Design Commit - Figma Plugin

A Figma plugin that lets you commit and share your design updates to Slack with Git-style commit messages.

## 🚀 Features

- **Git-style commits**: Feature, Fix, Update, Final, Review types
- **Auto file detection**: Current file name, page, and direct Figma links
- **Selection awareness**: Include info about selected elements
- **Smart settings**: Save Slack webhook URL locally
- **Rich Slack messages**: Professional formatting with action buttons

## 📁 File Structure

```
design-commit-plugin/
├── manifest.json       # Plugin configuration
├── code.ts            # Main plugin logic (TypeScript)
├── code.js            # Compiled JavaScript (generated)
├── ui.html            # Plugin interface
├── package.json       # Dependencies (optional)
├── tsconfig.json      # TypeScript config (optional)
└── README.md          # This file
```

## 🛠️ Setup

### Option 1: Quick Setup (JavaScript only)
1. Create a new folder for your plugin
2. Copy `manifest.json` and `ui.html` files
3. Convert `code.ts` to `code.js` manually (remove TypeScript types)
4. Import plugin in Figma

### Option 2: Full TypeScript Setup
1. Create a new folder for your plugin
2. Copy all files
3. Install dependencies:
   ```bash
   npm install
   ```
4. Compile TypeScript:
   ```bash
   npm run build
   ```
5. Import plugin in Figma

## 📦 Installation in Figma

1. In Figma, go to **Plugins** → **Development** → **Import plugin from manifest**
2. Select your `manifest.json` file
3. The plugin will appear in your development plugins

## 🌐 Server Configuration

This plugin uses a backend server to proxy requests to Slack APIs.

### Production (Default)
The plugin is pre-configured to use the production server:
```
https://figma-slack-bridge.vercel.app
```

### Development Setup
If you're running the server locally for development:

1. **Start the local server**
   ```bash
   cd figma-slack-bridge
   npm install
   vercel dev
   ```
   The server will run at `http://localhost:3000`

2. **Update the plugin to use local server**

   In [ui.html](ui.html), change line 1360:

   ```javascript
   // For local development
   const SERVER_URL = 'http://localhost:3000';

   // For production (default)
   // const SERVER_URL = 'https://figma-slack-bridge.vercel.app';
   ```

3. **Reload the plugin in Figma**
   - Right-click the plugin → Development → Reload

**Important:** Remember to switch back to the production URL before publishing or sharing your plugin!

For more details about the server, see [figma-slack-bridge/README.md](figma-slack-bridge/README.md).

## ⚙️ Slack Setup

1. Go to your Slack workspace
2. Create a new app at https://api.slack.com/apps
3. Enable **Incoming Webhooks**
4. Create a webhook for your desired channel
5. Copy the webhook URL
6. Paste it in the plugin settings (one-time setup)

## 🎯 Usage

1. Open the plugin in any Figma file
2. Configure Slack webhook URL in Settings (first time only)
3. For each design update:
   - Select commit type (✨ Feature, 🐛 Fix, 🔄 Update, 🎯 Final, 👀 Review)
   - Write commit message (e.g., "Add new checkout flow design")
   - Add optional description
   - Choose to include selection info
   - Click "Commit to Slack"

## 📝 Example Slack Message

```
✨ Add new homepage hero section

File: Mobile App Redesign
Page: Homepage
Type: FEATURE
Date: 3/15/2024

Description:
Updated hero section with improved typography and call-to-action buttons. 
Implemented new brand colors and responsive layout.

Selection: 3 elements selected
Types: Frame, Text, Button

[Open in Figma] [View Page]
```

## 🔧 Development

### Building TypeScript
```bash
# One-time build
npm run build

# Watch mode (rebuilds on changes)
npm run watch
```

### Customizing the Plugin

**Adding new commit types:**
1. Update `commitTypeEmojis` object in `code.ts`
2. Add new button in `ui.html` commit-types section
3. Rebuild and reload plugin

**Changing Slack message format:**
1. Modify `slackPayload` structure in `handleDesignCommit` function
2. See [Slack Block Kit Builder](https://app.slack.com/block-kit-builder) for formatting options

**Adding file screenshots:**
1. Use `figma.exportAsync()` in the plugin code
2. Upload image to a service (AWS S3, Cloudinary, etc.)
3. Include image URL in Slack message

## 🐛 Troubleshooting

### Plugin won't load
- Check that all files are in the same directory
- Ensure `manifest.json` is valid JSON
- Verify `code.js` exists (compile from `code.ts` if needed)

### Slack messages not sending
- Verify webhook URL is correct and active
- Check network permissions in manifest.json
- Test webhook URL with a simple curl command:
  ```bash
  curl -X POST -H 'Content-type: application/json' \
    --data '{"text":"Test message"}' \
    YOUR_WEBHOOK_URL
  ```

### TypeScript compilation errors
- Install dependencies: `npm install`
- Check TypeScript version compatibility
- Verify `@figma/plugin-typings` is installed

### UI not displaying correctly
- Check browser console for JavaScript errors
- Verify all CSS variables are supported in Figma
- Test with different Figma themes (light/dark)

## 🔒 Security Notes

- Webhook URLs are stored locally in Figma's client storage
- No data is sent to external servers except Slack
- Network access is restricted to `hooks.slack.com` only
- Consider using environment variables for team deployments

## 📚 Resources

- [Figma Plugin API Documentation](https://www.figma.com/plugin-docs/)
- [Slack Block Kit Builder](https://app.slack.com/block-kit-builder)
- [Slack Incoming Webhooks](https://api.slack.com/messaging/webhooks)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🎨 Customization Ideas

### Advanced Features to Add
1. **Design Screenshots**: Automatically capture and include design previews
2. **Version Comparison**: Compare with previous commits
3. **Team Mentions**: Auto-mention relevant team members based on file ownership
4. **Project Integration**: Link to Jira, Asana, or other project management tools
5. **Approval Workflow**: Add approve/reject buttons in Slack
6. **Change Detection**: Highlight what specifically changed
7. **Batch Commits**: Commit multiple pages/files at once

### UI Enhancements
1. **Dark/Light Mode**: Enhanced theme support
2. **Keyboard Shortcuts**: Quick commit with Cmd+Enter
3. **Recent Messages**: Show history of recent commits
4. **Templates**: Pre-defined commit message templates
5. **File Browser**: Browse and commit from multiple files

## 🤝 Contributing

Feel free to extend this plugin for your team's needs:

1. Fork the code
2. Add your enhancements
3. Test thoroughly in your Figma environment
4. Share improvements with the community

## 📄 License

MIT License - feel free to use and modify for your projects.

---

**Happy designing and committing! 🎨✨**