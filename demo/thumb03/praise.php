<!-- 
  先写父类  
    连接 关闭 数据库    增删改查
  在写子类  
    具体增删改查的操作
  在实例化 
    调用子类
-->
<?php
  class ParamsSql{
    public $servername;
    public $username;
    public $password;
    public $dbname;
    public $con = "";
    public function __construct($servername, $username, $password, $dbname){
      $this->servername = $servername;
      $this->username = $username;
      $this->password = $password;
      $this->dbname = $dbname;
    }
    public function getConnectSql(){
      try {
        $dsn="mysql:host=$this->servername;dbname=$this->dbname";
        $this->con = new PDO($dsn, $this->username, $this->password);
        // echo "连接成功";
      } catch (PDOException $e){
        echo $e->getMessage();
      }
    }
    public function updateData($sql){
      if($this->con == null){
        $this->getConnectSql();
      }
      header("Content-type: text/html; charset=utf-8");
      $res=$this->con->exec($sql);
      $arr= array("result"=>$res);
      echo json_encode($arr);
      $this->closeCon();
    }
    public function closeCon(){
      $this->con = null;
    }
  }
  class update extends ParamsSql{
    public function __construct($servername,$username,$password,$dbname){
      parent::__construct($servername,$username,$password,$dbname);
    }
    public function doUpdateData(){
      $sql="update thumbDetail set val=val+1 where id=1";
      $this->updateData($sql);
    }
  }
  $praiseUpdate = new update("localhost", "root", "123456", "thumb");
  $praiseUpdate->doUpdateData();
  ?>
