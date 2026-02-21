import { Component, signal } from '@angular/core';
import { NavBar } from './shared/components/nav-bar/nav-bar';
import { HeroComponent } from './shared/components/hero-component/hero-component';
import { LanguageService } from './core/services/language-service';
import { AboutMeComponent } from './shared/components/about-me-component/about-me-component';
import { SkillsComponent } from './shared/components/skills-component/skills-component';
import { ProjectsComponent } from './shared/components/projects-component/projects-component';
import { ContactComponent } from './shared/components/contact-component/contact-component';
import { FooterComponent } from './shared/components/footer-component/footer-component';


@Component({
  selector: 'app-root',
  imports: [NavBar, HeroComponent, AboutMeComponent, SkillsComponent, ProjectsComponent, ContactComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('portfolio');

  constructor(private languageService: LanguageService) {}
}
