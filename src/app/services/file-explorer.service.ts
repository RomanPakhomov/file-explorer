import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()
export class FileExplorerService {

  private path: BehaviorSubject<string> = new BehaviorSubject<string>('')

  public setPath(path: string): void {
    this.path.next(path);
  }

  public getPath(): Observable<string> {
    return this.path.asObservable()
  }

}
