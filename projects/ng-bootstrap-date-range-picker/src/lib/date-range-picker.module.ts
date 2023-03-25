import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { DateRangePickerComponent } from './components/date-range-picker/date-range-picker.component';
import { DateRangePickerUtils } from './utils/date-ranges-utils';

@NgModule({
  declarations: [DateRangePickerComponent], // Components declared in this module
  imports: [FormsModule, CommonModule, NgbModule, NgbDatepickerModule, NgbDropdownModule], // External modules imported by this module
  exports: [DateRangePickerComponent], // Components, directives, and pipes exported by this module
  providers: [DateRangePickerUtils] // Services provided by this module
})
export class DateRangePickerModule {}
