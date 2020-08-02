import * as React from 'react';
import styles from './SampleTesting.module.scss';
import { ISampleTestingProps } from './ISampleTestingProps';
import { ISampleTestingState } from './ISampleTestingState';

export default class SampleTesting extends React.Component<ISampleTestingProps, ISampleTestingState> {

  constructor(props) {
    super(props);
    this.state = {
      someProp: 0
    };
  }

  public someExampleMethod = () => {
    this.setState({
      someProp: 1
    });
  }

  public render(): React.ReactElement<ISampleTestingProps> {
    return (
      <div className={ styles.sampleTesting } id="spfxTest">
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <p>This project is for checking out test</p>
              <p className="description">{this.props.description}</p>
              <button onClick={this.someExampleMethod}>some button</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
