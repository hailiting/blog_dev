<?php
  header("Content-type:  application/json;charset=utf-8");
  header("Cache-Control:max-age=0");
  $i=0;
  while(true){
    $res=array("success"=>"ok","text"=>$random);
    echo json_encode($res);
    exit();
  }
  // while($i<90000){
  //   sleep(2);
  //   $i++;
  //   $random = rand(1, 999);
  //   echo($random);
  //   echo("<br/>");
  //   // $res=array("success"=>"ok","text"=>$random);
  //   // echo json_encode($res);
  //   ob_flush();
  //   flush();
  // }
?>