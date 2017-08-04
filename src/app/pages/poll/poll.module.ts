import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChartsModule } from "ng2-charts";

import { SharedModule } from "./../../shared/shared.module";

import { PollComponent } from "./poll.component";
import { PollRoutingModule } from "./poll-routing.module";

@NgModule({
  imports: [CommonModule, SharedModule, PollRoutingModule, ChartsModule],
  declarations: [PollComponent]
})
export class PollModule {}
