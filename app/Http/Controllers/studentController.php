<?php

namespace App\Http\Controllers;

use App\Http\Requests\studentRequest;
use App\Http\Resources\StudentResource;
use App\Mail\CredentialsMail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;



class studentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return StudentResource::collection(
            User::where('role', 3)
                ->orderBy('created_at', 'desc')
                ->paginate(7)
        );

    }


  
    public function store(studentRequest $request)
    {
        $request->validated();
        
        $pwd = Str::random(8);
      
        // Insert user into the database
        $user = User::create([
            'first name' => $request->fname,
            'last name' => $request->lname,
            'student_phone' => $request->pphone,
            'student_phone_tutor' => $request->tphone,
            'email' => $request->email,
            'password' => Hash::make($pwd),
            'student_address' => $request->address,
            'student_class' => $request->class,
            'role' => 3
        ]);
    
        // Generate SID and update user record with SID
        $sid = $this->generateNumber($user->id);
        $user->SID = $sid;
        $user->save();
    
        $fname = $request->fname;
        $lname = $request->lname;
        $url = 'http://localhost:3000/login';
        $title = 'Credentials for your account';
    
        // Send email with credentials
        Mail::to($request->email)->send(new CredentialsMail($title, $fname, $lname, $sid, $pwd, $url));
    
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