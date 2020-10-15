import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { TranslateService } from '@ngx-translate/core';
import { DashboardService } from '../../services/dashboard/dashboard.service';

declare var google: any;
@Component({
  templateUrl: 'index.comp.html',
  styleUrls: ['./index.comp.css'],
  providers: []
})
export class DashboardComponent implements OnInit {



  // barChart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];
  stats: any = {completedorders:0,completedtodaysamount:0,completedweekamount:0,completedmonthamount:0};
  latestorders: any = [];
  
  constructor(private dashboardservice: DashboardService ){

  }
  ngOnInit(): void {
    this.getStats();
    this.getLatestOrders();
  }

  getStats(){
    this.dashboardservice.getDashboard({
      'operate':'getstats'
    }).subscribe(
      data=>{
        console.log(data);
      
        if(data.resultKey == 1){
          let stats = data.resultValue[0];
          this.stats.completedorders = stats.completedorders;
          this.stats.completedtodaysamount = stats.completedtodaysamount;
          this.stats.completedweekamount = stats.completedweekamount;
          this.stats.completedmonthamount = stats.completedmonthamount;
        }

        console.log(this.stats);
      }

      
    );
  }

  getLatestOrders(){
    this.dashboardservice.getDashboard({
      'operate':'getlatestorders'
    }).subscribe(
      data=>{
        console.log(data);
      
        if(data.resultKey == 1){
          this.latestorders = data.resultValue;
        }

        
      }

      
    );
  }
  chartHovered(e){
    return e;
  }
  chartClicked(e){
    return e;
  }

}
