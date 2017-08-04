import { BrowserModule, Title } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpModule, Http, RequestOptions } from "@angular/http";
import { AuthHttp } from "angular2-jwt";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { CoreModule } from "./core/core.module";
import { authHttpFactory } from "./auth/auth-http.factory";
import { AuthGuard } from "./auth/auth.guard";
import { AuthService } from "./auth/auth.service";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./pages/home/home.component";
import { CallbackComponent } from "./pages/callback/callback.component";

@NgModule({
  declarations: [AppComponent, HomeComponent, CallbackComponent],
  imports: [
    CommonModule,
    BrowserModule,
    CoreModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [
    AuthGuard,
    Title,
    AuthService,
    {
      provide: AuthHttp,
      useFactory: authHttpFactory,
      deps: [Http, RequestOptions]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
