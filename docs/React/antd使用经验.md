# antd使用经验
### Modal等挂载到指定dom
~~~
<Modal
  ...
  getContainer={() => {
      return document.getElementById("dom");
  }}
>
</Modal>
~~~