# Slack User Autocomplete Setup Guide

This guide will help you set up the autocomplete feature for selecting Slack users in the "Acknowledged by" and "CC" fields.

## Features

- **Smart Search**: Type a name, username, or email to find users
- **Keyboard Navigation**: Use arrow keys to navigate, Enter to select, Escape to close
- **Visual Preview**: See user's name, username, and role in the dropdown
- **Works for both fields**: Acknowledged by and CC fields both have autocomplete

## Quick Start

### Option 1: Fetch Real Slack Users (Recommended)

1. **Get a Slack Bot Token**
   - Go to https://api.slack.com/apps
   - Click "Create New App" → "From scratch"
   - Name it (e.g., "User Fetcher") and select your workspace
   - Go to "OAuth & Permissions" in the sidebar
   - Scroll to "Scopes" → "Bot Token Scopes"
   - Add these scopes:
     - `users:read`
     - `users:read.email`
   - Scroll up and click "Install to Workspace"
   - Copy the "Bot User OAuth Token" (starts with `xoxb-`)

2. **Run the fetch script**
   ```bash
   # Set your token and run the script
   SLACK_BOT_TOKEN=xoxb-your-token-here npm run fetch-slack-users
   ```

   Or on Windows (CMD):
   ```cmd
   set SLACK_BOT_TOKEN=xoxb-your-token-here
   npm run fetch-slack-users
   ```

   Or on Windows (PowerShell):
   ```powershell
   $env:SLACK_BOT_TOKEN="xoxb-your-token-here"
   npm run fetch-slack-users
   ```

3. **Done!** The script will create/update `slack-users.json` with your team members

### Option 2: Manual Setup

If you prefer to manually create the user list, edit `slack-users.json`:

```json
{
  "users": [
    {
      "id": "U01234567",
      "name": "John Doe",
      "username": "johndoe",
      "email": "john.doe@company.com",
      "role": "Product Designer"
    }
  ],
  "teams": {
    "design": ["U01234567"],
    "product": [],
    "engineering": []
  }
}
```

**How to get Slack User IDs manually:**
- In Slack, click on a user's profile
- Click "More" (three dots)
- Click "Copy member ID"

## How to Use in the Plugin

1. **Open the plugin** in Figma
2. In the "Acknowledged by" or "CC" field, start typing:
   - User's name: "John"
   - Username: "johndoe"
   - Email: "john@"
3. A dropdown will appear with matching users
4. Use your mouse to click a user, or:
   - ↓/↑ arrow keys to navigate
   - Enter to select
   - Escape to close
5. The selected user will be added as a tag

## Customization

### Update User Roles
Edit `slack-users.json` and change the `role` field for any user:
```json
{
  "id": "U01234567",
  "name": "John Doe",
  "username": "johndoe",
  "email": "john.doe@company.com",
  "role": "Senior Product Designer"  ← Change this
}
```

### Organize by Teams
Add user IDs to team groups in `slack-users.json`:
```json
{
  "teams": {
    "design": ["U01234567", "U01234568"],
    "product": ["U01234569"],
    "engineering": ["U01234570", "U01234571"]
  }
}
```

### Remove Users
Simply delete unwanted users from the `users` array in `slack-users.json`.

## Troubleshooting

### Autocomplete not showing?
- Make sure `slack-users.json` exists in the plugin root directory
- Check browser console for errors (might indicate malformed JSON)
- Verify the plugin can access the JSON file

### No users appearing in dropdown?
- Open `slack-users.json` and verify it has users in the `users` array
- Try re-running the fetch script if you used Option 1

### Fetch script errors?

**"invalid_auth" or "not_authed"**
- Check your token is correct and starts with `xoxb-`
- Verify the app is installed to your workspace
- Try regenerating the token

**"missing_scope"**
- Add the required scopes: `users:read` and `users:read.email`
- Reinstall the app to your workspace

## Tips

- Re-run the fetch script monthly to keep user data up-to-date
- You can manually add/remove users even after fetching
- The plugin works offline once the JSON file is loaded
- Usernames are stored without the @ symbol (the plugin adds it automatically)

## Support

If you encounter issues:
1. Check the browser console for errors
2. Verify your `slack-users.json` is valid JSON
3. Try the manual setup option to test the feature
