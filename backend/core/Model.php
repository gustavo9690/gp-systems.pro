<?php

use Lib\Database\Connection; // 👈 Importa la clase desde el namespace

class Model {
    protected $db;

    public function __construct() {
        $this->db = Connection::get(); // 👈 Reutiliza la conexión única
    }
}

?>