import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule, MatPaginatorModule, MatRippleModule, MatSortModule, MatCheckboxModule, MatIconModule, MatTabsModule, MatButtonModule, MatTooltipModule, MatDialogModule, MatSnackBarModule } from '@angular/material';
import { ModalCrearProductoComponent } from './home/modal-crear-producto/modal-crear-producto.component';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    ModalCrearProductoComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatPaginatorModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ]),
    BrowserAnimationsModule
  ],
  providers: [
    NgDialogAnimationService,
    DatePipe
  ],
  bootstrap: [AppComponent, ModalCrearProductoComponent],
  exports: [
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatNativeDateModule,
    MatRippleModule,
    MatCheckboxModule
  ],
  entryComponents:[
    ModalCrearProductoComponent
  ]
})
export class AppModule { }
