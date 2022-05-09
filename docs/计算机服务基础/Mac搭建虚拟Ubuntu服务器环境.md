# Mac 搭建虚拟 Ubuntu 服务器环境

- 1. virtual box ：6.1，下载地址：https://www.virtualbox.org/

  - ubuntu：18.4，下载地址：http://mirrors.aliyun.com/ubuntu-releases/18.04/

- 2. 查看 ip 地址`ip addr`(不建议使用 ifconfig)

## `ip addr`

```txt
eth0: 网络接口
link encap: 网络类型
HWaddr: 网卡物理地址
Inet addr: (internet address) IP地址
Bcast: 广播地址
Mask: 子网掩码
UP: 正在使用的网络接口
RX packages, TX byte: 表示接收和传输的具体数目
interrupt: 终端信息
Base address: 内存地址
```

## Mac 设置 VirtualBox 虚拟机 Ubuntu14.04 与主机互 ping 并联网

大致分为三步

- VirtualBox 网络 配置网卡 1：设置 NAT 网络（网络地址转换(NAT)）
- 在 NAT 的基础上，配置网卡 2：Host-Only(仅主机(Host-Only)网络)

## 当配置 NAT 发现 ssh 无法在宿主机发起连接

- 1. 确保你的 linux ssh 服务是开启的 `/etc/init.d/ssh start`
- 2. 配置 宿主机 虚拟机 的 ip 端口转发
  - 点击 VirtualBox 网络 网卡 1 高级 端口转发
  - 宿主机 ip 填自己电脑的 ip, 客户机 ip 填 linux 虚拟机的 ip
  - | 名称 | 协议 | 主机 IP | 主机端口 |子系统 IP|子系统端口|
  - | Rule1 | TCP | 172.xxx | 2222 | 10.0xxx | 22 |
