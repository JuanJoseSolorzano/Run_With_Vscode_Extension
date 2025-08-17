//
import * as vscode from 'vscode';
import {spawn} from 'child_process';
import * as path from 'path';

export function activate(context:vscode.ExtensionContext){
    const disposable = vscode.commands.registerCommand('run-with.openWith', async (resource?:vscode.Uri)=>{
        const CONFIGURATION = vscode.workspace.getConfiguration("run-with");
        const cfg = CONFIGURATION.get<Record<string,any[]>>("Main_Configuration") ?? {}; // Gets the entire app configuration or return an empty dictionary.
        const EXEC_EXT = CONFIGURATION.get<string[]>("Exec_Extensions") || ["exe","cmd","ps1","bat"];
        const uri_file = resource ?? vscode.window.activeTextEditor?.document.uri; // Parse the obtained configuration into a ts dictionary.
        if(!uri_file){ vscode.window.showErrorMessage("No file was selected."); return; } // Uri file not found, show error message.
        // Gets the file root path
        const filePath = uri_file.fsPath;
        const extensionName = path.extname(filePath).replace('.','').toLowerCase();
        const apps = cfg[extensionName];
        let baseName = path.basename(filePath);
        if(!apps || apps.length == 0){ // No cfg found.
            vscode.window.showErrorMessage(`No apps configured for .${extensionName} -> ${baseName}`); 
            return; 
        } 
        // Wait for the user selection in the command palet.
        const items = apps.map(a => typeof a === "string" ? {label:path.basename(a),app:a}:{label: a.alias,app:a.cmd});
        const app = await vscode.window.showQuickPick(items,{placeHolder:`Open .${extensionName} with ....`});
        // Launching via command prompt.
        if(!app){return;} // No user selection event.
        // Looking for an executable file:
        vscode.window.showInformationMessage(`Opening: ${baseName} file ...`);
        if(EXEC_EXT.includes(extensionName)){
            const args = ["/c","start",'""',"powershell.exe","-ExecutionPolicy", "Bypass","-File",filePath];
            let ps = spawn("cmd.exe",args,{detached: true,stdio: "ignore",windowsHide: false});
            ps.unref();
            return;
        }
        try{// Run cmd to open the selected file.
            spawn("cmd.exe", ["/c", "start", '""', app.app, filePath], { detached: true, stdio: "ignore" }).unref();
        } catch {
           vscode.window.showErrorMessage("Fatal error !!!!");
        }
    });
    context.subscriptions.push(disposable);
}

export function deactivate(){

}