import "https://esm.sh/@material/web@2.0.0/all.js";
import { addDarkModeSupport } from "./misc/add-darkmode.ts";
import { addIcon } from "./misc/add-icon.ts";
import { mapFontToWebGenStyles } from "./misc/font-mapping.ts";
import { injectRoboto } from "./misc/global-js.ts";
export * from "webgen/core.ts";
export * from "./components/button.ts";
export * from "./components/checkbox.ts";
export * from "./components/textbox.ts";

injectRoboto();
mapFontToWebGenStyles();
addDarkModeSupport();
addIcon();