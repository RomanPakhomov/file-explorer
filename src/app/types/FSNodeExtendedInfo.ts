import {IFSNodeInfo} from "./FSNodeInfo";

export interface IFSNodeExtendedInfo extends IFSNodeInfo {
  children: IFSNodeExtendedInfo[]
  extension:	string;
  size: number;
}
