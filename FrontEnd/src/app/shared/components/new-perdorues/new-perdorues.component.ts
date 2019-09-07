import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PerdoruesApi, Perdorues, LoopBackAuth, RoleApi, Role, RoleMappingApi } from '../../sdk';

@Component({
    selector: 'app-new-perdorues',
    templateUrl: './new-perdorues.component.html',
    styleUrls: ['./new-perdorues.component.scss']
})
export class NewPerdoruesComponent implements OnInit {
    @Input() showNewPerdorues: boolean;
    @Output() hapMbyllNPNgaSelf = new EventEmitter();
    @Output() shtoPerdorues = new EventEmitter<Perdorues>();

    public rolet: Role[];
    public newPerdoruesForm: FormGroup;
    public shtoRolePerdoruesit: Role[] = [];

    public randomPass = Math.random().toString(36).substr(2, 6);


    constructor(
        private _fb: FormBuilder,
        private _perdorues: PerdoruesApi,
        private _auth: LoopBackAuth,
        private _rolet: RoleApi,
        private _roletMapp: RoleMappingApi,
    ) {
    }

    toggle() {
        this.hapMbyllNPNgaSelf.emit(this.showNewPerdorues = !this.showNewPerdorues);
    }

    onRoleAdded(ev, role: Role) {
        ev.target.checked ? this.shtoRolePerdoruesit.push(role) : this.shtoRolePerdoruesit = this.shtoRolePerdoruesit.filter((roli) => { return roli.id !== role.id });
    }

    regNewPerdorues(ev: any, newPerdoruesForm: Perdorues) {
        ev.preventDefault();
        if (this.newPerdoruesForm.valid) {
            let shtoRolePerdoruesit = [...this.shtoRolePerdoruesit];
            let eshteMekanik = this.shtoRolePerdoruesit.map(function (roli) { return roli.name; }).indexOf('mekanik');
            if (eshteMekanik !== -1) newPerdoruesForm.mekanik = true;
            newPerdoruesForm.username = newPerdoruesForm.emer.toLocaleLowerCase() + "." + newPerdoruesForm.mbiemer.toLocaleLowerCase();
            this._perdorues.create(newPerdoruesForm).subscribe((res: Perdorues) => {
                console.log(res);
                this.shtoRolePerdoruesit = [];
                this.shtoPerdorues.emit(res);
                this.newPerdoruesForm.reset();
                this.toggle();
                shtoRolePerdoruesit.forEach((role: Role) => {
                    this._roletMapp.create({
                        principalType: "USER",
                        principalId: res.id,
                        roleId: role.id
                    }).subscribe()
                })
            })
        }
    }
    ngOnInit() {
        this._rolet.find({ where: { name: { neq: "root" } } }).subscribe((res: Role[]) => {
            this.rolet = res;
        })
        this.newPerdoruesForm = this._fb.group({
            "emer": [null, Validators.required],
            "mbiemer": [null, Validators.required],
            "email": [null, Validators.required],
            "telefon": [null, Validators.required],
            "adresa": [],
            "password": [null, Validators.required],
        })
    }

}

