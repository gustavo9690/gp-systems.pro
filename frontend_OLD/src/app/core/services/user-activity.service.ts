import { Injectable, NgZone } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserActivityService {
  private warningMinutes = 4;
  private logoutMinutes = 5;
  private warningTimer: any;
  private logoutTimer: any;

  constructor(
    private ngZone: NgZone
  ) {
    this.startMonitoring();
  }

  private startMonitoring() {
    console.log(this.warningTimer);
    this.ngZone.runOutsideAngular(() => {
      ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'].forEach(event =>
        window.addEventListener(event, () => {
          this.ngZone.run(() => this.resetTimers());
        })
      );
    });
    
    this.resetTimers(); // primer set de timers
  }

  public resetTimers() {
    this.clearTimers();

    console.log('🔁 Timers reiniciados');

    this.warningTimer = setTimeout(() => {
      console.log('⚠️ Mostrando modal de inactividad');
      this.ngZone.run(() => alert('Inactividad detectada'));
    }, this.warningMinutes * 60 * 1000);

    this.logoutTimer = setTimeout(() => {
      console.log('⛔ Cerrando sesión por inactividad');
      localStorage.removeItem('token');
      window.location.href = '/login';
    }, this.logoutMinutes * 60 * 1000);
  }

  private clearTimers() {
    if (this.warningTimer) clearTimeout(this.warningTimer);
    if (this.logoutTimer) clearTimeout(this.logoutTimer);
  }

  public cancelLogoutTimer() {
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
      console.log('⏹️ Logout cancelado temporalmente');
    }
  }
}
