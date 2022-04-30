<?php
require './class/connect.php';
$conn = new connect();


$res = $conn->execute_query("SELECT id_film FROM $conn->films LIMIT 5");
if ($res) {
  while ($row = mysqli_fetch_assoc($res)) {
    print_r($row);
  }
}
