import { DesktopNav, MobileNav } from "@/Pages/Note/Components/Nav";
import { cn } from "@/Utils/cn";
import { User } from "@/types";
import { PropsWithChildren, ReactNode, useState } from "react";

type Props = PropsWithChildren<{ user: User; header?: ReactNode, mainClass?: string }>;

export default function Authenticated({ user, header, children, mainClass }: Props) {
    //const [showingNavigationDropdown, setShowingNavigationDropdown] =
    //    useState(false);

    return (
        <div className="flex h-screen flex-col bg-surface text-on-surface ">
            <header className="flex h-14 flex-shrink-0 pl-4">
                <h2 className="my-auto inline-block font-serif text-2xl">
                    Writ-o
                </h2>
            </header>
            <div className="flex h-full flex-1 flex-col overflow-hidden sm:flex-row">
                <DesktopNav />
                <main className={cn("flex flex-1 flex-col overflow-y-auto overflow-x-hidden rounded-3xl bg-background sm:rounded-tl-3xl", mainClass)}>
                    {children}
                </main>
                <MobileNav />
            </div>
        </div>
    );
}
