# -*- coding: utf-8
import requests
import re
import os

results = requests.get("https://github.com/mdn/pwa-examples/tree/master/js13kpwa/data/img")
urls = re.findall("/mdn/pwa-examples/blob/master/js13kpwa/data/img/.*?.jpg", results.text) + re.findall("/mdn/pwa-examples/blob/master/js13kpwa/data/img/.*?.png", results.text)
print len(urls)
# test  = requests.get("https://raw.githubusercontent.com/mdn/pwa-examples/master/js13kpwa/data/img/a-box-invaders.jpg")
# with open("a-box-invaders.jpg", "wb") as f:
#   f.write(test.content)
#   print("存图图片成功！")
for index, url in enumerate(urls):
  urls[index] = "https://raw.githubusercontent.com"  + url.replace("/blob", "")
  baseNameUrl = "/Users/hailiting/Desktop/blog_dev/docs/HTML/js13kpwa/data/img/{}".format(os.path.basename(urls[index]))
  with open(baseNameUrl, "wb") as f:
    f.write(requests.get(urls[index]).content)
    print("第{}张{}下载完成！".format(index+1, os.path.basename(urls[index])))