import { Dialog } from "./components/dialog.ts";
import { Select } from "./components/select.ts";
import { Switch } from "./components/switch.ts";
import { Tabs } from "./components/tabs.ts";
import './dark.css';
import { asRef, Box, Button, Checkbox, Content, Grid, Label, ref, TextBox } from "./mod.ts";

const counter = asRef(0);
const checkbox = asRef(false);
const data = asRef("Hello World");
const selectedTab = asRef(0);
const selectedSelect = asRef(0);
const switchElement = asRef(false);
; const dialog = Dialog(
    ref`Hello World`,
    Box(
        Label(ref`Hello World`)
            .setMargin("1rem 0")
    ),
    [
        Button("Close")
            .onClick(() => {
                dialog.close();
            })
    ]
)
    .asAlert();

document.body.append(
    Box(
        dialog,
        Content(
            Label(ref`${counter}`)
                .setTextSize("9xl")
                .setJustifySelf("center")
                .setMargin("1rem 0"),
            Tabs(selectedTab, [
                {
                    label: "Tab 1",
                    icon: "home"
                },
                {
                    label: "Tab 2",
                    icon: "settings"
                }
            ]),
            Label(ref`Selected Tab: ${selectedTab}`),
            Grid(
                Button("Hello World!")
                    .onClick(() => {
                        counter.value++;
                    }),
                Button("Goodbye World!", "outlined")
                    .onClick(() => {
                        counter.value--;
                    }),
                Button("Open Dialog")
                    .onClick(() => {
                        dialog.open();
                    })
            )
                .setAutoFlow("column")
                .setGap(".5rem")
                .setJustifySelf("center"),
            Label(ref`Selected Select: ${selectedSelect}`),
            Select(selectedSelect, [
                "Option 1",
                "Option 2",
                "Option 3"
            ], ref`Select an option`),
            Switch(switchElement),
            Checkbox(checkbox)
                .setId("checkbox-1")
                .addLabel(ref`${checkbox.map(checked => checked ? 'Uncheck' : 'Check')} me out!`),
            TextBox("Fancy Label", data),
            Label(ref`Data: ${data}`)
                .setMargin("1rem 0"),
        )
    )
        .setTextSize("base")
        .draw()
);