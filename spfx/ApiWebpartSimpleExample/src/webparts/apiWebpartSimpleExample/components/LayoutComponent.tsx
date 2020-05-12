import * as React from 'react';
import * as strings from 'ApiWebpartSimpleExampleWebPartStrings';
import ListItemsComponent from './ListItemsComponent/ListItemsComponent';
import ILayoutComponent from './ILayoutComponent';

class LayoutComponent extends React.Component<ILayoutComponent> {
    public render() {
        return (
            <React.Fragment>
                <p>{strings.WebpartTitle}</p>
                <ListItemsComponent
                    context={this.props.context} />
            </React.Fragment>
        );
    }
}

export default LayoutComponent;