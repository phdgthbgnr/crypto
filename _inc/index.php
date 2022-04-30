<?php
require './class/connect.php';
$conn = new connect();


$res = $conn->execute_query(
  "SELECT tb1.*, 
  tb1.filepathid, 
  tb2.* 
  FROM 
  $conn->films as tb1 
  JOIN $conn->path as tb2 
  ON tb2.id_path = tb1.filepathid  LIMIT 5"
);
if ($res) {
  while ($row = mysqli_fetch_assoc($res)) {
    print_r($row);
  }
}
