import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { KlientetComponent } from './klientet/klientet.component';
import { KlientiComponent } from './klienti/klienti.component';
import { SharedModule } from 'src/app/shared/shared.module';
// import { NgxSelectModule } from 'ngx-select-ex'


const routes: Routes = [
  { path: '', component: KlientetComponent },
  { path: ':id', component: KlientiComponent }
]

@NgModule({
  declarations: [KlientetComponent, KlientiComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    // NgxSelectModule,
  ]
})
export class KlientModule { }
