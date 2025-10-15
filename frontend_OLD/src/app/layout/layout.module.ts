import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { EmptyLayoutComponent } from './empty-layout/empty-layout.component';
import { TimerComponent } from '../shared/components/timer/timer.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MainLayoutComponent,
    EmptyLayoutComponent,
    TimerComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    MainLayoutComponent,
    EmptyLayoutComponent  // 👈 IMPORTANTE: esto lo hace accesible fuera del módulo
  ]
})
export class LayoutModule {}
