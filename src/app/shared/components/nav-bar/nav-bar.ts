import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ThemeService } from '../../../core/services/theme-service';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar implements OnInit {
  isLight$!: Observable<boolean>;
  currentSection: string = '';

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.isLight$ = this.themeService.isLightMode$;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const sections: string[] = ['about', 'projects', 'contact'];
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
