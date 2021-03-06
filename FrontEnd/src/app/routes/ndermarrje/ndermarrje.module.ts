import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NdermarrjeComponent } from './ndermarrje/ndermarrje.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
    { path: '', component: NdermarrjeComponent }
];

@NgModule({
    declarations: [NdermarrjeComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
    ]
})
export class NdermarrjeModule { }
