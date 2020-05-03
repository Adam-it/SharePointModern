import * as React from 'react';
import IListItemsComponent from './IListItemsComponent';
import ListItemsController from '../../controllers/ListItemsController';

class ListItemsComponent extends React.Component<IListItemsComponent> {

    state = {}

    constructor(props)
    {
        super(props);
    }

    componentDidMount(){
        let listItemsController = new ListItemsController(`testApiWebpartList`, this.props.context);
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