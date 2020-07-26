import * as React from 'react';
import styles from './ReactFabricControlsComponent.module.scss';
import { DefaultButton, 
    PrimaryButton, 
    Stack, 
    ContextualMenu, 
    IContextualMenuProps, 
    IIconProps,
    Checkbox } from 'office-ui-fabric-react';
import { IReactFabricControlsComponentProps } from './IReactFabricControlsComponentProps';

class ReactFabricControlsComponent extends React.Component<IReactFabricControlsComponentProps> {

    public alterClicked = () => {
        alert("clicked");
    }

    public menuProps: IContextualMenuProps = {
        // For example: disable dismiss if shift key is held down while dismissing
        onDismiss: ev => {
          if (ev && ev.shiftKey) {
            ev.preventDefault();
          }
        },
        items: [
          {
            key: 'emailMessage',
            text: 'Email message',
            iconProps: { iconName: 'Mail' },
          },
          {
            key: 'calendarEvent',
            text: 'Calendar event',
            iconProps: { iconName: 'Calendar' },
          },
        ],
        directionalHintFixed: true,
      };

    public addIcon: IIconProps = { iconName: 'Add' };

    public getMenu(props: IContextualMenuProps): JSX.Element {
        // Customize contextual menu with menuAs
        return <ContextualMenu {...props} />;
    }
      
    public onMenuClick(ev?: React.SyntheticEvent<any>) {
        console.log(ev);
    }

    public render() {
        const { clickHandler } = this.props;

        return (
            <div className={styles.reactFabricControlsComponent}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <p className={styles.description}>some text</p>
                            <div className={styles.primaryDiv}>
                                primaryDiv  
                            </div>
                            <div className={styles.secondaryDiv}>
                                secondaryDiv  
                            </div>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <Stack horizontal>
                                <DefaultButton text="Standard" onClick={this.alterClicked} allowDisabledFocus />
                                <PrimaryButton text="Primary" onClick={() => clickHandler("passed something")} allowDisabledFocus />
                            </Stack>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <DefaultButton
                                text="New item"
                                iconProps={this.addIcon}
                                menuProps={this.menuProps}
                                // Optional callback to customize menu rendering
                                menuAs={this.getMenu}
                                // Optional callback to do other actions (besides opening the menu) on click
                                onMenuClick={this.onMenuClick}
                                // By default, the ContextualMenu is re-created each time it's shown and destroyed when closed.
                                // Uncomment the next line to hide the ContextualMenu but persist it in the DOM instead.
                                // persistMenu={true}
                                allowDisabledFocus
                                />
                        </div>
                    </div>
                    <div>
                        <div className={styles.column}>
                            <Stack>
                                <Checkbox label="Unchecked checkbox (uncontrolled)" />
                                <Checkbox label="Checked checkbox (uncontrolled)" />
                                <Checkbox label="Disabled checkbox" disabled />
                                <Checkbox label="Disabled checked checkbox" disabled defaultChecked />
                            </Stack>
                        </div>
                    </div>
                    <div>
                        <div className={styles.column}>
                            <a href="https://developer.microsoft.com/en-us/fluentui#/controls/web">other examples controls present at https://developer.microsoft.com/en-us/fluentui#/controls/web</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReactFabricControlsComponent;