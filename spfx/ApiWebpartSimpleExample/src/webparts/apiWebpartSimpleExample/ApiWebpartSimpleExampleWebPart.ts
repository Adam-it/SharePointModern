import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ApiWebpartSimpleExampleWebPartStrings';
import LayoutComponent from './components/LayoutComponent';
import ILayoutComponent from './components/ILayoutComponent';

export interface IApiWebpartSimpleExampleWebPartProps { }

export default class ApiWebpartSimpleExampleWebPart extends BaseClientSideWebPart<IApiWebpartSimpleExampleWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ILayoutComponent> = React.createElement(
      LayoutComponent,
      {
        context: this.context
      }
    );

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
            description: strings.WebpartTitle
          },
          groups: []
        }
      ]
    };
  }
}
