import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox,
  PropertyPaneDropdown,
  PropertyPaneToggle,
  PropertyPaneSlider
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import propertyPaneValidators from './propertyPane/propertyPaneValidators';
import {propertyPaneDropdownValues} from './propertyPane/propertyPaneDropdownValues';

import * as strings from 'ExamplewebpartWebPartStrings';
import LayoutComponent from './components/LayoutComponent';

export interface IExamplewebpartWebPartProps {
  description: string;
  propertyPaneSingleLineTextField: string;
  propertyPaneMultiLineTextField: string;
  propertyPaneCheckboxField: boolean;
  propertyPaneDropdownField: string;
  propertyPaneToggleField: boolean;
}

export default class ExamplewebpartWebPart extends BaseClientSideWebPart <IExamplewebpartWebPartProps> {
  
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
            description: strings.PropertyPaneTitleStringPage1
          },
          groups: [
            {
                groupName: strings.PropertyPaneBasicGroup1NameString,
                groupFields: [
                    PropertyPaneTextField('propertyPaneSingleLineTextField', {
                        label: strings.PropertyPaneSingleLineTextFieldString,
                        onGetErrorMessage: propertyPaneValidators.validateTextField1.bind(this)
                    }),
                    PropertyPaneTextField('propertyPaneMultiLineTextField', {
                        label: strings.PropertyPaneMultiLineTextFieldString,
                        multiline: true,
                        onGetErrorMessage: propertyPaneValidators.validateTextField2.bind(this)
                    }),
                    PropertyPaneCheckbox('propertyPaneCheckboxField', {
                        text: strings.PropertyPaneCheckboxFieldString
                    })
                ]
            },
            {
              groupName: strings.PropertyPaneBasicGroup2NameString,
              groupFields: [
                  PropertyPaneDropdown('propertyPaneDropdownField', {
                      label: strings.PropertyPaneDropdownFieldString,
                      options: propertyPaneDropdownValues
                  }),
                  PropertyPaneToggle('propertyPaneToggleField', {
                      label: strings.PropertyPaneToggleFieldString,
                      onText: 'On',
                      offText: 'Off'
                  })
              ]
          }
          ]
        },
        {
          header: {
            description: strings.PropertyPaneTitleStringPage2
          },
          groups: [
            {
                groupName: strings.PropertyPaneBasicGroup1NameString,
                groupFields: [
                    PropertyPaneSlider('propertyPaneSliderField',{
                      label: strings.PropertyPaneSliderFieldString, 
                      min:1, 
                      max:10
                    })
                ]
            }
          ]
        }
      ]
    };
  }
}
