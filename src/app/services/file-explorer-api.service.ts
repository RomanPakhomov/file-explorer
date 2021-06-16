import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {IFSNodeExtendedInfo} from "../types/FSNodeExtendedInfo";
import {SortDirection, SortMode} from "../types/SortAndFilterTypes";

@Injectable()
export class FileExplorerApiService {

  private basePath = 'http://95.79.31.124:5000/webfileexplorer';

  constructor(private http: HttpClient) {}

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
