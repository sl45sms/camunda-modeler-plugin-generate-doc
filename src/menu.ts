import type { App } from 'electron';
 interface MenuState {
    bpmn: boolean;
    dmn: boolean;
    appName: string;
    state:{
        save: boolean;
        exportAs: ['png', 'jpeg', 'svg']
        devlopment: boolean;
        devtools: boolean;
        latsTab: boolean;
        tabs: []; //TODO define
        activeTab: {}; //TODO define
    }
    }

const menu = (electronApp:App,menuState:MenuState) => {
    console.log(menuState);
    return [{
        label: 'Generate Document',
        accelerator: 'CommandOrControl+D',
        enabled: function() {
        // only enabled for BPMN diagrams
            return menuState.bpmn;
        },
        action: function() {
          electronApp.emit('menu:action', 'generateDocument');
        }
      }];
};

export default menu;