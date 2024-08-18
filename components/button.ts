import { asWebGenComponent, HTMLComponent, Label, Refable } from "webgen/core.ts";

@asWebGenComponent("md-button")
class ButtonComponent extends HTMLComponent {
    constructor(label: Refable<string>, type: 'elevated' | 'filled' | 'filled-tonal' | 'outlined' | 'text') {
        super();
        this.style.display = 'contents';
        const button = document.createElement(`md-${type}-button`);
        button.append(Label(label).draw());
        this.append(button);
    }
}

export const Button = (label: Refable<string>, type: 'elevated' | 'filled' | 'filled-tonal' | 'outlined' | 'text' = 'filled') => new ButtonComponent(label, type).make();
