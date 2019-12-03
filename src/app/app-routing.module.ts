import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./page/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./page/list/list.module').then(m => m.ListPageModule)
  },
  { path: 'register', loadChildren: './page/register/register.module#RegisterPageModule' },
  { path: 'login', loadChildren: './page/login/login.module#LoginPageModule' },
  { path: 'myprofile', loadChildren: './page/myprofile/myprofile.module#MyprofilePageModule' },
  { path: 'landing', loadChildren: './page/landing/landing.module#LandingPageModule' },
  { path: 'create', loadChildren: './page/create/create.module#CreatePageModule' },
  { path: 'update', loadChildren: './page/update/update.module#UpdatePageModule' },
  { path: 'search', loadChildren: './page/search/search.module#SearchPageModule' },  { path: 'list-pensyarah', loadChildren: './page/list-pensyarah/list-pensyarah.module#ListPensyarahPageModule' }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
