import { isPlatformBrowser } from '@angular/common';
import {
  Inject,
  Injectable,
  PLATFORM_ID,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root',
})
export class MyTranslateService {
  private rendrer: Renderer2; 
  constructor(
    private translateService: TranslateService,
    @Inject(PLATFORM_ID) private platId: object,
    private rendrerFactory: RendererFactory2
  ) {
    this.rendrer = rendrerFactory.createRenderer(null, null);
    if (isPlatformBrowser(this.platId)) {
      // Browser

      // this language will be used as a fallback when a translation isn't found in the current language this._TranslateService.setDefaultLang(  'en'  );
      //1- set default lang
      this.translateService.setDefaultLang('en');
      //2- get lang from localStorage
      const savedLang = localStorage.getItem('lang');
      //3- use language if found
      if (savedLang) {
        this.translateService.use(savedLang);
      }

      //to change direction
      this.changeDirection();
    }
  }

  changeDirection(): void {
    if (localStorage.getItem('lang') === 'en') {
      // dir ltr
      this.rendrer.setAttribute(document.documentElement, 'dir', 'ltr');
    } else if (localStorage.getItem('lang') === 'ar') {
      //dir rtl
      this.rendrer.setAttribute(document.documentElement, 'dir', 'rtl');
    }
  }

  changeLang(lang: string): void {
    if (isPlatformBrowser(this.platId)) {
      localStorage.setItem('lang', lang);
    }

    this.translateService.use(lang);
    this.changeDirection();
  }
}
