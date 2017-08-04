import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Components
import { HomeComponent } from "./pages/home/home.component";
import { CallbackComponent } from "./pages/callback/callback.component";
import { PollComponent } from "./pages/poll/poll.component";
import { CreatePollComponent } from "./pages/create-poll/create-poll.component";

import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "callback",
    component: CallbackComponent
  },
  {
    path: "profile",
    loadChildren: "./pages/profile/profile.module#ProfileModule"
  },
  {
    path: "poll/:id",
    loadChildren: "./pages/poll/poll.module#PollModule"
  },
  {
    path: "create",
    loadChildren: "./pages/create-poll/create-poll.module#CreatePollModule",
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
