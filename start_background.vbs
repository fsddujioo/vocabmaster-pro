Option Explicit
Dim shell, fso, appDir, nodeExe, req, ready
Set shell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
appDir = fso.GetParentFolderName(WScript.ScriptFullName)
shell.CurrentDirectory = appDir
ready = False
On Error Resume Next
Set req = CreateObject("MSXML2.ServerXMLHTTP.6.0")
req.setTimeouts 500, 500, 500, 500
req.Open "GET", "http://localhost:8080/api/health", False
req.Send
If Err.Number = 0 Then
  If req.Status = 200 And InStr(req.responseText, "VocabMaster Pro") > 0 Then ready = True
End If
Err.Clear
On Error GoTo 0
If Not ready Then
  nodeExe = shell.ExpandEnvironmentStrings("%ProgramFiles%\nodejs\node.exe")
  If Not fso.FileExists(nodeExe) Then nodeExe = "node"
  shell.Run Chr(34) & nodeExe & Chr(34) & " " & Chr(34) & appDir & "\server.cjs" & Chr(34), 0, False
End If
