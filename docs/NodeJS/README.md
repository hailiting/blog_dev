## 淘宝镜像
-g 全局
--registry 仓库
~~~
npm install -g cnpm --registry=https://registry.npm.taobao.org
~~~
## 包管理工具nvm
~~~
// 下载出错的话 
// 0curl: (7) Failed to connect to raw.githubusercontent.com port 443: Connection refused
// 用这个 git clone https://github.com/creationix/nvm.git ~/.nvm && cd ~/.nvm && git checkout `git describe --abbrev=0 --tags`
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash // 需要科学上网
~~~

* I/O是昂贵的，分布式I/O是更安贵的
* NodeJS适用于IO密集型不适用CPU密集型



