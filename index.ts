import { Tabs } from "./components/tabs.ts";
import './dark.css';
import { asRef, Box, Button, Checkbox, Content, Grid, Label, ref, TextBox } from "./mod.ts";

const counter = asRef(0);
const checkbox = asRef(false);
const data = asRef("Hello World");
const selectedTab = asRef(0);
document.body.append(
    Box(
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
                    })
            )
                .setAutoFlow("column")
                .setGap(".5rem")
                .setJustifySelf("center"),
            Checkbox(checkbox)
                .setId("checkbox-1")
                .addLabel(ref`${checkbox.map(checked => checked ? 'Uncheck' : 'Check')} me out!`),
            TextBox("Fancy Label", data),
            Label(ref`Data: ${data}`)
                .setMargin("1rem 0")
        )
    )
        .setTextSize("base")
        .draw()
);