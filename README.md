# IPSW Plist Decoder for VS Code

A Visual Studio Code extension that integrates the `ipsw` tool for decoding iOS property list (plist) files. This extension is designed for mobile penetration testers, security researchers, and iOS developers who need to quickly analyze and decode plist files.

## Features

- **One-click plist decoding**: Right-click any `.plist` file to decode it instantly
- **Automatic output generation**: Creates decoded files with `.plist.decode` extension
- **Context menu integration**: Available directly from explorer and editor context menus
- **Progress indication**: Visual feedback during the decoding process
- **Error handling**: Clear error messages for common issues
- **Configurable**: Customize the path to your `ipsw` executable

## Prerequisites

Before using this extension, you need to have the `ipsw` tool installed on your system.

### Installing IPSW

#### macOS (using Homebrew)
```bash
brew install blacktop/tap/ipsw
```

#### Windows (using Scoop)
```bash
scoop bucket add blacktop https://github.com/blacktop/scoop-bucket.git 
scoop install blacktop/ipsw
```

Other see [ipsw](https://github.com/blacktop/ipsw)

## Installation

### From VSIX File
1. Download the latest `.vsix` file from releases
2. Open VS Code
3. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
4. Type "Extensions: Install from VSIX"
5. Select the downloaded `.vsix` file

### From Source
1. Clone this repository
2. Run `npm install`
3. Run `npm run compile`
4. Press `F5` to run in development mode

## Usage

### Method 1: Context Menu
1. Right-click on any `.plist` file in the Explorer or Editor
2. Select "Decode Plist with IPSW"
3. The decoded file will be created as `filename.plist.decode`

### Method 2: Command Palette
1. Open a `.plist` file in the editor
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
3. Type "IPSW: Decode Plist with IPSW"
4. Press Enter

## Configuration

You can configure the extension through VS Code settings:

```json
{
    "ipsw-plist-decoder.ipswPath": "/path/to/your/ipsw"
}
```

### Available Settings

| Setting | Description | Default |
|---------|-------------|---------|
| `ipsw-plist-decoder.ipswPath` | Path to the ipsw executable | `ipsw` |

## Use Cases

This extension is particularly useful for:

- **iOS Penetration Testing**: Analyzing configuration files from iOS applications and firmware
- **Malware Analysis**: Examining plist files from suspicious iOS applications
- **Reverse Engineering**: Understanding iOS app structures and configurations
- **Security Research**: Investigating iOS system files and application bundles
- **Forensics**: Analyzing extracted iOS device data


## File Types Supported

- `.plist` files (Property List files)
- Binary plist files
- XML plist files

## Output Format

The extension creates decoded files with the following naming convention:
- Original file: `Info.plist`
- Decoded file: `Info.plist_decode.json`

The decoded output is in human-readable JSON format, depending on the `ipsw` tool's output.


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup
1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm run compile` to compile TypeScript
4. Press `F5` to run the extension in a new Extension Development Host window

### Building
```bash
npm run compile          # Compile TypeScript
npm run watch           # Watch for changes
vsce package           # Create .vsix package
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

### 0.0.1 (Initial Release)
- Basic plist decoding functionality
- Context menu integration
- Progress indication
- Error handling
- Configurable ipsw path

## Related Tools

- [ipsw](https://github.com/blacktop/ipsw) - iOS/macOS Research Swiss Army Knife
- [3uTools](https://www.3u.com/) - iOS file management tool
- [iMazing](https://imazing.com/) - iOS device management software

## Support

If you encounter any issues or have feature requests, please [open an issue](https://github.com/dado1513/ipsw-plist-decoder/issues) on GitHub.
