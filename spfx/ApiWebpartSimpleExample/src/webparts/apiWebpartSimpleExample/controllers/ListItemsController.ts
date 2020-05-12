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
    private _mock: MockTestApiWebpartListGetItems;

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

            if (!this._isSharePointFramework())
                this._mock = new MockTestApiWebpartListGetItems();
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
        const url: string = `${this._context.pageContext.web.absoluteUrl}/_api/lists/GetByTitle('${this._listTitle}')/items?$top=${this._maxNumberOfItems}&$orderby=Created desc`;
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
        return this._mock.get("")
            .then((data: ISPListItem[]) => {
                return data;
            });
    }

    private _addSPListItem(title: string): Promise<boolean> {
        const body: string = JSON.stringify({
            'Title': title
        });

        const url: string = `${this._context.pageContext.web.absoluteUrl}/_api/lists/GetByTitle('${this._listTitle}')/items`;
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

    private _addMockListItem(title: string): Promise<boolean>{
        return this._mock.add(title);
    }

    private _deleteListItems(itemId: number): Promise<void> {
        let etag: string = undefined;
        const url: string = `${this._context.pageContext.web.absoluteUrl}/_api/lists/GetByTitle('${this._listTitle}')/items(${itemId})`;
        return this._context.spHttpClient.get(`${url}?$select=Id`, SPHttpClient.configurations.v1)
            .then(response => {
                etag = response.headers.get('ETag');
                return response.json();
            })
            .then(json => {
                return this._context.spHttpClient.post(url,  
                    SPHttpClient.configurations.v1,  
                    {  
                        headers: {  
                            'Accept': 'application/json;odata=nometadata',  
                            'Content-type': 'application/json;odata=verbose',  
                            'odata-version': '',  
                            'IF-MATCH': etag,
                            'X-HTTP-Method': 'DELETE'  
                        }
                    })
                    .then((response: SPHttpClientResponse): void => {  
                    }, (error: any): void => {  });
            } , (error: any) => {
                return false;
            });
    }

    private _deleteMockListItems(itemId: number): Promise<void>{
        return this._mock.delete(itemId);
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
                return this._addMockListItem(title);
            }
        }
        catch (ex) {
            console.error(`getListItems - error: ${ex}`);
        }
    }

    /**
     * deleteListItems is a method that deletes list items
     */
    public deleteListItems(itemId: number): Promise<void> {
        try {
            if (this._isSharePointFramework()) {
                return this._deleteListItems(itemId);
            }
            else {
                return this._deleteMockListItems(itemId);
            }
        }
        catch (ex) {
            console.error(`getListItems - error: ${ex}`);
        }
    }
}

export default ListItemsController;