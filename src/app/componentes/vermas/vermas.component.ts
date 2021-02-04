import { Component, OnInit } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-vermas',
  templateUrl: './vermas.component.html',
  styleUrls: ['./vermas.component.css']
})
export class VermasComponent implements OnInit {
  verCarousle: boolean;
  resizeObservable$: Observable<Event>
  resizeSubscription$: Subscription
  wiii: number;
  constructor() { }

  ngOnInit(): void {
    this.wiii=history.state.tampanta
      if(this.wiii <1216){
        this.verCarousle = true
      } else {
        this.verCarousle = false
      }
 
  }
}