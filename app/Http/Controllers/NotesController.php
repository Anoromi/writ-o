<?php

namespace App\Http\Controllers;

use App\Models\Note;
use App\Utils\GetUser;
use Illuminate\Http\Request;
use Inertia\Inertia;

//require_once('../../Utils/GetUser.php');

class NotesController extends Controller
{
    //

    public function index(Request $request) {


        return Inertia::render('Note/Index', [
            "notes" => GetUser::exec($request)->note()->select(['id', 'title'])->paginate(4)
        ]);
    }

    public function store(Request $request) {
        $note = GetUser::exec($request)->note()->create([
            'title' => '',
            'data' => [
                'text' => null,
                'next' => []
            ]
        ]);
        return to_route('notes.show', [
            'note' => $note->id
        ]);
    }

    public function show(Request $request, Note $note) {

        return Inertia::render("Note/Show", [
            "note" => $note
        ]);
    }
}
