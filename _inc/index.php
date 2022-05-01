<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

require './class/connect.php';

$conn = new connect();

$req = json_decode(file_get_contents('php://input'));

$response = array(
  'status' => -1,
  'error' => 'sql error',
  'payload' => []
);

$data = array();

$res = $conn->execute_query(
  "SELECT tb1.*, 
  tb1.filepathid, 
  tb2.* 
  FROM 
  $conn->films as tb1 
  JOIN $conn->path as tb2 
  ON tb2.id_path = tb1.filepathid  LIMIT 1"
);

if ($res) {
  while ($row = mysqli_fetch_object($res)) {
    $d = array(
      'id' => $row->id_film,
      'filename' => $row->filename,
      'imagedata' => $row->imgencrypt,
      'width' => $row->width,
      'height' => $row->height,
      'size' => $row->filesize,
      'creationdate' => $row->creationdate,
      'accessdate' => $row->accessdate
    );
    array_push($data, $d);
  }
  $response['status'] = 1;
  $response['error'] = '';
  $response['payload'] = $data;
}

echo json_encode($response);

exit;
