<?php

class Controller
{
    // Cargar un modelo desde modules/{modulo}/models/{Modelo}.php
    public function model($model)
    {
        $module = strtolower(get_class($this)); // se asume que el nombre de la clase es igual al módulo
        $modelPath = "modules/$module/models/$model.php";

        if (file_exists($modelPath)) {
            require_once $modelPath;
            if (class_exists($model)) {
                return new $model();
            }
        }

        die("Modelo <b>$model</b> no encontrado en <b>$modelPath</b>.");
    }

    // Cargar una vista desde modules/{modulo}/views/{archivo}.php
    public function view($view, $data = [])
    {
        $module = strtolower(get_class($this));
        $viewPath = "modules/$module/views/$view.php";

        if (file_exists($viewPath)) {
            extract($data); // para usar $variable en la vista
            require $viewPath;
        } else {
            die("Vista <b>$view</b> no encontrada en <b>$viewPath</b>.");
        }
    }
}

?>