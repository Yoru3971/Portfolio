import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ThemeService } from '../../../core/services/theme-service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule, TranslateModule],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar implements OnInit {
  isLight$!: Observable<boolean>;
  currentSection: string = '';
  isEnglish: boolean = false;

  constructor(
    private themeService: ThemeService,
    public translate: TranslateService,
  ) {
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');
    this.translate.use('es');
    this.isEnglish = this.translate.currentLang === 'en';
  }

  ngOnInit(): void {
    this.isLight$ = this.themeService.isLightMode$;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleLanguage(): void {
    const newLang = this.translate.currentLang === 'en' ? 'es' : 'en';
    this.translate.use(newLang);
    this.isEnglish = newLang === 'en';
  }
  @HostListener('window:scroll')
  onScroll(): void {
    const sections = ['about', 'projects', 'contact'];
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
