<?php
class connect
{
  private $host;
  private $dbname;
  private $port;
  private $user;
  private $pwd;
  private $sqlconn;

  public function connect()
  {
    // docker
    if ($_SERVER['SERVER_ADDR'] == '172.19.0.3') {
      $this->host = '172.19.0.2';
      $this->dbname = 'testfilm';
      $this->port = 3306;
      $this->user = 'admin';
      $this->pwd = 'test';
    }
    // smeserver9
    if ($_SERVER['SERVER_ADDR'] == '192.168.1.13') {
      $this->host = 'smeserver9';
      $this->dbname = 'otherfilms_test';
      $this->port = 3306;
      $this->user = 'otherfilms';
      $this->pwd = 'JHgfT765frSX';
    }

    $this->sqlconn = new mysqli($this->host, $this->user, $this->pwd, $this->dbname, $this->port);
  }

  public function execute_query($s)
  {
    if (!$return = $this->sqlconn->query($s)) {
      die('table class="sql_error">
           <tr>
           <td><strong>Erreur dans la base de données' . $this->sqlconn->connect_errno . '</strong></td>
           </tr>
           <tr>
           <td>' . $this->sqlconn->error . '</td>
           </tr>
           <tr>
           <td>' . $s . '</td>
           </tr>
           ');
      $this->sqlconn->close();
      exit;
    }
    return $return;
  }

  public function close()
  {
    $this->sqlconn->close();
  }
}
