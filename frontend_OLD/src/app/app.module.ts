import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { InicioService } from './core/services/inicio.service';
import { InicioComponent } from './features/inicio/inicio.component';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './features/login/login.component';
import { ModalService } from './core/services/modal.service';
import { ModalComponent } from './shared/components/modal/modal.component';
import { IdleService } from './core/services/idle.sevice';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,InicioComponent,LoginComponent,ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,  
    HttpClientModule, 
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [InicioService,ModalService,IdleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
