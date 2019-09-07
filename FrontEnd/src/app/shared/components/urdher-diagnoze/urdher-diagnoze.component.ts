import { Component, Input, Output, ViewChild, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UrdherDiagnoze, KlientApi, Perfaqesues, Mjeti, PerdoruesApi, Klient, PerfaqesuesApi, MjetiApi, Perdorues, LoopBackAuth, UrdherDiagnozeApi } from '../../sdk';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
@Component({
    selector: 'app-urdher-diagnoze',
    templateUrl: 'urdher-diagnoze.component.html',
    styleUrls: ['urdher-diagnoze.component.scss']
})
export class UrdherDiagnozeComponent implements OnInit {
    @Input() showUrdherDiag: boolean;
    @Output() hapMbyllUDNgaSelf = new EventEmitter();
    @Output() shtoUrdheraDiag = new EventEmitter<UrdherDiagnoze>();

    @ViewChild('instance', { static: false }) instance: NgbTypeahead;
    focus$ = new Subject<string>();
    click$ = new Subject<string>();

    public urdherDiagnoze: UrdherDiagnoze;
    public urdheraDiagnoze: UrdherDiagnoze[];
    public klientet: Klient[];
    public klient: Klient;
    public perfaqesuesitEklientit: Perfaqesues[];
    public mjetetEklientit: Mjeti[];
    public perdoruesit: Perdorues[];
    public prioriteti = 5;
    public showNewPerdorues: boolean;
    public showNewKlient: boolean;
    public showNewPerfaqesues: boolean;
    public showNewMjet: boolean;
    public klientIzgjedhur: boolean = false;
    public urdheDiagForm: FormGroup;

    constructor(
        private _fb: FormBuilder,
        private _klient: KlientApi,
        private _perfaqesues: PerfaqesuesApi,
        private _mjeti: MjetiApi,
        private _perdoruesi: PerdoruesApi,
        private _urdherDiagnoze: UrdherDiagnozeApi,
        private _auth: LoopBackAuth,
    ) {
    }

    search = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
        const inputFocus$ = this.focus$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
            map(term => (term === '' ? this.klientet
                : this.klientet.filter(v => v.emer.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
        );
    }

    formatter = (x: { emer: string }) => x.emer;

    toggle() {
        this.hapMbyllUDNgaSelf.emit(this.showUrdherDiag = !this.showUrdherDiag);
    }

    regUrdherDiagnoze(ev, urdheDiagForm) {
        ev.preventDefault();
        if (this.urdheDiagForm.valid) {
            let newUrdherdiagnoze = new UrdherDiagnoze({
                klientId: urdheDiagForm.klient.id,
                perfaqesuesId: urdheDiagForm.perfaqesues,
                mjetiId: urdheDiagForm.mjeti,
                perdoruesId: urdheDiagForm.destinuarPer,
                prioriteti: urdheDiagForm.prioriteti,
                leshoi: this._auth.getCurrentUserId(),
                pershkrim: urdheDiagForm.pershkrim,
                statusi: 1
            });
            this._urdherDiagnoze.create(newUrdherdiagnoze).subscribe((res: UrdherDiagnoze) => {
                this._urdherDiagnoze.findOne({ where: { id: res.id }, include: ["perdorues", "mjeti", "klient"] }).subscribe((res: UrdherDiagnoze) => {
                    this.toggle();
                    this.shtoUrdheraDiag.emit(res);
                    this.urdheDiagForm.reset();
                })
            });
        }
    }

    hapMbyllNgaNPChild(ev) {
        this.showNewPerdorues = ev;
    }

    shtoPerdorues(ev: Perdorues) {
        this.perdoruesit.push(ev);
    }

    hapMbyllNgaNKChild(ev) {
        this.showNewKlient = ev;
    }

    shtoKlient(ev: Klient) {
        this.klientet.push(ev);
    }

    hapMbyllNgaNPFChild(ev) {
        this.showNewPerfaqesues = ev;
    }

    shtoPerfaqesues(ev: Perfaqesues) {
        this.perfaqesuesitEklientit.push(ev);
    }

    hapMbyllNgaNMChild(ev) {
        this.showNewMjet = ev;
    }

    shtoMjet(ev: Mjeti) {
        this.mjetetEklientit.push(ev);
    }

    ngOnInit() {
        // this._urdherDiagnoze.find().subscribe((res: UrdherDiagnoze[]) => {
        //     this.urdheraDiagnoze = res;
        // })
        this.urdheDiagForm = this._fb.group({
            "klient": [null, Validators.required],
            "perfaqesues": [{ value: "", disabled: true }, null],
            "mjeti": [{ value: "", disabled: true }, Validators.required],
            "destinuarPer": [{ value: "", disabled: true }, Validators.required],
            "prioriteti": [{ value: 5, disabled: true }, null],
            "pershkrim": [null, null],
        })

        this._klient.find({ include: ["mjetet", "perfaqesues"] }).subscribe((res: Klient[]) => {
            this.klientet = res;
        })
        this._perdoruesi.find({ where: { mekanik: true } }).subscribe((res: Perdorues[]) => {
            this.perdoruesit = res;
        })
        this.urdheDiagForm.controls.klient.valueChanges.subscribe((value: Klient) => {
            if (typeof value === 'object' && value !== null) {
                this.klient = value;
                this.mjetetEklientit = this.klient.mjetet;
                this.perfaqesuesitEklientit = this.klient.perfaqesues;
                this.urdheDiagForm.controls.perfaqesues.enable()
                this.urdheDiagForm.controls.perfaqesues.setValue(null)
                this.urdheDiagForm.controls.mjeti.enable()
                this.urdheDiagForm.controls.prioriteti.enable()
                this.urdheDiagForm.controls.mjeti.setValue(null)
                this.urdheDiagForm.controls.destinuarPer.enable()
                this.urdheDiagForm.controls.destinuarPer.setValue(null)
                this.klientIzgjedhur = true;

            } else {
                this.urdheDiagForm.controls.prioriteti.disable()
                this.urdheDiagForm.controls.perfaqesues.disable()
                this.urdheDiagForm.controls.mjeti.disable()
                this.urdheDiagForm.controls.destinuarPer.disable()
                this.klientIzgjedhur = false;
            }
        })
        this.urdheDiagForm.controls.prioriteti.valueChanges.subscribe((value) => {
            this.prioriteti = value;
        })
    }
}