import * as React from 'react';
import styles from './GraphToolkitWebpartSimpleExample.module.scss';
import { IGraphToolkitWebpartSimpleExampleProps } from './IGraphToolkitWebpartSimpleExampleProps';
import {Providers, SharePointProvider} from '@microsoft/mgt';  

// needed workaround in order to use grap toolkit components in tsx
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'mgt-login': any;
      'mgt-person': any;
      'mgt-agenda': any;
      'mgt-people': any;
      'mgt-teams-channel-picker': any;
      'mgt-people-picker': any;
      'mgt-tasks': any;
    }
  }
}

export default class GraphToolkitWebpartSimpleExample extends React.Component<IGraphToolkitWebpartSimpleExampleProps, {}> {

  constructor(props) {
    super(props);

    Providers.globalProvider = new SharePointProvider(this.props.context);  
  }

  public render(): React.ReactElement<IGraphToolkitWebpartSimpleExampleProps> {
    return (
      <div className={ styles.graphToolkitWebpartSimpleExample }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <label>Graph toolkit example</label>
            </div>
          </div>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <h1> Login Control </h1>  
              <mgt-login></mgt-login>  
              <h1> Person Control </h1>  
              <mgt-person person-query="me" show-name show-email></mgt-person>  
              <h1> Agenda Control </h1>  
              <mgt-agenda  group-by-day></mgt-agenda>  
              <h1> People Control </h1>  
              <mgt-people></mgt-people>  
              <h1> Teams Channel Picker </h1>  
              <mgt-teams-channel-picker></mgt-teams-channel-picker>
              <h1> People Picker </h1>  
              <mgt-people-picker></mgt-people-picker>
              <h1> Tasks </h1>  
              <mgt-tasks></mgt-tasks>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
