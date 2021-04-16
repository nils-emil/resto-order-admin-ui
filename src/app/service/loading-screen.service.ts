import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingScreenService {

  private bSubject = new BehaviorSubject(false);

  constructor() {
  }


  startSpinner(): void {
    this.bSubject.next(true);
  }

  stopSpinner(): void {
    this.bSubject.next(false);
  }

  getSpinnerInfo(): BehaviorSubject<boolean> {
    return this.bSubject;
  }

}
