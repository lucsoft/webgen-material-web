import { asRef } from "../mod.ts";

type IconTypes =
    | 'Material+Symbols+Outlined'
    | 'Material+Symbols+Rounded'
    | 'Material+Symbols+Sharp'
    ;

export const ICON_TYPE = asRef<IconTypes>('Material+Symbols+Rounded');

export function addIcon() {
    const div = document.createElement('div');
    document.head.append(div);
    ICON_TYPE.listen(type => {
        div.innerHTML = `<link href="https://fonts.googleapis.com/icon?family=${type}" rel="stylesheet">`;
        document.body.style.setProperty("--md-icon-font", type.replaceAll("+", " "));
    });
}