# Godot VSCode Debug

Automatically generates the necessary VSCode debug configurations for Godot projects.

## Features

- Creates `.vscode` folder if it doesn't exist
- Generates pre-configured `launch.json` and `tasks.json`
- Supports debugging configurations for Godot projects
- Provides debugging for both entire game and individual scenes
- Asks for confirmation before overwriting existing configuration files

## Prerequisites

- Visual Studio Code 1.60.0 or higher
- Godot 4.x
- .NET SDK

## Installation

### From VSIX
1. Download the `.vsix` file from the latest release at https://github.com/SeFiech/godot-vscode-debug/releases
2. In VSCode, go to Extensions (Ctrl+Shift+X)
3. Click on the ... (More Actions) button at the top
4. Select "Install from VSIX..."
5. Choose the downloaded `.vsix` file
6. After installation, set up the extension:
  * Set the `GODOT4` environment variable to point to your Godot executable:
    - Windows (PowerShell):
      ```powershell
      [Environment]::SetEnvironmentVariable("GODOT4", "C:\Path\To\Godot\Godot.exe", "User")
      ```
    - Windows (Command Prompt):
      ```cmd
      setx GODOT4 "C:\Path\To\Godot\Godot.exe"
      ```
    - Linux/macOS:
      ```bash
      echo 'export GODOT4=/path/to/godot' >> ~/.bashrc
      source ~/.bashrc
      ```
  * Open your Godot project in VSCode 
  * Press `Ctrl+Shift+P` to open the Command Palette 
  * Type and select "Godot: Generate VSCode Debug Settings"

### From Command Line
```bash
code --install-extension godot-vscode-debug-0.0.1.vsix
```

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request at https://github.com/SeFiech/godot-vscode-debug.
