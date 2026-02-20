import { Component, signal } from '@angular/core';
import { NavBar } from './shared/components/nav-bar/nav-bar';
import { HeroComponent } from './shared/components/hero-component/hero-component';
import { LanguageService } from './core/services/language-service';

@Component({
  selector: 'app-root',
  imports: [NavBar, HeroComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('portfolio');

  constructor(private languageService: LanguageService) {}
}
