import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer-component',
  imports: [TranslateModule],
  templateUrl: './footer-component.html',
  styleUrl: './footer-component.css',
})
export class FooterComponent {
  // Gets the current year dynamically so never have to update it manually
  currentYear: number = new Date().getFullYear();
}
