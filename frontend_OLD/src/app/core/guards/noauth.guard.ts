import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { jwtDecode } from "jwt-decode";

export const noAuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const decoded: any = jwtDecode(token);
      const now = Math.floor(Date.now() / 1000);
      if (decoded.exp > now) {
        router.navigate(['/inicio']); // 🔁 redirige a inicio
        return false;
      }
    } catch {}
  }

  return true; // ✅ puede entrar
};
