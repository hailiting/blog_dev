# Mac中git_ssh配置
## 一：查看是否已配置
打开Terminal终端
#### 1， cd ~/.ssh 进入ssh目录
如果没有，则说明没生成过 
如果有  说明可以直接用
~~~
// 直接拷贝 粘贴到git网页里是ssh就好
cat id_rsa.pub
~~~
## 二，重新配置
#### 1，配置账户
``git config --global user.name 'account name'`` =>用户名，建议英文或拼音                       
``git config --global user.email 'account email'``  =>邮箱地址
#### 2，生成密钥
``ssh-keygen  -t rsa -C 'account email'``  =>上面的邮箱地址                        
连续按3次enter,直到有图出现                                          
1，2步骤会告诉你文件夹.ssh下多了id_rsa(私有密钥)和id_rsa.pub(共有密钥)，下一步要查看
#### 3，``cat id_rsa.pub``  ->查看公有密钥，全部复制，添加到github中
#### 4，GitLab添加SSH Key: 把复制的粘贴到add an ssh key里
## 三：测试配置
1，``ssh -T remotesource``  => remotesource为远程库git根目录