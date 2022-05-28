import { Injectable } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PreviousRouteService {
  previousURL!: string;

  constructor(private router: Router) {

  }

  previousRoute(){
    this.router.events
      .pipe(
        filter((e: any) => e instanceof RoutesRecognized),
        pairwise()
      )
      .subscribe((e: any) => {
        console.log(e[0].urlAfterRedirects); // previous url
        this.previousURL = e[0].urlAfterRedirects;
      });
  }

  getPreviousURL(){
    if(this.previousURL == null) return '/billings'
    else
    return this.previousURL;
  }
}
