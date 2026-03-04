# 手机安装CA

- http://chls.pro/ssl 下载 pem
- openssl x509 -subject_hash_old -in charles-proxy-ssl-proxying-certificate.pem
  - 读到hash 339f662a
  - 重命名 pem -> 339f662a.0
- adb push /Users/hailiting/Downloads/339f662a.0.pem /sdcard/Download/339f662a.0.pem
- adb -s 788e6720 shell
- cd /sdcard/Download/
- mv 339f662a.0.pem /system/etc/security/cacerts/


adb shell mv /path/to/339f662a.0.pem /system/etc/security/cacerts/
