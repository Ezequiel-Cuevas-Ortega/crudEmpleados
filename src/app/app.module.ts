import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// Components
import { AppComponent } from './app.component';
import { CreateEmployeesComponent } from './components/create-employees/create-employees.component';
import { ListEmployeesComponent } from './components/list-employees/list-employees.component';
import { NavbarComponent } from './components/navbar/navbar.component';

// Providers
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

// Enviroments
import { environment } from '../environments/environment.development';
import { AngularFireModule } from '@angular/fire/compat';




@NgModule({
  declarations: [
    AppComponent,
    CreateEmployeesComponent,
    ListEmployeesComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
