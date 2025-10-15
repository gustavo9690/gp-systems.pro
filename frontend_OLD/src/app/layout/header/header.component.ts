import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from '../../core/services/modal.service';
import { IdleService } from '../../core/services/idle.sevice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private showingWarning = false;
  private secondsLeft = 0;

   constructor(
    private idle: IdleService,
    private modal: ModalService,
    private router: Router
  ) {}
  
  ngOnInit() {
    this.idle.startWatching(
      (secondsLeft) => this.showWarning(secondsLeft),
      () => this.timeoutAction()
    );
  }

  showWarning(seconds: number) {
    this.secondsLeft = seconds;

    if (!this.showingWarning) {
      this.showingWarning = true;

      this.modal.open({
        title: 'Sesión a punto de expirar',
        // {{secondsLeft}} se actualiza cada segundo porque reabrimos el modal solo la primera vez,
        // y usamos binding en el componente Modal.
        message: '', // lo pintaremos con un template hijo
        showAccept: true,
        showCancel: false,
        onAccept: () => {
          this.showingWarning = false;
          this.modal.close();
          // Reinicia el contador
          this.idle.startWatching(
            s => this.showWarning(s),
            () => this.timeoutAction()
          );
        }
      });
    }
  }

  timeoutAction() {
    this.modal.close();
    this.showingWarning = false;
    this.router.navigate(['/login']); // o cerrar sesión
  }

  ngOnDestroy() {
    this.idle.stopWatching();
  }
}