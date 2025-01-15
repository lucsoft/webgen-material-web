import { alwaysRef, asWebGenComponent, HTMLComponent, Refable, Reference } from "webgen/core.ts";

export type Tab = {
    label?: string;
    icon?: string;
};
@asWebGenComponent("md-tabs")
class TabsComponent extends HTMLComponent {
    constructor(selectedTab: Reference<number>, tabList: Refable<Tab[]>, type: 'primary' | 'secondary' = 'primary') {
        super();

        const tabsElement = document.createElement('md-tabs');
        this.useListener(alwaysRef(tabList), tabs => {
            tabsElement.innerHTML = '';
            tabs.forEach(tab => {
                const tabElement = document.createElement(`md-${type}-tab`);
                if (tab.icon) {
                    tabElement.innerHTML = `<md-icon slot="icon">${tab.icon}</md-icon>`;
                }
                if (tab.label) {
                    tabElement.innerHTML += `<span>${tab.label}</span>`;
                }
                tabsElement.append(tabElement);
            });
        });

        tabsElement.activeTabIndex = selectedTab.value;

        this.useListener(selectedTab, index => {
            tabsElement.activeTabIndex = index;
        });

        this.useEventListener(tabsElement, 'change', () => {
            selectedTab.value = tabsElement.activeTabIndex;
        });

        this.append(tabsElement);
    }
}

export const Tabs = (selectedTab: Reference<number>, tabList: Refable<Tab[]>, type: 'primary' | 'secondary' = 'primary') => new TabsComponent(selectedTab, tabList, type).make();