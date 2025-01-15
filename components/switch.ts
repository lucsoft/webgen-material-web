import { alwaysRef, asWebGenComponent, HTMLComponent, WriteSignal } from "webgen/core.ts";

@asWebGenComponent("md-switch")
class SwitchComponent extends HTMLComponent {
    constructor(selected: WriteSignal<boolean>) {
        super();
        const switchElement = document.createElement(`md-switch`);
        this.useListener(alwaysRef(selected), selected => {
            switchElement.selected = selected;
        });

        this.useEventListener(switchElement, 'change', () => {
            selected.value = switchElement.selected;
        });

        this.append(switchElement);
    }
}

export const Switch = (selected: WriteSignal<boolean>) => new SwitchComponent(selected).make();