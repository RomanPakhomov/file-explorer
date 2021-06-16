import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {IFSNodeExtendedInfo} from "../types/FSNodeExtendedInfo";
import {SortDirection, SortMode} from "../types/SortAndFilterTypes";
import { environment } from './../../environments/environment';

@Injectable()
export class FileExplorerApiService {

  private basePath: string;

  constructor(private http: HttpClient) {
    this.basePath = environment.api + '/webfileexplorer';
  }

  public getDrivers(): Observable<IFSNodeExtendedInfo[]> {
    return this.http.get<IFSNodeExtendedInfo[]>(`${this.basePath}/filesystem/drives`);
  }

  public getDirectories(path: string, filter: string = 'directories'): Observable<IFSNodeExtendedInfo[]> {
    return this.http.get<IFSNodeExtendedInfo[]>(`${this.basePath}/filesystem/directories`, {
      params: { path, filter  }
    });
  }

  public getDirectoriesDetailed(path: string, sortMode: string = SortMode.name, sortDirection: string = SortDirection.ascending): Observable<IFSNodeExtendedInfo[]> {
    return this.http.get<IFSNodeExtendedInfo[]>(`${this.basePath}/filesystem/directories/detailed`, {
      params: { path, sortMode, sortDirection }
    });
  }

}
