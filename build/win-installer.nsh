; NSIS 自定义安装脚本
; 火爆短剧 Windows 安装器自定义

!macro customInstall
  ; 创建桌面快捷方式
  CreateShortCut "$DESKTOP\火爆短剧.lnk" "$INSTDIR\火爆短剧.exe"
  
  ; 添加右键菜单
  WriteRegStr HKCR "*\shell\HuobaoDrama" "" "用火爆短剧打开"
  WriteRegStr HKCR "*\shell\HuobaoDrama\command" "" '"$INSTDIR\火爆短剧.exe" "%1"'
!macroend

!macro customUnInstall
  ; 清理注册表
  DeleteRegKey HKCR "*\shell\HuobaoDrama"
!macroend
