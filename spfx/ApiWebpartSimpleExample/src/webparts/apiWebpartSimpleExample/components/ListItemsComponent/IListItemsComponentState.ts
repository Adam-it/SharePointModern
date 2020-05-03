import ISPListItem from '../../model/ISPListItem';
import ListItemsController from '../../controllers/ListItemsController';

export default interface IListItemsComponentState {
    listItems: ISPListItem[];
    columns: any[];
    listItemsController: ListItemsController;
}