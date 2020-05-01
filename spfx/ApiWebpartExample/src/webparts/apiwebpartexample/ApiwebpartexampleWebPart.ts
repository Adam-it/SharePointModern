import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ApiwebpartexampleWebPartStrings';
import LayoutComponent from './components/LayoutComponent';

export interface IApiwebpartexampleWebPartProps {}

export default class ApiwebpartexampleWebPart extends BaseClientSideWebPart <IApiwebpartexampleWebPartProps> {

  public render(): void {
    const element: React.ReactElement = React.createElement(LayoutComponent);
    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: []
        }
      ]
    };
  }
}
