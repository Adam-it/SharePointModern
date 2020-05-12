import * as React from 'react';
import ReactUISample from './ReactFabricUIComponent/ReactUISample';
import ExampleComponent from './ExampleComponent/ExampleComponent';
import ReactFabricControlsComponent from './ReactFabricControlsComponent/ReactFabricControlsComponent';

class LayoutComponent extends React.Component {

    handleClick = (message: string) => {
        alert(message);
    };

    render() {
        return (
            <React.Fragment>
                <ExampleComponent text="someText"/>
                <ExampleComponent/>
                <ReactUISample/>
                <ReactFabricControlsComponent clickHandler={this.handleClick}/>
            </React.Fragment>
        );
    }
}

export default LayoutComponent