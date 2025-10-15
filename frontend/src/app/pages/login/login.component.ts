import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formLogin!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.formLogin = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.formLogin.valid) {
      // Simula autenticación
      console.log(this.formLogin.value);
      this.router.navigate(['/inicio']);
    } else {
      this.formLogin.markAllAsTouched();
    }
  }

  get usuario() { return this.formLogin.get('usuario'); }
  get password() { return this.formLogin.get('password'); }
}
