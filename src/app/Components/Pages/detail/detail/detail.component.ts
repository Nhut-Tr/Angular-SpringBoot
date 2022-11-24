import { Component, OnInit } from '@angular/core';
import { render } from 'creditcardpayments/creditCardPayments';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor() {render({
    id: '#myPaypalButtons',
    currency: 'USD',
    value: '100.00',
    onApprove: (details) => {
      alert('Transaction Successful!');
    },
  }); }

  ngOnInit(): void {
  }

}
