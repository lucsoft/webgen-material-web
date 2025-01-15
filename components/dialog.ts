import { alwaysRef, asWebGenComponent, Box, Component, HTMLComponent, Label, Refable } from "webgen/core.ts";

@asWebGenComponent("md-dialog")
class DialogComponent extends HTMLComponent {
    dialog = document.createElement('md-dialog');
    cannotManuallyClose = false;
    constructor(headline: Refable<string>, content: Component, actions: Refable<Component[]>) {
        super();

        this.dialog.append(
            Label(headline)
                .setAttribute("slot", "headline")
                .draw()
        );

        const contentElement = content.draw();
        contentElement.setAttribute("slot", "content");
        this.dialog.append(contentElement);

        const actionElement = Box(alwaysRef(actions)).draw();
        actionElement.setAttribute("slot", "actions");
        this.dialog.append(actionElement);
        this.dialog.addEventListener("close", (event) => {
            console.log(this.cannotManuallyClose);
            if (this.cannotManuallyClose) {
                event.preventDefault();
            }
        });
        this.append(this.dialog);
    }

    override make() {
        const obj = {
            ...super.make(),
            open: () => {
                this.dialog.open = true;
                return obj;
            },
            close: () => {
                const canNotManuallyClose = this.cannotManuallyClose;
                this.cannotManuallyClose = false;
                this.dialog.close()
                    .then(() => {
                        this.cannotManuallyClose = canNotManuallyClose;
                    });
                return obj;
            },
            asAlert: () => {
                this.dialog.type = "alert";
                return obj;
            },
            cannotManuallyClose: (value: Refable<boolean> = true) => {
                this.useListener(alwaysRef(value), value => {
                    this.cannotManuallyClose = value;
                });
                return obj;
            }
        };
        return obj;
    }
}

export const Dialog = (headline: Refable<string>, content: Component, actions: Refable<Component[]> = []) => new DialogComponent(headline, content, actions).make();