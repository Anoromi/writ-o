import RippleButton from "@/Components/ripple/rippleButton";
import { cn } from "@/Utils/cn";
import { Link, usePage } from "@inertiajs/react";
import React from "react";
import { FiFile } from "react-icons/fi";

export function MobileNav() {
    const {url} = usePage()
    console.log('hehe url ', url)
    return (
        <nav className="flex h-20 flex-shrink-0 items-center justify-around sm:hidden">
            <ResponsiveLink
                href={route("notes.index")}
                active={url.startsWith('/note')}
                type="mobile"
            >
                <FiFile style={{ fontSize: "28px" }} />
                Notes
            </ResponsiveLink>
        </nav>
    );
}

export function DesktopNav() {
    const {url} = usePage()
    return (
        <nav className="hidden w-20 flex-col gap-y-4 pt-8 sm:flex">
            <ResponsiveLink
                href={route("notes.index")}
                active={url.startsWith('/note')}
                type="desktop"
            >
                <FiFile style={{ fontSize: "28px" }} />
                Notes
            </ResponsiveLink>
        </nav>
    );
}

export  function ResponsiveLink({
    href,
    active,
    children,
    type,
}: React.PropsWithChildren<{
    href: string;
    active: boolean;
    type: "mobile" | "desktop";
}>) {

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
                        },
                    )}
                    as="div"
                >
                    {children}
                </RippleButton>
            </Link>
        </>
    );
}
