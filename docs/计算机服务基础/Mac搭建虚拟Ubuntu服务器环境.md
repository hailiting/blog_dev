# Mac 搭建虚拟 Ubuntu 服务器环境

本文档详细介绍如何在 Mac 上搭建 Ubuntu 虚拟服务器环境，包括 **Intel Mac** 和 **Apple Silicon (M1/M2/M3/M4) Mac** 两种方案，涵盖安装、配置网络、SSH 连接等完整步骤。

## ⚠️ 重要提示：请先确认你的 Mac 芯片类型

### 查看芯片类型

点击左上角 **Apple 图标** → **关于本机**：

- 显示 **Apple M1/M2/M3/M4**：请使用 [Apple Silicon 方案](#二apple-silicon-mac-方案推荐)
- 显示 **Intel Core i5/i7/i9**：请使用 [Intel Mac 方案](#三intel-mac-virtualbox-方案)

或在终端执行：

```bash
uname -m
# arm64 = Apple Silicon
# x86_64 = Intel
```

---

## 一、准备工作

### 1.1 系统要求

- Mac 操作系统：macOS 11.0 (Big Sur) 或更高版本
- 内存：至少 8GB（推荐 16GB 以上）
- 硬盘空间：至少 30GB 可用空间

---

## 二、Apple Silicon Mac 方案（推荐）

**适用于：M1、M2、M3、M4 芯片的 Mac**

### 2.1 为什么不能用 VirtualBox？

- VirtualBox 对 Apple Silicon 的 ARM 架构支持很差
- 运行 x86 虚拟机会非常慢
- 必须使用支持 ARM 的虚拟化软件

### 2.2 虚拟化软件选择

#### 🌟 方案一：UTM（免费，强烈推荐）

**优点**：

- ✅ 完全免费开源
- ✅ 原生支持 Apple Silicon
- ✅ 界面友好，操作简单
- ✅ 性能优秀

**下载地址**（重要）：

- **免费版官网**：https://mac.getutm.app/ （点击 Download 按钮）
- **免费版 GitHub**：https://github.com/utmapp/UTM/releases
- **直接下载链接**：https://github.com/utmapp/UTM/releases/latest/download/UTM.dmg

**💡 注意**：

- ✅ 从官网或 GitHub 下载的版本**完全免费**
- ❌ App Store 上的版本需要 ¥68（功能完全相同，付费是为了支持开发者）
- 🎯 **推荐直接下载免费版**，功能没有任何区别！

#### 其他选择：Parallels Desktop（付费）、VMware Fusion（免费）

如果需要更好的性能或企业级功能，可以考虑付费的 Parallels Desktop 或免费的 VMware Fusion，但对于大多数用户，**UTM 已经足够好用**。

### 2.3 下载 Ubuntu ARM64 版本

**⚠️ 重要：必须下载 ARM64 版本！**

**推荐：Ubuntu 22.04 LTS ARM64**（稳定性最好）

**官方下载页面**：https://ubuntu.com/download/server/arm

**国内镜像**（下载更快）：

```
清华镜像：https://mirrors.tuna.tsinghua.edu.cn/ubuntu-cdimage/releases/22.04/release/
文件名：ubuntu-22.04.x-live-server-arm64.iso
```

文件大小约 2.3GB

### 2.4 使用 UTM 安装 Ubuntu（详细步骤）

#### 步骤 1：安装 UTM

1. 从官网下载 UTM.dmg
2. 双击打开，将 UTM 拖入 Applications 文件夹
3. 打开 UTM（首次打开可能需要在系统设置中允许）

#### 步骤 2：创建虚拟机

1. 打开 UTM，点击 **"+"** → **虚拟化**（Virtualize）
2. 选择 **Linux**
3. 配置虚拟机：

**基本设置**：

- 名称：Ubuntu-Server（自定义）
- 架构：ARM64 (aarch64)
- 系统：Linux

**硬件配置**：

- 内存：4096 MB（4GB）或更多
- CPU 核心：2-4 个
- 存储：30 GB 或更多

**启动镜像**：

- 点击 **浏览**，选择下载的 Ubuntu ARM64 ISO 文件

4. 点击 **保存**

#### 步骤 3：安装 Ubuntu

1. 在 UTM 中选择创建的虚拟机，点击 **▶️ 播放按钮** 启动
2. 选择 **Install Ubuntu Server**
3. 按照安装向导操作：
   - **语言**：English（建议）或中文
   - **键盘布局**：English (US)
   - **网络**：使用 DHCP（自动配置）
   - **存储配置**（Guided storage configuration）：
     - 选择 **Use an entire disk**（使用整个磁盘）✅
     - 勾选 **Set up this disk as an LVM group**（设置为 LVM 卷组）✅ - 便于后续调整分区
     - **Encrypt the LVM group with LUKS**（加密）- 可选，如需数据安全可勾选
     - 点击 **Done** 继续
   - **Profile 设置**（重要，记住这些信息！）：
     - **Your name**: admin（或自定义）
     - **Server name**: ubuntu-server
     - **Username**: admin2（这是实际登录用的用户名！）
     - **Password**: 设置强密码（必须记住！）
   - **SSH Setup**：选择 **Install OpenSSH server** ✅
4. 等待安装完成

**安装过程说明**：

安装过程中会显示详细的日志信息，包括：

- 写入安装源到磁盘
- 提取和配置系统文件（curtin extract）
- 安装核心组件（kernel, grub-efi）
- 配置网络和系统服务
- 安装 OpenSSH Server
- 下载安全更新

5. 当看到 **Installation complete!** 界面时，点击 **[Reboot Now]** 重启虚拟机

**重启注意事项**：

- 点击 Reboot Now 后，虚拟机会黑屏，这是正常现象
- 系统正在重启，等待 10-30 秒
- 如果长时间黑屏，可能需要在 UTM 中移除安装 ISO 镜像：
  - 点击 CD/DVD 图标移除光盘
  - 或在虚拟机设置中将 CD-ROM 设为空

6. 等待启动完成，看到登录提示符

**登录虚拟机**：

启动成功后会显示：

```
Ubuntu 22.04.5 LTS admin tty1

admin login: _
```

- **用户名**：输入安装时设置的 Username（如：admin2）
- **Password**：输入密码（输入时不会显示任何字符，这是正常的安全设计）

**常见登录问题**：

- ❌ **Login incorrect** - 用户名或密码错误

  - 确认使用的是 Username（不是 Your name）
  - 密码区分大小写
  - 输入密码时屏幕不显示任何内容是正常的

- ✅ 登录成功后会显示欢迎信息和系统状态

#### 步骤 4：配置网络

UTM 默认使用 **Shared Network（共享网络）** 模式，虚拟机可以访问互联网。

**登录成功后的欢迎信息**：

```bash
Welcome to Ubuntu 22.04.5 LTS (GNU/Linux 5.15.0-119-generic aarch64)

* Documentation:  https://help.ubuntu.com
* Management:     https://landscape.canonical.com
* Support:        https://ubuntu.com/pro

System information as of Wed Oct 22 03:12:22 AM UTC 2025

  System load:  0.02
  Usage of /:   22.5% of 29.82GB
  Memory usage: 5%
  Swap usage:   0%
  Processes:    117
  Users logged in: 0
  IPv4 address for enp0s1: 192.168.64.2
  IPv6 address for enp0s1: fd35:f0b6:4614:8da3:c837:85ff:fe84:3559
```

从欢迎信息中可以看到虚拟机的 IP 地址（如：`192.168.64.2`）。

**查看虚拟机 IP 地址**：

```bash
# 方法1：查看所有网络接口（推荐）
ip addr show

# 方法2：简写
ip a

# 输出示例：
# enp0s1: <BROADCAST,MULTICAST,UP,LOWER_UP>
#     inet 192.168.64.2/24 brd 192.168.64.255 scope global dynamic enp0s1
```

找到类似 `10.0.2.15` 或 `192.168.64.x` 的 IP 地址。

**网络测试**：

```bash
# 测试内网（网关）
ping -c 4 192.168.64.1

# 测试外网
ping -c 4 8.8.8.8
```

⚠️ 如果 ping 不通外网，通常需要切换到 Bridged Network 模式（见下文）。

**网络模式说明**：

UTM 提供两种主要网络模式：

1. **Shared Network（共享网络）**：

   - 虚拟机通过宿主机共享网络
   - IP 地址通常是 `192.168.64.x`
   - ⚠️ 某些情况下可能与 SSH 存在兼容性问题

2. **Bridged Network（桥接网络）**：
   - 虚拟机直接连接到物理网络
   - 获得与 Mac 同一局域网的 IP 地址
   - ✅ 推荐用于 SSH 连接，更稳定

**如果 Shared Network 下 SSH 连接失败，切换到 Bridged Network**：

1. 关闭虚拟机
2. 右键虚拟机 → **编辑**
3. 选择 **Network（网络）**
4. 将模式改为 **Bridged Network（桥接网络）**
5. 保存设置并启动虚拟机

#### 步骤 5：SSH 连接

**方法一：Shared Network 模式（简单但可能不稳定）**

UTM 的 Shared Network 模式下，虚拟机会获得 `192.168.64.x` 网段的 IP 地址。

```bash
# 在虚拟机中查看 IP
ip addr show

# 从 Mac 终端连接
ssh admin2@192.168.64.2
```

⚠️ **如果遇到 "Connection reset by peer" 错误**，说明 Shared Network 与 SSH 存在兼容性问题，请使用方法二。

---

**方法二：Bridged Network 模式（推荐，更稳定）**

1. **切换到桥接网络**：

   - 关闭虚拟机
   - 右键虚拟机 → 编辑 → Network
   - 模式改为 **Bridged Network**
   - 保存并启动虚拟机

2. **在虚拟机中查看新 IP**：

```bash
# 查看所有网络接口
ip addr show

# 找到类似这样的 IP（与 Mac 同一网段）：
# inet 192.168.1.xxx/24  或
# inet 192.168.3.xxx/24  或
# inet 10.0.0.xxx/24
```

3. **从 Mac 测试连通性**：

```bash
# 先 ping 测试（假设虚拟机 IP 是 192.168.3.128）
ping -c 4 192.168.3.128

# 输出应该显示：0% packet loss
```

4. **SSH 连接**：

```bash
# 从 Mac 连接到虚拟机
ssh admin2@192.168.3.128

# 首次连接会提示确认指纹：
# The authenticity of host '192.168.3.128 (192.168.3.128)' can't be established.
# ED25519 key fingerprint is SHA256:xxx...
# Are you sure you want to continue connecting (yes/no/[fingerprint])?

# 输入 yes 并回车

# 然后输入密码（安装时设置的密码）
admin2@192.168.3.128's password:

# 登录成功！
```

**连接成功后**，您就可以在 Mac 终端中直接操作 Ubuntu 虚拟机了！

---

**在虚拟机中检查 SSH 服务**：

```bash
# 检查 SSH 服务状态
sudo service ssh status

# 确认 SSH 正在监听 22 端口
sudo ss -tlnp | grep :22

# 应该看到：
# LISTEN 0 128 0.0.0.0:22 0.0.0.0:* users:(("sshd",pid=xxx,fd=3))
```

#### 步骤 6：文件传输（可选）

通过 SCP 在 Mac 和虚拟机之间传输文件：

```bash
# 从 Mac 复制文件到虚拟机
scp file.txt admin2@192.168.3.128:~/

# 从虚拟机复制文件到 Mac
scp admin2@192.168.3.128:~/file.txt ./
```

---

## 四、Ubuntu 系统配置（通用）

以下配置适用于 **Apple Silicon** 和 **Intel Mac** 的 Ubuntu 虚拟机。

### 4.0 首次配置

登录成功后，立即更新系统：

```bash
sudo apt update
sudo apt upgrade -y
```

### 4.1 安装常用工具

```bash
# 基础工具
sudo apt install -y vim git curl wget net-tools

# 开发工具
sudo apt install -y build-essential python3 python3-pip nodejs npm

# 系统监控工具
sudo apt install -y htop iotop nethogs
```

---

## 五、Ubuntu 常用命令速查

### 5.1 系统管理

```bash
# 系统信息
lsb_release -a         # 查看版本
free -h                # 内存使用
df -h                  # 磁盘使用

# 服务管理
sudo service ssh status    # 查看服务状态
sudo service ssh restart   # 重启服务

# 软件安装
sudo apt update            # 更新软件列表
sudo apt install package   # 安装软件
sudo apt remove package    # 卸载软件
```

### 5.2 网络和文件

```bash
# 网络
ip addr                # 查看 IP
ping -c 4 google.com   # 测试连通性
sudo ss -tlnp | grep :22  # 查看端口

# 文件操作
ls -lah                # 列出文件
mkdir dirname          # 创建目录
rm -rf dirname         # 删除目录
```

---

## 六、常见问题排查

### 6.1 无法连接到互联网

**诊断步骤**：

```bash
# 步骤1：检查网络接口状态
ip addr show
# 确认网卡有 IP 地址（如 192.168.64.2）

# 步骤2：检查路由配置
ip route show
# 应该有 default via x.x.x.1 的默认路由

# 步骤3：检查 DNS 配置
cat /etc/resolv.conf
# 应该有 nameserver 配置

# 步骤4：测试网关连通性（内网测试）
ping -c 4 192.168.64.1
# ✅ 如果成功，说明虚拟机内网正常

# 步骤5：测试外网连通性
ping -c 4 8.8.8.8
ping -c 4 223.5.5.5
# ❌ 如果失败，说明外网无法访问

# 步骤6：测试域名解析
ping -c 4 baidu.com
# 如果显示 IP 但 100% packet loss，说明 DNS 正常但网络不通
```

**常见原因和解决方案**：

**原因 1：UTM/VirtualBox 网络模式配置错误**

- **UTM**：确保使用 "Shared Network" 模式

  - 停止虚拟机 → 设置 → Network → 模式改为 "Shared Network"

- **VirtualBox**：检查 NAT 配置
  - 虚拟机设置 → 网络 → 网卡 1 → 连接方式：NAT

**原因 2：网络服务未启动**

```bash
# 重启网络服务
sudo systemctl restart systemd-networkd

# 或重启 NetworkManager
sudo systemctl restart NetworkManager

# 重新应用网络配置
sudo netplan apply
```

**原因 3：防火墙阻止**

```bash
# 检查防火墙状态
sudo ufw status

# 如果启用了，临时关闭测试
sudo ufw disable

# 测试后如果正常，再启用并配置规则
sudo ufw enable
```

**原因 4：网卡状态异常**

```bash
# 检查网卡是否 UP
ip link show

# 如果显示 DOWN，手动启动
sudo ip link set enp0s1 up

# 重新获取 DHCP 地址
sudo dhclient enp0s1
```

### 6.2 SSH 连接失败

**常见错误 1：Connection refused**

```bash
# 错误信息：
# ssh: connect to host localhost port 2222: Connection refused

# 原因：端口转发配置错误或服务未启动
# 解决：使用虚拟机的实际 IP 地址连接，不使用端口转发
```

**常见错误 2：Connection reset by peer（UTM 特有）**

```bash
# 错误信息：
# kex_exchange_identification: read: Connection reset by peer
# Connection reset by 192.168.64.2 port 22

# 原因：UTM 的 Shared Network 模式与 SSH 存在兼容性问题
# 解决方案：切换到 Bridged Network 模式
```

**解决步骤**：

1. **切换网络模式**（最有效）：

   ```
   UTM → 关闭虚拟机 → 编辑 → Network → Bridged Network
   ```

2. **在虚拟机中重新生成 SSH 密钥**：

   ```bash
   sudo rm -f /etc/ssh/ssh_host_*
   sudo ssh-keygen -A
   sudo service ssh restart
   ```

3. **检查 SSH 服务状态**：

   ```bash
   # 查看服务状态
   sudo service ssh status

   # 检查端口监听
   sudo ss -tlnp | grep :22

   # 查看实时日志
   sudo tail -f /var/log/auth.log
   ```

4. **从 Mac 使用详细模式诊断**：
   ```bash
   # 查看详细连接过程
   ssh -vvv admin2@192.168.3.128
   ```

**常见错误 3：Permission denied**

```bash
# 错误信息：
# Permission denied, please try again.

# 原因：密码错误或用户名错误
# 解决：
# 1. 确认使用正确的用户名（安装时设置的 Username）
# 2. 密码区分大小写
# 3. 输入密码时屏幕不显示任何内容是正常的
```

**常见错误 4：检查防火墙**

```bash
# 检查 UFW 防火墙状态
sudo ufw status

# 如果启用了，允许 SSH
sudo ufw allow 22/tcp

# 或临时禁用测试
sudo ufw disable
```

### 6.3 虚拟机运行缓慢

**通用解决方案**：

- 增加分配的内存和 CPU 核心数
- 关闭虚拟机中不必要的服务
- 调整显存大小（设置 → 显示 → 显存）

**VirtualBox 特定**：

- 在设置中启用 **PAE/NX**
- 安装 VirtualBox 增强功能

**UTM 特定**：

- 确保使用 **虚拟化**（Virtualize）而非模拟（Emulate）
- 检查是否启用了硬件加速

### 6.4 共享文件夹无法访问（VirtualBox）

```bash
# 检查增强功能是否安装
lsmod | grep vboxsf

# 手动挂载
sudo mount -t vboxsf shared /mnt/shared

# 检查用户组
groups $USER
# 应该包含 vboxsf
```

---

## 七、备份与快照

**UTM 创建快照**：

1. 右键虚拟机 → **创建快照**（Create Snapshot）
2. 输入快照名称即可

**VirtualBox 创建快照**：

1. 选择虚拟机 → 菜单 → **快照** → **生成**

---

## 八、参考资料

- **UTM 官方网站**：https://mac.getutm.app/
- **Ubuntu 下载页面**：https://ubuntu.com/download/server/arm
- **清华镜像站**：https://mirrors.tuna.tsinghua.edu.cn/

---

## 九、总结

### Apple Silicon Mac (M1/M2/M3/M4) 用户

✅ 推荐使用 **UTM** + **Ubuntu 22.04 ARM64**

- 完全免费
- 原生支持，性能出色
- 安装简单，上手快

**网络配置建议**：

- 🌐 **Bridged Network（桥接网络）** - 推荐用于 SSH 连接

  - 虚拟机获得局域网 IP，与 Mac 同一网段
  - SSH 连接更稳定，不会出现 "Connection reset" 问题
  - 可以从局域网其他设备访问虚拟机

- 🔗 **Shared Network（共享网络）** - 简单但可能有兼容性问题
  - 虚拟机通过 Mac 共享网络
  - 某些情况下与 SSH 存在兼容性问题
  - 如遇到连接问题，请切换到 Bridged Network

### Intel Mac 用户

✅ 推荐使用 **VirtualBox** + **Ubuntu 20.04/22.04 AMD64**

- 免费开源
- 功能强大
- 社区支持好

**注意事项**：

- ⚠️ 务必下载对应架构的 Ubuntu 版本
- ⚠️ ARM64 版本只能在 Apple Silicon Mac 上运行
- ⚠️ AMD64 版本只能在 Intel Mac 上高效运行

---

**最后更新时间**：2025-10-22

**本次更新内容**：

- ✅ 完善了 Ubuntu 安装过程的详细说明（存储配置、Profile 设置）
- ✅ 添加了登录问题的解决方案
- ✅ 添加了网络诊断完整步骤
- ✅ 重点补充了 SSH 连接的两种方法（Shared Network 和 Bridged Network）
- ✅ 详细记录了 "Connection reset by peer" 问题的解决方案
- ✅ 推荐使用 Bridged Network 模式进行 SSH 连接
