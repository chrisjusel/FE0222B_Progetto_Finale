import { Component, OnInit } from '@angular/core';

import { Fattura } from 'src/app/models/fattura';
import { BillingsService } from 'src/app/services/billings.service';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-chart-line',
  templateUrl: './chart-line.component.html',
  styleUrls: ['./chart-line.component.scss']
})
export class ChartLineComponent implements OnInit {

  fatture!: Fattura[];

  barChartOptions: any;
  barChartLabels: any
  barChartLegend: any
  barChartData: any;
  barChartType: ChartType = "bar";

  introiti2019: number = 0;
  introiti2020: number = 0;



  constructor(private billingsSrv: BillingsService) { }

  ngOnInit(): void {
    this.getBillings();


  }





  getBillings(){
    this.billingsSrv.getBillings().subscribe((res) => {
      this.fatture = res.content;
      console.log(this.fatture);
      this.fatture.forEach(el => {

        if(el.anno == 2019){
          this.introiti2019 += el.importo;
        } else if(el.anno == 2020){
          this.introiti2020 += el.importo
        }



      })

      this.barChartOptions = {
        scaleShowVerticalLines: false,
        responsive: false
      };
      this.barChartLabels = ['2019', '2020'];
      this.barChartLegend = true;
      this.barChartData = [
        {data: [this.introiti2019, this.introiti2020], label: 'Fatturato'},
      ];
    });
  }
}


