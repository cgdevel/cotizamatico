import { Component, OnInit } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-vermas',
  templateUrl: './vermas.component.html',
  styleUrls: ['./vermas.component.css']
})
export class VermasComponent implements OnInit {
  verCarousle: boolean=false;
  resizeObservable$: Observable<Event>
  resizeSubscription$: Subscription
  constructor() { }

  ngOnInit(): void {
    this.resizeObservable$ = fromEvent(window, 'resize')
    this.resizeSubscription$ = this.resizeObservable$.subscribe( event => {
      console.log((event.target as Window).innerWidth)
      if((event.target as Window).innerWidth <1216){
        this.verCarousle = true
      } else {
        this.verCarousle = false
      }
    })
  }

  ngOnDestroy() {
    this.resizeSubscription$.unsubscribe()
}
}