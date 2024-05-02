<?php

namespace App\Http\Controllers;

use App\Http\Requests\studentRequest;
use App\Http\Resources\StudentResource;
use App\Mail\CredentialsMail;
use App\Models\User;
use App\Services\ModuleService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;



class studentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $users = User::with('classRoom')
        ->where('role', 3)
        ->orderBy('created_at', 'desc')
        ->paginate(7);
        

return StudentResource::collection($users);

    }

    protected $moduleService;

    public function __construct(ModuleService $moduleService)
    {
        $this->moduleService = $moduleService;
    }
  
    public function store(studentRequest $request)
    {
        $request->validated();
        $image=$request['image'];
        $pwd = Str::random(8);

        if (isset( $image)) {
            $relativePath = $this->moduleService->saveImage($image);
            $image = $relativePath;
        }
      

        $user = User::create([
            'first_name' => $request->fname,
            'last_name' => $request->lname,
            'phone' => $request->pphone,
            'student_phone_tutor' => $request->tphone,
            'email' => $request->email,
            'password' => Hash::make($pwd),
            'address' => $request->address,
            'student_class_room_id' => $request->class,
            'student_bacalaureat' => $request->bacalaureat,
            'gender' => $request->gender,
            'place_birth' => $request->birth_place,
            'date_birth' => $request->birth_date,
            'role' => 3,
            'image'=>$image
        ]);
    
        // Generate matricule and update user record with matricule
        $matricule = $this->generateNumber($user->id);
        $user->matricule = $matricule;
        $user->save();
    
        $fname = $request->fname;
        $lname = $request->lname;
        $url = 'http://localhost:3000/login';
        $title = 'Credentials for your account';
    
        Mail::to($request->email)->send(new CredentialsMail($title, $fname, $lname, $matricule, $pwd, $url));
    
        return response()->json([
            'message' => 'Student was created'
        ], 201);
    }
        
    


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {

            $user = User::findOrFail($id);


            $user->delete();

            return response()->json([
                'message' => 'the student has been deleted successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    



    private function generateNumber($userId) {
        // Get the current year
        $currentYear = date('Y');
    
        // Format the generated number
        $generatedNumber = $currentYear . '-' . str_pad($userId, 4, '0', STR_PAD_LEFT);
    
        return $generatedNumber;
    }
}