import { Log } from '@microsoft/sp-core-library';
import { override } from '@microsoft/decorators';
import * as React from 'react';

import styles from './FieldCustomizerExample.module.scss';
import IFieldCustomizerExampleProps from './IFieldCustomizerExampleProps';

import { PrimaryButton } from '@fluentui/react';

const LOG_SOURCE: string = 'FieldCustomizerExample';

export default class FieldCustomizerExample extends React.Component<IFieldCustomizerExampleProps, {}> {
  @override
  public componentDidMount(): void {
    Log.info(LOG_SOURCE, 'React Element: FieldCustomizerExample mounted');
  }

  @override
  public componentWillUnmount(): void {
    Log.info(LOG_SOURCE, 'React Element: FieldCustomizerExample unmounted');
  }

  @override
  public render(): React.ReactElement<{}> {
    const style = {
      width: `${this.props.text}px`,
      background: '#0094ff',
      color: '#c0c0c0'
    };

    return (
      <div className={styles.cell}>
        <div className={styles.full}>
          <div style={style}>
              &nbsp; {this.props.text}
          </div>
          <PrimaryButton text="show item Id" onClick={this._showItemId} />
        </div>
      </div>
    );
  }

  private _showItemId = () => {
    alert(`item id is -> ${this.props.id}`);
  }
}
