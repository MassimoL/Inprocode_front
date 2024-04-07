import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { ChartInterface } from '../../interfaces/chartInterfaces';
import { ChartService } from '../../service/chartjs.service';

Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chartjs.component.html',
  styleUrls: ['./chartjs.component.scss']
})
export default class ChartjsComponent implements OnInit {
  salesData: ChartInterface[] = [];

  constructor(private chartservice: ChartService, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.fetchSalesData();
  }

  fetchSalesData() {
    this.chartservice.getDatas().subscribe(
      (data: ChartInterface[]) => {
        this.salesData = data;
        this.renderBarChart();
        this.renderLineChart();
      },
      (error) => {
        console.error('Error fetching sales data:', error);
      }
    );
  }

  renderBarChart() {
    const ctx = this.document.getElementById('barChart') as HTMLCanvasElement;

    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.salesData.map(sale => sale.year.toString()),
        datasets: [{
          label: 'Amount',
          data: this.salesData.map(sale => sale.amount),
          backgroundColor: this.salesData.map(sale => sale.colorcode),
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  renderLineChart() {
    const ctx = this.document.getElementById('lineChart') as HTMLCanvasElement;

    const lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.salesData.map(sale => sale.year.toString()),
        datasets: [{
          label: 'Amount',
          data: this.salesData.map(sale => sale.amount),
          borderColor: this.salesData.map(sale => sale.colorcode),
          backgroundColor: 'transparent',
          borderWidth: 2,
          pointBackgroundColor: this.salesData.map(sale => sale.colorcode),
          pointBorderColor: this.salesData.map(sale => sale.colorcode),
          pointHoverBackgroundColor: this.salesData.map(sale => sale.colorcode),
          pointHoverBorderColor: '#fff',
          pointRadius: 4,
          pointHoverRadius: 6,
          pointHitRadius: 10,
          pointBorderWidth: 2,
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
