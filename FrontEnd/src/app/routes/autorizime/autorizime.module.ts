import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerdoruesComponent } from './perdorues/perdorues.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { KartelaPerdoruesComponent } from './kartela-perdorues/kartela-perdorues.component';
import { AclComponent } from './acl/acl.component';

const routes: Routes = [
  // { path: '', redirectTo: 'perdorues' },
  { path: 'perdorues', component: PerdoruesComponent },
  { path: 'perdorues/:id', component: KartelaPerdoruesComponent },
  { path: 'acl', component: AclComponent }

]

@NgModule({
  declarations: [PerdoruesComponent, KartelaPerdoruesComponent, AclComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
})
export class AutorizimeModule { }
