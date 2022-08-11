# Linux 目录结构

- `/`: 根目录
- `/bin`: `/usr/bin`: 可执行的二进制文件目录，如常用的`ls, tar, mv, cat`等
- `/boot`: 放置 linux 系统启动时用到的一些文件，如 Linux 的内核文件`/boot/vmlinuz`，系统引导管理器：`/boot/grub`
- `/dev`: 存放 linux 系统下的设备文件，访问该目录下某个文件，相当于访问某个设备，常用的是挂载光驱`mount /dev/cdrom/mnt`
- `/etc`: 系统配置文件存放的目录，重要的配置文件有`/etc/inittab`, `/etc/fstab`, `/etc/init.d`, `/etc/X11`, `/etc/sysconfig`, `/etc/xinetd.d`
- `/home`: 系统默认的用户家目录
- `/lib`: `/usr/lib`: `/usr/local/lib`: 系统使用的函数库的目录
- `/lost+fount`: 系统异常产生错误时，会将一些遗失的片段放置到此目录下

## Linux 中文件分为：

- 普通文件
- 目录文件
- 设备文件
- 管道文件
- 链接文件
