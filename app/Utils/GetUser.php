<?php

namespace App\Utils;

use Illuminate\Http\Request;
use App\Models\User;


class GetUser
{
    static function exec(Request $request)
    {
        $user = $request->user();
        assert($user instanceof User);
        return $user;
    }

}
