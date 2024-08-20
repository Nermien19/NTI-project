import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { provideClientHydration } from '@angular/platform-browser';
import { AboutComponent } from './about/about.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { SkillsComponent } from './skills/skills.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ContactComponent } from './contact/contact.component';


const routes: Routes = [
  // {
  //   path: '',
  //   component: AdminLayoutComponent,
  //   children: [
  //     { path: 'home', component: HomeComponent },
  //     { path: 'signup', component: SignupComponent },
  //     { path: 'login', component: LoginComponent }
  //     // Add other child routes here
  //   ],
  // },
];

@NgModule({
  declarations: [
    AdminLayoutComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    AboutComponent,
    PortfolioComponent,
    SkillsComponent,
    NavBarComponent,
    ContactComponent
    // Add other admin components here
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule ,// Ensure FormsModule is imported to use ngModel
    ReactiveFormsModule,
    AdminRoutingModule

  ],
  // providers: [
  //   provideClientHydration()
  // ]
  // , bootstrap: [AdminLayoutComponent]
})
export class AdminModule { }
