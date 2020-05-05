import * as React from 'react';
import Mapping from '../../model/Mapping';
import {
    DefaultButton,
    Stack,
    TextField,
    DetailsList,
    DetailsListLayoutMode,
    Selection
} from 'office-ui-fabric-react';
import IListItemsComponentProps from './IListItemsComponentProps';
import IListItemsComponentState from './IListItemsComponentState';
import ListItemsController from '../../controllers/ListItemsController';
import ISPListItem from '../../model/ISPListItem';
import styles from './ListItemsComponent.module.scss';

class ListItemsComponent extends React.Component<IListItemsComponentProps, IListItemsComponentState> {
    private _selection: Selection;

    constructor(props) {
        super(props);

        this._selection = new Selection({
            onSelectionChanged: () => this.setState({ selectionDetails: this._getSelectionDetails() }),
        });

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
            titleTextField: "",
            selectionDetails: this._getSelectionDetails(),
            selectedListItems: [],
            columns
        };
    }

    private _getSelectionDetails(): string {
        const selectionCount = this._selection.getSelectedCount();

        let selectedListItems: ISPListItem[] = [];
        this._selection.getSelection().map(item => {
            selectedListItems.push({
                Id: item["Id"],
                Title: item["Title"]
            });
        });
        this.setState({
            selectedListItems
        });

        if (selectionCount == 0)
            return 'No items selected';

        return `${selectionCount} items selected`;
    }

    private _getListItems = () => {
        this.state.listItemsController.getListItems().then(listItems => {
            this.setState({
                listItems: listItems
            });
        });
    }

    private _addListItems = () => {
        this.state.listItemsController.addListItems(this.state.titleTextField).then(result => {
            if (result) {
                this._getListItems();
                this.setState({
                    titleTextField: ""
                });
            }
        });
    }

    private _deleteSelectedListItems = () => {
        if (this.state.selectedListItems.length == 0)
            alert("some items must be selected");

        this.state.selectedListItems.forEach(item => {
            this.state.listItemsController.deleteListItems(item.Id).then(result => {
                this._getListItems();
            });
        });
    }

    public componentDidMount() {
        this.setState({
            listItemsController: new ListItemsController(Mapping.testApiWebpartList, this.props.context)
        });
    }

    public render() {
        const { listItems, columns, titleTextField, selectionDetails } = this.state;
        return (
            <div className={styles.ListItemsComponent}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <Stack horizontal>
                                <DefaultButton text="getListItems()" onClick={this._getListItems} allowDisabledFocus />
                            </Stack>
                            <Stack>
                                <Stack horizontal>
                                    <Stack.Item>
                                        <TextField
                                            label="Title"
                                            value={titleTextField}
                                            onChange={(event, value) => this.setState({ titleTextField: value })}
                                            underlined />
                                    </Stack.Item>
                                    <Stack.Item>
                                        <DefaultButton text="addListItems()" onClick={this._addListItems} allowDisabledFocus />
                                    </Stack.Item>
                                    <Stack.Item>
                                        <DefaultButton text="deleteSelectedListItems()" onClick={this._deleteSelectedListItems} allowDisabledFocus />
                                    </Stack.Item>
                                </Stack>
                                <p className={styles.subTitle}>{selectionDetails}</p>
                                <DetailsList
                                    items={listItems}
                                    columns={columns}
                                    setKey="set"
                                    layoutMode={DetailsListLayoutMode.justified}
                                    selection={this._selection}
                                    selectionPreservedOnEmptyClick={true}
                                    ariaLabelForSelectionColumn="Toggle selection"
                                    ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                                    checkButtonAriaLabel="Row checkbox"
                                />
                            </Stack>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListItemsComponent;