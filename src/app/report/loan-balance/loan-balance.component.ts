import { Component, OnInit, ElementRef ,ViewChild } from '@angular/core';
//import * as jspdf from 'jspdf'; 
//import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-loan-balance',
  templateUrl: './loan-balance.component.html',
  styleUrls: ['./loan-balance.component.css']
})
export class LoanBalanceComponent implements OnInit {
  ngOnInit(): void {
    //throw new Error("Method not implemented.");
  }

  // public captureScreen()  
  // {  
  //   var data = document.getElementById('contentToConvert');  
  //   html2canvas(data).then(canvas => {  
  //     // Few necessary setting options  
  //     var imgWidth = 208;   
  //     var pageHeight = 295;    
  //     var imgHeight = canvas.height * imgWidth / canvas.width;  
  //     var heightLeft = imgHeight;  
  
  //     const contentDataURL = canvas.toDataURL('image/png')  
  //     let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
  //     var position = 0;  
  //     //pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
  //     //pdf.save('MYPdf.pdf'); // Generated PDF   
  //   });  
  // }  
}
