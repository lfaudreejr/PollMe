import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CreatePollComponent } from "./create-poll.component";

const pollRoutes: Routes = [
  {
    path: "",
    component: CreatePollComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(pollRoutes)],
  exports: [RouterModule]
})
export class CreatePollRoutingModule {}
