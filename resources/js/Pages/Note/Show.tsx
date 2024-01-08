"use client";

import CommonButton from "@/Components/CommonButton";
import RippleButton from "@/Components/ripple/rippleButton";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { cn } from "@/Utils/cn";
import { Note, NoteData } from "@/Utils/note";
import { PageProps } from "@/types";
import { router } from "@inertiajs/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { FiArrowLeft, FiChevronUp, FiPlus } from "react-icons/fi";
import { Descendant, createEditor } from "slate";
import { Editable, Slate, withReact } from "slate-react";

type Props = {
    note: Note;
} & PageProps;
export default function ShowNote({ note, auth: { user } }: Props) {

    const noteData: NoteData = useMemo(() => JSON.parse(note.data), []);
    const initialText = useMemo(() => deserializeSlateText(noteData.text), []);

    const currentParapraph = useRef<NoteData>(noteData);

    const [previousParagraphs, setPreviousParagraphs] = useState<NoteData[]>(
        [],
    );
    const [nextParaphaphs, setNextParagrpahs] = useState<NoteData[]>(
        noteData.next ?? [],
    );

    //const [currentText, setCurrentText] = useState(
    //    deserializeSlateText(note.data.text),
    //);
    const [title, setTitle] = useState(createInitialSlateText(note.title ?? ''));
    const [text, setText] = useState(initialText);
    const [currentKey, setCurrentKey] = useState(0);

    function incrementKey() {
        setCurrentKey(currentKey + 1);
    }

    function saveCurrent() {
        currentParapraph.current.text = JSON.stringify(text);
    }

    function moveUp(paragraph: NoteData) {
        saveCurrent();
        console.log("hello there");
        console.log("move Up", paragraph);

        for (let i = 0; i < previousParagraphs.length; i++) {
            if (previousParagraphs[i] === paragraph) {
                setPreviousParagraphs(previousParagraphs.slice(0, i));
                break;
            }
        }

        setNextParagrpahs(paragraph.next ?? []);

        currentParapraph.current = paragraph;
        setText(deserializeSlateText(paragraph.text));
        incrementKey();
    }

    function moveDown(paragraph: NoteData) {
        saveCurrent();
        console.log("move Down", paragraph);

        setPreviousParagraphs([
            ...previousParagraphs,
            currentParapraph.current,
        ]);
        setNextParagrpahs(paragraph.next ?? []);

        //currentParapraph.current.next = [...currentParapraph.current.next ?? [], {text: null}];
        currentParapraph.current = paragraph;

        setText(deserializeSlateText(paragraph.text));

        incrementKey();
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
        setText(deserializeSlateText(""));
        incrementKey();
    }

    function saveNote() {
        saveCurrent()
        console.log('being saved', noteData, text)
        const result = router.put(`/note/${note.id}`, {
            title: extractSingleText(title),
            data: JSON.stringify(noteData),
        } as Note);
        console.log('result is')
    }

    //useEffect(() => {
    //    console.log(currentText);
    //}, [currentText]);

    //const list: NoteData[] = [
    //    {
    //        text: "hehe",
    //    },
    //    {
    //        text: "hehe",
    //    },
    //    {
    //        text: "hehe",
    //    },
    //    {
    //        text: "hehe",
    //    },
    //    {
    //        text: "hehe",
    //    },
    //];

    return (
        <>
            <Authenticated user={user} mainClass="items-center">
                <div className="relative h-full w-full max-w-lg p-4 sm:pt-20">
                    <CommonButton
                        shapeType="icon"
                        buttonType="outlined"
                        className="border-on-surface text-on-surface surface-on-surface"
                        onClick={saveNote}
                    >
                        <FiArrowLeft className="text-xl" />
                    </CommonButton>
                    <div className="pt-2 sm:pt-10">
                        <Title
                            initialText={title}
                            setText={setTitle}
                            slateKey={0}
                        />
                        <PreviousParagraphs
                            list={previousParagraphs}
                            select={moveUp}
                        />
                        <Text
                            initialText={text}
                            setText={setText}
                            slateKey={currentKey}
                        />

                        <NextParagraphs
                            list={nextParaphaphs}
                            select={moveDown}
                        />
                    </div>
                    <div className="h-20"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 mx-5 mb-20 flex h-16 flex-col items-center sm:mb-0">
                    <div className="flex w-full max-w-lg items-center justify-end gap-x-2">
                        <CommonButton shapeType="extended-fab" className="">
                            <FiChevronUp className="text-lg [stroke-width:3px]" />
                            Up
                        </CommonButton>
                        <CommonButton
                            className="text-lg"
                            buttonType="outlined"
                            shapeType="icon"
                            onClick={createDivergence}
                        >
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
    const editor = useMemo(() => withReact(createEditor()), [slateKey]);

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
    useEffect(() => {
        //Transforms.delete(editor);
        //Transforms.insertNodes(editor, initialText)
    }, [slateKey]);
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

function ReadonlySlateText({
    slateData,
    className,
}: {
    slateData: string;
    className?: string;
}) {
    const editor = useMemo(() => withReact(createEditor()), []);

    let text = slateData;
    if (text === JSON.stringify(deserializeSlateText(null))) {
        text = JSON.stringify(createInitialSlateText("Empty"));
    }
    return (
        <Slate editor={editor} initialValue={deserializeSlateText(slateData)}>
            <Editable
                placeholder="Empty"
                className={cn("text-lg outline-none", className)}
                readOnly
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
                {list.map((v, i) => {
                    return (
                        <RippleButton
                            className="flex items-center justify-between rounded-lg px-2 py-2 text-start text-lg opacity-50 ripple-on-surface surface-on-surface"
                            onClick={() => select(v)}
                            key={v.text}
                        >
                            <ReadonlySlateText
                                slateData={v.text ?? ""}
                                className="flex-shrink-1 max-h-6  w-full min-w-0 flex-grow-0 self-start"
                            />
                            <FiChevronUp className="inline-block flex-grow text-lg" />
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
                {list.map((v, i) => {
                    return (
                        <RippleButton
                            className="flex items-center justify-between rounded-lg px-2 py-2 text-start text-lg opacity-50 ripple-on-surface surface-on-surface"
                            onClick={() => select(v)}
                            key={v.text}
                        >
                            <ReadonlySlateText
                                slateData={v.text ?? ""}
                                className="flex-shrink-1 max-h-6  w-full min-w-0 flex-grow-0 self-start"
                            />
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
    if (text === null || text === undefined) return createInitialSlateText("");
    if (text === "") return createInitialSlateText("");
    return JSON.parse(text);
}

function extractSingleText(descendant: Descendant[]) {
    return (descendant as any)[0]['children'][0]['text'] as string;
}
