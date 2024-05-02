<?php

namespace App\Http\Controllers;

use App\Http\Requests\TeacherRequest;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\UsersImport;
use App\Exports\UsersExport;

class TeacherController extends Controller
{
    public function import(TeacherRequest $request) 
    {
       
            Excel::import(new UsersImport, $request->file('my_file'));
            return response()->json(['data'=>'Users imported successfully.',201]);
     
    } 
    public function export() 
    {
        return Excel::download(new UsersExport, 'users.xlsx');
    }
}
