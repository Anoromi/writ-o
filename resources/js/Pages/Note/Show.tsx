"use client";

import CommonButton from "@/Components/CommonButton";
import RippleButton from "@/Components/ripple/rippleButton";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Note, NoteData } from "@/Utils/note";
import { PageProps } from "@/types";
import { useMemo, useRef, useState } from "react";
import { FiArrowLeft, FiChevronUp, FiPlus } from "react-icons/fi";
import { Descendant, createEditor } from "slate";
import { Editable, Slate, withReact } from "slate-react";

type Props = {
    note: Note;
} & PageProps;
export default function ShowNote({ note, auth: { user } }: Props) {
    console.log(note);

    const currentParapraph = useRef<NoteData>(note.data);

    const [previousParagraphs, setPreviousParagraphs] = useState<NoteData[]>(
        [],
    );
    const [nextParaphaphs, setNextParagrpahs] = useState<NoteData[]>(
        note.data.next ?? [],
    );

    //const [currentText, setCurrentText] = useState(
    //    deserializeSlateText(note.data.text),
    //);
    const [title, setTitle] = useState(deserializeSlateText(note.title));
    const [text, setText] = useState(deserializeSlateText(note.data.text));

    function saveCurrent() {
        currentParapraph.current.text = JSON.stringify(text);
    }

    function moveUp(paragraph: NoteData) {
        saveCurrent();

        for (let i = 0; i < previousParagraphs.length; i++) {
            if (previousParagraphs[i] == paragraph) {
                setPreviousParagraphs(previousParagraphs.slice(0, i + 1));
                break;
            }
        }
        setNextParagrpahs(paragraph.next ?? []);

        currentParapraph.current = paragraph;
        setText(deserializeSlateText(paragraph.text));
    }

    function moveDown(paragraph: NoteData) {
        setPreviousParagraphs([
            ...previousParagraphs,
            currentParapraph.current,
        ]);
        setNextParagrpahs(paragraph.next ?? []);

        saveCurrent();

        //currentParapraph.current.next = [...currentParapraph.current.next ?? [], {text: null}];
        currentParapraph.current = paragraph;
        //currentParapraph.current.text
    }

    function createDivergence() {
        setPreviousParagraphs([
            ...previousParagraphs,
            currentParapraph.current,
        ]);
        setNextParagrpahs([]);
        saveCurrent();
        let nextParagraph = {
            text: null,
        };
        currentParapraph.current.next = [
            ...(currentParapraph.current.next ?? []),
            nextParagraph,
        ];
        currentParapraph.current = nextParagraph;
    }

    //useEffect(() => {
    //    console.log(currentText);
    //}, [currentText]);

    const list: NoteData[] = [
        {
            text: "hehe",
        },
        {
            text: "hehe",
        },
        {
            text: "hehe",
        },
        {
            text: "hehe",
        },
        {
            text: "hehe",
        },
    ];

    return (
        <>
            <Authenticated user={user} mainClass="items-center">
                <div className="relative h-full w-full max-w-lg p-4 sm:pt-20">
                    <CommonButton
                        shapeType="icon"
                        buttonType="outlined"
                        className="border-on-surface text-on-surface surface-on-surface"
                    >
                        <FiArrowLeft className="text-xl" />
                    </CommonButton>
                    <div className="pt-2 sm:pt-10">
                        <Title
                            initialText={title}
                            setText={setTitle}
                            slateKey={0}
                        />
                        <PreviousParagraphs list={list} select={moveUp} />
                        <Text
                            initialText={text}
                            setText={setText}
                            slateKey={0}
                        />

                        <NextParagraphs list={list} select={moveDown} />
                    </div>
                    <div className="h-20">

                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 flex h-16 flex-col items-center mb-20 mx-5 sm:mb-0">
                    <div className="flex max-w-lg w-full justify-end items-center gap-x-2">
                        <CommonButton shapeType="extended-fab" className="">
                            <FiChevronUp className="text-lg [stroke-width:3px]" />
                            Up
                        </CommonButton>
                        <CommonButton className="text-lg" buttonType="outlined" shapeType="icon">
                        <FiPlus />
                        </CommonButton>
                    </div>
                </div>
            </Authenticated>
        </>
    );
}

function Title({
    initialText,
    setText,
    slateKey,
}: {
    initialText: Descendant[];
    setText: (descendant: Descendant[]) => void;
    slateKey: number;
}) {
    const editor = useMemo(() => withReact(createEditor()), []);

    return (
        <Slate
            editor={editor}
            initialValue={initialText}
            key={slateKey}
            onChange={(value) => {
                const isAstChange = editor.operations.some(
                    (op) => "set_selection" !== op.type,
                );

                if (isAstChange) {
                    setText(value);
                }
            }}
        >
            <Editable
                placeholder="Enter some plain text..."
                className="text-2xl outline-none"
            />
        </Slate>
    );
}

function Text({
    initialText,
    setText,
    slateKey,
}: {
    initialText: Descendant[];
    setText: (descendant: Descendant[]) => void;
    slateKey: number;
}) {
    const editor = useMemo(() => withReact(createEditor()), []);
    return (
        <Slate
            editor={editor}
            initialValue={initialText}
            key={slateKey}
            onChange={(value) => {
                const isAstChange = editor.operations.some(
                    (op) => "set_selection" !== op.type,
                );

                if (isAstChange) {
                    setText(value);
                }
            }}
        >
            <Editable
                placeholder="Enter some plain text..."
                className="text-lg outline-none"
            />
        </Slate>
    );
}

function PreviousParagraphs({
    list,
    select,
}: {
    list: NoteData[];
    select: (note: NoteData) => void;
}) {
    return (
        <>
            <div className="flex flex-col gap-y-1 py-4">
                {list.map((v) => {
                    return (
                        <RippleButton className="flex items-center justify-between rounded-lg px-2 py-2 text-start text-lg opacity-80 surface-on-surface">
                            <span>{v.text}</span>
                            <FiChevronUp className="text-lg" />
                        </RippleButton>
                    );
                })}
            </div>
        </>
    );
}

function NextParagraphs({
    list,
    select,
}: {
    list: NoteData[];
    select: (note: NoteData) => void;
}) {
    return (
        <>
            <div className="flex flex-col gap-y-1 py-4">
                {list.map((v) => {
                    return (
                        <RippleButton className="mx-2 flex items-center justify-between rounded-lg px-2 py-2 text-start text-lg opacity-80 surface-on-surface">
                            <span>{v.text}</span>
                        </RippleButton>
                    );
                })}
            </div>
        </>
    );
}

function createInitialSlateText(text: string): Descendant[] {
    return [
        {
            type: "paragraph",
            children: [{ text }],
        },
    ];
}
function deserializeSlateText(text: string | null | undefined): Descendant[] {
    if (text == null || text == undefined) return createInitialSlateText("");
    if (text == "") return createInitialSlateText("");
    return createInitialSlateText(text);
}
