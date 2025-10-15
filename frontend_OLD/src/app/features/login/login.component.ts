import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../core/models/usuario.model';
import { AuthService } from '../../core/services/auth.service'; // Asumiendo que auth está en core

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  formLogin!: FormGroup;
  errorMessage: string = '';
  usuario = new Usuario();

  constructor(private fb: FormBuilder,private authService: AuthService, // ✅ Inyectado aquí
    private router: Router){}

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      usuario: [this.usuario.usuario, Validators.required],
      clave: [this.usuario.clave, [Validators.required]]
    });
  }

  onSubmit() {
    if (this.formLogin.invalid) return;

    this.authService.login(this.formLogin.value).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.access_token);
        localStorage.setItem('refresh_token', res.refresh_token);

        // ✅ Redirigir al dashboard
        this.router.navigate(['/inicio']);
      },
      error: (err) => {
        console.error('Login fallido:', err);
      }
    });

  }

}