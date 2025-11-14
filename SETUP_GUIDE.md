# 🚀 Complete Setup Guide - Figma Updates to Slack Plugin

## Quick Start (5 minutes)

This guide will walk you through setting up the plugin from scratch. No technical knowledge required!

---

## 📋 Prerequisites

- A Figma account (free or paid)
- A Slack workspace where you're an admin or can create apps
- 5 minutes of your time

---

## Part 1: Create Your Slack App (2 minutes)

### Step 1: Create a New Slack App

1. Go to [https://api.slack.com/apps](https://api.slack.com/apps)
2. Click **"Create New App"**
3. Select **"From scratch"**
4. Name your app: `Figma Updates Bot` (or any name you prefer)
5. Select your workspace
6. Click **"Create App"**

### Step 2: Add Required Permissions

1. In the left sidebar, click **"OAuth & Permissions"**
2. Scroll down to **"Bot Token Scopes"**
3. Click **"Add an OAuth Scope"** and add these 5 scopes:
   - `channels:read` - View basic information about public channels
   - `groups:read` - View basic information about private channels
   - `users:read` - View people in the workspace
   - `users:read.email` - View email addresses of people
   - `incoming-webhook` - Post messages to specific channels
   - `chat:write` - Send messages as @Figma Updates Bot

### Step 3: Install App to Workspace

1. Scroll to the top of the **"OAuth & Permissions"** page
2. Click **"Install to Workspace"**
3. Review the permissions
4. Click **"Allow"**
5. **Copy the "Bot User OAuth Token"** (starts with `xoxb-...`)
   - ⚠️ Keep this safe! You'll need it in the plugin

---

## Part 2: Install the Figma Plugin (1 minute)

### Option A: From Figma Community (Recommended)
*Coming soon - plugin will be published*

### Option B: Development Mode (For now)

1. Download or clone this repository
2. In Figma:
   - Go to **Plugins** → **Development** → **Import plugin from manifest**
   - Select the `manifest.json` file from this folder
3. The plugin will appear in your development plugins

---

## Part 3: Configure the Plugin (2 minutes)

### Step 1: Open Plugin Settings

1. Open any Figma file
2. Go to **Plugins** → **Development** → **Figma Updates to Slack**
3. Click the **⚙️ Settings** button (top right)

### Step 2: Save Your Slack Bot Token

1. Find the **"🔑 Slack Bot Token"** section
2. Paste the token you copied earlier (starts with `xoxb-...`)
3. Click **"💾 Save Bot Token"**
4. You should see: ✅ Token saved successfully

### Step 3: Fetch Your Team Members

1. In the **"👥 Fetch Slack Users"** section
2. Click **"🔄 Fetch Users from Slack"**
3. Wait 5-10 seconds
4. You should see: ✅ Successfully fetched X users!

This enables autocomplete when you want to acknowledge team members.

### Step 4: Configure Channels

#### First, invite the bot to your channels in Slack:

1. Open Slack
2. Go to the channel where you want to post updates
3. Click the **channel name** at the top
4. Click **"Integrations"** tab
5. Click **"Add apps"**
6. Search for your bot name (e.g., "Figma Updates Bot")
7. Click **"Add"**
8. Repeat for each channel you want to use (typically 2-5 channels)

#### Then, configure webhooks in the plugin:

1. Back in the plugin, click **"🔄 Fetch Channels from Slack"**
2. Wait a few seconds
3. You'll see a list of channels where your bot is a member
4. For each channel you want to use:
   - Go back to Slack
   - Go to the channel
   - Click the channel name → **"Integrations"** → **"Add an app"**
   - Find **"Incoming Webhooks"**
   - Click **"Add"**
   - Click **"Add Incoming WebHooks integration"**
   - **Copy the Webhook URL** (starts with `https://hooks.slack.com/services/...`)
   - Paste it in the corresponding channel field in the plugin
5. Click **"💾 Save Channel Configuration"**

---

## Part 4: Send Your First Update! (1 minute)

1. Close settings (click **"✖"** or **"← Back"**)
2. Fill out the commit form:
   - **Task Name**: e.g., "Updated homepage hero section"
   - **Commit Type**: Click ✨ Feature, 🐛 Fix, 🔄 Update, 🎯 Final, or 👀 Review
   - **Description**: Add more details (optional)
   - **Acknowledged by**: Start typing a teammate's name (optional)
   - **CC**: Add more people to notify (optional)
   - **Channel**: Select where to post
3. Click **"📤 Commit to Slack"**
4. Check your Slack channel! 🎉

---

## 🎯 Usage Tips

### Daily Workflow

1. Make design changes in Figma
2. Open the plugin
3. Write a quick commit message
4. Select commit type
5. Choose channel and click commit
6. Your team sees the update in Slack instantly!

### Best Practices

- **Be descriptive**: "Added new checkout flow" is better than "Updates"
- **Use commit types**:
  - ✨ **Feature**: New designs, new components
  - 🐛 **Fix**: Fixed issues, corrected mistakes
  - 🔄 **Update**: Improved existing designs
  - 🎯 **Final**: Final version ready for handoff
  - 👀 **Review**: Ready for feedback
- **Acknowledge teammates**: Use @mentions to notify specific people
- **Rich descriptions**: Use the editor for formatting

### Keyboard Shortcuts in Description Editor

- `Ctrl/Cmd + B` - Bold
- `Ctrl/Cmd + I` - Italic
- `Ctrl/Cmd + Shift + X` - Strikethrough
- `Ctrl/Cmd + Shift + 7` - Numbered list
- `Ctrl/Cmd + Shift + 8` - Bullet list
- `Ctrl/Cmd + K` - Add link

---

## 🔧 Troubleshooting

### "❌ Error: Slack API error: invalid_auth"

**Solution**: Your token is invalid or expired.
1. Go to [https://api.slack.com/apps](https://api.slack.com/apps)
2. Select your app
3. Go to "OAuth & Permissions"
4. Copy the **"Bot User OAuth Token"** again
5. Paste it in plugin settings and save

### "❌ Error: Slack API error: missing_scope"

**Solution**: Missing required permissions.
1. Go to [https://api.slack.com/apps](https://api.slack.com/apps)
2. Select your app
3. Go to "OAuth & Permissions"
4. Add the missing scopes (see Part 1, Step 2)
5. Click "Reinstall to Workspace"
6. Copy the new token and update it in the plugin

### "❌ No channels found"

**Solution**: The bot hasn't been invited to any channels.
1. In Slack, go to a channel
2. Click channel name → "Integrations" → "Add apps"
3. Add your bot
4. Go back to plugin and click "🔄 Fetch Channels from Slack"

### "⏱️ Rate Limited"

**Solution**: Too many requests to Slack.
- Wait 1-2 minutes
- Try again
- This happens if you click fetch multiple times quickly

### Plugin shows "❌ Server offline"

**Solution**: The backend server is not responding.
1. Check your internet connection
2. Wait 30 seconds and reload the plugin
3. If issue persists, the Vercel deployment may be down

---

## 🆘 Still Need Help?

1. Check the [GitHub Issues](https://github.com/alfianimanuddin-design/figma-updates-to-slack-plugin/issues)
2. Create a new issue with:
   - What you were trying to do
   - What error message you saw
   - Screenshots if possible

---

## 🎉 You're All Set!

Your plugin is now configured and ready to use. Enjoy seamless design updates to Slack!

**Pro tip**: Pin the plugin to your toolbar in Figma for quick access:
- Right-click the plugin → "Pin to toolbar"

---

Made with ❤️ by the Figma + Slack community
