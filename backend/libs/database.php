<?php
namespace Lib\Database;

use PDO;
use PDOException;

class Connection {
    private static ?PDO $pdo = null;

    public static function get(): PDO {
        if (self::$pdo === null) {
            // Ruta relativa al archivo config
            $config = require(__DIR__ . '/../config/database.php');

            $dsn = "mysql:host={$config['host']};dbname={$config['database']};charset={$config['charset']}";

            try {
                self::$pdo = new PDO($dsn, $config['user'], $config['password']);
                self::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch (PDOException $e) {
                // Puedes lanzar excepción o devolver error como JSON
                die(json_encode(['error' => 'Error de conexión: ' . $e->getMessage()]));
            }
        }

        return self::$pdo;
    }
}
