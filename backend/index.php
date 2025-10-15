<?php

// Manejo de preflight (CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    http_response_code(200);
    exit();
}

// Cargar configuración
require __DIR__ . '/config/config.php';

date_default_timezone_set($config['timezone']);

require_once __DIR__ . '/core/Autoloader.php';
Autoloader::run();

// Obtener la URL limpia
$request = $_GET['url'] ?? '';
$request = filter_var(rtrim($request, '/'), FILTER_SANITIZE_URL);
$segments = explode('/', $request);



// Extraer módulo, controlador, método y parámetros
$moduleName     = (empty($segments[0]) ? $config['default_module'] : $segments[0]);
$controllerName = ucfirst((empty($segments[1]) ? $config['default_controller'] : $segments[1]));
$methodName     = (empty($segments[2]) ? $config['default_method'] : $segments[2]);
$params         = array_slice($segments, 3);

// Construir ruta del controlador
$controllerPath = __DIR__ . "/modules/$moduleName/controllers/$controllerName.php";

// Verificar existencia del archivo
if (!file_exists($controllerPath)) {
    http_response_code(404);
    exit("Controlador <b>$controllerPath</b> no encontrado.");
}

// Cargar archivo
require_once $controllerPath;

// Verificar clase
if (!class_exists($controllerName)) {
    http_response_code(500);
    exit("Clase <b>$controllerName</b> no existe.");
}

$controller = new $controllerName();

// Verificar método
if (!method_exists($controller, $methodName)) {
    http_response_code(500);
    exit("Método <b>$methodName</b> no encontrado en <b>$controllerName</b>.");
}

// Ejecutar método
call_user_func_array([$controller, $methodName], $params);

?>
