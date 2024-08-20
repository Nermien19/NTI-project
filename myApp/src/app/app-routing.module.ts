import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AboutComponent } from './about/about.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { SkillsComponent } from './skills/skills.component';
import { ContactComponent } from './contact/contact.component';
import { AppComponent } from './app.component';

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
const routes: Routes = [
  
  { path: 'home', component: HomeComponent }, // Main application routes
  { path: 'about', component: AboutComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'skills', component: SkillsComponent },
  { path: 'contact', component: ContactComponent }, // This ensures the main layout shows all sections.
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
