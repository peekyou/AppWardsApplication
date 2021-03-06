import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ConfigurationService } from '../../../core/services/configuration.service';
import { UnregisteredCustomerDialogComponent } from '../unregistered-customer/unregistered-customer.component';
import { AuthService } from '../auth.service';
import { UserService } from '../../../core/services/user.service';
import { formatPhone } from '../../../core/helpers/utils';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loading = false;
    mobileError: boolean = false;
    firstname = this.fb.control(null, Validators.required);
    lastname = this.fb.control(null, Validators.required);
    mobile = this.fb.control(null, Validators.required);

    form = this.fb.group({
        // firstname: this.firstname,
        // lastname: this.lastname,
        mobile: this.mobile,
    });
     
    constructor(
        private dialog: MatDialog,
        private fb: FormBuilder, 
        private authService: AuthService,
        private router: Router, 
        private userService: UserService,
        public s: ConfigurationService) { 

            if (authService.isAuthenticated()) {
                router.navigate(['/loyaltycard']);
            }

            // Redirect to otp page if the user has entered a mobile
            // because iOS reload the app when it's minimized
            var mobile = authService.getMobile();
            if (mobile) {
                this.authService.setMobile(mobile);
                this.router.navigate(['/otp'], { queryParamsHandling: "merge" });
            }
        }

    ngOnInit() {
    }
    
    sendOptCode() {
        this.mobileError = false;
        this.loading = true;
        var mobile = formatPhone(this.mobile.value);
        this.authService
            .sendOtpCode(mobile)
            .subscribe(res => {
                this.loading = false;
                this.authService.setMobile(mobile);
                this.router.navigate(['/otp'], { queryParamsHandling: "merge" });
            },
            err => {
                this.loading = false;
                if (err.error && err.error.errorCode === 'UnregisteredCustomer') {
                    this.openUnregisteredCustomerDialog();
                }
                else {
                    this.mobileError = true;
                }
            });
    }

    openUnregisteredCustomerDialog() {
        this.dialog.open(UnregisteredCustomerDialogComponent, {
            width: "250px",
            autoFocus: false
        });
    }
}