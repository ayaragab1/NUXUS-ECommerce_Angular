import { TranslateHttpLoader } from "@ngx-translate/http-loader";
    import { HttpClient } from "@angular/common/http";


    //responsilbe for loading translation files 
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "/i18n/", ".json");
}



