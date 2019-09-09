import { Component, Input, Output, ViewChild, OnInit, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UrdherDiagnoze, KlientApi, Perfaqesues, Mjeti, PerdoruesApi, Klient, Perdorues, LoopBackAuth, UrdherDiagnozeApi, RealTime } from '../../sdk';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
@Component({
    selector: 'app-new-urdher-diag',
    templateUrl: './new-urdher-diag.component.html',
    styleUrls: ['./new-urdher-diag.component.scss']
})
export class NewUrdherDiagComponent implements OnInit, OnChanges {
    @Input() showUrdherDiag: boolean;
    @Input() urdherDiag: UrdherDiagnoze;
    @Output() hapMbyllUDNgaSelf = new EventEmitter();
    @Output() shtoUrdheraDiag = new EventEmitter<UrdherDiagnoze>();

    @ViewChild('instance', { static: false }) instance: NgbTypeahead;
    focus$ = new Subject<string>();
    click$ = new Subject<string>();

    public urdherDiagnoze: UrdherDiagnoze;
    public urdheraDiagnoze: UrdherDiagnoze[];
    public klientet: Klient[];
    public klient: Klient;
    public perfaqesuesitEklientit: Perfaqesues[] = [];
    public mjetetEklientit: Mjeti[];
    public perdoruesit: Perdorues[];
    public prioriteti = 5;
    public showNewPerdorues: boolean;
    public showNewKlient: boolean;
    public showNewPerfaqesues: boolean;
    public showNewMjet: boolean;
    public klientIzgjedhur: boolean = false;
    public urdheDiagForm: FormGroup;
    public fshiKonfirm: boolean = false;
    constructor(
        private _fb: FormBuilder,
        private _klient: KlientApi,
        private _perdoruesi: PerdoruesApi,
        private _urdherDiagnoze: UrdherDiagnozeApi,
        private _auth: LoopBackAuth,
        private _rt: RealTime,
    ) {
    }

    search = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
        const inputFocus$ = this.focus$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
            map(term => (term === '' ? this.klientet : this.klientet.filter(v => v.emer.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
        );
    }

    formatter = (x: { emer: string }) => x.emer;

    toggle() {
        this.fshiKonfirm = false;
        this.hapMbyllUDNgaSelf.emit(this.showUrdherDiag = !this.showUrdherDiag);
    }

    regUrdherDiagnoze(ev, urdheDiagForm) {
        ev.preventDefault();
        if (this.urdheDiagForm.valid) {
            let klient = { ...this.klient };
            if (this.urdherDiag.id) {
                urdheDiagForm.klient = this.urdherDiag.klient;
                urdheDiagForm.mjeti = this.urdherDiag.mjeti
                urdheDiagForm.statusi = this.urdherDiag.statusi;
            }
            let newUrdherdiagnoze = new UrdherDiagnoze({
                klientId: urdheDiagForm.klient.id,
                perfaqesuesId: urdheDiagForm.perfaqesues !== null && typeof urdheDiagForm.perfaqesues !== 'undefined' ? urdheDiagForm.perfaqesues.id : null,
                mjetiId: urdheDiagForm.mjeti.id,
                perdoruesId: urdheDiagForm.destinuarPer.id,
                prioriteti: urdheDiagForm.prioriteti || 2,
                leshoi: this._auth.getCurrentUserId(),
                pershkrim: urdheDiagForm.pershkrim,
                statusi: urdheDiagForm.statusi
            });

            this.urdherDiag.id ? newUrdherdiagnoze.id = this.urdherDiag.id : null;

            if (this.janeNjelloj(newUrdherdiagnoze, this.urdherDiag)) {
                this.urdheDiagForm.reset();
                this.toggle();
                console.log("UrdheraDiagnoze jane Njelloj")
            } else {
                this._urdherDiagnoze.upsert(newUrdherdiagnoze).subscribe((res: UrdherDiagnoze) => {
                    let perRT = { ...res };
                    let mjeti = klient.mjetet.filter((mjet) => { return mjet.id === urdheDiagForm.mjeti.id });
                    let perdorues = this.perdoruesit.filter((perdorues) => { return perdorues.id === urdheDiagForm.destinuarPer.id });
                    let perfaqesues = klient.perfaqesues.filter((perfaqesues) => { return perfaqesues.id === urdheDiagForm.perfaqesues.id });
                    res.mjeti = mjeti[0];
                    res.perdorues = perdorues[0];
                    res.perfaqesues = perfaqesues[0];
                    delete klient.mjetet;
                    delete klient.perfaqesues;
                    res.klient = klient;
                    this.toggle();
                    this.shtoUrdheraDiag.emit(res);
                    this.urdheDiagForm.reset();
                    perRT.mjeti = mjeti[0];
                    this._rt.IO.emit("urdherPune", perRT);
                });
            }
        }
    }

    deleteUrdherDiagnoze(urdherDiag) {
        urdherDiag.delete = true;
        let urdherDiagPerRT = { ...urdherDiag };
        this._urdherDiagnoze.deleteById(urdherDiag.id).subscribe(() => {
            this.toggle();
            this.shtoUrdheraDiag.emit(urdherDiag);
            this.urdheDiagForm.reset();
        })
        delete urdherDiagPerRT.klient;
        delete urdherDiagPerRT.perfaqesues;
        delete urdherDiagPerRT.perdorues;
        this._rt.IO.emit("urdherPune", urdherDiagPerRT);

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

    clearKlient() {
        if (!this.urdherDiag.id) {
            this.urdheDiagForm.controls.klient.reset();
        }
    }

    ngOnInit() {
        this.urdheDiagForm = this._fb.group({
            "klient": [{ value: "", disabled: false }, Validators.required],
            "perfaqesues": [{ value: "", disabled: true }, null],
            "mjeti": [{ value: "", disabled: true }, Validators.required],
            "destinuarPer": [{ value: "", disabled: true }, Validators.required],
            "prioriteti": [{ value: "2", disabled: false }, null],
            "pershkrim": [null, Validators.required],
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
                this.perfaqesuesitEklientit = this.klient.perfaqesues || [];
                this.urdheDiagForm.controls.perfaqesues.enable()
                this.urdheDiagForm.controls.mjeti.enable()
                this.urdheDiagForm.controls.prioriteti.enable()
                this.urdheDiagForm.controls.destinuarPer.enable()
                this.klientIzgjedhur = true;

            }
            else {
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

    compareFn(c1: any, c2: any): boolean {
        return c1 && c2 ? c1.id === c2.id : c1 === c2;
    }

    ngOnChanges() {
        if (this.urdherDiag && Object.entries(this.urdherDiag).length !== 0) {
            let klient = this.klientet.filter((klient) => { return klient.id === this.urdherDiag.klient.id })
            this.klient = klient[0]
            this.urdheDiagForm.controls.klient.setValue(this.klient);
            this.urdheDiagForm.controls.klient.disable();
            this.urdheDiagForm.controls.mjeti.setValue(this.urdherDiag.mjeti);
            this.urdheDiagForm.controls.mjeti.disable();
            this.urdheDiagForm.controls.perfaqesues.setValue(this.urdherDiag.perfaqesues);
            this.urdheDiagForm.controls.destinuarPer.setValue(this.urdherDiag.perdorues);
            this.urdheDiagForm.controls.pershkrim.setValue(this.urdherDiag.pershkrim);
            this.urdheDiagForm.controls.prioriteti.setValue(this.urdherDiag.prioriteti);
        } else {
            if (typeof this.urdheDiagForm !== 'undefined') {
                this.urdheDiagForm.reset();
                this.urdheDiagForm.controls.klient.enable();
            }
        }
        this.fshiKonfirm = false;
    }

    janeNjelloj(a, b): boolean {
        if (a.id === b.id && a.klientId === b.klientId && a.leshoi === b.leshoi && a.mjetiId === b.mjetiId && a.perdoruesId === b.perdoruesId && a.perfaqesuesId === b.perfaqesuesId && a.pershkrim === b.pershkrim && a.prioriteti === b.prioriteti && a.statusi === b.statusi) {
            return true
        } else {
            return false
        }
    }
}