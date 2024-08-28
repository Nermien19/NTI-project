import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AboutComponent } from './about/about.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
// import { SkillsComponent } from './skills/skills.component';
import { ContactComponent } from './contact/contact.component';
import { AppComponent } from './app.component';
import { SkillsComponent } from './skills/skills.component';
import { LoginComponent } from './login/login/login.component';
import { authGuard } from './auth.guard';
// const routes: Routes = [{path:'', redirectTo:'/home' , pathMatch: 'full'}, //this will make the default path is the home so , when the path is empty redirect to the home
//   // {path:'about' , component:AboutComponent },

//     { path: '', component: HomeComponent },
//     { path: 'about', component: AboutComponent },

//     { path: 'portfolio', component: PortfolioComponent },
//     { path: 'skills', component: SkillsComponent },
//     { path: 'contact', component: ContactComponent }, // Default route
//     // { path: 'admin', component: AdminHomeComponent }// Admin route

//   // {path: 'products' , component:ProductsComponent}
// ];

// const routes: Routes = [
//   // { path: '', component: HomeComponent },
//   // // { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
//   // // Other routes
// ];
// const routes: Routes = [

//   { path: '', component: HomeComponent },
//   { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }
// ];
// const routes: Routes = [
//   { path: 'login', component: LoginComponent },
//   // { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
//   { path: '', redirectTo: '/login', pathMatch: 'full' },
//   { path: 'home', component: HomeComponent }, // Main application routes
//   { path: 'about', component: AboutComponent },
//   { path: 'portfolio', component: PortfolioComponent },
//   { path: 'skills', component: SkillsComponent },
//   { path: 'contact', component: ContactComponent }, // This ensures the main layout shows all sections.
//   { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
//     ,canActivate: [authGuard] }
// ];
const routes: Routes = [
  { path: 'admin/login', component: LoginComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'home', redirectTo: '/' },
  { path: 'about', component: AboutComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'skills', component: SkillsComponent },
  { path: 'contact', component: ContactComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' }, // This redirects to the home page
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [authGuard] },
  { path: '**', redirectTo: '/admin/home' } // This wildcard route will catch any unrecognized route
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
