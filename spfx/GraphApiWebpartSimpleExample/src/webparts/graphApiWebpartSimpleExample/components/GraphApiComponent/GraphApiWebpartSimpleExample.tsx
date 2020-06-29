import * as React from 'react';
import styles from '../GraphApiWebpartSimpleExample.module.scss';
import { IGraphApiWebpartSimpleExampleProps } from './IGraphApiWebpartSimpleExampleProps';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { MSGraphClient } from "@microsoft/sp-http";
import { IGraphApiWebpartSimpleExampleState } from './IGraphApiWebpartSimpleExampleState';
import ISPListItem from "../../../model/ISPListItem";
import { 
  DefaultButton, 
  DetailsList, 
  DetailsListLayoutMode, 
  Selection 
} from 'office-ui-fabric-react';

export default class GraphApiWebpartSimpleExample extends React.Component<IGraphApiWebpartSimpleExampleProps, IGraphApiWebpartSimpleExampleState> {
  private _selection: Selection;

  constructor(props) {
    super(props);

    let columns = [];
    columns.push({
        key: 'Id',
        name: 'Id',
        fieldName: 'Id',
        minWidth: 100,
        maxWidth: 200,
        isResizable: true
    });
    columns.push({
        key: 'Title',
        name: 'Title',
        fieldName: 'Title',
        minWidth: 100,
        maxWidth: 200,
        isResizable: true
      });

    this.state = {
      userDisplayName: "",
      client: null,
      listName: "testListWithSomeData",
      columns,
      listItems: []
    };
  }

  private _IsWorkbench(): boolean {
      if (Environment.type == EnvironmentType.Local)
        return true;

    return false;
  }

  private _GetListItemsWithGraphApi = () =>{
    if (this.state.client){
      this.state.client
        .api(`sites('${this.props.context.pageContext.site.id}')/lists('${this.state.listName}')/items?expand=fields`)
        .version("v1.0")
        .get((err, res) => {

          if (err) {
            console.error(err);
            return;
          }
          
          let listItems:ISPListItem[] = [];

          res.value.map((item: any) => {
            listItems.push( {
              Id: item.id,
              Title: item.fields.Title
            });
          });

          this.setState({ listItems });

        });
    }
  }

  private _DeleteListItem = () =>{
    if (this.state.client){
      this.state.client
        .api(`sites('${this.props.context.pageContext.site.id}')/lists('${this.state.listName}')/items?expand=fields`)
        .version("v1.0")
        .get((err, res) => {
          if (err) {
            console.error(err);
            return;
          }

          let id = res.value[res.value.length - 1].id;

          this.state.client
            .api(`sites('${this.props.context.pageContext.site.id}')/lists('${this.state.listName}')/items/${id}`)
            .version("v1.0")
            .delete((err, res) => {
              if (err) {
                console.error(err);
                return;
              }
              
              this._GetListItemsWithGraphApi();  
            });
        });
    }
  }

  private _AddListItem = () =>{
    if (this.state.client){

      let item = {
        "fields": {
          "Title": "New Item"
        }
      };

      this.state.client
        .api(`sites('${this.props.context.pageContext.site.id}')/lists('${this.state.listName}')/items`)
        .version("v1.0")
        .post(item, (err, res, success) => {
          if (err) {
            console.error(err);
            return;
          }
                         
          if (success)
            this._GetListItemsWithGraphApi();            
        });
    }
  }

  public componentDidMount(){
    if (!this._IsWorkbench()){
      this.props.context.msGraphClientFactory
        .getClient()
        .then((client: MSGraphClient): void => {
          this.setState({ client });
          
          client
            .api('/me')
            .get((error, response: any, rawResponse?: any) => {
              this.setState({ userDisplayName: response.displayName });
            });
      });
    }
  }

  public render(): React.ReactElement<IGraphApiWebpartSimpleExampleProps> {
    const { listItems, columns, userDisplayName } = this.state;

    return (
      <div className={ styles.graphApiWebpartSimpleExample }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <p className={ styles.title }>Hi { userDisplayName }</p>
              <p className={ styles.subTitle }>Graph Api Webpart Test</p>
            </div>
          </div>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <DefaultButton text="_GetListItemsWithGraphApi()" onClick={this._GetListItemsWithGraphApi} allowDisabledFocus/>
              <DefaultButton text="_AddListItem()" onClick={this._AddListItem} allowDisabledFocus/>
              <DefaultButton text="_DeleteListItem()" onClick={this._DeleteListItem} allowDisabledFocus/>
            </div>
          </div>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <DetailsList
                  items={listItems}
                  columns={columns}
                  setKey="set"
                  layoutMode={DetailsListLayoutMode.justified}
                  selection={this._selection}
                  selectionPreservedOnEmptyClick={true}
                  ariaLabelForSelectionColumn="Toggle selection"
                  ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                  checkButtonAriaLabel="Row checkbox"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
