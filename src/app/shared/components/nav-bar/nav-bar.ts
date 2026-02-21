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

  // Getter for dynamic CV URL based on current language
  get cvUrl(): string {
    return this.languageService.isEnglish()
      ? 'assets/docs/CV_EmilianoDaverio_EN_2026.pdf'
      : 'assets/docs/CV_EmilianoDaverio_ES_2026.pdf';
  }

  downloadCV(): void {
    const link = document.createElement('a');
    link.href = this.cvUrl;
    link.download = this.languageService.isEnglish()
      ? 'Emiliano_Daverio_CV_EN_2026.pdf'
      : 'Emiliano_Daverio_CV_ES_2026.pdf';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

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
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

    if (scrollPosition < 200) {
      this.currentSection = '';
      return;
    }

    const sections = ['about', 'skills', 'projects', 'contact'];
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
