<?php

namespace App\Http\Controllers;

use App\Enums\QuestionTypeEnum;
use App\Http\Requests\StoreExamRequest;
use App\Http\Resources\ExamResource;
use App\Models\Exam;
use App\Models\ExamQuestions;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Enum;

class examController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StoreExamRequest $request)
    {
        $validated = $request->validated();
        
       
        $enableDate = Carbon::parse($validated['enable_date']);
        $expireDate = Carbon::parse($validated['expire_date']);
        $duration = $expireDate->diffInMinutes($enableDate);
    
       
        $status = $this->examStatus($expireDate);

        $exam = Exam::create([
            'user_id' => auth()->id(),
            'status' => $status,
            'description' => $validated['description'],
            'module_id' => $validated['module_id'],
            'duration' => $duration,
            'enable_date' => $enableDate,
            'expire_date' => $expireDate,
            'semester' => $validated['semester'],
        ]);


       $exam->classes()->attach($validated['class_room_id']);

     
        // Create questions
        foreach ($validated['questions'] as $questionData) {
            $this->createQuestion($questionData, $exam->id);
        }
    
        return new ExamResource($exam);
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
        //
    }

    private function createQuestion($data,$examId)
    {
        if (is_array($data['data'])) {
            $data['data'] = json_encode($data['data']);
        }
        $validator = Validator::make($data, [
                    'question' => 'required|string',
                    'type' => ['required', new Enum(QuestionTypeEnum::class)],
                    'score' => 'required',
                    'description' => 'nullable|string',
                    'data' => 'present',
                    'exam_id' => 'exists:App\Models\Exam,id',
                    'image'=>'nullable'
                ]);
                $validatedData = $validator->validate();
                $validatedData['exam_id'] = $examId;
                // if (isset($data['image'])) {
                //             $relativePath = $this->saveImage($data['image']);
                //             $data['image'] = $relativePath;
                //         }

        return ExamQuestions::create($validatedData);
    }
   

    private function saveImage($image)
    {
        // Check if image is valid base64 string
        if (preg_match('/^data:image\/(\w+);base64,/', $image, $type)) {
            // Take out the base64 encoded text without mime type
            $image = substr($image, strpos($image, ',') + 1);
            // Get file extension
            $type = strtolower($type[1]); // jpg, png, gif

            // Check if file is an image
            if (!in_array($type, ['jpg', 'jpeg', 'gif', 'png'])) {
                throw new \Exception('invalid image type');
            }
            $image = str_replace(' ', '+', $image);
            $image = base64_decode($image);

            if ($image === false) {
                throw new \Exception('base64_decode failed');
            }
        } else {
            throw new \Exception('did not match data URI with image data');
        }

        $dir = 'images/';
        $file = Str::random() . '.' . $type;
        $absolutePath = public_path($dir);
        $relativePath = $dir . $file;
        if (!File::exists($absolutePath)) {
            File::makeDirectory($absolutePath, 0755, true);
        }
        file_put_contents($relativePath, $image);

        return $relativePath;
    }

    private function examStatus(Carbon $expireDate)
    {
        return now()->lte($expireDate) ? 'ongoing' : 'finished';
    }
}


