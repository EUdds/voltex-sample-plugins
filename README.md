# Voltex Sample Plugins

Official sample plugin registry for the [Voltex](https://github.com/EUdds/voltex) waveform viewer.

## Installing in Voltex

1. Open the **Plugin Manager** sidebar
2. Switch to the **Browse** tab
3. Click **Add Registry** and enter:
   ```
   https://github.com/EUdds/voltex-sample-plugins
   ```
4. Browse and install plugins with one click

## Included Plugins

### Notepad
A simple notepad sidebar for jotting notes while analysing signals. Notes are saved locally in your browser.

## Creating Your Own Registry

See the [Voltex plugin documentation](https://github.com/EUdds/voltex) for how to create and publish your own registry.

Your `voltex-registry.json` must follow this format:

```json
{
    "name": "My Plugin Registry",
    "description": "...",
    "plugins": [
        {
            "name": "@scope/plugin-name",
            "displayName": "Plugin Name",
            "version": "1.0.0",
            "description": "...",
            "author": "...",
            "main": "plugins/my-plugin/index.js"
        }
    ]
}
```

The `main` field is a path relative to the repo root. The file must `export default` a plugin function.
