import { LayoutComponent } from '../layout/layout.component';
import { AuthGuard } from '../auth/guards/auth.guard';

export const routes = [

    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadChildren: './home/home.module#HomeModule', canActivate: [AuthGuard] },
            { path: 'personal', loadChildren: './personal/personal.module#PersonalModule', canActivate: [AuthGuard] },
            { path: 'ndermarrje', loadChildren: './ndermarrje/ndermarrje.module#NdermarrjeModule', canActivate: [AuthGuard] },
            { path: 'github', loadChildren: './github/github.module#GithubModule', canActivate: [AuthGuard] },
            { path: 'autorizime', loadChildren: './autorizime/autorizime.module#AutorizimeModule', canActivate: [AuthGuard] },
            { path: 'menu', loadChildren: './menu/menu.module#MenuModule', canActivate: [AuthGuard] },
            { path: 'test', loadChildren: './vetempertest/vetempertest.module#VetempertestModule', canActivate: [AuthGuard] },
        ]
    },

    // Not found
    { path: '**', redirectTo: '404' }

];
