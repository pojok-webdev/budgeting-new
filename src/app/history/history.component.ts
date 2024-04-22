import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'
import { AuthService } from '../auth.service';
import { SubmissionService } from '../submission.service';
import { PurchasehistoryService } from '../purchasehistory.service';
import { Router } from '@angular/router';
import { DatePipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
	displayedColumnsHistory: string[] = ['no', 'productname', 'vendorname', 'purchasedate', 'amount', 'price', 'totalprice', 'status', 'staffname'];
	logindata:any;
	submission:any;
	purchasehistory:any;
  	historyToDisplay=new Array();
  	historyresult:{
      amount: number,
      id: number,
      price: number,
      product_name: string,
      purchase_date: string,
      staff_name: string,
      submission_detail_id: number,
      totalprice: number,
      vendor_name: string,
      status: string
    }[]=[]/*{
      amount: 0,
      id: 0,
      price: 0,
      product_name: '',
      purchase_date: '',
      staff_name: '',
      submission_detail_id: 0,
      totalprice: 0,
      vendor_name: '',
      status: ''
    };*/
  	dataSource:any;

	length = 100
    pageSize = 10
    pageSizeOptions : number[] = [5,10,25]
    curPageSize=10
    curIndex=0

constructor(private submissionService: SubmissionService, private purchasehistoryservice: PurchasehistoryService, private router: Router,  private auth: AuthService) { 
  	this.auth.isLogin((result:any) => {
    this.logindata = result
      	if (this.logindata.name=="JsonWebTokenError" || this.logindata.name=="TokenExpiredError") {
      		this.router.navigate(['/login']);
    	}
  	});

  	this.purchasehistoryservice.submissionDetailFromPurchaseHistory((result:any) => {
  		this.historyresult=result;
  		this.length=result.length

      if (this.length>=this.pageSize) {
        for (let i:number = 0; i < this.pageSize; i++) {
          this.submissionService.getSubmissionDetail(this.historyresult[i].submission_detail_id, (results:any) => {
            if (results[0].status==2) {
                this.historyresult[i].status="Unpaid"
              } else if (results[0].status==4) {
                this.historyresult[i].status="Paid"                
              } else {
                this.historyresult[i].status="Termin"                
              }
              this.historyToDisplay.push(this.historyresult[i]);
          })
        }
      } else{
        for (let i = 0; i < this.length; i++) {
            this.submissionService.getSubmissionDetail(this.historyresult[i].submission_detail_id, (results:any) => {
              if (results[0].status==2) {
                this.historyresult[i].status="Unpaid"
              } else if (results[0].status==4) {
                this.historyresult[i].status="Paid"                
              } else {
                this.historyresult[i].status="Termin"                
              }
              this.historyToDisplay.push(this.historyresult[i]);
          })
  			}

        this.setCurrentPage()
  		}

  		this.dataSource = new MatTableDataSource(this.historyToDisplay)
  	});
}
	
  printSummary(){
    window.print()
  }
  
	//functions for paginator
  	setPageSizeOptions(setPageSizeOptionsInput:string){
    	this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str)
  	}

  	changePage($event:any){
    	console.log("Event",$event)
    	this.curIndex = $event.pageIndex
    	this.pageSize = $event.pageSize
    	this.length = $event.length
    	this.setCurrentPage()
  	}
  	setCurrentPage(){
  		this.historyToDisplay=new Array();

  		if (this.length>=(this.curIndex+1)*this.pageSize) {
	    	for (var i = this.curIndex*this.pageSize; i < (this.curIndex+1)*this.pageSize; i++) {
	  			this.historyToDisplay.push(this.historyresult[i]);
	  		}
  		}else{
  			for (var i = this.curIndex*this.pageSize; i < this.length; i++) {
	  			this.historyToDisplay.push(this.historyresult[i]);
	  		}
  		}

  		console.log("this.historyToDisplay",this.historyToDisplay)
  		this.dataSource = new MatTableDataSource(this.historyToDisplay)
  	}	
  ngOnInit() {
  }

}
