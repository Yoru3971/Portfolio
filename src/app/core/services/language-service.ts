import { Injectable, signal, computed } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly STORAGE_KEY = 'app-language';

  // internal signal
  private _currentLang = signal<string>('es');

  // readonly exposure
  currentLang = this._currentLang.asReadonly();

  // derived state
  isEnglish = computed(() => this._currentLang() === 'en');

  constructor(private translate: TranslateService) {
    this.initLanguage();
  }

  private initLanguage(): void {
    this.translate.addLangs(['es', 'en']);
    this.translate.setFallbackLang('es');

    const savedLang = localStorage.getItem(this.STORAGE_KEY);
    const browserLang = this.translate.getBrowserLang();

    const initialLang = savedLang || (browserLang?.match(/es|en/) ? browserLang : 'es');

    this.setLanguage(initialLang);
  }

  setLanguage(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem(this.STORAGE_KEY, lang);
    this._currentLang.set(lang);
  }

  toggleLanguage(): void {
    const newLang = this._currentLang() === 'en' ? 'es' : 'en';
    this.setLanguage(newLang);
  }
}
