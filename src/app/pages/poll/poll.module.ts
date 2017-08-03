import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChartsModule } from "ng2-charts";

import { PollComponent } from "./poll.component";
import { PollRoutingModule } from "./poll-routing.module";

@NgModule({
  imports: [CommonModule, PollRoutingModule, ChartsModule],
  declarations: [PollComponent]
})
export class PollModule {}
