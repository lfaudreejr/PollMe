import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PollComponent } from "./poll.component";

const pollRoutes: Routes = [{ path: "", component: PollComponent }];

@NgModule({
  imports: [RouterModule.forChild(pollRoutes)],
  exports: [RouterModule]
})
export class PollRoutingModule {}
