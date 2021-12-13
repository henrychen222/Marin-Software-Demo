import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoteComponent } from './components/note/note.component';
import { TableModule } from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import { ModalComponent } from './components/modal/modal.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NoteComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    ButtonModule,
    DialogModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }



