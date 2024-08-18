import { serve } from "../esbuild_serve/mod.ts";

serve({
    pages: {
        "index": "index.ts"
    }
});