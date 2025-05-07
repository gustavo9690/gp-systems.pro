<?php

$config = [];

// URL base dinámica
$config['base_url'] = rtrim((isset($_SERVER['HTTPS']) ? "https" : "http") . "://" . $_SERVER['HTTP_HOST'] . dirname($_SERVER['SCRIPT_NAME']), '/') . '/';

// Valores por defecto
$config['default_module']     = 'inicio';
$config['default_controller'] = 'Inicio';
$config['default_method']     = 'index';

// Configuración regional
$config['timezone'] = 'America/Lima';
$config['locale']   = 'es_PE';

// Configuración de sesión
$config['session_name'] = 'mi_sistema_sesion';
$config['session_timeout'] = 3600; // en segundos (1 hora)

// Entorno
$config['env'] = 'development';

?>