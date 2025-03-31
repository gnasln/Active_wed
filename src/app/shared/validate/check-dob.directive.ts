import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateOfBirthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const date = new Date(control.value);
        const today = new Date();
        const age = today.getFullYear() - date.getFullYear();
        
        if (isNaN(date.getTime())) {
            return { invalidDate: true };
        }
        
        if (age < 0 || age > 120) {
            return { invalidAge: true };
        }
        
        return null;
    };
}