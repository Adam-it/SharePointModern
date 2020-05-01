import * as React from 'react';
import { IListItemsComponent } from './IListItemsComponent';
import ListItemsController from '../../controllers/ListItemsController';

class ListItemsComponent extends React.Component<IListItemsComponent> {

    state = {}

    constructor(props)
    {
        super(props);
    }

    componentDidMount(){
        let listItemsController = new ListItemsController("someList");
        listItemsController.getListItems();
    }

    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default ListItemsComponent;