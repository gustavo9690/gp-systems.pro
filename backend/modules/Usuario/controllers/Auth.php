<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class Auth extends Controller
{
    public function acceder()
    {
        set_json_header();

        $data = json_decode(file_get_contents('php://input'), true);

        $usuario = $data['usuario'] ?? '';
        $clave   = $data['clave'] ?? '';

        $usuarioModel = new Usuario();
        $usuario_res  = $usuarioModel->verificarCredenciales($usuario, $clave);

        if ($usuario_res) {
            $claveSecreta = "mi_clave_secreta";

            // 1. Payload del access token (válido por 2 min en tu ejemplo)
            $access_payload = [
                'id' => $usuario_res['id_usuario'],
                'usuario' => $usuario_res['nombres'].' '.$usuario_res['apellido_paterno'].' '.$usuario_res['apellido_materno'],
                'exp' => time() + 120  // 2 minutos (para prueba)
            ];

            // 2. Payload del refresh token (ej. 7 días)
            $refresh_payload = [
                'id' => $usuario_res['id_usuario'],
                'exp' => time() + (7 * 24 * 60 * 60) // 7 días
            ];

            // 3. Codificar los tokens
            $access_token  = JWT::encode($access_payload, $claveSecreta, 'HS256');
            $refresh_token = JWT::encode($refresh_payload, $claveSecreta, 'HS256');

            // 4. (Opcional) Guardar el refresh token en la BD con usuario_res['id_usuario']

            // 5. Retornar ambos tokens
            echo json_encode([
                'access_token'  => $access_token,
                'refresh_token' => $refresh_token,
                'usuario'       => $usuario
            ]);
        } else {
            echo json_encode(['error' => 'Credenciales inválidas']);
        }
    }

    public function refresh(){
        set_json_header();
        
        $headers = getallheaders();
        $refreshToken = $headers['Authorization'] ?? '';

        if (!$refreshToken) {
            http_response_code(400);
            echo json_encode(['error' => 'Refresh token requerido']);
            return;
        }

        $claveSecreta = "mi_clave_secreta";

        try {
            $decoded = JWT::decode($refreshToken, new Key($claveSecreta, 'HS256'));

            // (Opcional) Validar en BD si el refresh token sigue siendo válido

            // Generar nuevo access token
            $newAccessPayload = [
                'id' => $decoded->id,
                'exp' => time() + 900  // Nuevo access token por 15 minutos
            ];

            $newAccessToken = JWT::encode($newAccessPayload, $claveSecreta, 'HS256');

            echo json_encode([
                'access_token' => $newAccessToken
            ]);

        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(['error' => 'Refresh token inválido o expirado']);
        }
    }

}
