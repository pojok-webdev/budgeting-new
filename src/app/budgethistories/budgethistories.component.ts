import { Component, OnInit } from '@angular/core';
import { BudgethistoryService } from '../budgethistory.service';
import { DivisionService } from '../division.service';
import { CityService } from '../city.service';

@Component({
  selector: 'app-budgethistories',
  templateUrl: './budgethistories.component.html',
  styleUrls: ['./budgethistories.component.css']
})
export class BudgethistoriesComponent implements OnInit {
  displayedColumns: string[] = ['position', 'createdate', 'transttype', 'description', 'amount','username'];
  dataSource:any
  divisions:any
  cities:any
  constructor(
    private budgetHistories: BudgethistoryService,
    private divisionService: DivisionService,
    private cityService: CityService
    ) {
    this.budgetHistories.getHistories({},(res:any)=>{
      console.log('getHistories',res)
      this.dataSource = res
    })
    this.divisionService.getDivisions((divisions:any)=>{
      this.divisions = divisions
    })
    this.cityService.getCities((cities:any)=>{
      this.cities = cities
    })
  }
  gotoBudgets(){
    window.location.href = '/budgetTable'
  }
  ngOnInit() {
  }

}
export interface PeriodicElement {
  transttype: string;
  createdate:string;
  position: number;
  description: number;
  amount: string;
  username:string;
}
