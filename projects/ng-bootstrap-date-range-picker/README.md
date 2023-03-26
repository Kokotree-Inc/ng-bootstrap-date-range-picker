## Preview

![Preview Image](https://raw.githubusercontent.com/Kokotree-Inc/ng-bootstrap-date-range-picker/main/assets/images/preview.gif 'Preview of the ng-bootstrap-date-range-picker component')

## Installation

    $ npm i @kokotree-inc/ng-bootstrap-date-range-picker

## Peer Dependencies

_@kokotree-inc/ng-bootstrap-date-range-picker_ has the following peer dependencies:

- @angular/common: ^15.1.0
- @angular/core: ^15.1.0
- @ng-bootstrap/ng-bootstrap: ^14.0.1
- moment-mini: ^2.29.4

Make sure to install these dependencies in your project before installing _@kokotree-inc/ng-bootstrap-date-range-picker_. You can use npm to install these dependencies by running the following command:

```bash
npm install --save @angular/common@^15.1.0 @angular/core@^15.1.0 @ng-bootstrap/ng-bootstrap@^14.0.1 moment-mini@^2.29.4
```

Note that the version numbers listed here are minimum requirements. Your project may be compatible with higher versions of these dependencies as well.

## Usage

1. Import the DateRangePickerModule module in your app module or page module:

   ```ts

       import { DateRangePickerUtils, DateRangePickerModule } from '@kokotree-inc/ng-bootstrap-date-range-picker';
       import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

       @NgModule({
           declarations: [....],
           imports: [...., DateRangePickerModule, NgbModule],
           providers: [DateRangePickerUtils],
           bootstrap: [....]
       })
       export class AppModule {}
   ```

Also add the DateRangePickerUtils provider to your app module or page module providers.

2. Include the DateRangePickerComponent in your page template HTML:

   ```html
   <app-date-range-picker [dateRangeKey]="dateRangeKey" (rangeChanged)="onRangeChanged($event)"> </app-date-range-picker>
   ```

3. In your page script, define the _onRangeChanged_ function to receive the date range selection changes:

   ```ts
   import { DateRangeChange, DATE_RANGE_OPTIONS } from '@kokotree-inc/ng-bootstrap-date-range-picker';

   export class YourComponent implements OnInit {
     dateRangeKey = DATE_RANGE_OPTIONS.Last28Days;

     constructor() {}

     onRangeChanged(dateRangeChange: DateRangeChange) {
       const { dateRange, startDate, endDate } = dateRangeChange;
       console.log('Date range:', dateRange);
       console.log('Start date:', startDate.format('YYYY-MM-DD'));
       console.log('End date:', endDate.format('YYYY-MM-DD'));
       // do something with the selected date range
     }
   }
   ```

## Inputs

- dateRangeKey: The default date range option to show. Possible values are defined in the DATE_RANGE_OPTIONS enum exported by ng-bootstrap-date-range-picker. Default value is DATE_RANGE_OPTIONS.Last28Days.
- btnApplyClass: The CSS class to apply to the "Apply" button. Default value is 'btn-primary'.
  pickerCustomClass: The CSS class to apply to the date range picker. Default value is ''.

## Outputs

- rangeChanged: Emitted when the date range selection is changed. The output is an object of type DateRangeChange, which contains the selected date range, start date, and end date.

## Playground Project

There is an included playground project for the _ng-bootstrap-date-range-picker_ component, located at _projects/ng-bootstrap-date-range-picker-playground_.

To run the playground project, navigate to the project directory in the terminal and run:

```bash
ng serve
```

This will start a local server at http://localhost:4200/, where you can run and test the component.

Please note that _ng-bootstrap-date-range-picker-playground_ project is intended for testing and experimentation purposes only, and should not be used in a production environment.
