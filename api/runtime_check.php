<?php
header('Content-Type: application/json; charset=utf-8');

respond([
    'php_sapi' => PHP_SAPI,
    'php_version' => PHP_VERSION,
    'pdo_drivers' => PDO::getAvailableDrivers(),
    'pdo_pgsql_loaded' => extension_loaded('pdo_pgsql')
]);

function respond($data) {
    echo json_encode($data);
}
