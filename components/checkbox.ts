import { asWebGenComponent, HTMLComponent, WriteSignal, Refable, alwaysRef } from "webgen/core.ts";

@asWebGenComponent("md-checkbox")
class CheckboxComponent extends HTMLComponent {
    #checkbox = document.createElement('md-checkbox');


    constructor(checked: WriteSignal<boolean | 'indeterminate'>) {
        super();
        this.style.display = 'grid';
        this.style.gridTemplateColumns = 'max-content auto';
        this.style.alignItems = 'center';
        this.#checkbox.setAttribute('touch-target', 'wrapper');
        this.append(this.#checkbox);

        this.useListener(checked, (value) => {
            if (value === 'indeterminate') {
                this.#checkbox.indeterminate = true;
            }
            else {
                this.#checkbox.checked = value;
            }
        });

        this.useEventListener(this.#checkbox, 'change', () => {
            if (this.#checkbox.indeterminate) {
                checked.setValue('indeterminate');
            }
            else {
                checked.set(this.#checkbox.checked);
            }
        });
    }

    make() {
        const obj = {
            ...super.make(),
            setId: (id: Refable<string>) => {
                this.useListener(alwaysRef(id), (value) => {
                    this.#checkbox.id = value;
                });
                return obj;
            },
            addLabel: (label: Refable<string>) => {
                const labelEle = document.createElement('label');
                this.useListener(alwaysRef(label), (value) => {
                    labelEle.htmlFor = this.#checkbox.id;
                    labelEle.textContent = value;
                });
                this.append(labelEle);
                return obj;
            }
        };
        return obj;
    }
}

export const Checkbox = <T extends boolean | 'indeterminate'>(checked: WriteSignal<T>) => new CheckboxComponent(checked as unknown as WriteSignal<boolean | 'indeterminate'>).make();
