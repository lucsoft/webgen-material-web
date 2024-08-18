import "https://esm.sh/@material/web@2.0.0/all.js";
import { injectRoboto } from "./misc/global-js.ts";
import { mapFontToWebGenStyles } from "./misc/font-mapping.ts";
export * from "webgen/core.ts";
export * from "./components/button.ts";
export * from "./components/checkbox.ts";
export * from "./components/textbox.ts";

injectRoboto();
mapFontToWebGenStyles();
