# PHP_PDO常用数据库操作
~~~
<?php
  class Sql{
    public $serverName;
    public $userName;
    public $password;
    public $dbname;
    public $con="";
    public function __construct($serverName, $userName, $password, $dbname){
      $this->servername = $serverName;
      $this->username = $userName;
      $this->password = $password;
      $this->dbname=$dbname;
    }
    public function connectSql(){
      try{
        $dsn="mysql:host=$this->servername;dbname=$this->dbname";
        $this->con = new PDO($dsn, $this->username,$this->password);
        header("Content-type: text/html; charset=utf-8");
      } catch(PDOException $e){
        echo $e->getMessage();
      }
    }
    // 查
    public function getDateList($sql){
      if($this->con == null){
        $this->connectSql();
      }
      $res = $this->con->query($sql);
      // $row=$res->fetch(PDO::FETCH_NUM);//以索引数组返回 ["1","20"]
      // $row=$res->fetch(PDO::FETCH_ASSOC);//以关联数组返回 {"id": "1","val": "20"}
      $row=$res->fetchAll(PDO::FETCH_ASSOC);//以关联数组返回 [{....}...]
      $arr= array("result"=>$row);
      // foreach ($res as $row) {
      //   print_r($row); 
      // }
      echo json_encode($arr);
      $this->closeCon();
    }
    // 改
    public function updateVal($sql){
      if($this->con == null){
        $this->connectSql();
      }
      $res = $this->con->exec($sql);
      $arr = array("result"=>$res);
      echo json_encode($arr);
      $this->closeCon();
    }
    // 删
    public function deletVal($sql, $id){
      if($this->con == null){
        $this->connectSql();
      }
      // 准备好sql模板
      $stmt = $this->con->prepare($sql);
      // 绑定参数
      $idval = $id;
      $stmt-> bindValue(1, $idval);
      // 执行预处理语句
      $stmt->execute();
      $affect_row = $stmt->rowCount();
      $arr = array("result"=>$affect_row);
      echo json_encode($arr);
      /**
       * 群删除
       * $sql = "delete from test where id>:id";
       * $stmt = $pdo->prepare($sql);
       * $stmt->execute(array(':id'=>7));
       * echo $stmt->rowCount();
       */
      $this->closeCon();
    }
    public function addVal($sql){
      if($this->con == null){
        $this->connectSql();
      }
      // $res = $this->con -> prepare($sql);
      $res = $this->con->exec($sql);
      // $arr = array("result"=>$res);
      $insert_id = $this->con->lastInsertId();
      $arr = array("result"=>$insert_id);
      echo json_encode($arr);
    }
    public function closeCon(){
      $this->con = null;
    }
  }

  class Mythumb extends Sql{
    public function __construct($serverName, $userName,$password,$dbname){
      parent::__construct($serverName, $userName, $password,$dbname);
    }
    public function myGetDateList($sql){
      $this->getDateList($sql);
    }
    public function myUpdate($sql){
      $this->updateVal($sql);
    }
    public function myDelet($sql, $id){
      $this->deletVal($sql, $id);
    }
    public function myAddVal($sql){
      $this->addVal($sql);
    }
  }


  $mythumb = new Mythumb("localhost", "root", "123456","thumb");
  // $mythumb -> myUpdate("update thumbDetail set val=val+1 where id=1");
  // $mythumb -> myDelet("delete from thumbDetail where id=?", "3");
  // insert into wp_links (link_url,link_name) values('www.gosoa.com.cn','scofield博客')
  /**
  * id必须是主键 自增长
  * CREATE TABLE `thumbDetail` (
  * `id` int(200) NOT NULL AUTO_INCREMENT,
  * `val` int(200) NOT NULL,
  * PRIMARY KEY (`id`)
  * ) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1
  *  */ 
  $mythumb -> myAddVal("insert into thumbDetail (val) values ('insert1')");
  ?>
~~~