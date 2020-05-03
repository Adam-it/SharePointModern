import {
    Environment,
    EnvironmentType
} from '@microsoft/sp-core-library';
import {
    SPHttpClient,
    SPHttpClientResponse
} from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import ISPListItem from '../model/ISPListItem';
import MockTestApiWebpartListGetItems from '../mocks/MockTestApiWebpartListGetItems';

class ListItemsController {

    private _listTitle: string;
    private _maxNumberOfItems = 5;
    private _context: WebPartContext;

    constructor(
        listTitle: string,
        context: WebPartContext) {
        try {
            if (!listTitle)
                throw new Error(`title may not be null`);
            this._listTitle = listTitle;

            if (!context)
                throw new Error(`context may not be null`);
            this._context = context;
        }
        catch (ex) {
            console.error(`class ListItemsController - error: ${ex}`);
        }
    }

    private _isSharePointFramework(): boolean {
        if (Environment.type == EnvironmentType.SharePoint || Environment.type == EnvironmentType.ClassicSharePoint)
            return true;

        return false;
    }

    private _getSPListItems(numberOfItems: number): Promise<ISPListItem[]> {
        const url: string = `${this._context.pageContext.web.absoluteUrl}/_api/lists/GetByTitle('testApiWebpartList')/items?$top=${this._maxNumberOfItems}&$orderby=Created desc`;
        return this._context.spHttpClient.get(url,
            SPHttpClient.configurations.v1)
            .then(response => {
                return response.json();
            })
            .then(json => {
                return json.value;
            }) as Promise<ISPListItem[]>;
    }

    private _getMockListItems(numberOfItems: number): Promise<ISPListItem[]> {
        return MockTestApiWebpartListGetItems.get("")
            .then((data: ISPListItem[]) => {
                return data;
            });
    }

    private _addSPListItem(title: string): Promise<boolean> {
        const body: string = JSON.stringify({
            'Title': title
        });

        const url: string = `${this._context.pageContext.web.absoluteUrl}/_api/lists/GetByTitle('testApiWebpartList')/items`;
        return this._context.spHttpClient.post(url,
            SPHttpClient.configurations.v1,
            {
                headers: {
                    'Accept': 'application/json;odata=nometadata',
                    'Content-type': 'application/json;odata=nometadata',
                    'odata-version': ''
                },
                body: body
            })
            .then((response: SPHttpClientResponse): Promise<ISPListItem> => {
                return response.json();
            })
            .then((item: ISPListItem) => {
                return true;
            }, (error: any) => {
                return false;
            });
    }

    /**
     * getListItems is a method that will retrive all list items (max items that will be retrived is 5) for a given list
     * numberOfItems - how much items will be retrived max 5
     */
    public getListItems(numberOfItems = 5): Promise<ISPListItem[]> {
        try {
            numberOfItems = numberOfItems > this._maxNumberOfItems ? this._maxNumberOfItems : numberOfItems;

            if (this._isSharePointFramework()) {
                return this._getSPListItems(numberOfItems);
            }
            else {
                return this._getMockListItems(numberOfItems);
            }
        }
        catch (ex) {
            console.error(`getListItems - error: ${ex}`);
        }
    }

    /**
     * addListItems is a method that will add list item to the list
     * title - title of item which will be added
     */
    public addListItems(title: string): Promise<boolean> {
        try {
            if (this._isSharePointFramework()) {
                return this._addSPListItem(title);
            }
            else {
                throw new Error("not implemented"); //ToDo add mock to add item
            }
        }
        catch (ex) {
            console.error(`getListItems - error: ${ex}`);
        }
    }

    /**
     * deleteListItems is a method that deletes list items
     */
    public deleteListItems() {
        // ToDo
        /*
private deleteItem(): void {  
  if (!window.confirm('Are you sure you want to delete the latest item?')) {  
    return;  
  }  
  
  this.updateStatus('Loading latest items...');  
  let latestItemId: number = undefined;  
  let etag: string = undefined;  
  this.getLatestItemId()  
    .then((itemId: number): Promise<SPHttpClientResponse> => {  
      if (itemId === -1) {  
        throw new Error('No items found in the list');  
      }  
  
      latestItemId = itemId;  
      this.updateStatus(`Loading information about item ID: ${latestItemId}...`);  
      return this.context.spHttpClient.get(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('${this.properties.listName}')/items(${latestItemId})?$select=Id`,  
        SPHttpClient.configurations.v1,  
        {  
          headers: {  
            'Accept': 'application/json;odata=nometadata',  
            'odata-version': ''  
          }  
        });  
    })  
    .then((response: SPHttpClientResponse): Promise<IListItem> => {  
      etag = response.headers.get('ETag');  
      return response.json();  
    })  
    .then((item: IListItem): Promise<SPHttpClientResponse> => {  
      this.updateStatus(`Deleting item with ID: ${latestItemId}...`);  
      return this.context.spHttpClient.post(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('${this.properties.listName}')/items(${item.Id})`,  
        SPHttpClient.configurations.v1,  
        {  
          headers: {  
            'Accept': 'application/json;odata=nometadata',  
            'Content-type': 'application/json;odata=verbose',  
            'odata-version': '',  
            'IF-MATCH': etag,  
            'X-HTTP-Method': 'DELETE'  
          }  
        });  
    })  
    .then((response: SPHttpClientResponse): void => {  
      this.updateStatus(`Item with ID: ${latestItemId} successfully deleted`);  
    }, (error: any): void => {  
      this.updateStatus(`Error deleting item: ${error}`);  
    });  
}  
        */
    }
}

export default ListItemsController;