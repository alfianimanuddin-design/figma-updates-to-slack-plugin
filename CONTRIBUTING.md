# 🤝 Contributing to Figma to Slack Notifier

Thank you for your interest in contributing! This guide will help you get started with local development, whether you're fixing bugs, adding features, or running your own fork.

---

## 🎯 Who This Guide Is For

This guide is for developers who want to:
- 🐛 Fix bugs or add features to contribute back
- 🔧 Test changes to the backend or plugin locally
- 🏢 Self-host a private instance for their organization
- 📚 Understand the architecture

**End users don't need this guide** - they can use the official backend at `https://figma-slack-bridge.vercel.app`

---

## 🏗️ Architecture Overview

```
┌─────────────────┐
│  Figma Plugin   │  (code.js + ui.html)
│  Client-Side    │  - Stores tokens in Figma clientStorage
└────────┬────────┘  - Makes API calls to backend
         │
         │ HTTPS
         │
┌────────▼────────┐
│  Vercel Backend │  (figma-slack-bridge/api/*)
│  Stateless      │  - Proxies requests to Slack/ClickUp
└────────┬────────┘  - No user data stored
         │
         ├──────────────┬──────────────┐
         │              │              │
    ┌────▼────┐    ┌───▼────┐    ┌───▼──────┐
    │  Slack  │    │ ClickUp│    │  Figma   │
    │   API   │    │  OAuth │    │ Storage  │
    └─────────┘    └────────┘    └──────────┘
```

### Key Design Principles

1. **Stateless Backend**: No databases, no sessions, no stored user data
2. **Client-Side Storage**: All tokens stored in Figma's encrypted clientStorage
3. **Multi-Tenant**: One backend serves all users securely
4. **OAuth Flow**: ClickUp auth via standard OAuth 2.0
5. **CORS-Enabled**: Plugin can call from any Figma instance

---

## 🚀 Local Development Setup

### Prerequisites

- **Node.js 18+** (for backend)
- **Vercel CLI** (for running backend locally)
- **Figma account** (for testing plugin)
- **Git** (for version control)

### 1. Clone the Repository

```bash
git clone https://github.com/alfianimanuddin-design/figma-updates-to-slack-plugin.git
cd figma-updates-to-slack-plugin
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd figma-slack-bridge

# Install dependencies
npm install

# Install Vercel CLI globally (if not already installed)
npm install -g vercel

# Create a .env file for local development
cat > .env << EOF
CLICKUP_CLIENT_ID=your_clickup_client_id
CLICKUP_CLIENT_SECRET=your_clickup_client_secret
CLICKUP_REDIRECT_URI=http://localhost:3000/api/clickup-callback
EOF

# Start local development server
vercel dev
```

Your backend will now be running at `http://localhost:3000`

### 3. Create Your Own ClickUp OAuth App (Optional)

If you want to test OAuth locally with your own ClickUp app:

1. Go to [ClickUp Settings → Apps](https://app.clickup.com/settings/apps)
2. Click **Create an App**
3. Fill in details:
   - **Name**: "Figma to Slack Notifier (Dev)"
   - **Redirect URL**: `http://localhost:3000/api/clickup-callback`
4. Copy the Client ID and Client Secret to your `.env` file

### 4. Configure Plugin to Use Local Backend

Edit `ui.html` line 2144:

```javascript
// Change from:
const SERVER_URL = 'https://figma-slack-bridge.vercel.app';

// To:
const SERVER_URL = 'http://localhost:3000';
```

### 5. Import Plugin in Figma

1. Open Figma Desktop App
2. Go to **Plugins → Development → Import plugin from manifest**
3. Select `manifest.json` from the project root
4. The plugin will appear in your plugins list

### 6. Test Your Changes

1. Open any Figma file
2. Run **Plugins → Figma to Slack Notifier**
3. Test the features you're working on
4. Check browser console (Cmd+Option+I) for errors

---

## 📁 Project Structure

```
figma-updates-to-slack-plugin/
├── 📄 manifest.json                      # Figma plugin configuration
├── 📄 code.js                            # Plugin backend (runs in Figma sandbox)
├── 📄 ui.html                            # Plugin UI (HTML/CSS/JS in one file)
│
├── 📁 figma-slack-bridge/               # Vercel serverless backend
│   ├── 📄 package.json
│   ├── 📄 vercel.json                   # Vercel deployment config
│   └── 📁 api/                          # Serverless functions
│       ├── fetch-slack-users.js         # Get Slack team members
│       ├── fetch-slack-channels.js      # Get Slack channels
│       ├── send-to-slack.js             # Post message to Slack
│       ├── clickup-authorize.js         # Start ClickUp OAuth flow
│       ├── clickup-callback.js          # Handle OAuth callback
│       ├── clickup-token-exchange.js    # Exchange code for token
│       ├── clickup-workspaces.js        # Fetch user's workspaces
│       ├── clickup-folder-lists.js      # Fetch folders/lists
│       ├── clickup-tasks.js             # Fetch tasks
│       ├── clickup-update-status.js     # Update task status
│       └── clickup-update-custom-fields.js # Update custom fields
│
├── 📄 README.md                          # User-facing documentation
├── 📄 SETUP_GUIDE.md                     # Slack setup instructions
├── 📄 CLICKUP_SETUP.md                   # ClickUp user guide
├── 📄 CONTRIBUTING.md                    # This file
└── 📄 TODO_FOR_PUBLIC_RELEASE.md         # Development roadmap
```

---

## 🔧 Making Changes

### Frontend (Plugin UI)

**File**: `ui.html`

This file contains the entire plugin interface - HTML, CSS, and JavaScript in one file.

**Key sections**:
- **Lines 1-2100**: Styles (CSS)
- **Lines 2100-2144**: Global config (SERVER_URL, etc.)
- **Lines 2144-4500**: JavaScript logic

**To make changes**:
1. Edit `ui.html`
2. Reload the plugin in Figma (Right-click plugin → Reload)
3. Test your changes

**Hot reload**: Unfortunately Figma doesn't support hot reload. You must manually reload after each change.

### Backend (Plugin Logic)

**File**: `code.js`

This file runs in Figma's sandbox and handles:
- Communication between UI and Figma API
- Accessing selected elements
- Storing/retrieving data from clientStorage

**To make changes**:
1. Edit `code.js`
2. Reload the plugin in Figma
3. Test your changes

### Backend (API Endpoints)

**Directory**: `figma-slack-bridge/api/`

Each file is a serverless function that handles one endpoint.

**To make changes**:
1. Edit the relevant `.js` file
2. Vercel dev automatically reloads
3. Test by calling the endpoint from the plugin

**Example**: Adding a new endpoint

```javascript
// figma-slack-bridge/api/my-new-endpoint.js
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Your logic here
    return res.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
```

---

## 🧪 Testing

### Manual Testing Checklist

Before submitting a PR, test these flows:

- [ ] **Slack Configuration**
  - [ ] Fetch users works
  - [ ] Fetch channels works
  - [ ] Token validation works

- [ ] **ClickUp OAuth**
  - [ ] Connect ClickUp button opens auth URL
  - [ ] Callback handles authorization correctly
  - [ ] Token is stored in clientStorage
  - [ ] Reconnect works after token expires

- [ ] **Task Fetching**
  - [ ] Workspaces load correctly
  - [ ] Folders/lists load correctly
  - [ ] Tasks load with proper filtering
  - [ ] Search functionality works

- [ ] **Posting to Slack**
  - [ ] Message format is correct
  - [ ] Task updates in ClickUp
  - [ ] Custom fields update correctly
  - [ ] Error handling works

### Automated Tests

Currently, there are no automated tests. Contributions to add testing would be appreciated!

---

## 🚢 Deployment

### Deploying Your Own Instance

If you want to run your own backend:

1. **Fork the repository** on GitHub

2. **Create a Vercel account** at [vercel.com](https://vercel.com)

3. **Import your fork** to Vercel:
   - Click "Add New Project"
   - Import your forked repository
   - Set root directory to `figma-slack-bridge`

4. **Add environment variables** in Vercel:
   ```
   CLICKUP_CLIENT_ID=your_client_id
   CLICKUP_CLIENT_SECRET=your_client_secret
   CLICKUP_REDIRECT_URI=https://your-app.vercel.app/api/clickup-callback
   ```

5. **Deploy!** Vercel auto-deploys on every push

6. **Update plugin** to use your backend:
   ```javascript
   const SERVER_URL = 'https://your-app.vercel.app';
   ```

### Official Deployment (Maintainers Only)

The official backend at `https://figma-slack-bridge.vercel.app` auto-deploys from the `main` branch.

Only maintainers with Vercel access can deploy to the official backend.

---

## 📝 Contribution Guidelines

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and test thoroughly
4. **Commit with clear messages**: `git commit -m 'Add amazing feature'`
5. **Push to your fork**: `git push origin feature/amazing-feature`
6. **Open a Pull Request** with:
   - Clear description of changes
   - Screenshots (if UI changes)
   - Testing steps

### Code Style

- Use **ES6+ JavaScript**
- Add **comments** for complex logic
- Keep functions **small and focused**
- Use **meaningful variable names**
- Handle **errors gracefully**

### Commit Message Format

Follow conventional commits:

```
feat: Add dark mode support
fix: Resolve token refresh issue
docs: Update setup guide
refactor: Simplify OAuth flow
chore: Update dependencies
```

### Pull Request Checklist

- [ ] Code follows existing style
- [ ] Tested locally with plugin + backend
- [ ] No console errors or warnings
- [ ] Updated documentation if needed
- [ ] Added comments for complex logic
- [ ] PR description explains what and why

---

## 🐛 Debugging Tips

### Plugin Not Loading
- Check Figma console (Cmd+Option+I on Mac)
- Verify `manifest.json` is valid JSON
- Try reimporting the plugin

### Backend Errors
- Check Vercel logs: `vercel logs`
- Verify environment variables are set
- Check CORS headers are present

### OAuth Issues
- Verify redirect URI matches exactly in ClickUp app
- Check state parameter is being passed
- Inspect network tab for failed requests

### CORS Errors
- Ensure all API endpoints have CORS headers
- Check `Access-Control-Allow-Origin` is set to `*`
- Verify preflight OPTIONS requests are handled

---

## 🔒 Security Considerations

### Multi-Tenant Security

The backend is designed to be **completely stateless**:
- ✅ No user data stored on server
- ✅ Tokens passed in request bodies
- ✅ Each user isolated via their own Figma storage
- ✅ CSRF protection via state parameter

### Best Practices

- **Never log tokens** in console or error messages
- **Validate all inputs** before processing
- **Use HTTPS** in production (Vercel handles this)
- **Rate limit** API calls if needed
- **Keep dependencies updated** for security patches

---

## 💡 Feature Ideas

Want to contribute but not sure what to work on? Here are some ideas:

- [ ] Add automated tests (Jest/Playwright)
- [ ] Implement dark mode
- [ ] Add commit history view
- [ ] Support more project management tools (Jira, Linear, etc.)
- [ ] Add screenshot capture to Slack messages
- [ ] Implement commit message templates
- [ ] Add analytics/usage tracking (privacy-respecting)
- [ ] Support multiple Slack workspaces
- [ ] Add keyboard shortcuts

---

## 📞 Getting Help

- 🐛 [Report bugs](https://github.com/alfianimanuddin-design/figma-updates-to-slack-plugin/issues)
- 💡 [Request features](https://github.com/alfianimanuddin-design/figma-updates-to-slack-plugin/issues/new)
- 💬 [Ask questions](https://github.com/alfianimanuddin-design/figma-updates-to-slack-plugin/discussions)

---

## 📄 License

MIT License - See [LICENSE](./LICENSE) for details.

---

**Thank you for contributing! 🎉**

Your efforts help make this tool better for designers everywhere.
