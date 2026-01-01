import { AbstractControl } from "@angular/forms";

export function lengthValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (!control.value) return null;
    if (control.value.length < 8 || control.value.length > 16) {
        return { lengthError: true }
    }
    return null;
}