import * as React from 'react';
import Mapping from '../../model/Mapping';
import {
    DefaultButton,
    Stack
} from 'office-ui-fabric-react';
import {
    DetailsList,
    DetailsListLayoutMode
} from 'office-ui-fabric-react/lib/DetailsList';
import IListItemsComponentProps from './IListItemsComponentProps';
import IListItemsComponentState from './IListItemsComponentState';
import ListItemsController from '../../controllers/ListItemsController';
import ISPListItem from '../../model/ISPListItem';
import styles from './ListItemsComponent.module.scss';

class ListItemsComponent extends React.Component<IListItemsComponentProps, IListItemsComponentState> {

    constructor(props) {
        super(props);

        let columns = [];
        columns.push({
            key: 'Id',
            name: 'Id',
            fieldName: 'Id',
            minWidth: 100,
            maxWidth: 200,
            isResizable: true
        });
        columns.push({
            key: 'Title',
            name: 'Title',
            fieldName: 'Title',
            minWidth: 100,
            maxWidth: 200,
            isResizable: true
        });

        this.state = {
            listItems: [],
            listItemsController: null,
            columns
        };
    }

    public componentDidMount() {
        this.setState({
            listItemsController: new ListItemsController(Mapping.testApiWebpartList, this.props.context)
        });
    }

    private _getListItems = () => {
        this.state.listItemsController.getListItems().then(listItems => {
            this.setState({
                listItems: listItems
            });
        });
    }

    public render() {
        const { listItems, columns } = this.state;
        return (
            <div className={styles.ListItemsComponent}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <Stack horizontal>
                                <DefaultButton text="getListItems()" onClick={this._getListItems} allowDisabledFocus />
                            </Stack>
                            <DetailsList
                                items={listItems}
                                columns={columns}
                                setKey="set"
                                layoutMode={DetailsListLayoutMode.justified}
                                selectionPreservedOnEmptyClick={true}
                                ariaLabelForSelectionColumn="Toggle selection"
                                ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                                checkButtonAriaLabel="Row checkbox"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListItemsComponent;