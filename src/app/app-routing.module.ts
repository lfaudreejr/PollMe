import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Components
import { HomeComponent } from "./pages/home/home.component";
import { CallbackComponent } from "./pages/callback/callback.component";
import { PollComponent } from "./pages/poll/poll.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { CreatePollComponent } from "./pages/create-poll/create-poll.component";

import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "callback",
    component: CallbackComponent
  },
  {
    path: "poll/:id",
    component: PollComponent
  },
  {
    path: "create",
    component: CreatePollComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "**",
    redirectTo: "",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule {}
