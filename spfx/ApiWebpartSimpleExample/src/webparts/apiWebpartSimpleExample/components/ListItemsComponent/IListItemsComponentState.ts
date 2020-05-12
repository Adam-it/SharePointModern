import ISPListItem from '../../model/ISPListItem';
import ListItemsController from '../../controllers/ListItemsController';
import ListItemsControllerPnPJS from '../../controllers/ListItemsControllerPnPJS';

export default interface IListItemsComponentState {
    listItems: ISPListItem[];
    columns: any[];
    listItemsController: ListItemsController;
    listItemsControllerPnP: ListItemsControllerPnPJS;
    titleTextField: string;
    selectionDetails: string;
    selectedListItems: ISPListItem[];
    labelText: string;
}