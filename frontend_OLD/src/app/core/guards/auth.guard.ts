import { CanActivateFn, CanActivateChildFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';


export const authGuard: CanActivateFn & CanActivateChildFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const decoded: any = jwtDecode(token);
      const now = Math.floor(Date.now() / 1000);
      if (decoded.exp > now) {
        return true;
      }
    } catch {}
  }

  router.navigate(['/login']);
  return false;
};
