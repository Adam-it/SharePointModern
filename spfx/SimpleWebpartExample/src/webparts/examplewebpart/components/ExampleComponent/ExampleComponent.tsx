import * as React from 'react';
import { IExampleComponent } from './IExampleComponent';

class ExampleComponent extends React.Component<IExampleComponent> {

    state = {
        text : "default"
    }

    constructor(props)
    {
        super(props);
        
        if(props.text)
            this.state.text = props.text;
    }

    render() {
        return (
            <div>
                empty component for copy paste {this.state.text}
            </div>
        );
    }
}

export default ExampleComponent;