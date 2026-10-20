Option Explicit
Dim shell, fso, appDir, nodeExe, probe, ready, attempt
Set shell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
appDir = fso.GetParentFolderName(WScript.ScriptFullName)
shell.CurrentDirectory = appDir
nodeExe = shell.ExpandEnvironmentStrings("%ProgramFiles%\nodejs\node.exe")
If Not fso.FileExists(nodeExe) Then nodeExe = "node"
Function IsReady()
  Dim req
  IsReady = False
  On Error Resume Next
  Set req = CreateObject("MSXML2.ServerXMLHTTP.6.0")
  req.setTimeouts 300, 300, 300, 300
  req.Open "GET", "http://localhost:8080/api/health", False
  req.Send
  If Err.Number = 0 Then
    If req.Status = 200 And InStr(req.responseText, "VocabMaster Pro") > 0 Then IsReady = True
  End If
  Err.Clear
  On Error GoTo 0
End Function
ready = IsReady()
If Not ready Then
  On Error Resume Next
  shell.Run Chr(34) & nodeExe & Chr(34) & " " & Chr(34) & appDir & "\server.cjs" & Chr(34), 0, False
  On Error GoTo 0
  For attempt = 1 To 30
    WScript.Sleep 200
    If IsReady() Then
      ready = True
      Exit For
    End If
  Next
End If
If ready Then
  shell.Run "http://localhost:8080/index.html"
Else
  MsgBox "Cannot start VocabMaster on port 8080. Close an old server using that port and try again. Node.js must be installed.", 48, "VocabMaster Pro"
End If
