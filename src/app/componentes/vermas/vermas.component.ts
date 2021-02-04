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
  wiii: number;
  constructor() { }

  ngOnInit(): void {
    this.resizeObservable$ = fromEvent(window, 'resize')
    this.resizeSubscription$ = this.resizeObservable$.subscribe( event => {
      console.log((event.target as Window).innerWidth)
      this.wiii=(event.target as Window).innerWidth
      if((event.target as Window).innerWidth <1216){
        this.verCarousle = true
      } else {
        this.verCarousle = false
      }
    })
    var getBrowserInfo = function() {
      var ua= navigator.userAgent, tem, 
      M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
      if(/trident/i.test(M[1])){
          tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
          return 'IE '+(tem[1] || '');
      }
      if(M[1]=== 'Chrome' && this.wiii<1216 ){
          this.verCarousle = true
          tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
          if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
      }
      M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
      if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
      return M.join(' ');
  };
  
  // console.log(getBrowserInfo());
  }

  ngOnDestroy() {
    this.resizeSubscription$.unsubscribe()
}
}