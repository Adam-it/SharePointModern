import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'GraphApiWebpartSimpleExampleWebPartStrings';
import GraphApiWebpartSimpleExample from './components/GraphApiComponent/GraphApiWebpartSimpleExample';
import { IGraphApiWebpartSimpleExampleProps } from './components/GraphApiComponent/IGraphApiWebpartSimpleExampleProps';

export interface IGraphApiWebpartSimpleExampleWebPartProps {
  description: string;
}

export default class GraphApiWebpartSimpleExampleWebPart extends BaseClientSideWebPart <IGraphApiWebpartSimpleExampleWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IGraphApiWebpartSimpleExampleProps> = React.createElement(
      GraphApiWebpartSimpleExample,
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
            description: strings.PropertyPaneDescription
          },
          groups: []
        }
      ]
    };
  }
}
