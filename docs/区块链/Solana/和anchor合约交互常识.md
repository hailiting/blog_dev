# 和anchor合约交互常识

~~~
0~7 字节：discriminator（8字节，Anchor自动加的）
8~39 字节：mint（32字节）
40~71 字节：owner（32字节）
72~79 字节：amount（8字节）
80~87 字节：serialNumber（8字节）
88~95 字节：startTime（8字节）
96~103 字节：endTime（8字节）
104 字节：isUnlocked（1字节）
~~~