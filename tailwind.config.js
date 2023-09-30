import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";
import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.tsx",
        "./resources/js/**/*.ts",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Rubik", ...defaultTheme.fontFamily.sans],
                serif: ["Roboto Flex", ...defaultTheme.fontFamily.serif]
            },
            keyframes: {
                "ripple-calm-down": {
                    "0%": { opacity: 0.13 },
                    "100%": { opacity: 0 },
                },
            },
            animation: {
                "ripple-calm": "ripple-calm-down 400ms linear",
            },

            colors: {
                ripple: "var(--ripple-color)",
                elevation: "var(--elevation-color)",
                primary: "rgb(var(--color-primary) / <alpha-value>)",
                "on-primary": "rgb(var(--color-on-primary) / <alpha-value>)",
                surface: "rgb(var(--color-surface) / <alpha-value>)",
                "on-surface": "rgb(var(--color-on-surface) / <alpha-value>)",
                background: "rgb(var(--color-background) / <alpha-value>)",
            },
            opacity: {
                12: "0.12",
            },
        },
    },

    plugins: [
        forms,
        plugin(({ theme, addUtilities }) => {
            const rippleUtilities = {};
            const colors = theme("colors");
            for (const color in colors) {
                if (typeof colors[color] === "string") {
                    const colorValue = colors[color];
                    rippleUtilities[`.ripple-${color}`] = {
                        "--ripple-color": replaceAlpha(colorValue),
                    };
                }
                if (typeof colors[color] === "object") {
                    const colorRecord = colors[color];
                    for (const realColor in colorRecord) {
                        const colorValue = colorRecord[realColor];
                        rippleUtilities[`.ripple-${color}-${realColor}`] = {
                            "--ripple-color": replaceAlpha(colorValue),
                        };
                    }
                }
            }

            addUtilities(rippleUtilities);
        }),

        plugin(({ theme, addUtilities }) => {
            const surfaceUtilities = {};
            const colors = theme("colors");
            for (const color in colors) {
                if (typeof colors[color] === "string") {
                    const colorValue = colors[color];
                    surfaceUtilities[`.surface-${color}`] = {
                        "--elevation-color": replaceAlpha(colorValue),
                    };
                }
                if (typeof colors[color] === "object") {
                    const colorRecord = colors[color];
                    for (const realColor in colorRecord) {
                        const colorValue = colorRecord[realColor];
                        //let g = ""
                        //g.replace("<alpha-value>", 'var(--tw-text-opacity)')
                        surfaceUtilities[`.surface-${color}-${realColor}`] = {
                            "--elevation-color": replaceAlpha(colorValue),
                        };
                    }
                }
            }

            addUtilities(surfaceUtilities);
        }),
    ],
};

function replaceAlpha(value) {
    return value.replace("<alpha-value>", "var(--tw-text-opacity)");
}
