import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DateRangePickerUtils, DateRangePickerModule } from 'ng-bootstrap-date-range-picker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, DateRangePickerModule, NgbModule],
  providers: [DateRangePickerUtils],
  bootstrap: [AppComponent]
})
export class AppModule {}
