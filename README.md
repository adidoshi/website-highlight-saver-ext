# Website Highlight Saver - Chrome Extension Setup

## Building the Extension

1. Install dependencies:

   ```bash
   npm install
   ```

2. Build the extension:
   ```bash
   npm run build
   ```

## Loading the Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`

2. Enable "Developer mode" by toggling the switch in the top right corner

3. Click "Load unpacked"

4. Select the `dist` folder from this project

5. The extension should now appear in your extensions list

## Using the Extension

### Saving Highlights

1. Visit any webpage
2. Select text you want to highlight
3. A popup will appear asking "Save Highlight?"
4. Click the popup to save the highlight

### Viewing Highlights

1. Click the extension icon in your Chrome toolbar
2. A popup will open showing all your saved highlights
3. Each highlight shows:
   - The highlighted text
   - The page title and URL
   - The date and time it was saved

### Deleting Highlights

- Click the trash icon on any highlight card to remove it

### AI Summaries

1. Click the settings icon in the extension popup
2. Enter your OpenAI API key
3. Click "Summarize with AI" on any highlight to get a quick summary

## Notes

- All highlights are stored locally in your browser
- Your OpenAI API key (if provided) is also stored locally
- The extension works on all websites
- Highlights are organized with the most recent first

## Screen Record Video

[![Watch Demo](./src/assets/video_preview.png)](https://jumpshare.com/s/8dXvE8POrPmgwOeCww3I)
