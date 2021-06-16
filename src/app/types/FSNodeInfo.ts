import {IFSNodeBaseInfo} from "./FSNodeBaseInfo";

export interface IFSNodeInfo extends IFSNodeBaseInfo{
  leaf:	boolean;
  isLoading: boolean;
}

export enum FSObjectType {
  drive = 'drive',
  directory = 'directory',
  file = 'file'
}
