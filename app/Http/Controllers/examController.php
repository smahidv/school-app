<?php

namespace App\Http\Controllers;

use App\Enums\QuestionTypeEnum;
use App\Http\Requests\StoreExamRequest;
use App\Http\Resources\ExamQuestionResource;
use App\Http\Resources\ExamResource;
use App\Http\Resources\ExamsForStudentRessources;
use App\Http\Resources\ExamsForTeacheRessources;
use App\Http\Resources\ExamWithQuestionsResource;
use App\Models\Exam;
use App\Models\ExamQuestions;
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
        
       
  


        $exam = Exam::create([
            'user_id' => auth()->id(),
     
            'description' => $validated['description'],
            'module_id' => $validated['module_id'],
        
            'enable_date' => $validated['enable_date'],
            'expire_date' => $validated['expire_date'],
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
        $validatedData = $validator->validate();
        if (isset( $validatedData['image'])) {
            // Ensure $data['image'] is an array
            if (!is_array(  $validatedData ['image'])) {
                throw new \Exception('Image data must be an array');
            }
        
            $imagePaths = $this->saveImage( $validatedData['image']);
   

            $validatedData['image'] = json_encode($imagePaths); 
          
        }

        return $question->update($validatedData );
    }

    public function getExams(Request $request){
    
      
        $moduleId = $request["moduleId"];
        $classRoomId = $request["classRoomId"];
        $exams =Exam::with('module', 'classes','user')
        ->where('module_id', $moduleId)
        ->whereHas('classes', function ($query) use ($classRoomId) {
            $query->where('class_rooms.id', $classRoomId);
        })
        ->get();

        foreach ($exams as $exam) {
            $status = $this->examStatus(Carbon::parse($exam->expire_date), Carbon::parse($exam->enable_date));
            $duration = Carbon::parse($exam->expire_date)->diffInSeconds(Carbon::parse($exam->enable_date));
    
            // Add status and duration to exam data
            $exam->status = $status;
            $exam->duration = $duration;
        }

          return  ExamsForStudentRessources::collection( $exams)->response();
    }



    public function getExamsForTeachers(Request $request)
    {
        $moduleId = $request->input('moduleId');
        $classRoomId = $request->input('classRoomId');
       
    
        $exams = Exam::with('module', 'classes')
                    ->where('module_id', $moduleId)
                    ->whereHas('classes', function ($query) use ($classRoomId) {
                        $query->where('class_rooms.id', $classRoomId);
                    })
                    ->get();

                    foreach ($exams as $exam) {
                        $status = $this->examStatus(Carbon::parse($exam->expire_date), Carbon::parse($exam->enable_date));
                        $duration = Carbon::parse($exam->expire_date)->diffInSeconds(Carbon::parse($exam->enable_date));
                
                        // Add status and duration to exam data
                        $exam->status = $status;
                        $exam->duration = $duration;
                

                       
                    }
            
        return  ExamsForTeacheRessources::collection( $exams)->response();
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


private function examStatus(Carbon $expireDate, Carbon $enableDate)
{
    $now = now();
    
    if ($now->gt($expireDate)) {
        return 'Finished';
    } elseif ($now->lt($enableDate)) {
        return 'Upcoming';
    } elseif ($enableDate->lte($now)) {
        return 'Ongoing';
    }
}


}


