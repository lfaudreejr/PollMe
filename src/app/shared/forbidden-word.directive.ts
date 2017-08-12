import { Directive, Input, OnChanges, SimpleChanges } from "@angular/core";
import {
  AbstractControl,
  NG_VALIDATORS,
  Validator,
  ValidatorFn,
  Validators
} from "@angular/forms";

export function forbiddenWordValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? { forbiddenWord: { value: control.value } } : null;
  };
}

@Directive({
  selector: "[forbiddenWord]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ForbiddenValidatorDirective,
      multi: true
    }
  ]
})
export class ForbiddenValidatorDirective implements Validator {
  @Input() forbiddenWord: string;

  validate(control: AbstractControl): { [key: string]: any } {
    return this.forbiddenWord
      ? forbiddenWordValidator(new RegExp(this.forbiddenWord, "i"))(control)
      : null;
  }
}
