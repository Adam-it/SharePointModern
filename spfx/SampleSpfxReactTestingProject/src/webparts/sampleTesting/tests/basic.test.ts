/// <reference types="jest" />  
  
import * as React from 'react';  
import { configure, mount, ReactWrapper, shallow } from 'enzyme';  
import * as Adapter from 'enzyme-adapter-react-16';  
  
configure({ adapter: new Adapter() });  
  
import SampleTesting from '../components/SampleTesting';  
import { ISampleTestingProps } from '../components/ISampleTestingProps';  
import { ISampleTestingState } from '../components/ISampleTestingState';
  
describe('Enzyme basics', () => {  
  
  let reactComponent: ReactWrapper<ISampleTestingProps, ISampleTestingState>;  
  
  beforeEach(() => {  
  
    reactComponent = mount(React.createElement(  
        SampleTesting,  
      {  
        description: "SPFx Test",
        someProp: 0
      }  
    ));  
  });  
  
  afterEach(() => {  
    reactComponent.unmount();  
  });  

  it('checking public methos logc', () => {
    
    expect(reactComponent.state('someProp')).toBe(0);

    reactComponent.find("button").simulate("click");

    expect(reactComponent.state('someProp')).toBe(1);
  });

  it('should root web part element exists', () => {  
  
    // define the css selector  
    let cssSelector: string = '#spfxTest';  
  
    // find the element using css selector  
    const element = reactComponent.find(cssSelector);  
    expect(element.length).toBeGreaterThan(0);  
  });  
  
  it('should have the correct title', () => {  
    // Arrange  
    // define contains/like css selector  
    let cssSelector: string = '.description';  
  
    // Act  
    // find the element using css selector  
    const text = reactComponent.find(cssSelector).text();  
  
    // Assert  
    expect(text).toBe("SPFx Test");    
  });  
});  