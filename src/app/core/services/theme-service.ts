import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isLightMode = new BehaviorSubject<boolean>(false);
  isLightMode$ = this.isLightMode.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.detectSystemPreference();
    }
  }

  toggleTheme(): void {
    const newValue = !this.isLightMode.value;
    this.isLightMode.next(newValue);
    if (isPlatformBrowser(this.platformId)) {
      this.applyTheme(newValue);
    }
  }

  private applyTheme(isLight: boolean): void {
    if (isLight) {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }

  private detectSystemPreference(): void {
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    this.isLightMode.next(prefersLight);
    this.applyTheme(prefersLight);
  }
}
