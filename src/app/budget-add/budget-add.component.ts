import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../budget.service';
import { DivisionService } from '../division.service';
import { CityService } from '../city.service';
import { ActivitylogService } from '../activitylog.service';

@Component({
  selector: 'app-budget-add',
  templateUrl: './budget-add.component.html',
  styleUrls: ['./budget-add.component.css']
})
export class BudgetAddComponent implements OnInit {
  budgets:any
  division=0
  divisions:any
  yearfilter:string
  years : {value:string,viewValue:string}[]= []
  quarterFilter = 0
  quarter = 0
  quarters = [
    {value:1,viewValue:'Quarter 1'},
    {value:2,viewValue:'Quarter 2'},
    {value:3,viewValue:'Quarter 3'},
    {value:4,viewValue:'Quarter 4'}
  ]
  city = 1
  cities = []
  budget_limit = 0
  budget = {
    year:'2020',
    quarter:'1',
    city_id:'1',
    division:'1',
    transtype:'1',
    amount:0,
    description:'',
    user_id:localStorage.getItem('id')
  }
  constructor(
    private budgetService: BudgetService,
    private divisionService: DivisionService,
    private cityService: CityService,
    private activityLogService: ActivitylogService
  ) {
    var d = new Date();
    console.log("Current Year",d.getFullYear())
    this.yearfilter = d.getFullYear().toString()
    this.budgetService.getscityperiod({
      year:this.yearfilter,
      quarter:this.quarterFilter,
      division_id:this.division,
      city_id:this.city
    },(res:any)=>{
      this.budgets = res
    })
    this.divisionService.getDivisions((res:any)=>{
      console.log("DIVISIONS",res)
      this.divisions = res
    })
    this.years = this.budgetService.populateYear()
    this.yearfilter = d.getFullYear().toString()
    this.cityService.getCities((res:any)=>{
      this.cities = res
    })
  }
  
  ngOnInit() {
  }
  budgetAdd(){
    console.log("YEAR",this.yearfilter)
    this.budgetService.saveBudgetHistory(this.budget,(result:any)=>{
      console.log('Budget Saved',result)
      this.activityLogService.create({
        email:localStorage.getItem('email'),
        module:'create budget',
        description:'year:'+this.budget.year+',Quarter:'+this.budget.quarter+',Division:'+this.budget.division+',City ID:'+this.budget.city_id+',User ID:'+this.budget.user_id
      },(res:any) => {})
      window.location.href = '/budgetTable'
    });
  }
  backToBudgets(){
    window.location.href = '/budgetTable'
  }
}
