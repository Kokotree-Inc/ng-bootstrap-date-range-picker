import { Component } from '@angular/core';
import { DateRangeChange, DATE_RANGE_OPTIONS } from 'ng-bootstrap-date-range-picker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-bootstrap-date-range-picker-playground';

  dateRangeKey = DATE_RANGE_OPTIONS.Last28Days;

  selectedRange = '';
  startDate = '';
  endDate = '';

  onRangeChanged(dateRangeChange: DateRangeChange) {
    this.selectedRange = dateRangeChange.dateRange;
    this.startDate = dateRangeChange.startDate.format('YYYY-MM-DD');
    this.endDate = dateRangeChange.endDate.format('YYYY-MM-DD');
  }
}
