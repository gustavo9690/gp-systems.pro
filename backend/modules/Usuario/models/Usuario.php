<?php

class Usuario extends Model
{
    public function verificarCredenciales(string $usuario, string $clave): ?array
    {
        $stmt = $this->db->prepare("SELECT * FROM usuario WHERE usuario = ?");
        $stmt->execute([$usuario]);
        $usuario_res = $stmt->fetch(PDO::FETCH_ASSOC);

        $clave1 =  md5($clave);
        if ($clave1==$usuario_res['clave']) {
            return $usuario_res;
        }

        return null;
    }

    public function getAll() {
        $stmt = $this->db->query("SELECT * FROM usuarios");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
