import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatrialModule } from './matrial.module';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [NavbarComponent, NotFoundComponent],
  imports: [
    MatrialModule,
    CommonModule,
    RouterModule,
    BrowserModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  exports: [
    HttpClientModule,
    BrowserModule,
    RouterModule,
    MatrialModule,
    CommonModule,
    NavbarComponent,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
