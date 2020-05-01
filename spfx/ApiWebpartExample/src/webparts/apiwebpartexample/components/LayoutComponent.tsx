import * as React from 'react';
import * as strings from 'ApiwebpartexampleWebPartStrings';
import ListItemsComponent from './ListItemsComponent/ListItemsComponent'

class LayoutComponent extends React.Component {
    render() {
        return (
            <React.Fragment>
                <p>{strings.WebpartTitle}</p>
                <ListItemsComponent />
            </React.Fragment>
        );
    }
}

export default LayoutComponent