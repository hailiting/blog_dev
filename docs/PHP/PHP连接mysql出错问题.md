### ``No such file or directory``
  * 然而我没解决(可能因为我是用xampp)
  原因是mac下默认``php.ini``配置``default_socket``在``/var/mysql/mysql.socket``, 而mysql的socket文件大多在``/tmp/mysql.sock`` =>在mysql里，用``status``命令查看``UNIX socket``的位置，将``php.ini``改为mysql的就好了；

 #### 1， ``php.ini``配置文件一般在 /private/etc/里
 #### 2， vi php.ini
 ~~~
 pdo_mysql.default_socket=/Applications/MAMP/tmp/mysql/mysql.sock
mysql.default_socket = /Applications/MAMP/tmp/mysql/mysql.sock
mysqli.default_socket = /Applications/MAMP/tmp/mysql/mysql.sock
 ~~~
 #### 3, ``esc`` + ``:wq
``