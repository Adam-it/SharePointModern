import * as React from 'react';

export default class ReactUISample extends React.Component {
  public render() {
    return (
      <div>
        <div className="ms-Grid" dir="ltr">
        <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
              <p>this component uses react-ui css direclty in className atributes</p>
            </div>
          </div>
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg6 ms-bgColor-neutralTertiaryAlt">some example text aaaa</div>
            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg6 ms-bgColor-neutralTertiaryAlt">some example text bbbb</div>
          </div>
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-hiddenXxlUp ms-bgColor-neutralTertiaryAlt">Visible on <strong>smaller</strong> screens</div>
            <div className="ms-Grid-col ms-sm12 ms-hiddenMdDown ms-bgColor-neutralTertiaryAlt">Visible on <strong>medium and up</strong> screens</div>
            <div className="ms-Grid-col ms-sm12 ms-hiddenXlDown ms-bgColor-neutralTertiaryAlt">Visible on <strong>larger</strong> screens</div>
          </div>
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-md6">
              <span>Some Icons: 
                <i className="ms-Icon ms-Icon--Mail" aria-hidden="true"></i>                
              </span>
              <span>
                <i className="ms-Icon ms-Icon--Health" aria-hidden="true"></i>
                <i className="ms-Icon ms-Icon--QuickNote" aria-hidden="true"></i>
              </span>
              <p className="ms-fontSize-l ms-fontWeight-regular">some text</p>
              <p className="ms-fontSize-l ms-fontWeight-semibold">some text</p>
              <p className="ms-fontSize-l ms-fontWeight-bold">some text</p>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md6">
              <p className="ms-fontSize-xs">some text</p>
              <p className="ms-fontSize-s">some text</p>
              <p className="ms-fontSize-m">some text</p>
              <p className="ms-fontSize-l">some text</p>
              <p className="ms-fontSize-xl">some text</p>
              <p className="ms-fontSize-xxl">some text</p>
            </div>
          </div>
        </div> 
      </div>
    );
  }
}
