# ClickUp OAuth Integration Setup

This guide walks you through setting up ClickUp OAuth integration for the Figma plugin.

## Step 1: Create a ClickUp OAuth App

1. Go to [ClickUp Settings](https://app.clickup.com/settings/apps)
2. Navigate to **ClickUp API** section
3. Click on **Create an App**
4. Fill in the application details:
   - **App Name**: Figma to Slack Notifier
   - **Description**: Connect Figma designs with ClickUp tasks and Slack notifications
   - **Redirect URL(s)**:
     - For local development: `http://localhost:3000/api/clickup-callback`
     - For production: `https://figma-slack-bridge.vercel.app/api/clickup-callback`

5. After creating the app, you'll receive:
   - **Client ID**: Save this for your environment variables
   - **Client Secret**: Save this securely for your environment variables

## Step 2: Set Up Environment Variables

In your Vercel project, add these environment variables:

```bash
CLICKUP_CLIENT_ID=your_client_id_here
CLICKUP_CLIENT_SECRET=your_client_secret_here
CLICKUP_REDIRECT_URI=https://figma-slack-bridge.vercel.app/api/clickup-callback
```

For local development, create a `.env` file in `figma-slack-bridge/`:

```env
CLICKUP_CLIENT_ID=your_client_id_here
CLICKUP_CLIENT_SECRET=your_client_secret_here
CLICKUP_REDIRECT_URI=http://localhost:3000/api/clickup-callback
```

## Step 3: OAuth Flow Overview

The OAuth flow works as follows:

1. **User clicks "Connect ClickUp"** in the Figma plugin
2. **Backend generates authorization URL** with scopes
3. **User is redirected to ClickUp** to authorize the app
4. **ClickUp redirects back** with an authorization code
5. **Backend exchanges code for access token**
6. **Access token is stored** securely and sent to the plugin
7. **Plugin uses token** to fetch tasks via backend API

## Step 4: Required ClickUp API Scopes

When requesting authorization, use these scopes:

- `task:read` - Read task information
- `team:read` - Read team/workspace information
- `list:read` - Read lists

## API Endpoints Created

After setup, these endpoints will be available:

- `GET /api/clickup-authorize` - Initiate OAuth flow
- `GET /api/clickup-callback` - Handle OAuth callback
- `POST /api/clickup-tasks` - Fetch tasks from ClickUp
- `POST /api/clickup-workspaces` - Fetch user's workspaces

## Security Notes

- Never expose your Client Secret in client-side code
- Access tokens are stored in Figma's clientStorage (encrypted)
- Tokens should be refreshed before they expire
- Use HTTPS in production

## Testing the Integration

1. Deploy the backend to Vercel or run locally
2. Open the Figma plugin
3. Click "Connect ClickUp" in settings
4. Authorize the app
5. You should see your ClickUp tasks in the dropdown

## Troubleshooting

- **"Redirect URI mismatch"**: Ensure the redirect URI in your ClickUp app matches exactly
- **"Invalid client"**: Check that your Client ID and Secret are correct
- **"Insufficient scope"**: Verify you're requesting the correct scopes
- **CORS errors**: Ensure CORS headers are set correctly in backend endpoints
