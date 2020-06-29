import { MSGraphClient } from "@microsoft/sp-http";
import ISPListItem from "../../../model/ISPListItem";

export interface IGraphApiWebpartSimpleExampleState {
  client: MSGraphClient;
  userDisplayName: string;
  listName: string;
  listItems: ISPListItem[];
  columns: any[];
}
