import { Link } from "@inertiajs/react";
import React from "react";

export function ResponsiveLink({
    href, active, children, type,
}: React.PropsWithChildren<{
    href: string;
    active: boolean;
    type: "mobile" | "desktop";
}>) {
    function cn(arg0: string, arg1: { "text-primary": boolean; "px-4 rounded-3xl": boolean; "rounded-lg": boolean; }) {
        throw new Error("Function not implemented.");
    }

    return (
        <>
            <Link href={href} className="contents">
                <RippleButton
                    className={cn(
                        "flex flex-col items-center gap-y-1  py-2 ripple-primary",
                        {
                            "text-primary": active,
                            "px-4 rounded-3xl": type === "mobile",
                            "rounded-lg": type === "desktop",
                        }
                    )}
                    as="div"
                >
                    {children}
                </RippleButton>
            </Link>
        </>
    );
}

