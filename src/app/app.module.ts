import { BrowserModule, Title } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpModule, Http, RequestOptions } from "@angular/http";
import { AuthHttp } from "angular2-jwt";
import { FormsModule } from "@angular/forms";
import { ChartsModule } from "ng2-charts";

import { authHttpFactory } from "./auth/auth-http.factory";
import "hammerjs";
import { AuthGuard } from "./auth/auth.guard";

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
import { PollComponent } from "./pages/poll/poll.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CallbackComponent,
    LoadingComponent,
    PollComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ChartsModule
  ],
  providers: [
    AuthGuard,
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
