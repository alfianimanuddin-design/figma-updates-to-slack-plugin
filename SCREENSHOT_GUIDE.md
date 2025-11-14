# 📸 Screenshot Guide

This guide will help you create professional screenshots for the plugin's README, documentation, and marketing materials.

---

## 📋 Required Screenshots

### 1. **Plugin Interface - Main View**
**File:** `plugin-ui.png` or `plugin-main.png`

**What to show:**
- Main plugin interface with a sample commit
- Fill in realistic example data:
  - Task Name: "Updated homepage hero section"
  - Commit Type: ✨ Feature (selected)
  - Description: A few lines of formatted text
  - Acknowledged by: 2-3 team members
  - Channel: "#design-updates" selected
- Clean, professional screenshot

**How to capture:**
1. Open Figma with a real project
2. Open the plugin
3. Fill in example data (but don't send)
4. Take screenshot (Cmd/Ctrl + Shift + 4 on Mac)
5. Crop to show just the plugin window

**Dimensions:** ~500px wide × 800px tall

---

### 2. **Slack Message Example**
**File:** `slack-message.png`

**What to show:**
- An actual Slack message posted by the plugin
- Include:
  - Commit emoji and type
  - Task name
  - File/Page info
  - Description with formatting
  - @mentions
  - Buttons ("Open in Figma", "View Page")
  - Timestamp

**How to capture:**
1. Send a real commit from the plugin
2. Open Slack
3. Find the message
4. Take screenshot showing the full message
5. Optional: Blur sensitive info if needed

**Dimensions:** ~600px wide (full Slack message width)

---

### 3. **Settings Panel**
**File:** `settings-panel.png`

**What to show:**
- Plugin settings with sections expanded
- Show:
  - Bot Token input (with fake/blurred token)
  - User fetch section with "✅ Fetched 45 users"
  - Channel configuration with 2-3 channels configured
  - All in a clean, organized view

**How to capture:**
1. Open plugin settings
2. Expand all sections
3. Make sure status messages show success
4. Take screenshot
5. **Blur your actual bot token!**

**Dimensions:** ~500px wide × 900px tall

---

### 4. **Commit Type Selection**
**File:** `commit-types.png`

**What to show:**
- The commit type selector with all 5 options
- One type selected (highlighted)
- Clear view of all emojis and labels

**How to capture:**
1. Open plugin
2. Click to show commit type selector
3. Take close-up screenshot
4. Crop tightly around the commit types

**Dimensions:** ~400px wide × 200px tall

---

### 5. **User Autocomplete**
**File:** `user-autocomplete.png`

**What to show:**
- Autocomplete dropdown showing user suggestions
- Type a few letters to trigger it
- Show 4-5 users in the dropdown
- Include profile pictures and names

**How to capture:**
1. In "Acknowledged by" field, type 2-3 letters
2. Wait for autocomplete to appear
3. Take screenshot showing dropdown
4. Crop to focus on the autocomplete

**Dimensions:** ~450px wide × 300px tall

---

## 🎨 Optional Screenshots

### 6. **Rich Text Editor**
**File:** `rich-text-editor.png`

Show the description editor with:
- Formatted text (bold, italic, lists)
- Toolbar visible
- Sample content

### 7. **Channel Selection**
**File:** `channel-selector.png`

Show dropdown with multiple channels listed.

### 8. **Success State**
**File:** `success-message.png`

Show the success message after posting to Slack.

---

## 🎥 GIF/Video Demos (Optional but Powerful)

### Demo 1: Quick Commit Flow (10 seconds)
**File:** `quick-commit.gif`

**Show:**
1. Open plugin (1s)
2. Type commit message (2s)
3. Select type (1s)
4. Select channel (1s)
5. Click commit (1s)
6. Show success + Slack notification (4s)

**Tools:**
- **Mac**: QuickTime Screen Recording → convert to GIF with [ezgif.com](https://ezgif.com)
- **Windows**: Windows + G (Game Bar) → Screen Record
- **Chrome Extension**: [Loom](https://www.loom.com/) or [Screencastify](https://www.screencastify.com/)

---

### Demo 2: First-Time Setup (30 seconds)
**File:** `first-time-setup.gif`

**Show:**
1. Open settings (2s)
2. Paste bot token (3s)
3. Fetch users (5s)
4. Configure channel (5s)
5. Make first commit (10s)
6. Show result in Slack (5s)

---

## 📐 Screenshot Best Practices

### Style Guidelines

1. **Clean Background**: Use light Figma background, no distracting elements
2. **Realistic Data**: Use realistic but generic project names
3. **Professional Names**: Use professional fake names (e.g., Jane Doe, not "test user")
4. **No Sensitive Info**: Blur tokens, emails, internal project names
5. **High Quality**: Retina/2x resolution (1000px+ wide)
6. **Consistent Style**: Same Figma theme for all screenshots

### Composition Tips

1. **Focus**: Crop tightly on the relevant UI
2. **Context**: Include just enough context to understand what's happening
3. **Whitespace**: Don't crop too tight - leave some breathing room
4. **Annotations**: Add arrows or labels if showing a specific feature

---

## 🛠️ Tools

### Screenshot Tools
- **Mac**: Cmd + Shift + 4 (select area)
- **Windows**: Windows + Shift + S (Snipping Tool)
- **Chrome Extension**: [Awesome Screenshot](https://www.awesomescreenshot.com/)

### Editing Tools
- **Figma**: Use Figma itself to annotate screenshots!
- **Canva**: Free, easy to use
- **Photoshop**: Professional editing
- **Preview (Mac)**: Built-in markup tools
- **Paint 3D (Windows)**: Built-in editing

### Blur/Redact Tools
- **Figma**: Add a blur rectangle
- **macOS Preview**: Markup → Draw rectangle → Apply blur
- **Photoshop**: Gaussian blur
- **Online**: [redacted.app](https://redacted.app/)

### GIF Creation
- **ezgif.com**: Convert video to GIF, resize, optimize
- **Giphy Capture (Mac)**: Free, easy GIF recorder
- **ScreenToGif (Windows)**: Free, powerful
- **Loom**: Record and download as GIF

---

## 📁 File Organization

Save your screenshots in this structure:

```
docs/
└── screenshots/
    ├── plugin-ui.png              # Main interface
    ├── slack-message.png          # Slack output
    ├── settings-panel.png         # Settings view
    ├── commit-types.png           # Type selector
    ├── user-autocomplete.png      # Autocomplete
    ├── rich-text-editor.png       # (Optional)
    ├── channel-selector.png       # (Optional)
    ├── success-message.png        # (Optional)
    ├── quick-commit.gif           # Demo GIF
    └── first-time-setup.gif       # Setup GIF
```

Then update README.md:
```markdown
### Plugin Interface
![Plugin Interface](./docs/screenshots/plugin-ui.png)

### Slack Message Example
![Slack Message](./docs/screenshots/slack-message.png)
```

---

## ✅ Checklist

Before publishing, make sure you have:

- [ ] **Main plugin interface** screenshot
- [ ] **Slack message example** screenshot
- [ ] **Settings panel** screenshot
- [ ] **Quick commit demo** GIF (optional but recommended)
- [ ] All screenshots are **high quality** (Retina resolution)
- [ ] All **sensitive information blurred** (tokens, real emails, etc.)
- [ ] Screenshots show **realistic, professional data**
- [ ] All images are **properly compressed** (use [TinyPNG](https://tinypng.com/))
- [ ] Screenshots are saved in `/docs/screenshots/` folder
- [ ] README.md updated with image references

---

## 💡 Pro Tips

1. **Use a clean demo workspace**: Create a fresh Figma file called "Demo Project" with clean pages
2. **Fake but realistic**: Use realistic project names like "E-commerce Redesign", not "Test File 123"
3. **Show success states**: Screenshots should show things working, not errors
4. **Consistent theme**: Use the same Figma theme (light/dark) across all screenshots
5. **Mobile responsive**: If showing on web, make sure UI looks good
6. **Add captions**: Briefly explain what each screenshot shows
7. **Before/After**: For features like Slack messages, show both the plugin and the result

---

## 📊 Image Optimization

Before committing images to GitHub:

1. **Resize**: Max width 1200px for screenshots, 800px for GIFs
2. **Compress**: Use [TinyPNG](https://tinypng.com/) or [Squoosh](https://squoosh.app/)
3. **Format**: PNG for screenshots, GIF for animations (< 5MB each)
4. **Naming**: Use descriptive kebab-case names

**Target sizes:**
- Screenshots: 100-300 KB each
- GIFs: 1-3 MB each

---

**Need help?** Feel free to create an issue if you need assistance with screenshots!

---

Made with 📸 for great documentation
