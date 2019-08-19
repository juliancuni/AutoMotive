import { LayoutComponent } from '../layout/layout.component';
import { AuthGuard } from '../auth/guards/auth.guard';

export const routes = [

    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadChildren: './home/home.module#HomeModule', canActivate: [AuthGuard] },
            { path: 'personal', loadChildren: './personal/personal.module#PersonalModule', canActivate: [AuthGuard] }
        ]
    },

    // Not found
    { path: '**', redirectTo: '404' }

];
