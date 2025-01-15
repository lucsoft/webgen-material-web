
import { alwaysRef, asWebGenComponent, HTMLComponent, Refable } from "webgen/core.ts";

@asWebGenComponent("md-icon")
class IconComponent extends HTMLComponent {
    constructor(icon: Refable<string>) {
        super();
        const iconElement = document.createElement('md-icon');
        this.useListener(alwaysRef(icon), icon => {
            iconElement.innerText = icon;
        });
        this.append(iconElement);
    }
}

export const Icon = (icon: Refable<string>) => new IconComponent(icon).make();