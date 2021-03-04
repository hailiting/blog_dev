# linux 常用命令

## ls

- ls 当前目录内容【子目录和文件】
- dir ls 同样效果
- ls -l 以列表显示，显示文件的大小
  - 第一栏：访问权限
  - 第二栏：当前文件或目录存在数量
  - 第三、四行： 文件属于哪一个用户组和用户
  - 第五行：当前文件的大小
  - 第六行：目录创建时间
  - 最后：目录名称
- ls -a 显示当前目录的所有文件，包括隐藏文件

## cp

### 文本的复制

- cp examples.desktop aaa/examples.desktop
- cp examples.desktop aaa/ccc 【重命名，ccc 和 examples.desktop 内容一样】

### 目录的复制

- cp -R aaa ddd

## rm

- rm examples.desktop 【删除文件，不会返回啥】
- rm -r bbb 【删除目录】
