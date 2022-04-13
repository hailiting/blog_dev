# 配置 github 多账号配置

## 取消 git 全局设置

```
git config --global --unset user.name
git config --global --unset user.email
```

## 1. 不同账号生成不同密钥

```
ssh-keygen -t rsa -f github_do -C "github_do@163.com"
ssh-keygen -t rsa -f github2 -C "xxx@163.com"
```

ssh-keygen -t rsa -f hailiting -C "hailiting@yeah.net"  
ssh-keygen -t rsa -f github_do -C "github_do@163.com"
githubDo111

## 2. 生成公钥添加到 github 上，设置 ssh-key, new ssh

## 3. 编辑`~/.ssh/config`文件

```
# 默认
Host *
   UseKeychain yes
   AddKeysToAgent yes
   IdentityFile ~/.ssh/id_rsa
   IdentityFile ~/.ssh/github_rsa
```

```
# 其中Host是主机别名，HostName是github服务器地址，User是GitHub服务器用户名
# IdentityFile是和GitHub服务器通信的ssh私钥，通过IdentityFile就可以区分
# 不同的账号
Host github
   HostName github.com
   User git
   UseKeychain yes
   AddKeysToAgent yes
   IdentityFile ~/.ssh/hailiting
Host github
   HostName github.com
   User git
   UseKeychain yes
   AddKeysToAgent yes
   IdentityFile ~/.ssh/github_do
```

## 4. ssh-add 管理

```
# 使用 -K 可以将私钥添加到钥匙串，不用每次开机后还要再次输入这次命令了
ssh-add -K ~/.ssh/hailiting
ssh-add -K ~/.ssh/github_do

# 可以在添加前使用下面命令删除所有的key
ssh-add -D

# 最后可以通过下面命令，查看key的设置
ssh-add -l
```

## 5. git remote set-url origin account1:github 账号/xxx.git

git clone git@github.com:ADAOTOP/adao_ui.git --origin github_do

git remote set-url origin github_do git@github.com:ADAOTOP/adao_ui.git
