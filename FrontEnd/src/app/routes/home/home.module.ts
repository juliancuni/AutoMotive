import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
    { path: '', component: HomeComponent },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
    ],
    declarations: [HomeComponent],
    exports: [
        RouterModule
    ]
})
export class HomeModule { }
