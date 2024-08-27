import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { adminAuthGuard } from './admin-auth.guard'; // Correct import
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { SkillsComponent } from './skills/skills.component';
import { ContactComponent } from './contact/contact.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'portfolio', component: PortfolioComponent },
      { path: 'skills', component: SkillsComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'navbar', component: NavBarComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class AdminRoutingModule { }
