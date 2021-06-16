import {Component, OnInit} from '@angular/core';
import {IFSNodeBaseInfo} from "./types/FSNodeBaseInfo";
import {FileExplorerApiService} from "./services/file-explorer-api.service";
import {Observable} from "rxjs";
import {share} from "rxjs/operators";
import {IFSNodeInfo} from "./types/FSNodeInfo";
import {IFSNodeExtendedInfo} from "./types/FSNodeExtendedInfo";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  drivers$: Observable<IFSNodeExtendedInfo[]> = new Observable<IFSNodeExtendedInfo[]>();

  constructor(private appService: FileExplorerApiService) {
  }

  ngOnInit(): void {
    this.drivers$ = this.appService.getDrivers().pipe(share());
  }

}
