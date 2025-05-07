<?php

class Autoloader {
    public static function run($autoloadConfigPath = __DIR__ . '/../config/autoload.php') {
        // Cargar archivo de configuración de autoload
        $autoload = require $autoloadConfigPath;

        // Cargar helpers
        foreach ($autoload['helpers'] ?? [] as $helper) {
            $helperPath = __DIR__ . '/../helpers/' . $helper . '.php';
            if (file_exists($helperPath)) {
                require_once $helperPath;
            } else {
                echo "❌ Helper no encontrado: $helperPath<br>";
            }
        }

        // Cargar Libs
        foreach ($autoload['libs'] ?? [] as $libs) {
            $libsPath = __DIR__ . '/../libs/' . $libs . '.php';
            if (file_exists($libsPath)) {
                require_once $libsPath;
            } else {
                echo "❌ Libs no encontrado: $libsPath<br>";
            }
        }

        // Registrar autoload dinámico para libs, core, y modelos
        spl_autoload_register(function ($className) {
            $paths = [
                __DIR__ . '/' . $className . '.php' // core/
            ];

            // Buscar modelos en todos los módulos
            foreach (glob(__DIR__ . '/../modules/*/models/' . $className . '.php') as $modelPath) {
                require_once $modelPath;
                return;
            }

            foreach ($paths as $path) {
                if (file_exists($path)) {
                    require_once $path;
                    return;
                }
            }
        });
    }
}

?>