<?php

namespace App\Http\Controllers;

use App\Enums\QuestionTypeEnum;
use App\Http\Requests\StoreExamRequest;
use App\Http\Resources\ExamQuestionResource;
use App\Http\Resources\ExamResource;
use App\Http\Resources\ExamWithQuestionsResource;
use App\Models\Exam;
use App\Models\ExamQuestions;
use App\Models\Module;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Support\Arr;

class examController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        
        

        
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
    //    dd($exam->image);
        return new ExamResource($exam);
    }
    
    

    /**
     * Display the specified resource.
     */
    public function show(Exam $exam,Request $request)
    {
   
        $user = $request->user();
        if ($user->id !== $exam->user_id) {
            return abort(403, 'Unauthorized action');
        }
        return new ExamWithQuestionsResource($exam);
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

  public function update(StoreExamRequest $request,Exam $exam)
    { 
        

        $data = $request->validated();

        $exam->update($data);
           
  // Get ids as plain array of existing questions
        $existingIds = $exam->questions()->pluck('id')->toArray(); 
 // Get ids as plain array of new questions
        $newIds = Arr::pluck($data['questions'], 'id');  
        $toDelete = array_diff($existingIds, $newIds);
        $toAdd = array_diff($newIds, $existingIds);

        ExamQuestions::destroy($toDelete);

       // Create new questions
        foreach ($data['questions'] as $question) {
            
            if (in_array($question['id'], $toAdd)) {
                $this->createQuestion($question,$exam->id);
            }
        }

        $questionMap = collect($data['questions'])->keyBy('id');
        foreach ($exam->questions as $question) {
            if (isset($questionMap[$question->id])) {
                $this->updateQuestion($question, $questionMap[$question->id]);
            }
        }
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
                    'image' => 'nullable|array',
                ]);
                $validatedData = $validator->validate();
                $validatedData['exam_id'] = $examId;
          
                if (isset( $validatedData['image'])) {
                    // Ensure $data['image'] is an array
                    if (!is_array(  $validatedData ['image'])) {
                        throw new \Exception('Image data must be an array');
                    }
                
                    $imagePaths = $this->saveImage( $validatedData['image']);

                    $validatedData['image'] = json_encode($imagePaths); 
                  
                }
         
             
        return ExamQuestions::create($validatedData);
    }

    private function updateQuestion(ExamQuestions $question, $data)
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
                    'image' => 'nullable|array',
        ]);

        return $question->update($validator->validated());
    }

    public function getExams(Request $request){
    
      
        $moduleId = $request["moduleId"];
        $classRoomId = $request["classRoomId"];
        $exams = Module::findOrFail($moduleId)
            ->exams()
            ->join('exams_class_rooms', 'exams_class_rooms.exam_id', '=', 'exams.id')
            ->join('modules', 'modules.id', '=', 'exams.module_id')
            ->where('exams_class_rooms.class_room_id', $classRoomId)
            ->distinct()
            ->get();

    
    
        return json_encode($exams);
    }
   
    public function getByExam(Exam $exam)
    {
     
        $questions = ExamQuestions::with('exam')
        ->where('exam_id', $exam->id)
        ->paginate(1);

        return [                  
            'exam' =>new ExamResource($exam),
            'questions' => ExamQuestionResource::collection($questions)->response()->getData(true)
          ];
    }


    private function saveImage($images)
{
    $relativePaths = [];

    foreach ($images as $image) {
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

        $relativePaths[] = $relativePath;
    }

    return $relativePaths;
}


    private function examStatus(Carbon $expireDate)
    {
        return now()->lte($expireDate) ? 'ongoing' : 'finished';
    }


}


