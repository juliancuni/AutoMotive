import { Component, Input, Output, ViewChild, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KlientApi, Perfaqesues, Mjeti, PerdoruesApi, Klient, PerfaqesuesApi, MjetiApi, Perdorues, LoopBackAuth, UrdherDiagnozeApi, UrdherPune, UrdherPuneApi } from '../../sdk';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

@Component({
    selector: 'app-urdher-pune',
    templateUrl: './urdher-pune.component.html',
    styleUrls: ['./urdher-pune.component.scss']
})
export class UrdherPuneComponent implements OnInit {
    @Input() showUrdherPune: boolean;
    @Output() hapMbyllUPNgaSelf = new EventEmitter();
    @Output() shtoUrdheraPune = new EventEmitter<UrdherPune>();

    @ViewChild('instance', { static: false }) instance: NgbTypeahead;
    focus$ = new Subject<string>();
    click$ = new Subject<string>();

    public urdherPune: UrdherPune;
    public urdheraPune: UrdherPune[];
    public klientet: Klient[];
    public klient: Klient;
    public perfaqesuesitEklientit: Perfaqesues[];
    public mjetetEklientit: Mjeti[];
    public perdoruesit: Perdorues[];
    public prioriteti = 5;

    public urdherPuneForm: FormGroup;

    constructor(
        private _fb: FormBuilder,
        private _klient: KlientApi,
        private _perfaqesues: PerfaqesuesApi,
        private _mjeti: MjetiApi,
        private _perdoruesi: PerdoruesApi,
        private _urdherPune: UrdherPuneApi,
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
        this.hapMbyllUPNgaSelf.emit(this.showUrdherPune = !this.showUrdherPune);
    }

    regUrdherPune(ev, urdherPuneForm) {
        ev.preventDefault();
        if (this.urdherPuneForm.valid) {
            // let newUrdherdiagnoze = new UrdherDiagnoze({
            //     klientId: urdherPuneForm.klient.id,
            //     perfaqesuesId: urdherPuneForm.perfaqesues,
            //     mjetiId: urdherPuneForm.mjeti,
            //     perdoruesMorriId: urdherPuneForm.destinuarPer,
            //     prioriteti: urdherPuneForm.prioriteti,
            //     leshoi: this._auth.getCurrentUserId(),
            //     pershkrim: urdherPuneForm.pershkrim,
            //     statusi: 1
            // });
            // this._urdherPune.create(newUrdherdiagnoze).subscribe((res: UrdherPune) => {
            //     this.toggle();
            //     this.shtoUrdheraPune.emit(res);
            //     this.urdherPuneForm.reset();
            // });
        }

    }

    ngOnInit() {
        // this._urdherDiagnoze.find().subscribe((res: UrdherDiagnoze[]) => {
        //     this.urdheraDiagnoze = res;
        // })
        this.urdherPuneForm = this._fb.group({
            "klient": [null, Validators.required],
            "perfaqesues": [{ value: "", disabled: true }, null],
            "mjeti": [{ value: "", disabled: true }, Validators.required],
            "destinuarPer": [{ value: "", disabled: true }, Validators.required],
            "prioriteti": [{ value: 5, disabled: false }, null],
            "pershkrim": [null, null],
        })

        this._klient.find({ include: ["mjetet", "perfaqesues"] }).subscribe((res: Klient[]) => {
            this.klientet = res;
        })
        this._perdoruesi.find().subscribe((res: Perdorues[]) => {
            this.perdoruesit = res;
        })
        this.urdherPuneForm.controls.klient.valueChanges.subscribe((value: Klient) => {
            if (typeof value === 'object' && value !== null) {
                this.klient = value;
                this.mjetetEklientit = this.klient.mjetet;
                this.perfaqesuesitEklientit = this.klient.perfaqesues;
                this.urdherPuneForm.controls.perfaqesues.enable()
                this.urdherPuneForm.controls.perfaqesues.setValue(null)
                this.urdherPuneForm.controls.mjeti.enable()
                this.urdherPuneForm.controls.mjeti.setValue(null)
                this.urdherPuneForm.controls.destinuarPer.enable()
                this.urdherPuneForm.controls.destinuarPer.setValue(null)
            } else {
                this.urdherPuneForm.controls.perfaqesues.disable()
                this.urdherPuneForm.controls.mjeti.disable()
                this.urdherPuneForm.controls.destinuarPer.disable()
            }
        })
        this.urdherPuneForm.controls.prioriteti.valueChanges.subscribe((value) => {
            this.prioriteti = value;
        })
    }
}
