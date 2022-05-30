import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { Fattura } from 'src/app/models/fattura';
import { BillingsService } from 'src/app/services/billings.service';

@Component({
  selector: 'app-chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.scss']
})
export class ChartPieComponent implements OnInit {

  pagate: number = 0;
  nonPagate: number = 0;
  billings!: Fattura[];


  pieChartType: ChartType = "pie";
  pieChartLabels = ['Pagate', 'Non pagate'];
  pieChartData: any;

  constructor(private billingsSrv: BillingsService) { }

  ngOnInit() {
    this.getBillings();
  }

  getBillings(){
    this.billingsSrv.getBillings().subscribe((res) => {
      this.billings = res.content;
      this.billings.forEach((el) => {
        if(el.stato.id == 1){
          this.pagate += 1;
        } else {
          this.nonPagate += 1;
        }
      })
      this.pieChartData = [
        {data: [this.pagate, this.nonPagate], label: 'Fatturato'},
      ];
    })
  }
}
