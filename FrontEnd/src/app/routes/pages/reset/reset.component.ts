import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ndermarrje, NdermarrjeApi, PerdoruesApi, Perdorues, LoopBackAuth } from 'src/app/shared/sdk';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SettingsService } from 'src/app/core/settings/settings.service';
const swal = require('sweetalert');

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  public ndermarrje: Ndermarrje
  public resetForm: FormGroup;
  public loading: boolean = false;
  public passwordError: boolean = false;
  private error: any;

  constructor(
    public settings: SettingsService,
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _ndermarrje: NdermarrjeApi,
    private _perdorues: PerdoruesApi,
    private _auth: LoopBackAuth,

  ) {
    this.resetForm = _fb.group({
      'password': [null, Validators.required],
    });
  }

  submitForm($ev: any, user: Partial<Perdorues>): void {
    this.loading = true;
    // this.passwordError = false;
    $ev.preventDefault();
    for (let c in this.resetForm.controls) {
      this.resetForm.controls[c].markAsTouched();
    }
    if (this.resetForm.valid) {
      this._perdorues.setPassword(user.password).subscribe(() => {
        this.loading = false;
      }, (err) => {
        // console.log(err)
        if (err.code == "FJALEKALIMI_SHKURTER") {
          this.passwordError = true;
          this.error = err.message;
        }
        if (err.code == "INVALID_TOKEN" || err.code == "AUTHORIZATION_REQUIRED") {
          swal({
            title: 'Kujdes!',
            text: 'Ky link ka skaduar.\nKontrolloni e-mail përsëri',
            icon: 'error',
            buttons: {
              cancel: false,
              confirm: {
                text: 'Login',
                value: true,
                visible: true,
                className: "bg-danger",
                closeModal: true
              }
            }
          }).then(() => {
            this._router.navigate(['/login']);
          });
        }
        if (err.statusCode == 500 || err == "Server error") {
          this.passwordError = false;
        }
        // this.passwordError = false;
        this.loading = false;
        this.resetForm.enable();
      }, () => {
        this._perdorues.logout().subscribe();
        swal({
          title: 'Fjalëkalimi u reset-ua me sukses!',
          text: 'Tani mund të logoheni me fjalëkalimin e ri.',
          icon: 'success',
          buttons: {
            cancel: false,
            confirm: {
              text: 'Login',
              value: true,
              visible: true,
              className: "bg-success",
              closeModal: true
            }
          }
        }).then(() => {
          this._router.navigate(['/login']);
        });
      })
    }
  }

  toggleFjalekalim() {
    var x: any = document.getElementById("fjalekalim");
    var y: any = document.getElementById("eyeIcon");

    if (x.type === "password") {
      x.type = "text";
      y.className = "fa fa-eye-slash";
    } else {
      x.type = "password";
      y.className = "fa fa-eye";
    }
  }

  ngOnInit() {
    this._route.queryParams.subscribe((params: any) => {
      if (params.access_token) {
        this._auth.setToken({ id: params.access_token, ttl: 900, scopes: "", created: "", user: "", userId: "", rememberMe: false });
      } else {
        this._router.navigate(['/login']);
      }
    });
    let userlocalStorage = localStorage.getItem("NdermarrjeData");
    if (userlocalStorage) {
      this.ndermarrje = JSON.parse(userlocalStorage);
    } else {
      this._ndermarrje.findOne({ where: { domain: { like: window.location.hostname } } }).subscribe((res: Ndermarrje) => {
        this.ndermarrje = res;
      }, (err) => {
        console.log(err);
      }, () => {
        localStorage.setItem("NdermarrjeData", JSON.stringify(this.ndermarrje))
      })
    }
  }

}
