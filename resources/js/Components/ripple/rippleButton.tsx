"use client";
import { NormalElement } from "@/Utils/elementTypes";
import clsx from "clsx";
import React, {
    ButtonHTMLAttributes,
    Fragment,
    JSXElementConstructor,
} from "react";
import { useRipple } from "./useRipple";

type Props<T extends NormalElement | JSXElementConstructor<any> = "button"> = {
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    type?: ButtonHTMLAttributes<unknown>["type"];
    disabled?: boolean;
    componentProps?: React.ComponentProps<T>
};

export default function RippleButton<
    T extends NormalElement | JSXElementConstructor<any> = "button",
>({
    children,
    className,
    onClick,
    type = "button",
    disabled,
    componentProps,
    as,
}: React.PropsWithChildren<Props<T>>& {as?: T}) {
    let { buttonData, rippleData } = useRipple({
        disabled,
    });

    let Element = as ?? 'button';

    const extraProps: Record<string, unknown> = {};
    if (as === "button") {
        extraProps.type = type;
    }
        extraProps.onClick = onClick;
    return (
        <Element
            {...buttonData}
            {...extraProps}
            {...componentProps ?? {} as any}
            className={clsx(buttonData.className, className)}
        >
            <div {...rippleData}></div>
            {children}
        </Element>
    );
}
