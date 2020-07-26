import * as React from 'react';
import * as microsoftTeams from '@microsoft/teams-js';
import styles from './TeamsTabSample.module.scss';
import { ITeamsTabSampleProps } from './ITeamsTabSampleProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class TeamsTabSample extends React.Component<ITeamsTabSampleProps, {}> {

  public teamsContext: microsoftTeams.Context;

  protected onInit(): Promise<any> {
    let retVal: Promise<any> = Promise.resolve();
    if (this.context.microsoftTeams) {
      retVal = new Promise((resolve, reject) => {
        this.context.microsoftTeams.getContext(context => {
          this.teamsContext = context;
          resolve();
        });
      });
    }
    return retVal;
  }

  public render(): React.ReactElement<ITeamsTabSampleProps> {

    let title: string = '';
    let subTitle: string = '';
    if (this.teamsContext) {
      title = "SPFx webpart in MS Teams!";
      subTitle = "Team Context " + this.teamsContext.teamName;
    }
    else
    {
      title = "SPFx webpart in SharePoint Online!";
      subTitle = "Site Context: " + this.props.context.pageContext.web.title;
    }  

    return (
      <div className={ styles.teamsTabSample }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>{title}</span>
              <p className={ styles.subTitle }>{subTitle}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
