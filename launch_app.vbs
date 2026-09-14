Option Explicit
Dim objShell, objHttp, isRunning, pyExe, fso, appDir

Set objShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
appDir = fso.GetParentFolderName(WScript.ScriptFullName)
objShell.CurrentDirectory = appDir

' Detect python
pyExe = ""
If fso.FileExists("C:\msys64\ucrt64\bin\python.exe") Then
    pyExe = "C:\msys64\ucrt64\bin\python.exe"
Else
    On Error Resume Next
    objShell.Run "python -V", 0, True
    If Err.Number = 0 Then pyExe = "python"
    On Error GoTo 0
End If

If pyExe = "" Then
    ' Neu may nguoi khac khong co python, mo thang index.html
    objShell.Run "index.html"
    WScript.Quit
End If

' Kiem tra server cong 8080 co san sang khong
isRunning = False
On Error Resume Next
Set objHttp = CreateObject("MSXML2.ServerXMLHTTP.6.0")
objHttp.setTimeouts 300, 300, 300, 300
objHttp.Open "GET", "http://localhost:8080/index.html", False
objHttp.Send
If Err.Number = 0 Then isRunning = True
On Error GoTo 0

If Not isRunning Then
    objShell.Run "cmd /c """"" & pyExe & """ -m http.server 8080""", 0, False
    WScript.Sleep 800
End If

objShell.Run "http://localhost:8080/index.html"