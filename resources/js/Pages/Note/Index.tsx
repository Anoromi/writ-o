"use client";

import CommonButton from "@/Components/CommonButton";
import RippleButton from "@/Components/ripple/rippleButton";
import { useRipple } from "@/Components/ripple/useRipple";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { cn } from "@/Utils/cn";
import { PageProps } from "@/types";
import { Link, router } from "@inertiajs/react";
import { FiPlus } from "react-icons/fi";

type PaginationLink = { url: string | null; label: string; active: boolean };
type PaginatedData<T> = {
    current_page: number;
    from: null;
    data: T[];
    links: PaginationLink[];
    path: string;
    per_page: number;
    to: null;
    total: 0;
};

type DisplayedNote = { id: number; title: string };
type Props = PageProps & {
    notes: PaginatedData<DisplayedNote>;
};

export default function Index({ auth: { user }, notes }: Props) {
    console.log(notes);
    function to() {
        console.log('hello there')
        router.post('/note', {})
    }
    return (
        <>
            <Authenticated header={"hello there"} user={user}>
                <div className="flex justify-between px-8 pt-8">
                    <h1 className="text-3xl sm:text-4xl">Notes</h1>
                    <CommonButton className="ripple-on-surface" textType="icon" buttonType="blank" onClick={to}>
                        <FiPlus style={{ fontSize: "28px" }}/>
                    </CommonButton>
                </div>
                <div className="mt-8 flex-1 mx-6">
                    {notes.data.map((note) => (
                        <Note key={note.id} note={note} />
                    ))}
                </div>
                <li className="flex flex-wrap justify-center gap-x-2 mb-8">
                    {notes.links.map((v, i) => (
                        <PageLink link={v} key={i} />
                    ))}
                </li>
            </Authenticated>
        </>
    );
}



function PageLink({ link }: { link: PaginationLink }) {
    const { buttonData, rippleData } = useRipple();

    const fixedLabel = link.label
        .replace("&laquo; Previous", "Previous")
        .replace("Next &raquo;", "Next");

    const linkStyles = cn(
        buttonData.className,
        "px-2 min-w-[40px] text-center py-1 rounded-xl hidden [&:first-child]:block [&:nth-child(2)]:block [&:last-child]:block [&:nth-last-child(2)]:block sm:block",
        {
            "text-primary ripple-primary": !link.active && link.url !== null,
            block: link.active,
        },
    );

    if (link.url !== null)
        return (
            <Link href={link.url} {...buttonData} className={linkStyles}>
                <div {...rippleData} />
                {fixedLabel}
            </Link>
        );

    return <div className={linkStyles}>{fixedLabel}</div>;
}

function Note({ note }: { note: DisplayedNote }) {
    return (
        <>
            <RippleButton as={Link} componentProps={{href:''}} className="text-xl ripple-on-surface inline-block w-full py-2 px-2 rounded-md">
                {note.title}
            </RippleButton>
        </>
    );
}
