import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme-service';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../core/services/language-service';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule, TranslateModule],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
  currentSection: string = '';
  isMenuOpen: boolean = false;

  constructor(
    public themeService: ThemeService,
    public languageService: LanguageService,
  ) {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleLanguage(): void {
    this.languageService.toggleLanguage();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.closeMenu();
    const sections = ['about', 'skills', 'projects', 'contact'];
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    const offset = 150;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const top = element.offsetTop - offset;
        const bottom = top + element.offsetHeight;

        if (scrollPosition >= top && scrollPosition < bottom) {
          this.currentSection = section;
        }
      }
    }
  }
}