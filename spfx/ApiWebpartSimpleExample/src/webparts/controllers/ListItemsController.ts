import {
    Environment,
    EnvironmentType
} from '@microsoft/sp-core-library';
import {
    SPHttpClient,
    SPHttpClientResponse,
    ISPHttpClientOptions
} from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';

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
    public getListItems(numberOfItems = 5) {
        try {
            numberOfItems = numberOfItems > this._maxNumberOfItems ? this._maxNumberOfItems : numberOfItems;

            if (this.isSharePointFramework()) {
                this.getSPListItems(numberOfItems);
            }
            else {
                console.log(`local workbench`);
            }
        }
        catch (ex) {
            console.error(`getListItems - error: ${ex}`);
        }
    }

    private getSPListItems(numberOfItems: number) {
        
    }

    private isSharePointFramework(): boolean {
        if (Environment.type == EnvironmentType.SharePoint || Environment.type == EnvironmentType.ClassicSharePoint)
            return true;

        return false;
    }

}

export default ListItemsController;