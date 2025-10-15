import { Injectable, NgZone } from '@angular/core';
import { fromEvent, merge, Subscription, timer } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IdleService {
  private totalTimeout = 5 * 60; // 5 minutos (segundos)
  private warningOffset = 2 * 60; // mostrar modal cuando queden 2 min
  private activitySub?: Subscription;
  private countdownSub?: Subscription;

  constructor(private zone: NgZone) {}

  startWatching(
    onWarning: (secondsLeft: number) => void,
    onTimeout: () => void
  ) {
    const activity$ = merge(
      fromEvent(document, 'mousemove'),
      fromEvent(document, 'keydown'),
      fromEvent(document, 'click'),
      fromEvent(document, 'scroll')
    );

    // reinicia contador ante cualquier actividad
    this.zone.runOutsideAngular(() => {
      this.activitySub = activity$.subscribe(() => this.resetTimer(onWarning, onTimeout));
    });

    this.resetTimer(onWarning, onTimeout);
  }

  private resetTimer(onWarning: (s: number) => void, onTimeout: () => void) {
    this.countdownSub?.unsubscribe();

    this.countdownSub = timer(0, 1000).subscribe(elapsed => {
      const remaining = this.totalTimeout - elapsed;

      // cuando quedan 2 min o menos, avisar cada segundo
      if (remaining <= this.warningOffset && remaining > 0) {
        this.zone.run(() => onWarning(remaining));
      }

      // se acabó el tiempo
      if (remaining <= 0) {
        this.zone.run(() => onTimeout());
        this.countdownSub?.unsubscribe();
      }
    });
  }

  stopWatching() {
    this.activitySub?.unsubscribe();
    this.countdownSub?.unsubscribe();
  }
}
