import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly STORAGE_KEY = 'app-theme';

  private _isLight = signal<boolean>(true);
  isLight = this._isLight.asReadonly();

  theme = computed(() => (this._isLight() ? 'light' : 'dark'));

  constructor() {
    this.initTheme();
  }

  private initTheme(): void {
    const savedTheme = localStorage.getItem(this.STORAGE_KEY);
    const isLight = savedTheme ? savedTheme === 'light' : true;

    this.setTheme(isLight);
  }

  toggleTheme(): void {
    this.setTheme(!this._isLight());
  }

  private setTheme(isLight: boolean): void {
    this._isLight.set(isLight);

    localStorage.setItem(this.STORAGE_KEY, isLight ? 'light' : 'dark');

    document.body.classList.toggle('light-theme', isLight);
  }
}
