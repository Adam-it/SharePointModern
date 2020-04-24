import * as React from 'react';
import ReactUISample from './ReactFabricUIComponent/ReactUISample';
import ExampleComponent from './ExampleComponent/ExampleComponent';

class LayoutComponent extends React.Component {
    render() {
        return (
            <React.Fragment>
                <ExampleComponent text="someText"/>
                <ExampleComponent/>
                <ReactUISample/>
            </React.Fragment>
        );
    }
}

export default LayoutComponent