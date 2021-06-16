import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FSObjectType, IFSNodeInfo} from "../types/FSNodeInfo";
import {FileExplorerService} from "../services/file-explorer.service";
import {FileExplorerApiService} from "../services/file-explorer-api.service";
import {IFSNodeExtendedInfo} from "../types/FSNodeExtendedInfo";
import {merge, of, Subject} from "rxjs";
import {catchError, map, startWith, switchMap, takeUntil} from "rxjs/operators";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {SortDirection, SortDirectionMap, SortMode} from "../types/SortAndFilterTypes";

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.scss']
})
export class FileExplorerComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() drivers: IFSNodeExtendedInfo[] = [];
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  directories: IFSNodeExtendedInfo[] = [];
  fsObjectType = FSObjectType;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  destroy: Subject<any> = new Subject<any>();
  directoriesColumns: string[] = ['name', 'size', 'modified', 'extension'];
  startSortMode = SortMode.name;
  startSortDirection = SortDirection.ascending;
  isLoadingResults = false;
  path: string = '';
  tabs = false;

  constructor(
    private fileExplorerService: FileExplorerService,
    private fileExplorerApiService: FileExplorerApiService
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.directories);
    this.directories = this.drivers;
    this.fileExplorerService.getPath().pipe(
      takeUntil(this.destroy),
      switchMap(path => {
        this.isLoadingResults = true;
        this.path = path;
        return path !== ''
          ? this.fileExplorerApiService.getDirectoriesDetailed(path)
          : of(this.drivers);
      })
    ).subscribe(directories => {
      this.isLoadingResults = false;
      this.dataSource = new MatTableDataSource(directories);
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.sort.sortChange.asObservable().pipe(
        switchMap((sort) => {
          this.isLoadingResults = true;
          const sortMode = sort.active == 'extension' ? 'type' : sort.active;
          const sortDirection = SortDirectionMap.get(sort.direction);
          if(this.path) {
            return this.fileExplorerApiService.getDirectoriesDetailed(this.path, sortMode, sortDirection).pipe(catchError(() => of(null)));
          }
          else return of(this.directories)
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          if (data === null) {
            return [];
          }
          return data;
        })
      ).subscribe(data => {
        this.dataSource = new MatTableDataSource(data)
      });
  }

  openDirectory(path: string, type: string): void {
    if (type !== this.fsObjectType.file) {
      this.fileExplorerService.setPath(path);
    }
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
