# JS_AES加密
## AES简介
高级加密标准(AES, Advanced Encryption Standard)为最常见的对称加密算法(微信小程序加密传输就是用这个加密算法的)。对称加密算法也就是加密和解密用相同的密钥，具体加密流程为
~~~
明文P + 密钥 +密钥K  =》 AES加密函数 =》密文C
网络传输
密文C + 密钥 + 密钥K => AES解密函数 =》 明文P
~~~
## JAVASCRIPT AES加密，解密
~~~
<script type="text/javascript" src="https://cdn.bootcss.com/crypto-js/3.1.9-1/crypto-js.js"></script>
<script type="text/javascript" src="https://cdn.bootcss.com/crypto-js/3.1.9-1/aes.js"></script>
<script>
var str = 'aas'; // 需要约定好是否有空格，单引号还是双引号，具体格式
var key = 'asdfsadf';
var iv = 'iasdfasdfsadfsd';
// key 和 iv可以一致
key = CryptoJS.enc.Utf8.parse(key);
iv = CryptoJS.enc.Utf8.parse(iv);
var encrypted = CryptoJS.AES.encrypt(str, key,{
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
})
encrypted = encrypted.toString();
<!-- encrypted 加好密的数据 -->
var decryted = CryptoJS.AES.decrypt(encrypted, key,{
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
})
decrypted = CryptoJS.enc.Utf8.stringify(decrypted);
<!-- decrypted 解密后的数据 -->
</script>
~~~
## JAVA AES加密，解密
~~~
private String encrypt(String content, String password, String solt) throws UnsupportedEncodingException, NoSuchPaddingException, NoSuchAlgorithmException, InvalidAlgorithmParameterException, InvalidKeyException, BadPaddingException, IllegalBlockSizeException {
    SecretKeySpec secretKeySpec = new SecretKeySpec(password.getBytes(encode), "AES");
    IvParameterSpec ivParameterSpec = new IvParameterSpec(solt.getBytes(encode));
    Cipher cipher = Cipher.getInstance(aesType);
    cipher.init(Cipher.ENCRYPT_MODE, secretKeySpec, ivParameterSpec);
    byte[] bytes = cipher.doFinal(content.getBytes(encode));

    BASE64Encoder encoder = new BASE64Encoder();
    return encoder.encode(bytes);
}
~~~

