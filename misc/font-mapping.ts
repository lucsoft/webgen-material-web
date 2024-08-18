import { styles as typescaleStyles } from "https://esm.sh/@material/web@2.0.0/typography/md-typescale-styles.js";

document.adoptedStyleSheets.push(typescaleStyles.styleSheet!);

const rules = Array.from(typescaleStyles.styleSheet!.cssRules).flatMap(it => it instanceof CSSLayerBlockRule ? Array.from(it.cssRules) : []).map(it => it as CSSStyleRule);

export function mapFontToWebGenStyles() {
    const mapping = {
        'xs': "md-typescale-label-small",
        'sm': "md-typescale-label-medium",
        'base': "md-typescale-body-medium",
        'lg': "md-typescale-body-large",
        'xl': "md-typescale-title-medium",
        '2xl': "md-typescale-title-medium",
        '3xl': "md-typescale-title-large",
        '4xl': "md-typescale-headline-small",
        '5xl': "md-typescale-headline-medium",
        '6xl': "md-typescale-headline-large",
        '7xl': "md-typescale-display-small",
        '8xl': "md-typescale-display-medium",
        '9xl': "md-typescale-display-large",
    };

    const style = new CSSStyleSheet();

    Object.entries(mapping).forEach(([ key, value ]) => {
        const rule = rules.find(it => it.selectorText.includes(`.${value}`))!;
        style.insertRule(`.text-${key} { ${rule.style.cssText} }`);
    });

    document.adoptedStyleSheets.push(style);
}