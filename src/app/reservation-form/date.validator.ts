import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function checkInBeforeCheckOutValidator() : ValidatorFn {
    return (group: AbstractControl) : ValidationErrors | null => {
        const checkInDate = group.get('checkInDate')?.value;
        const checkOutDate = group.get('checkOutDate')?.value;

        return checkInDate && checkOutDate && checkInDate > checkOutDate
        ? { checkInBeforeCheckOut: true }
        : null;
    }
}