import * as code from 'vscode';
import * as path from 'path';
import {spawn} from 'child_process';
import { lstat } from 'fs/promises';

type AppEntry = { alias: string; path: string };

export async function openFileWith(uri:code.Uri): Promise<void> {
    let configuration = code.workspace.getConfiguration("tdr-open-file-with");
    let tdrOpenFileWithConfig = configuration.get<Record<string,AppEntry[]>>("configuration") ?? {};
    const targetFilePath = uri?.fsPath;
    if(!targetFilePath){code.window.showErrorMessage("[WARNING] No file was selected"); return };
    let extensionType = path.extname(targetFilePath);
    let apps = tdrOpenFileWithConfig[extensionType];
    const items = apps.map(a => typeof a === "string" ? {label:path.basename(a),app:a}:{label: a.alias,app:a.path});
    const selectedApp = await code.window.showQuickPick(items,{placeHolder:`Open .${extensionType} with ....`}) || {label:"",app:""};
    if(selectedApp.app === ''){
        return;
    }else if(await !(await lstat(selectedApp.app)).isFile()){
        code.window.showErrorMessage(`[!ERROR] Configured app for "${extensionType}" files does not exist: \n"${selectedApp.app}"`);
        return;
    }else if(selectedApp.app.includes("python.exe")){
        const psCommand = `& "${selectedApp.app}" -m pyenv "${targetFilePath}"`;
        const workspace = code.workspace.workspaceFolders?.at(0)?.uri.fsPath.toString() ?? path.dirname(targetFilePath);
        let proc = spawn("cmd.exe",["/c","start","powershell.exe","-NoExit","-WorkingDirectory",`${workspace}`,"-Command",psCommand],{windowsHide:false});
        proc.unref();
    }else if(selectedApp.app.includes("cmd.exe")){
        const cmdCommand = `${targetFilePath}`;
        const workspace = code.workspace.workspaceFolders?.at(0)?.uri.fsPath.toString();
        let proc = spawn("cmd.exe",["/c","start","",`/D${workspace ?? path.dirname(targetFilePath)}`,selectedApp.app,"/k",cmdCommand],{windowsHide:false,cwd:workspace ?? path.dirname(targetFilePath)});
        proc.unref();
    }else{
        let proc = spawn("powershell.exe",["&",selectedApp.app,targetFilePath]);
        proc.unref();
    }
}