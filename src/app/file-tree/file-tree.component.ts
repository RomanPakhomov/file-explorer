import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import {FSObjectType} from "../types/FSNodeInfo";
import { Subject} from "rxjs";
import {FileExplorerApiService} from "../services/file-explorer-api.service";
import {map, takeUntil} from "rxjs/operators";
import {FileExplorerService} from "../services/file-explorer.service";
import {IFSNodeExtendedInfo} from "../types/FSNodeExtendedInfo";

interface ExampleFlatNode extends IFSNodeExtendedInfo{
  expandable: boolean;
  level: number;
}

@Component({
  selector: 'app-file-tree',
  templateUrl: './file-tree.component.html',
  styleUrls: ['./file-tree.component.scss']
})
export class FileTreeComponent implements OnInit, OnDestroy {

  @Input() drivers: IFSNodeExtendedInfo[] = []

  directories: IFSNodeExtendedInfo[] | null = null;
  expandedNodes: IFSNodeExtendedInfo[] = [];
  fsObjectType = FSObjectType;
  destroy: Subject<any> = new Subject<any>();

  constructor(
    private appService: FileExplorerApiService,
    private fileExplorerService: FileExplorerService
  ) {}

  ngOnInit(): void {
    this.dataSource.data = this.drivers;
  }

  saveExpandedNodes() {
    this.expandedNodes = new Array<IFSNodeExtendedInfo>();
    this.expandedNodes = this.treeControl.dataNodes.filter(node => this.treeControl.isExpanded(node));
  }

  restoreExpandedNodes() {
    this.expandedNodes.forEach(node => {
      this.treeControl.expand(this.treeControl.dataNodes.filter(n => n.path === node.path)[0]);
    });
  }

  getDirectories(path: string): void {
    this.saveExpandedNodes();
    this.appService.getDirectories(path).pipe(
      takeUntil(this.destroy),
      map(directories => directories.filter(d => d.type !== this.fsObjectType.file))
    ).subscribe(directories => {
      this.directories = directories;
      const drivers = this.addChilds(this.drivers, path, this.directories);
      this.drivers = drivers;
      this.dataSource.data = [];
      this.dataSource.data = this.drivers;
      this.restoreExpandedNodes();
    });
  }

  addChilds(nodes: IFSNodeExtendedInfo[], path: string, children: IFSNodeExtendedInfo[]): IFSNodeExtendedInfo[] {
    return nodes.map(node => {
      if (node.path === path) {
        return { ...node, children }
      }
      if (children?.length) {
        return { ...node, children: this.addChilds(node.children, path, children) }
      }
      return node;
    })
  }

  selectPath(path: string): void {
    this.fileExplorerService.setPath(path);
  }

  private _transformer = (node: IFSNodeExtendedInfo, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0 || node.type === this.fsObjectType.drive,
      level: level,
      ...node
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: IFSNodeExtendedInfo) => node.children?.length > 0 || node.type === this.fsObjectType.drive || !node.leaf;

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }

}
