import {
    Environment,
    EnvironmentType
} from '@microsoft/sp-core-library';

class ListItemsController {

    private _listTitle: string;
    private _maxNumberOfItems = 5;

    constructor(listTitle: string) {
        try {
            if (!listTitle)
                throw new Error(`title may not be null`);
            this._listTitle = listTitle
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
            
            if (this.isSharePointFramework()){
                console.log(`sharepoint`);
            }
            else{
                console.log(`other`);
            }
        }
        catch (ex) {
            console.error(`getListItems - error: ${ex}`);
        }
    }

    private isSharePointFramework(): boolean {
        // ToDo add here a check if it is a sharepoint workbench not only local workbench
        if (Environment.type == EnvironmentType.SharePoint || Environment.type == EnvironmentType.ClassicSharePoint)
            return true;

        return false;
    }

}

export default ListItemsController;