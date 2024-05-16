<?php

namespace App\Http\Controllers;

use App\Http\Resources\TeacherClassModulesResource;
use App\Models\ClassRoom;
use App\Models\Module;
use Illuminate\Http\Request;

class ClassRoomController extends Controller
{
    public function getTeacherClass(Request $request)
    {
        $user = $request->user();
        
        $teacherClasses = Module::join('users', 'users.id', '=', 'modules.user_id')
            ->join('users_class_rooms', 'users_class_rooms.user_id', '=', 'users.id')
            ->join('class_rooms', 'users_class_rooms.class_room_id', '=', 'class_rooms.id')
            ->where('users.id', $user->id)
            ->select(
                'class_rooms.id as class_id',
                'class_rooms.name as class_name',
                'modules.id as module_id',
                'modules.name as module_name'
            )
            ->get();
    
        return response()->json($teacherClasses);
    }
    

}
