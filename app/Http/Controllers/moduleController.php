<?php

namespace App\Http\Controllers;

use App\Http\Resources\ModuleResource;
use App\Services\ModuleService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Validator;

class moduleController extends Controller
{

    protected $moduleService;

    public function __construct(ModuleService $moduleService)
    {
        $this->moduleService = $moduleService;
    }
    public function fetchDataModules(Request $request)
    {
        
      
         $validator = Validator::make($request->all(), [
            'student_class_room_id' => 'required|integer', 
        ]);

    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422); 
        }

       
        $studentClassRoomId = $request->input('student_class_room_id');

        $data = $this->moduleService->fetchDataModules($studentClassRoomId);
   
        return ModuleResource::collection($data);
 
    }
}
