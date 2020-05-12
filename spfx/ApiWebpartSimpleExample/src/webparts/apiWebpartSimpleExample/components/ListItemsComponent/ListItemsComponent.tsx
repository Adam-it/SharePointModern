import * as React from 'react';
import Mapping from '../../model/Mapping';
import {
    DefaultButton,
    Stack,
    TextField,
    DetailsList,
    DetailsListLayoutMode,
    Selection,
    Label
} from 'office-ui-fabric-react';
import IListItemsComponentProps from './IListItemsComponentProps';
import IListItemsComponentState from './IListItemsComponentState';
import ListItemsController from '../../controllers/ListItemsController';
import ISPListItem from '../../model/ISPListItem';
import styles from './ListItemsComponent.module.scss';
import ListItemsControllerPnPJS from '../../controllers/ListItemsControllerPnPJS';

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
            listItemsControllerPnP: null,
            titleTextField: "",
            selectionDetails: this._getSelectionDetails(),
            selectedListItems: [],
            labelText: "",
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

    private _getPnPListItems = () => {
        this.state.listItemsControllerPnP.getPnPListItems().then(listItems => {
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

    private _addPnPJSListItem = () => {
        this.state.listItemsControllerPnP.addPnPListItem(this.state.titleTextField).then(result => {
            if (result.data.Id) {
                this._getPnPListItems();
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

    private _deletePnPJSListItems = () => {
        if (this.state.selectedListItems.length == 0)
            alert("some items must be selected");

        this.state.selectedListItems.forEach(item => {
            this.state.listItemsControllerPnP.deletePnPListItem(item.Id).then(result => {
                this._getPnPListItems();
            });
        });
    }

    private _getPnPJSGetCurrentUser = () => {
        this.state.listItemsControllerPnP.getCurrentUser().then(result => {
            console.log(result);
            this.setState({
                labelText: result.Title
            });
        });
    }

    public componentDidMount() {
        const { context } = this.props;
        this.setState({
            listItemsController: new ListItemsController(Mapping.testApiWebpartList, context),
            listItemsControllerPnP: new ListItemsControllerPnPJS(Mapping.testApiWebpartList, context)
        });
    }

    public render() {
        const { listItems, columns, titleTextField, selectionDetails, labelText } = this.state;
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
                                <Stack horizontal>
                                    <Stack.Item>
                                        <DefaultButton text="getPnPJSListItems()" onClick={this._getPnPListItems} allowDisabledFocus />
                                    </Stack.Item>
                                    <Stack.Item>
                                        <DefaultButton text="addPnPJSListItem()" onClick={this._addPnPJSListItem} allowDisabledFocus />
                                    </Stack.Item>
                                    <Stack.Item>
                                        <DefaultButton text="deletePnPJSListItem()" onClick={this._deletePnPJSListItems} allowDisabledFocus />
                                    </Stack.Item>
                                    <Stack.Item>
                                        <DefaultButton text="getPnPJSGetCurrentUser()" onClick={this._getPnPJSGetCurrentUser} allowDisabledFocus />
                                    </Stack.Item>
                                    <Stack.Item>
                                        <Label>{labelText}</Label>
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