import { alwaysRef, asWebGenComponent, HTMLComponent, Refable, WriteSignal } from "webgen/core.ts";

@asWebGenComponent("md-textbox")
class TextBoxComponent extends HTMLComponent {
    #textBox!: HTMLElementTagNameMap[ "md-filled-text-field" | "md-outlined-text-field" ];

    constructor(label: Refable<string>, value: WriteSignal<string>, inputType: "text" | "email" | "number" | "password" | "search" | "tel" | "url" | "textarea", inputMode: 'change' | 'input', type: 'filled' | 'outlined') {
        super();

        this.#textBox = document.createElement(`md-${type}-text-field`);
        this.#textBox.style.width = "100%";
        this.#textBox.type = inputType;

        this.useListener(alwaysRef(value), (value) => { this.#textBox.value = value; });
        this.useListener(alwaysRef(label), (label) => { this.#textBox.label = label; });
        this.useEventListener(this.#textBox, inputMode, () => { value.setValue(this.#textBox.value); });
        this.append(this.#textBox);
    }
}

export const TextBox = (label: Refable<string>, value: WriteSignal<string>, inputType: "text" | "email" | "number" | "password" | "search" | "tel" | "url" | "textarea" = "text", inputMode: 'change' | 'input' = "input", type: 'filled' | 'outlined' = "filled") => new TextBoxComponent(label, value, inputType, inputMode, type).make();
