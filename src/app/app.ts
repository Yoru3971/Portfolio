import { Component, signal } from '@angular/core';
import { NavBar } from './shared/components/nav-bar/nav-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [NavBar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('portfolio');

  constructor(private translate: TranslateService) {
    // Adds the languages you will support
    this.translate.addLangs(['es', 'en']);
    
    // Sets the fallback language
    this.translate.setDefaultLang('es');

    // Sets the active language
    this.translate.use('es');
  }
}
