# Mac 配置/关闭代理命令.md

检查代理设置是否成功

        curl cip.cc
        curl https://www.google.com

设置代理命令

        export http_proxy="http://127.0.0.1:7070"
        export https_proxy="http://127.0.0.1:7070"

取消代理命令

        unset http_proxy

        unset https_proxy

        unset all_proxy

        unset ftp_proxy

        unset no_proxy

查看是否存在代理

        env | grep -i proxy

使用了代理也无法 ping 通的原因  
 ping 使用的是 ICMP 协议，ICMP 处于网络层（第三次），而 SOCKS5 是传输层代理协议（第四层），HTTP 和 HTTPS 是应用层协议（第五次或第七层），协议层不同是无法代理的。因为上层协议是作为下次协议的数据来传输
