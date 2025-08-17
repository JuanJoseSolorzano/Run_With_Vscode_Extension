# ⚡ RUN WITH – VSCode Extension
<div align="center">

[![Last Updated](https://img.shields.io/visual-studio-marketplace/last-updated/Solorzano-JuanJose.Run-With)](https://github.com/JuanJoseSolorzano/Run_With_Vscode_Extension)
[![Version](https://img.shields.io/visual-studio-marketplace/v/Solorzano-JuanJose.Run-With)](https://marketplace.visualstudio.com/items/Solorzano-JuanJose.Run-With)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/Solorzano-JuanJose.Run-With)](https://marketplace.visualstudio.com/items?itemName=Solorzano-JuanJose.Run-With) [![Downloads](https://img.shields.io/visual-studio-marketplace/d/Solorzano-JuanJose.Run-With)](https://marketplace.visualstudio.com/items?itemName=Solorzano-JuanJose.Run-With) [![Rating Star](https://img.shields.io/visual-studio-marketplace/stars/Solorzano-JuanJose.Run-With)](https://marketplace.visualstudio.com/items?itemName=Solorzano-JuanJose.Run-With&ssr=false#review-details)


</div>

<p align="center">
  <img src="./images/icon.png" alt="Extension Icon" />
</p>

A simple and fast way to **run files with your favorite tools** directly from the VSCode context menu.
Enhance productivity in VSCode with a customizable 'Run With...' context menu to execute files using your preferred tools.

---

## ✨ Features

- 📂 Right-click a file → **Open File With...**
- ⚙️ Choose the tool you want to run it with.
- 🔌 Works with scripts, executables, and more.

---

## 📦 Installation

1. Open **VSCode**
2. Go to **Extensions** (`Ctrl+Shift+X`)
3. Search for **RUN WITH** or search for **JuanJose** 
4. Click **Install**

---

## 🖱️ Usage

1. Right-click any file in Explorer  
  ![Context Menu Example](./images/example02.png)  
2. Select **Open File With...**  
3. Choose your tool and run instantly ⚡
  ![Context Menu Example](./images/example03.png) 
4. You can also select the option in the editor context:
  ![Context Menu Example](./images/example01.png) 
---

## 🔧 Configuration

You can configure custom tools in your `settings.json`:
Go to settings and search for the extension name:

![Context Menu Example](./images/example04.png) 

Option: `Exec_Extensions` Here you can add the extension name of a executable file. Eg: .exe, .sh ...

Option: `Main_Configuration`: Define the programs to run a specific file. Eg: select 'Edit in settings.json and add new app:

```jsonc
"run-with.Main_Configuration": {
    "png":[{"alias":"Paint","cmd":"mspaint.exe"}],
    "html": [
        {
            "alias": "Chrome",
            "cmd": "C:/Program Files/Google/Chrome/Application/chrome.exe"
        },
        {
            "alias": "Edge",
            "cmd": "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
        }
    ],
    "ps1": [
        {
            "alias": "Run Pwsh",
            "cmd": "powershell.exe"
        }
    ]
}
```
