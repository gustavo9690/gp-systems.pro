<?php

if (!function_exists('base_url')) {
    function base_url($ruta = '') {
        global $config;
        return rtrim($config['base_url'], '/') . '/' . ltrim($ruta, '/');
    }
}

if (!function_exists('redirect')) {
    function redirect($ruta = '') {
        header('Location: ' . base_url($ruta));
        exit;
    }
}

if (!function_exists('current_url')) {
    function current_url() {
        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? "https://" : "http://";
        return $protocol . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
    }
}

?>