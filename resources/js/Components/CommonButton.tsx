"use client";

import { cn } from "@/Utils/cn";
import { NormalElement } from "@/Utils/elementTypes";
import { ButtonHTMLAttributes, JSXElementConstructor } from "react";
import RippleButton from "./ripple/rippleButton";

type Props<T extends NormalElement | JSXElementConstructor<any> = "div"> =
    React.PropsWithChildren<{
        buttonType?: "primary" | "text" | "tonal" | "outlined" | "blank";
        shapeType?: "normal" | "icon" | "extended-fab";
        type?: ButtonHTMLAttributes<unknown>["type"];
        className?: string;
        onClick?: () => void;
        disabled?: boolean;
        as?: React.ComponentProps<typeof RippleButton>["as"];
        componentProps?: React.ComponentProps<typeof RippleButton>;
    }>;

export default function CommonButton({
    buttonType = "primary",
    shapeType,
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
                "rounded-full px-5 py-2 text-sm font-bold outline-none inline-flex",
                {
                    "bg-primary text-on-primary ripple-on-primary":
                        buttonType === "primary",
                    "text-primary ripple-primary": buttonType === "text",
                    "text-on-surface ripple-on-surface": buttonType === "blank",
                    "": buttonType === "tonal",
                    "border border-solid border-primary text-primary ripple-primary":
                        buttonType === "outlined",
                    "rounded-full p-2": shapeType === "icon",
                    "rounded-2xl flex items-center gap-x-1 px-5 py-3" : shapeType === "extended-fab",
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
