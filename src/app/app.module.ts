import { BrowserModule, Title } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpModule, Http, RequestOptions } from "@angular/http";
import { AuthHttp } from "angular2-jwt";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ChartsModule } from "ng2-charts";
import { MaterialModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import "hammerjs";

import { authHttpFactory } from "./auth/auth-http.factory";
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
import { ProfileComponent } from "./pages/profile/profile.component";
import { CreatePollComponent } from "./pages/create-poll/create-poll.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CallbackComponent,
    LoadingComponent,
    PollComponent,
    ProfileComponent,
    CreatePollComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
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
