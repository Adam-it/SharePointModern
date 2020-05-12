import { 
    sp,
    IItemAddResult } from "@pnp/sp/presets/all";
import ISPListItem from '../model/ISPListItem';
import { WebPartContext } from '@microsoft/sp-webpart-base';

class ListItemsControllerPnPJS {

    private _listTitle: string;
    private _maxNumberOfItems = 5;

    constructor(
        listTitle: string, 
        context: WebPartContext) {
        try {
            if (!listTitle)
                throw new Error(`title may not be null`);
            this._listTitle = listTitle;

            sp.setup({
                spfxContext: context
            });
        }
        catch (ex) {
            console.error(`class ListItemsControllerPnPJS - error: ${ex}`);
        }
    }

    public getPnPListItems(numberOfItems = 5): Promise<ISPListItem[]> {
        return sp.web.lists.getByTitle(this._listTitle).items
            .orderBy('Id', false)
            .select('Id', 'Title')
            .get().then((items: ISPListItem[]) => {
                return items;
            });
    }

    public addPnPListItem(title: string): Promise<IItemAddResult> {
        return sp.web.lists.getByTitle(this._listTitle).items.add({
            Title: title
        });
    }

    public deletePnPListItem(id: number): Promise<void> {
        return sp.web.lists.getByTitle(this._listTitle).items.getById(id).delete();       
    }
}

export default ListItemsControllerPnPJS;