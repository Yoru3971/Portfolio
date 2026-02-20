import { Component, signal } from '@angular/core';
import { NavBar } from './shared/components/nav-bar/nav-bar';
import { HeroComponent } from './shared/components/hero-component/hero-component';
import { LanguageService } from './core/services/language-service';
import { AboutMeComponent } from './shared/components/about-me-component/about-me-component';
import { SkillsComponent } from './shared/components/skills-component/skills-component';

@Component({
  selector: 'app-root',
  imports: [NavBar, HeroComponent, AboutMeComponent, SkillsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('portfolio');

  constructor(private languageService: LanguageService) {}
}
