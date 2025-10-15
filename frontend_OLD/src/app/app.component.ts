import { Component } from '@angular/core';
import { UserActivityService } from './core/services/user-activity.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';

  constructor(private userActivityService: UserActivityService){ }

   ngOnInit(): void {
    this.loadFlowbiteScript();
  }

  loadFlowbiteScript(): void {
    const scriptId = 'flowbite-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.src = 'assets/flowbite.min.js';
      script.id = scriptId;
      script.defer = true;
      document.body.appendChild(script);
    }
  }
}
