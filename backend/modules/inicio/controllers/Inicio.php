<?php

class Inicio extends Controller
{
    public function index()
    {
        // Puedes pasar datos opcionales a la vista
        $datos = [
            'titulo' => 'Bienvenido a OptimusERP',
            'mensaje' => 'Este es el módulo de inicio funcionando correctamente.'
        ];
        print_r($datos);
        // Carga la vista "modules/inicio/views/index.php"
        //$this->view('index', $datos);
    }
}
