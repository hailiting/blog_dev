# TP5_validate

## 独立验证

```
$date=[
  "name"=> "vendor12111111",
  "email"=>  "vendor@11s",
];
$validate=new Validate([
  "name"=>"require|max:10",
  "email"=>"email"
]);
// check($date) 认证 返回来是字符串
// batch()->check($date) 批量认证 返回来是数组
$result=$validate->batch()->check($date);
echo $result;
var_dump($validate->getError());
```

## 验证器

对 validate 做更好的封装
`app\api\validate`

```
<?php
  namespace app\api\validate;

  use think\Validate;

  class TestValidate extends Validate{
    protected $rule = [
      "name" => "require|max:10",
      "email" => "email"
    ];
  }
```

`app\api\controller\v1`

```
<?php
  // 表与表的关系 （一对多 。。。）
  namespace app\api\controller\v1;

  use app\api\validate\TestValidate;

  use think\Validate;

  class Banner{
    /**
     * 获取指定id的banner信息
     * @url /banner/:id
     * @http GET
     * @id banner的id号
     */
    public function getBanner($id){
      $date=[
        "name"=> "vendor12111111",
        "email"=>  "vendor@11s",
      ];
      $validate = new TestValidate();
      // check方法是挂载在TestValidate的验证规则
      // check($date) 认证 返回来是字符串
      // batch()->check($date) 批量认证 返回来是数组
      $result=$validate->batch()->check($date);
      echo $result;
      var_dump($validate->getError());
    }
    public  function Test(){
      phpinfo();
    }
  }

```

### 实战

大概思路
1，应用层：controller 下单 modal 调用方法，验证是否成功;
2，中间层：填充验证规则到 基本验证框架里(挂载到基础层上);
3，基础层：除 check 的规则，其他外层在此完成，只需抛出 true 或错误;

```
// banner.php
$validate = (new IDMustBePositiveInt())->goCheck();
echo $validate;
// IDMustBePositiveInt.php
class IDMustBePositiveInt extends BaseValidate{
  protected $rule = [
    "id" => "require|isPositiveInteger",
  ];
  // 自定义验证规则
  protected function isPositiveInteger(
    $value,
    $rule="",
    $data="",
    $field=""
  ){
    // 判断value是否是正整数
    if(is_numeric($value) && is_int($value+0) && ($value+0)>0){
      return true;
    }
    return false;
  }
}
// BaseValidate.php
class BaseValidate extends Validate{
  public function goCheck(){
    // 获取HTTP传入的参数
    // 对这些参数做检查
    $request = Request::instance();
    $params = $request->param();
    $result = $this->check($params);
    if(!$result){
      $error = $this->error;
      throw new Exception($error);
    } else{
      return true;
    }
  }
}
```
