import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
// import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServerModule } from '@angular/platform-server';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
// import { SkillsComponent } from './skills/skills.component';
import { ContactComponent } from './contact/contact.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminModule } from './admin/admin.module';
import { SkillsComponent } from './skills/skills.component';
import { LoginComponent } from './login/login/login.component';





const routes: Routes = [
  // { path: '', component: HomeComponent },
  // { path: 'about', component: AboutComponent },
  // { path: 'portfolio', component: PortfolioComponent },
  // { path: 'skills', component: SkillsComponent },
  // { path: 'contact', component: ContactComponent }, // Default route
  // { path: 'admin', component: AdminHomeComponent }// Admin route
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    // AdminHomeComponent,
    NavbarComponent,
    AboutComponent,
    PortfolioComponent,
    ContactComponent,
    SkillsComponent,
    LoginComponent,
    // AdminComponent

  ],
  imports: [
    // AdminModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
