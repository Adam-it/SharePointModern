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
    private _context: WebPartContext

    constructor(
        listTitle: string,
        context: WebPartContext) {
        try {
            if (!listTitle)
                throw new Error(`title may not be null`);
            this._listTitle = listTitle

            if (!context)
                throw new Error(`context may not be null`);
            this._context = context
        }
        catch (ex) {
            console.error(`class ListItemsController - error: ${ex}`);
        }
    }

    /**
     * getListItems is a method that will retrive all list items (max items that will be retrived is 5) for a given list
     * title - list title
     * numberOfItems - how much items will be retrived max 5
     */
    public getListItems(numberOfItems = 5): Promise<ISPListItem[]> {
        try {
            numberOfItems = numberOfItems > this._maxNumberOfItems ? this._maxNumberOfItems : numberOfItems;

            if (this._isSharePointFramework()) {
                return this._getSPListItems(numberOfItems)
            }
            else {
                return this._getMockListItems(numberOfItems)
            }
        }
        catch (ex) {
            console.error(`getListItems - error: ${ex}`);
        }
    }

    private _getSPListItems(numberOfItems: number): Promise<ISPListItem[]> {
        const url: string = `${this._context.pageContext.web.absoluteUrl}/_api/lists/GetByTitle('testApiWebpartList')/items?$top=${this._maxNumberOfItems}`;
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

    private _isSharePointFramework(): boolean {
        if (Environment.type == EnvironmentType.SharePoint || Environment.type == EnvironmentType.ClassicSharePoint)
            return true;

        return false;
    }

}

export default ListItemsController;