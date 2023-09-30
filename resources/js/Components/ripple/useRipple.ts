"use client";

import { useState } from "react";
import { conditionalStyles } from "@/Utils/conditionalStyles";
import { cn } from "@/Utils/cn";
import { surfaceColoringStyles } from "./surfaceElevation";

type ClickEvent = {
    clientX: number;
    clientY: number;
    currentTarget: React.MouseEvent<HTMLElement>["currentTarget"];
};

export function useRipple(
    params: {
        rippleDuration?: number;
        disabled?: boolean;
        withElevation?: boolean;
    } = {},
) {
    const rippleDuration = params.rippleDuration ?? 300;

    const [ripplePos, setRipplePos] = useState<{
        x: number;
        y: number;
        diameter: number;
        startedAt: Date;
    } | null>(null);

    const [calming, setCalming] = useState<{
        diameter: number;
    } | null>(null);


    function calculateRipple(e: ClickEvent) {
        if (ripplePos !== null || params.disabled) return;
        setCalming(null);
        setCalming(ripplePos);
        const diameter = Math.max(
            e.currentTarget.clientWidth,
            e.currentTarget.clientHeight,
        );
        const radius = diameter / 2;
        setRipplePos({
            x:
                e.clientX -
                e.currentTarget.getBoundingClientRect().left -
                radius,
            y: e.clientY - e.currentTarget.getBoundingClientRect().top - radius,
            diameter,
            startedAt: new Date(),
        });
    }

    function finishRipple() {
        if (ripplePos === null) return;
        const oldRipple = ripplePos;

        setTimeout(
            () => {
                const ripple = ripplePos;
                if (oldRipple !== ripple) return;

                setRipplePos(null);
                calmDown({ diameter: ripple!.diameter });
            },
            rippleDuration -
                new Date().getTime() +
                ripplePos!.startedAt.getTime() -
                100,
        );
    }

    function calmDown(params: typeof calming) {
        setCalming(params);
        setTimeout(() => {
            setCalming(null);
        }, 400);
    }

    const rippleButtonStyles = cn(
        "relative overflow-hidden",
        {
            //" ripple-white": params.withElevation !== false
            [surfaceColoringStyles]: params.withElevation !== false,
            ' surface-ripple': params.withElevation !== false
        },
    );

    const rippleStyles = cn(
        "absolute z-10 overflow-hidden rounded-[50%] bg-ripple",
        {
            " scale-[4] animate-ripple-calm": calming,
        },
    );
    return {
        buttonData: {
            className: rippleButtonStyles,
            disabled: params.disabled,
            onMouseDown: (e: React.MouseEvent<HTMLElement>) =>
                calculateRipple(e),
            onMouseUp: () => finishRipple(),
            onMouseOut: () => finishRipple(),
            onTouchStart: (e: React.TouchEvent<HTMLElement>) => {
                console.log(e);
                calculateRipple({
                    clientX: e.touches[0].clientX,
                    clientY: e.touches[0].clientY,
                    currentTarget: e.currentTarget,
                });
            },
            onTouchEnd: () => finishRipple(),
            onTouchCancel: () => finishRipple(),
        },
        rippleData: {
            className: rippleStyles,

            style: conditionalStyles(
                [
                    ripplePos !== null,
                    () => ({
                        left: `${ripplePos!.x}px`,
                        top: `${ripplePos!.y}px`,
                        transition: `transform ${rippleDuration}ms linear`,
                        opacity: 0.13,
                        width: ripplePos!.diameter,
                        height: ripplePos!.diameter,
                        // transform: "scale(4)",
                        // visibility: "visible",
                        transform: "scale(2.4)",
                    }),
                ],
                [
                    ripplePos === null && calming === null,
                    () => ({
                        opacity: 0,
                        transform: "scale(0)",
                    }),
                ],
                [
                    calming !== null,
                    () => ({
                        width: calming?.diameter,
                        height: calming?.diameter,
                        opacity: 0,
                    }),
                ],
            ),
        },
    };
}
