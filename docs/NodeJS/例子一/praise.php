<?php
  // 父类
  class Conmysql{
    public $servername;
    public $username;
    public $password;
    public $dbname;
    public $con='';
    public function __construct($servername, $username, $password, $dbname){
      $this->servername = $servername;
      $this->username = $username;
      $this->password = $password;
      $this->dbname = $dbname;
    }
    public function getConnection(){
      // 和mysql链接
      try{
        $dsn="mysql:host=$this->servername;dbname=$this->dbname";
        $this->con = new PDO($dsn, $this->username, $this->password);
        echo "连接成功";
      }
      catch(PDOException $e){
        echo $e->getMessage();
      }
    }

    public function updateData($sql){
      if($this->con==null){
        $this->getConnection();
      }
      header("Content-type: text/html; charset=utf-8");
      $res=$this->con->exec($sql);
      $arr=array('result'=>$res);
      echo json_encode($arr);
      $this->closeCon();
    }

    public function closeCon(){
      // 关闭连接
      $this->con=null;
    }
  }
  // 子类 实现对数据库连接
  class realCon extends Conmysql{
    public function __construct($servername, $username, $password, $dbname){
      parent::__construct($servername, $username, $password, $dbname);
    }
    public function updateRealData(){
		  $sql="UPDATE thumbDetail SET val=val+1 WHERE id=1";
    // $sql="update thumbDetail set val=val+1 where id=1";
      $this->updateData($sql);
    }
  }
  // 实例化
  $praiseC = new realCon("localhost", "root", "123456", "thumb");
  $praiseC->updateRealData();
  ?>