# JS 图片压缩

```
function photoCompress(file, w, objDiv) {
    var ready = new FileReader();
    /*开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
    ready.readAsDataURL(file);
    ready.onload = function () {
    var re = this.result;
    canvasDataURL(re, w, objDiv)
    }
}

function canvasDataURL(path, obj, callback) {
    var img = new Image();
    img.src = path;
    img.onload = function () {
    var that = this;
    // 默认按比例压缩
    var w = that.width,
        h = that.height,
        scale = w / h;
    w = obj.width || w;
    h = obj.height || (w / scale);
    var quality = 0.7; // 默认图片质量为0.7
    //生成canvas
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    // 创建属性节点
    var anw = document.createAttribute("width");
    anw.nodeValue = w;
    var anh = document.createAttribute("height");
    anh.nodeValue = h;
    canvas.setAttributeNode(anw);
    canvas.setAttributeNode(anh);
    ctx.drawImage(that, 0, 0, w, h);
    // 图像质量
    if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
        quality = obj.quality;
    }
    // quality值越小，所绘制出的图像越模糊
    var base64 = canvas.toDataURL('image/jpeg', quality);
    // 回调函数返回base64的值
    callback(base64);
    }
}
/**
    * 将以base64的图片url数据转换为Blob
    * @param urlData
    *            用url方式表示的base64图片数据
    */
function convertBase64UrlToBlob(urlData) {
    var arr = urlData.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
    while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {
    type: mime
    });
}
```

发送请求

```
const request = (file, project_id, callback) => {
    let url = `${env.API_URL}/new_plus/v2/upload_image`;
    const formdata = new FormData();
    // 图片压缩
    photoCompress(file, {
        quality: 0.1
    }, function (base64Codes) {
        var bl = convertBase64UrlToBlob(base64Codes);
        const is5M = bl.size / 1024 / 1024 > 2;
        if (is5M) {
            Toast.info('最多可上传2M大小图片', 1);
            return false;
        }
        Toast.loading('图片上传中，请稍后', 0)
        formdata.append("files", bl, "file_" + Date.parse(new Date()) + ".jpg");
        formdata.append("project_id", String(project_id));
        const options = {
            method: 'POST',
            headers: {
                'Json-Web-Token': getToken(),
                'lang': 'zh-CN',
                'client-type': 'h5',
            },
            body: formdata,
        };
        fetch(url, options)
            .then(checkStatus)
            .then((res) => {
                return res.json().then((e) => {
                    if (e.succeed || e.code === 0) {
                        Toast.info('上传截图成功', 1)
                        callback(e)
                    }
                    if (url.indexOf('/login') === -1 && url.indexOf('account_forget') === -1) {
                        if (e.code === 1005 || e.error_code === 1005 || e.error_code === 3004) {
                            Toast('登录已过期，请持续登录', 1);
                        }
                    }
                    Toast.info(formatMessage({ id: errMsg(e, url) }), 1);
                })
            }).catch((err) => {
                const status = err.name;
                if (status === 403) {
                    window.history.href = "/404"
                    return false;
                }
                if (status <= 504 && status >= 500) {
                    window.history.href = "/404"
                    return false;
                }
                if (status >= 404 && status < 422) {
                    window.history.href = "/404"
                }
                return Promise.reject('网络错误，图片上传失败');
            });
    })
};
```
