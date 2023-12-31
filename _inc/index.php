<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

require './class/connect.php';

$response = array(
  'error' => '',
  'payload' => [],
  'request' => '',
  'status' => -1,
);

$requestType = $_SERVER['REQUEST_METHOD'];
$response['request'] = $requestType;

if ($requestType != 'POST') {
  $response['error'] =  'Request method not allowed';
  $response['status'] = -1;
  echo json_encode($response);
  exit;
}

$conn = new connect();

$req = json_decode(file_get_contents('php://input'));

$index =  is_numeric($req->index) ? intval($req->index) : -1;
$limit = is_numeric($req->numPosts) ? intval($req->numPosts) : -1;
$sortby = $req->sortBy;

if ($limit == -1) {
  $response['error'] =  'Number of posts ' . $req->numPosts . ' not allowed';
  $response['status'] = -1;
  echo json_encode($response);
  exit;
}

if ($index == -1) {
  $response['error'] =  'Index' . $req->index . ' not allowed';
  $response['status'] = -1;
  echo json_encode($response);
  exit;
}

$offset = $limit * $index;


$data = array();

$res = $conn->execute_query(
  "SELECT tb1.*, 
  tb1.filepathid, 
  tb2.* 
  FROM 
  $conn->films as tb1 
  JOIN $conn->path as tb2 
  ON tb2.id_path = tb1.filepathid LIMIT $limit OFFSET $offset"
);

if ($res) {
  while ($row = mysqli_fetch_object($res)) {
    $d = array(
      'id' => $row->id_film,
      'filename' => $row->filename,
      'imagedata' => $row->imgencrypt,
      'path' => $row->path_name,
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
