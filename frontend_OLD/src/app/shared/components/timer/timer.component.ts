import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {
    @Input() timeLeft: number = 60; // segundos
    private subscription!: Subscription;

    ngOnInit() {
        this.startCountdown();
    }

    startCountdown() {
        this.subscription = interval(1000).subscribe(() => {
        if (this.timeLeft > 0) {
            this.timeLeft--;
        } else {
            this.subscription.unsubscribe();
            // Aquí puedes disparar una acción cuando llegue a 0
        }
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    get displayTime(): string {
        const min = Math.floor(this.timeLeft / 60);
        const sec = this.timeLeft % 60;
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    }

    /** 👉 true cuando falten 2 minutos o menos */
    get showTimer(): boolean {
        return this.timeLeft <= 120;
    }
}