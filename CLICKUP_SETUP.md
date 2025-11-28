# 🔗 ClickUp Integration - User Guide

The plugin includes built-in ClickUp integration to link your design commits with project tasks. **No configuration or deployment needed** - just connect your account and start using it!

---

## ✨ What You Get

### Automatic Task Linking
- Every commit requires a ClickUp task (ensures accountability)
- Task name becomes your commit title
- Direct link to task in Slack message

### Auto-Update on Post
When you post to Slack, the plugin automatically updates your ClickUp task with:
- ✅ **Design Link** - Your Figma file URL
- ✅ **Delivery Date** - Timestamp of when you posted
- ✅ **Custom Fields** - Any configured custom fields
- ✅ **Task Status** - (Optional) Update task status to "completed" or other

### Smart Task Filtering
- Only shows tasks with **"in progress"** status
- Search tasks by name
- Filter by workspace/folder/list

---

## 🚀 Quick Setup (30 seconds)

### Step 1: Connect Your ClickUp Account

1. Open the plugin in Figma
2. Click the **⚙️ Settings** tab
3. Scroll to the **ClickUp Integration** section
4. Click **"Connect ClickUp"**
5. A browser window will open asking you to authorize the app
6. Click **"Connect Workspace"** in ClickUp
7. The window will close automatically, and you're connected! ✅

**That's it!** No API keys, no Vercel, no configuration needed.

### Step 2: Select Your Workspace & Folders

After connecting:
1. The plugin will fetch your ClickUp workspaces
2. Select the workspace you want to use
3. (Optional) Select specific folders/lists to filter tasks
4. Your tasks will now appear in the dropdown!

---

## 📋 How to Use

### Linking a Task to a Commit

1. Open the plugin
2. In the **"ClickUp Task"** dropdown, you'll see your "in progress" tasks
3. Use the search box to find a specific task by name
4. Select the task you're working on
5. The task name will auto-fill the commit title
6. Fill in the rest of the form (Figma link, description, etc.)
7. Click **"Post to Slack"**

### What Happens Automatically

When you post to Slack with a linked task:

✅ **Slack Message** includes:
- Task name in the title
- Direct link to the ClickUp task
- Figma link
- Your description

✅ **ClickUp Task** updates with:
- Design Link (your Figma URL)
- Delivery Date (current timestamp)
- Any configured custom fields

---

## 🔍 Features Explained

### Task Search
Type in the search box to filter tasks by name. Useful when you have many tasks!

### Status Filtering
By default, only "in progress" tasks are shown. This keeps your dropdown clean and relevant.

### Auto-Population
Once you select a task, the commit title automatically fills with the task name. You can edit it if needed.

### Custom Fields
If your ClickUp workspace has custom fields like "Design Link" or "Delivery Date", the plugin will automatically populate them. No extra setup required!

---

## 🔄 Reconnecting Your Account

Your ClickUp connection is stored securely in Figma's encrypted storage. If you ever need to reconnect:

1. Go to Settings → ClickUp Integration
2. Click **"Disconnect ClickUp"** (if already connected)
3. Click **"Connect ClickUp"** again
4. Authorize in the browser
5. Done!

---

## ❓ Troubleshooting

### "No tasks found"
- Make sure you have tasks with "in progress" status in your ClickUp workspace
- Check that you've selected the correct workspace/folder
- Try refreshing the tasks by reopening the plugin

### "Failed to connect ClickUp"
- Make sure you clicked "Connect Workspace" in the authorization window
- Try disconnecting and reconnecting
- Check your internet connection

### "Task not updating in ClickUp"
- Verify you have write permissions for the task
- Check that the task still exists and isn't archived
- Try re-linking the task

### "Authorization window didn't close"
- Close it manually - the connection should still work
- Reload the plugin to verify the connection

---

## 🔒 Security & Privacy

### How Your Data is Protected

- ✅ **Encrypted Storage**: Your ClickUp access token is stored in Figma's encrypted clientStorage (not on any server)
- ✅ **OAuth 2.0**: Industry-standard secure authentication
- ✅ **No Tracking**: The plugin doesn't track or store your activity
- ✅ **Minimal Scopes**: Only requests read access to tasks and workspaces

### What the Plugin Can Access

The plugin only requests these ClickUp permissions:
- **Read tasks** - To show your tasks in the dropdown
- **Read workspaces** - To let you select your workspace
- **Read lists** - To filter by folder/list

The plugin **cannot**:
- ❌ Delete or archive tasks
- ❌ Access other users' data
- ❌ Modify task assignments
- ❌ Access billing information

---

## 🎯 Pro Tips

### 1. Set Up Custom Fields in ClickUp
Create custom fields in your ClickUp workspace for:
- **Design Link** (URL type) - Auto-populated with Figma link
- **Delivery Date** (Date type) - Auto-populated with posting timestamp
- **Status** (Dropdown) - Can be auto-updated on commit

### 2. Use Consistent Task Naming
Name your tasks clearly so they make sense in Slack messages:
- ✅ "Homepage Hero Section Redesign"
- ❌ "Task 123"

### 3. Keep Tasks "In Progress"
Move tasks to "in progress" when you start working on them so they appear in the plugin.

### 4. Link Early, Post Often
Link the task at the start of your work, then post updates as you progress.

---

## 🛠️ For Developers

Want to self-host or contribute to the ClickUp integration? See [CONTRIBUTING.md](./CONTRIBUTING.md) for:
- OAuth app setup
- Local development with ClickUp API
- Backend architecture
- How to extend the integration

---

## 📞 Need Help?

- 🐛 [Report Issues](https://github.com/alfianimanuddin-design/figma-updates-to-slack-plugin/issues)
- 💡 [Request Features](https://github.com/alfianimanuddin-design/figma-updates-to-slack-plugin/issues/new)
- 📖 [Back to Main README](./README.md)

---

**Enjoy seamless ClickUp + Figma + Slack integration!** 🎉
