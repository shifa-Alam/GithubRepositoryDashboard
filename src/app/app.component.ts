import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit,OnDestroy{
  title = 'GithubRepositoryDashboard';
  fillerNav:string[]=[];
  ngOnInit(): void {
    // console.log( this.mobileQuery);
  }

  mobileQuery: MediaQueryList;


  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 400px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener("change",this._mobileQueryListener);
    this.fillerNav = [
      'members',
      'meals',
      "expences",
      "reports",
      "funds"
    ];
  }
 
  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener("change",this._mobileQueryListener);
  }
}
