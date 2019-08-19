import { Component, OnInit } from '@angular/core';
import { AmUser, AmUserApi } from 'src/app/shared/sdk';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { CustomValidators } from 'ng2-validation';
import { ToastModel } from 'src/app/shared/msInterfaces/interfaces';
import { MsToasterService } from 'src/app/shared/services/mstoaster.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    private user: AmUser;
    // private userDataForm: FormGroup;
    private loading: boolean = false;
    private toast: ToastModel;
    private emailError: boolean = false;
    private passowrdError: boolean = false;
    private usernameError: boolean = false;
    private error: {};


    bsValue = new Date();
    bsConfig = {
        containerClass: 'theme-blue',
        isAnimated: true,
        dateInputFormat: 'DD-MM-YYYY'
    }

    constructor(
        private _amUser: AmUserApi,
        // private fb: FormBuilder,
        private _msToasterService: MsToasterService,
    ) {

    }

    submitForm($ev: any, user: AmUser): void {
        // $ev.preventDefault();
        // for (let c in this.userDataForm.controls) {
        //     this.userDataForm.controls[c].markAsTouched();
        // }
        // if (this.userDataForm.valid) { }
    }

    ngOnInit() {
        this._amUser.getCurrent().subscribe((res: AmUser) => {
            this.user = res;
            
        }, (err) => {

        }, () => {
            // this.initUserDataForm();
        })
    }

    initUserDataForm() {
        // this.userDataForm = this.fb.group({
        //     'emer': [{ value: this.user.emer, disabled: false }, [Validators.required]],
        //     'mbiemer': [null, Validators.required],
        //     'datelindja': [null, null],
        //     'username': [null, Validators.required],
        //     'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
        //     'telefon': [null, null],
        //     'adresa': [null, null],
        //     'password': [null, Validators.required],
        // });
    }
}
