# PHP常用数据库查询语句
## 1，php查询mysql并输出多个接口
~~~
functionn query(){
    $db = new mysqli('localhost', 'root', '','article');
    $res = $db->query('select id,articledata,c_time from article');
    $arr  = array();
    if($res && is_object($res)){
        while($row = mysqli_fetch_assoc($res)){
            $arr[] = $row;
        }
    } 
    print_r(json_encode($arr));
    $db->close();
}
~~~