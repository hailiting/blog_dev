# AsyncAwait
## async创建一个异步函数，await只能在异步函数的代码块中工作
## 基本用法
~~~
// 查询二级文章分类
static async get_category(ctx){   // async声明这是一个async函数
  const data = await CategoryModel.find();  // await获取异步结果
  if(!data) return ctx.error({msg: "暂无数据"});
  return ctx.success({data});
}
~~~
~~~
var hello = async () => {
  let response = await new Promise((resolve) => {
    setTimeout(() => resolve("aaaa"), 2000)
  })
    .then(res => {
      console.log("6: ", res)
      return res
    })
  console.log("9: ", 111)
  return response
}
hello().then(res => console.log("12: ", res));
// 依次打印为
6:  aaaa
9:  111 -》等6打印才走 9
12:  aaaa 
~~~
## 在fetch里的用法
#### 没有async的时候
~~~
fetch("coffee.jpg")
.then(response => response.blob())
.then(myBlob=>{
  // 获取到，对DOM做处理
  let objectURL = URL.createObjectURL(myBlob);
  let image =  document.createElement("img");
  image.src = objectURL;
  document.body.appendChild(image);
})
.catch(e=>{
  console.log(e.message)
})
~~~
用async改写
~~~
async function myFetch(){
  let respone = await fetch("coffee.jpg");
  let myBlob = await response.blob();

  let objectURL = URL.createObjectURL(myBlob);
  let image =  document.createElement("img");
  image.src = objectURL;
  document.body.appendChild(image);
}
myFetch()
.catch(e=>{
  console.log(e.message);
})
~~~
~~~
async  function (){
  awiat something
  dosomething
  return sth
}.then(res).catch(e)s
可以return 点式应用
~~~

