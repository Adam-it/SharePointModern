import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'SampleTestingWebPartStrings';
import SampleTesting from './components/SampleTesting';
import { ISampleTestingProps } from './components/ISampleTestingProps';

export interface ISampleTestingWebPartProps {
  description: string;
}

export default class SampleTestingWebPart extends BaseClientSideWebPart <ISampleTestingWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISampleTestingProps> = React.createElement(
      SampleTesting,
      {
        description: this.properties.description,
        someProp: 0
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
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
