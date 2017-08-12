import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LoadingComponent } from "./loading.component";
import { ForbiddenValidatorDirective } from "./forbidden-word.directive";

@NgModule({
  imports: [CommonModule],
  exports: [LoadingComponent],
  declarations: [LoadingComponent, ForbiddenValidatorDirective],
  providers: []
})
export class SharedModule {}
