# antd 使用经验

### Modal 等挂载到指定 dom

```
<Modal
  ...
  getContainer={() => {
      return document.getElementById("dom");
  }}
>
</Modal>
```
