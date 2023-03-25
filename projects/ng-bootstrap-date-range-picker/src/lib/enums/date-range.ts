/* eslint-disable @typescript-eslint/naming-convention */
// Enum representing the available date ranges
export enum DateRange {
  Today = 'Today',
  Yesterday = 'Yesterday',
  Last7Days = 'Last 7 Days',
  Last28Days = 'Last 28 Days',
  Last30Days = 'Last 30 Days',
  Last90Days = 'Last 90 Days',
  ThisMonth = 'This Month',
  LastMonth = 'Last Month',
  Last12Months = 'Last 12 Months',
  LastCalendarYear = 'Last Calendar Year',
  ThisYear = 'This Year (Jan - Today)',
  Custom = 'Custom'
}
