# git 清楚所有历史记录

1. 进入仓库，拉一个分支比如名为 `latest_branch`

```sh
# -orphan 创建一个无任何历史记录的孤儿分支
git checkout --orphan latest_branch
```

2. 添加所有文件到上述分支并提交一次

```sh
git add -A
git commit -am "initial commit"
```

3. 删除 master 分支

```sh
git branch -D master
```

4. 更改当前分支为 master 分支

```sh
git branch -m master
```

5. 将本地所有更改 push 到远程仓库

```sh
git push -f origin master
```

6. 关联本地 master 到远程 master

```sh
git branch --set-upstream-to=origin/master
```

7. 删除所有 tag

```sh
 git tag -l | xargs git tag -d
```
