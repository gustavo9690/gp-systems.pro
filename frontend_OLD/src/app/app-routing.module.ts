import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './features/inicio/inicio.component';
import { LoginComponent } from './features/login/login.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { EmptyLayoutComponent } from './layout/empty-layout/empty-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { noAuthGuard } from './core/guards/noauth.guard';

/*const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },  // Redirección por defecto
  { path: 'inicio', component: InicioComponent },
  { path: 'productos', component: FooterComponent },
  { path: '**', redirectTo: 'inicio' }  // Ruta comodín para páginas no encontradas
];*/

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // Layout vacío para el login (sin header/footer)
  {
  path: '',
  component: EmptyLayoutComponent,
  children: [
    {
      path: 'login',
      component: LoginComponent,
      canActivate: [noAuthGuard]  // ⛔ bloquea si ya hay sesión
    }
  ]
},

   // Layout principal (header/footer) para el resto de rutas
  {
    path: '',
    component: MainLayoutComponent,
    canActivateChild: [authGuard], // si luego lo proteges
    children: [
      { path: 'inicio', component: InicioComponent },
      // más rutas aquí
    ]
  },
  // Ruta comodín (página no encontrada)
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


