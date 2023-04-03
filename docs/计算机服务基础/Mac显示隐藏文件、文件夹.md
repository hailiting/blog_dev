# Mac 显示隐藏文件、文件夹
`Command + Shift + . `
```
// 显示
defaults write com.apple.finder AppleShowAllFiles TRUE
killall Finder



// 隐藏
defaults write com.apple.finder AppleShowAllFiles FALSE
killall Finder
```
