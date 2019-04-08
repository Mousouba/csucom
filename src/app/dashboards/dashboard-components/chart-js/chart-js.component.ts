import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'charts-js',
  templateUrl: './chart-js.component.html'
})
export class ChartjsComponent implements AfterViewInit {
  constructor() {}

  // This is line chart
  // bar chart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    barThickness: 10
  };

  public barChartLabels: string[] = [
    'Janv',
    'Fev',
    'Mars',
    'Avr',
    'Mai',
    'Juin',
    'Juil',
    'Aout',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [
    { data: [65, 40, 19, 86, 27, 90, 59, 80, 81, 56, 55, 40], label: 'Homme' },
    { data: [28, 48, 40, 27, 90, 59, 80, 81, 56, 55, 19, 86, 27, 130], label: 'Femme' }
  ];
  public barChartColors: Array<any> = [
    { backgroundColor: '#36bea6' },
    { backgroundColor: '#2962FF' }
  ];


  

  // events
  public chartClicked(e: any): void {
    // console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }


  ngAfterViewInit() {}
}
