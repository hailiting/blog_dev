# git stash

Git stash 是一个非常有用的命令，它允许你临时保存（暂存）当前工作目录的修改，以便你可以切换到其他分支或任务，之后再回来继续之前的工作。

## 基本概念

Stash 可以理解为 Git 的"临时存储区"，它能够：
1. 保存当前工作目录的修改
2. 将工作目录恢复到干净的状态
3. 在需要时重新应用这些修改

## 常用命令

### 1. 基本 stash
```bash
git stash
```
保存当前工作目录的修改，并将工作目录恢复到干净状态。

### 2. 带描述的 stash
```bash
git stash save "描述信息"
```
保存修改并添加描述信息，方便后续识别。

### 3. 查看 stash 列表
```bash
git stash list
```
显示所有保存的 stash 记录。

### 4. 应用 stash
```bash
git stash apply    # 应用最近的 stash，保留 stash 记录
git stash pop      # 应用最近的 stash，并删除该 stash 记录
git stash apply stash@{n}  # 应用指定的 stash
```

### 5. 删除 stash
```bash
git stash drop stash@{n}  # 删除指定的 stash
git stash clear          # 删除所有 stash
```

## 使用场景

1. **临时切换分支**：当你在当前分支有未完成的修改，但需要切换到其他分支时
2. **紧急修复**：需要立即处理其他任务，但当前工作还未完成
3. **保存实验性代码**：不确定某些修改是否要提交，先暂存起来
4. **清理工作目录**：需要临时清理工作目录，但不想提交未完成的修改

## 最佳实践

1. **添加描述信息**：使用 `git stash save "描述"` 添加有意义的描述
2. **及时清理**：定期清理不需要的 stash 记录
3. **谨慎使用 pop**：`git stash pop` 会删除 stash 记录，如果不确定，建议使用 `apply`
4. **查看 stash 内容**：应用 stash 前先查看内容，避免冲突

## 高级用法

### 1. 暂存特定文件
```bash
git stash push -m "描述" file1 file2
```
只暂存指定的文件。

### 2. 包含未跟踪的文件
```bash
git stash -u
```
暂存包括未跟踪文件在内的所有修改。

### 3. 查看 stash 内容
```bash
git stash show stash@{n}  # 查看简略信息
git stash show -p stash@{n}  # 查看详细差异
```

## 注意事项

1. Stash 是本地操作，不会推送到远程仓库
2. 如果 stash 的修改与当前工作目录有冲突，需要手动解决
3. 建议定期清理不需要的 stash 记录
4. 重要的修改最好及时提交，不要过度依赖 stash

## 常见问题解决

### 1. 恢复误删的 stash
```bash
git fsck --unreachable | grep commit | cut -d ' ' -f3 | xargs git show
```
可以查看所有未引用的提交，找到误删的 stash。

### 2. 解决冲突
当应用 stash 时遇到冲突：
1. 解决冲突文件
2. 使用 `git add` 添加修改
3. 使用 `git stash drop` 删除已应用的 stash

## 总结

Git stash 是一个强大的工具，可以帮助我们临时保存工作进度，灵活切换任务。正确使用 stash 可以提高工作效率，但要注意及时清理和谨慎操作。 