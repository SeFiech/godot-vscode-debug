import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('godot.generateVSCodeDebugSettings', async () => {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        
        if (!workspaceFolder) {
            vscode.window.showErrorMessage('Kein Workspace-Ordner geöffnet.');
            return;
        }

        await createVSCodeFolder(workspaceFolder.uri.fsPath);
    });

    context.subscriptions.push(disposable);
}

async function createVSCodeFolder(workspacePath: string) {
    const vscodePath = path.join(workspacePath, '.vscode');
    
    // Erstelle .vscode Ordner falls nicht vorhanden
    if (!fs.existsSync(vscodePath)) {
        fs.mkdirSync(vscodePath);
    }

    const tasksPath = path.join(vscodePath, 'tasks.json');
    const launchPath = path.join(vscodePath, 'launch.json');

    // Inhalte der Konfigurationsdateien
    const tasksContent = {
        "version": "2.0.0",
        "tasks": [
            {
                "label": "build",
                "type": "dotnet",
                "task": "build",
                "group": "build",
                "problemMatcher": ["$msCompile"]
            }
        ]
    };

    const launchContent = {
        "version": "0.2.0",
        "configurations": [
            {
                "name": "Debug Game",
                "type": "coreclr",
                "request": "launch",
                "preLaunchTask": "build",
                "program": "${env:GODOT4}",
                "args": [],
                "cwd": "${workspaceFolder}",
                "stopAtEntry": false,
                "console": "internalConsole"
            },
            {
                "name": "Debug Current Scene",
                "type": "coreclr",
                "request": "launch",
                "preLaunchTask": "build",
                "program": "${env:GODOT4}",
                "args": [
                    "${fileDirname}/${fileBasenameNoExtension}.tscn"
                ],
                "cwd": "${workspaceFolder}",
                "stopAtEntry": false,
                "console": "internalConsole"
            }
        ]
    };

    try {
        // Überprüfe und schreibe tasks.json
        if (fs.existsSync(tasksPath)) {
            const overwrite = await vscode.window.showQuickPick(['Ja', 'Nein'], {
                placeHolder: 'tasks.json existiert bereits. Überschreiben?'
            });
            if (overwrite === 'Ja') {
                fs.writeFileSync(tasksPath, JSON.stringify(tasksContent, null, 4));
            }
        } else {
            fs.writeFileSync(tasksPath, JSON.stringify(tasksContent, null, 4));
        }

        // Überprüfe und schreibe launch.json
        if (fs.existsSync(launchPath)) {
            const overwrite = await vscode.window.showQuickPick(['Ja', 'Nein'], {
                placeHolder: 'launch.json existiert bereits. Überschreiben?'
            });
            if (overwrite === 'Ja') {
                fs.writeFileSync(launchPath, JSON.stringify(launchContent, null, 4));
            }
        } else {
            fs.writeFileSync(launchPath, JSON.stringify(launchContent, null, 4));
        }

        vscode.window.showInformationMessage('VSCode Debug-Einstellungen für Godot wurden erstellt!');
    } catch (error) {
        vscode.window.showErrorMessage('Fehler beim Erstellen der Konfigurationsdateien: ' + error);
    }
}

export function deactivate() {}