# debugger

### 通过inspect
`node inspect xxx.js`

Command reference#
Stepping#
  cont, c: Continue execution
  next, n: Step next
  step, s: Step in
  out, o: Step out
  pause: Pause running code (like pause button in Developer Tools)


- 通过chrome://inspect来debug

在这个页面下找一下对应的进程即可。


- 通过vscode: attach某个进程(需要手动启动debugger进程)

- 通过vscode：launch某个进程


> 我看到vscode - launch.json中还有vscode - extension的调试工具