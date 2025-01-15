import { alwaysRef, asWebGenComponent, HTMLComponent, Refable, WriteSignal } from "webgen/core.ts";

@asWebGenComponent("md-select")
class SelectComponent extends HTMLComponent {
    #textBox!: HTMLElementTagNameMap[ "md-filled-select" | "md-outlined-select" ];

    constructor(selectedIndex: WriteSignal<number>, items: Refable<string[]>, label: Refable<string>, inputMode: 'change' | 'input', type: 'filled' | 'outlined') {
        super();

        this.#textBox = document.createElement(`md-${type}-select`);
        this.#textBox.style.width = "100%";

        this.useListener(alwaysRef(selectedIndex), (value) => { this.#textBox.selectedIndex = value; });
        this.useListener(alwaysRef(label), (label) => { this.#textBox.label = label; });
        this.useEventListener(this.#textBox, inputMode, () => { selectedIndex.setValue(this.#textBox.selectedIndex); });
        this.append(this.#textBox);

        this.useListener(alwaysRef(items), (items) => {
            this.#textBox.innerHTML = '';
            items.forEach((item) => {
                const option = document.createElement('md-select-option');
                const headline = document.createElement('div');
                headline.innerText = item;
                headline.slot = 'headline';
                option.append(headline);
                this.#textBox.append(option);
            });
        });

        this.append(this.#textBox);
    }
}

export const Select = (selectedIndex: WriteSignal<number>, items: Refable<string[]>, label: Refable<string>, inputMode: 'change' | 'input' = 'change', type: 'filled' | 'outlined' = 'filled') => new SelectComponent(selectedIndex, items, label, inputMode, type).make();