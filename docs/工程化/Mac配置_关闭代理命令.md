# Mac 配置/关闭代理命令.md

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
