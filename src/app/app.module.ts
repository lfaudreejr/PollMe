import { BrowserModule, Title } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpModule, Http, RequestOptions } from "@angular/http";
import { AuthHttp } from "angular2-jwt";
import { FormsModule } from "@angular/forms";

import { authHttpFactory } from "./auth/auth-http.factory";
import "hammerjs";

import { AuthService } from "./auth/auth.service";
import { ApiService } from "./core/api.service";
import { UtilsService } from "./core/utils.service";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./pages/home/home.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { CallbackComponent } from "./pages/callback/callback.component";
import { LoadingComponent } from "./core/loading.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CallbackComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [
    Title,
    AuthService,
    {
      provide: AuthHttp,
      useFactory: authHttpFactory,
      deps: [Http, RequestOptions]
    },
    ApiService,
    UtilsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
