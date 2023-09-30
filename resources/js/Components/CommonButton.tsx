"use client";

import { ButtonHTMLAttributes, JSXElementConstructor } from "react";
import RippleButton from "./ripple/rippleButton";
import { cn } from "@/Utils/cn";
import { NormalElement } from "@/Utils/elementTypes";

type Props<
    T extends NormalElement | JSXElementConstructor<any> = "div",
> = React.PropsWithChildren<{
    buttonType?: "primary" | "text" | "tonal" | "outlined" | "blank";
    textType?: "normal" | "icon";
    type?: ButtonHTMLAttributes<unknown>["type"];
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    as?: React.ComponentProps<typeof RippleButton>["as"];
    componentProps?: React.ComponentProps<typeof RippleButton>
}>;

export default function CommonButton({
    buttonType = "primary",
    textType,
    children,
    type = "button",
    className,
    onClick,
    disabled,
    as,
}: Props) {
    return (
        <RippleButton
            className={cn(
                "rounded-full px-5 py-2 text-sm outline-none font-bold",
                {
                    "bg-primary text-on-primary ripple-on-primary": buttonType === "primary",
                    "text-primary ripple-primary": buttonType === "text",
                    "text-on-surface ripple-on-surface": buttonType === "blank",
                    "": buttonType === "tonal",
                    "border-primary border border-solid text-primary ripple-primary":
                        buttonType === "outlined",
                    "rounded-full p-2": textType === "icon",
                    "": disabled === true,
                },
                className,
            )}
            type={type}
            onClick={onClick}
            disabled={disabled}
            as={as}
        >
            {children}
        </RippleButton>
    );
}
