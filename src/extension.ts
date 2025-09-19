import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export function activate(context: vscode.ExtensionContext) {
    console.log('IPSW Plist Decoder extension is now active');

    let disposable = vscode.commands.registerCommand('ipsw-plist-decoder.decodePlist', async (uri?: vscode.Uri) => {
        try {
            // Get the file URI - either from context menu or active editor
            let targetUri: vscode.Uri;
            
            if (uri) {
                targetUri = uri;
            } else {
                const activeEditor = vscode.window.activeTextEditor;
                if (!activeEditor) {
                    vscode.window.showErrorMessage('No plist file selected');
                    return;
                }
                targetUri = activeEditor.document.uri;
            }

            // Check if file exists and has .plist extension
            if (!targetUri.fsPath.endsWith('.plist')) {
                vscode.window.showErrorMessage('Selected file is not a .plist file');
                return;
            }

            if (!fs.existsSync(targetUri.fsPath)) {
                vscode.window.showErrorMessage('File does not exist');
                return;
            }

            await decodePlistFile(targetUri.fsPath);
            
        } catch (error) {
            vscode.window.showErrorMessage(`Error decoding plist: ${error}`);
        }
    });

    context.subscriptions.push(disposable);
}

async function decodePlistFile(filePath: string): Promise<void> {
    const config = vscode.workspace.getConfiguration('ipsw-plist-decoder');
    const ipswPath = config.get<string>('ipswPath') || 'ipsw';
    
    const outputPath = `${filePath}_decode.json`;
    
    try {
        // Show progress indicator
        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Decoding plist file...",
            cancellable: false
        }, async (progress) => {
            progress.report({ increment: 0, message: "Running ipsw decode..." });
            
            // Execute ipsw command to decode plist
            const command = `"${ipswPath}" plist "${filePath}"`;
            console.log(`Executing command: ${command}`);
            
            const { stdout, stderr } = await execAsync(command);
            
            if (stderr && !stderr.includes('INFO') && !stderr.includes('WARN')) {
                throw new Error(`IPSW stderr: ${stderr}`);
            }
            
            progress.report({ increment: 50, message: "Writing decoded output..." });
            
            // Write the decoded output to file
            fs.writeFileSync(outputPath, stdout, 'utf8');
            
            progress.report({ increment: 100, message: "Complete!" });
        });

        // Show success message with option to open the decoded file
        const openFile = await vscode.window.showInformationMessage(
            `Plist decoded successfully to ${path.basename(outputPath)}`,
            'Open Decoded File'
        );

        if (openFile) {
            const document = await vscode.workspace.openTextDocument(outputPath);
            await vscode.window.showTextDocument(document);
        }

    } catch (error: any) {
        console.error('Error decoding plist:', error);
        
        let errorMessage = 'Unknown error occurred';
        if (error.code === 'ENOENT') {
            errorMessage = `IPSW tool not found. Please ensure 'ipsw' is installed and accessible at: ${ipswPath}`;
        } else if (error.message) {
            errorMessage = error.message;
        }
        
        vscode.window.showErrorMessage(`Failed to decode plist: ${errorMessage}`);
    }
}

export function deactivate() {}