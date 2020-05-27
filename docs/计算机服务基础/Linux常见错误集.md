# Linux常见错误集
## ``Unable to locate package``
当使用apt-get更新软件包出现这个错误的时候，先更新
``sudo apt-get update``
然后在安装需要的功能
~~~
sudo apt-get install apache2
sudo apt-get install mysql-server mysql-client
sudo apt-get install vim-gtk
~~~