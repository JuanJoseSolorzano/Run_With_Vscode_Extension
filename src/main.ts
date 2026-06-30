import * as code from 'vscode';

// Main entry point for Vscode extensions
export function activate(context: code.ExtensionContext){
    let command = code.commands.registerCommand("tdr-open-file-with.openFileWith",async (uri:code.Uri) => {
        const { openFileWith } = await import('./open_file_with');
        openFileWith(uri);
    });
    context.subscriptions.push(command);
}

export function deactivate(){/* Do nothing */ }