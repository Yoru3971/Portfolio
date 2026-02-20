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
    // Closes the mobile menu automatically if the user starts scrolling
    this.closeMenu();

    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

    // If we are at the very top (Hero section), clear the active section
    if (scrollPosition < 200) {
      this.currentSection = '';
      return;
    }

    // Array of sections to track
    const sections = ['about', 'skills', 'projects', 'contact'];
    // Increased offset to sync perfectly with the CSS scroll-margin-top
    const offset = 200;

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
