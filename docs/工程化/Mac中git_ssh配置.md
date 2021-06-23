# Mac 中 git_ssh 配置

## 一：查看是否已配置

打开 Terminal 终端

#### 1， cd ~/.ssh 进入 ssh 目录

如果没有，则说明没生成过
如果有 说明可以直接用

```
// 直接拷贝 粘贴到git网页里是ssh就好
cat id_rsa.pub
```

## 二，重新配置

#### 1，配置账户

`git config --global user.name 'account name'` =>用户名，建议英文或拼音  
`git config --global user.email 'account email'` =>邮箱地址

#### 2，生成密钥

`ssh-keygen -t rsa -C 'account email'` =>上面的邮箱地址  
连续按 3 次 enter,直到有图出现  
1，2 步骤会告诉你文件夹.ssh 下多了 id_rsa(私有密钥)和 id_rsa.pub(共有密钥)，下一步要查看

#### 3，`cat id_rsa.pub` ->查看公有密钥，全部复制，添加到 github 中

#### 4，GitLab 添加 SSH Key: 把复制的粘贴到 add an ssh key 里

## 三：测试配置

1，`ssh -T remotesource` => remotesource 为远程库 git 根目录

## 设置多个 SSH

### 1. 打开终端，切换到系统的 ssh 目录

```shell
cd ~/.ssh
```

### 2. 生成自己的 github 的 ssh key

```shell
ssh-keygen -t rsa -C "自己的github账户" -f github_rsa
```

### 3. 输入 Github 账户密码

### 4. github ssh 公钥获取

```shell
cat ~/.ssh/id_rsa.pub
```

### 5. 生成公司 gitlab 的 ssh key

```shell
ssh-keygen -t rsa -C "公司Gitlab账户" -f company_rsa
```

### 6. 公司 SSH 公钥获取

```ssh
cat ~/.ssh/id_rsa.pub
```

### 7. 添加配置文件`config`【有就编辑，没有就创建，路径`~/.ssh/config`】,配置的写法如下：

```txt
# github
Host github.com
HostName github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/github_rsa

# gitlab
Host gitlab.com
HostName gitlab.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/company_rsa
```

- Host 名称可以随便设置，HostName 就是网站的地址
- 这里要注意的是，如果 gitlab 主机地址是http://10.10.10.89:11000，那么HostName是10.10.10.89

### 8. 把 ssh key 添加到对应的平台

### 9. 测试是否成功

```shell
# GitHub
ssh -T git@github.com
# GitLab
ssh -T git@gitlab.com
```

### 10. 切换不同的 ssh

```shell
# 取消全局 用户名/邮箱设置 并进入项目文件夹单独设置
git config -global -unset user.name
git config -global -unset user.email

# 单独设置每个repo，用户名/邮箱
git config user.email "xxx@xx.com"
git config user.name "xxx"
```
