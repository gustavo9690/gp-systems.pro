<?php

class Inicio extends Controller
{
    
	public function index()
    {
		set_json_header();

		$datos = [
            'titulo' => 'Bienvenido a OptimusERP',
            'mensaje' => 'Este es el módulo de inicio funcionando correctamente.'
        ];
		
		echo json_encode($datos);
        // Puedes pasar datos opcionales a la vista
        
    }
	
	public function data_prueba(){
		set_json_header();

		$datos = [
            'titulo' => 'Bienvenido a OptimusERP',
            'mensaje' => 'Este es el módulo de inicio funcionando correctamente.'
        ];
		
		echo json_encode($datos);
	}
}
