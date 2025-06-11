# wifi连接调试
~~~sh
连上手机
adb kill-server                                   
adb start-server                
adb devices                    
    List of devices attached
    10AEAT3CFY001DU	device
断开手机线
adb tcpip 5555                 
    restarting in TCP mode port: 5555
adb connect 手机wifi_ip:5555
    connected to 手机wifi_ip:5555
~~~


## 电脑映射手机
~~~sh
brew install scrcpy
adb devices
scrcpy -s 设备ID
~~~