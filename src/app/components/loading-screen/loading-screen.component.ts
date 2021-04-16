import { Component, OnInit } from '@angular/core';
import {LoadingScreenService} from "../../service/loading-screen.service";

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.css']
})
export class LoadingScreenComponent implements OnInit {

  public isLoading = false;
  constructor(private loadingService: LoadingScreenService) { }

  ngOnInit(): void {
    this.loadingService.getSpinnerInfo().subscribe(e =>  {
      this.isLoading = e;
    })
  }

}
