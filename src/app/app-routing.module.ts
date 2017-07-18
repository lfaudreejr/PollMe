import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Components
import { HomeComponent } from "./pages/home/home.component";
import { CallbackComponent } from "./pages/callback/callback.component";
import { PollComponent } from "./pages/poll/poll.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: []
  },
  {
    path: "callback",
    component: CallbackComponent
  },
  {
    path: "poll/:id",
    component: PollComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
