<?php

namespace App\Http\Controllers;

use App\Http\Requests\TeacherRequest;
use App\Http\Requests\UpdateTeacherRequest;
use App\Http\Resources\TeacherResource;
use App\Imports\UsersImport;
use App\Models\ClassRoom;
use App\Models\User;
use App\Services\ModuleService;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class teacherController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    protected $moduleService;

    public function __construct(ModuleService $moduleService)
    {
        $this->moduleService = $moduleService;
    }
    public function index()
    {
        $users = User::where('role', 2)->with('classrooms', 'modules')
            ->paginate(10);
        return TeacherResource::collection($users);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::with('classrooms', 'modules')->findOrFail($id);

        return new TeacherResource($user);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTeacherRequest $request, User $teacher)
    {
        $data = $request->validated();
        
       
        
        if (isset($data['image'])) {
            $relativePath = $this->moduleService->saveImage($data['image']);
            $data['image'] = $relativePath;

            if ($teacher->image) {
                $absolutePath = public_path($teacher->image);
                File::delete($absolutePath);
            }
        }
        $teacher->update($data);

        // dd($teacher);

        // if (isset($data['classrooms']) && is_array($data['classrooms'])) {
        //     $teacher->classrooms()->sync($data['classrooms']);
        // }

        // if (isset($data['modules']) && is_array($data['modules'])) {
        //     $teacher->modules()->sync($data['modules']);
        // }
      
        // Update the user with the validated data
        // $user->update($data);

        // Debugging: Output the updated user object
    
        // // return new TeacherResource($user);
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
    public function import(TeacherRequest $request)
    {

        Excel::import(new UsersImport, $request->file('my_file'));
        return response()->json(['data' => 'Users imported successfully.', 201]);

    }
}
