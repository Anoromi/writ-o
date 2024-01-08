<?php

namespace App\Http\Controllers;

use App\Models\Note;
use App\Utils\GetUser;
use Error;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

//require_once('../../Utils/GetUser.php');

class NotesController extends Controller
{
    //

    public function index(Request $request)
    {

        // GetUser::exec($request)->note()->getQuery()->paginate(4, ['id', 'title']);
        return Inertia::render('Note/Index', [
            // "notes" => GetUser::exec($request)->note()->select(['id', 'title'])->paginate(4)
            "notes" => GetUser::exec($request)->note()->getQuery()->paginate(4, ['id', 'title'])
        ]);
    }

    public function store(Request $request)
    {
        $note = GetUser::exec($request)->note()->create([
            'title' => '',
            'data' => '{"text": null, "next": []}'
        ]);
        return to_route('notes.show', [
            'note' => $note->id
        ]);
    }

    public function show(Request $request, Note $note)
    {

        return Inertia::render("Note/Show", [
            "note" => $note
        ]);
    }

    public function update(Request $request, Note $note)
    {

        //throw $request->input('title');
        error_log("Hello there");
        error_log($request->input('title') === null);
        $this->authorize('update', $note);
        $data = $request->validate(([
            "title" => "nullable|string",
            "data"  => "nullable|string"

        ]));


        //$data = $request->validate([
        //    "title" => 'required|string',
        //    "data"  => "required|string"
        //]);

        $note->update($data);

        //echo "Hello there";


        //throw "Hello there";
        return redirect(route('notes.index'));
    }

    public function destroy(Request $request, Note $note) {
        $this->authorize('delete', $note);


        $note->delete();

        //return redirect(route('notes.index'));

    }
}
