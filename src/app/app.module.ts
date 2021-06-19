import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { appRoutes } from './routes';

import { EmployeeComponent } from './employee/employee.component';

//angular fire store dependency
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, EmployeeComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    Ng2SearchPipeModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  ],
  providers: [
    AngularFireModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
