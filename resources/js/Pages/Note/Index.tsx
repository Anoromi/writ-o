"use client";

import CommonButton from "@/Components/CommonButton";
import RippleButton from "@/Components/ripple/rippleButton";
import { useRipple } from "@/Components/ripple/useRipple";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { cn } from "@/Utils/cn";
import { PageProps } from "@/types";
import { Link, router } from "@inertiajs/react";
import { FiDelete, FiPlus } from "react-icons/fi";

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
    function to() {
        router.post("/note", {});
    }

    function deleteNote(note: DisplayedNote) {
        router.delete(`/note/${note.id}`);
        router.reload({
                    only: ['notes']
                })
    }
    return (
        <>
            <Authenticated header={"hello there"} user={user}>
                <div className="flex justify-between px-8 pt-8">
                    <h1 className="text-3xl sm:text-4xl">Notes</h1>
                    <CommonButton
                        className="ripple-on-surface"
                        shapeType="icon"
                        buttonType="blank"
                        onClick={to}
                    >
                        <FiPlus style={{ fontSize: "28px" }} />
                    </CommonButton>
                </div>
                <div className="mx-6 mt-8 flex-1">
                    {notes.data.map((note) => (
                        <Note
                            key={note.id}
                            note={note}
                            deleteNote={() => deleteNote(note)}
                        />
                    ))}
                </div>
                <li className="mb-8 flex flex-wrap justify-center gap-x-2">
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
            <div>
                <Link href={link.url} {...buttonData} className={linkStyles}>
                    <div {...rippleData} />
                    {fixedLabel}
                </Link>
            </div>
        );

    return <div className={linkStyles}>{fixedLabel}</div>;
}

function Note({
    note,
    deleteNote,
}: {
    note: DisplayedNote;
    deleteNote: () => void;
}) {
    let text = note.title;
    if (text.length === 0) text = "Empty note";

    return (
        <>
            <div className="flex w-full gap-x-3 items-center">
                <RippleButton
                    as={Link}
                    componentProps={{
                        href: route("notes.show", {
                            note: note.id,
                        }),
                    }}
                    className="inline-block flex-1 rounded-md px-2 py-2 text-xl ripple-on-surface"
                >
                    {text}
                </RippleButton>
                <CommonButton
                    shapeType="icon"
                    buttonType="blank"
                    onClick={deleteNote}
                >
                    <FiDelete />
                </CommonButton>
            </div>
        </>
    );
}
