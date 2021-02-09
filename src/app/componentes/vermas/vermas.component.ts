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
  constructor() { }

  ngOnInit(): void {
    if(window.innerWidth < 1216){
      this.verCarousle = true
    } else { this.verCarousle = false}
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe(event => {
      let windowEvent = event.target as Window
      let windowWidth = windowEvent.innerWidth;
      if(windowWidth < 1216) {
        this.verCarousle = true
      } else {
        this.verCarousle = false
      }
    })
  }
}