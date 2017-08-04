import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChartsModule } from "ng2-charts";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "./../../shared/shared.module";

import { CreatePollRoutingModule } from "./create-poll-routing.module";
import { CreatePollComponent } from "./create-poll.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CreatePollRoutingModule,
    ChartsModule
  ],
  declarations: [CreatePollComponent]
})
export class CreatePollModule {}
