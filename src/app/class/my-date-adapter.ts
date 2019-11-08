import { NativeDateAdapter } from "@angular/material";
import { OnInit } from '@angular/core';


export class MyDateAdapter extends NativeDateAdapter implements OnInit {

    ngOnInit() {
        this.setLocale('vi');
    }
}

export const MY_DATE_FORMATS = {
    parse: {
        dateInput: 'DD/MM/YYYY',
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MM/YYYY',
        dateA11yLabel: 'DD/MM/YYYY',
        monthYearA11yLabel: 'MM/YYYY',
    },
};
