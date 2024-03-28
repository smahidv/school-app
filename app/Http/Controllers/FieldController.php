<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFieldRequest;
use App\Http\Requests\UpdateFieldRequest;
use App\Http\Resources\FieldResource;
use App\Models\ClassRoom;
use App\Models\Field;
use App\Models\Level;
use App\Models\Module;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Validator;

class FieldController extends Controller
{

    public function index(Request $request)
    {
        $user = $request->user();
        return response()->json(
            Field::where('user_id', $user->id)
                ->orderBy('created_at', 'desc')
                ->get()
            ,
            201
        );


    }
    /**
     * Store the newly created resource in storage.
     */
    public function store(StoreFieldRequest $request)
    {

        $data = $request->validated();


        $field = Field::create($data);

        foreach ($data['levels'] as $levelData) {

            $level = Level::create([
                'field_id' => $field->id,
                'name' => $levelData['name']
            ]);


            foreach ($levelData['modules'] as $moduleData) {
                Module::create([
                    'level_id' => $level->id,
                    'name' => $moduleData['name']
                ]);
            }
            foreach ($levelData['classrooms'] as $classes) {
                ClassRoom::create([
                    'level_id' => $level->id,
                    'name' => $classes['name']
                ]);
            }
        }


        $responseData = array_merge($data, [
            'field_id' => $field->id
        ]);

        return response()->json([
            'message' => 'The field was created',
            'data' => $responseData
        ], 201);
    }

    /**
     * Display the resource.
     */
    public function show(Field $field, Request $request)
    {
        $user = $request->user();
        if ($user->id !== $field->user_id) {
            return response()->json(['error' => 'Unauthorized action'], 403);
        }

        $field->load('levels.modules', 'levels.classrooms');


        return response()->json($field);
    }

    /**
     * Update the resource in storage.
     */

    public function update(UpdateFieldRequest $request, Field $field)
    {
        $data = $request->validated();

        $existingIds = $field->levels()->pluck('id')->toArray();
        $newIds = Arr::pluck($data['levels'], 'id');
        $toDelete = array_diff($existingIds, $newIds);
        $toAdd = array_diff($newIds, $existingIds);


       Level::destroy($toDelete);

        // Create new levels
        foreach ($data['levels'] as $level) {
            if (in_array($level['id'], $toAdd)) {
                $level['field_id'] = $field->id;
                $this->createLevel($level);
            }
        }

         // Update existing levels
         $levelMap = collect($data['levels'])->keyBy('id');
         foreach ($field->levels as $level) {
             if (isset($levelMap[$level->id])) {
                 $this->updateLevel($level, $levelMap[$level->id]);
             }
         }




    }





    public function destroy($id)
    {
        try {

            $field = Field::findOrFail($id);


            $field->delete();

            return response()->json([
                'message' => 'the field has been deleted successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    private function createLevel($levelData)
    {
        // Validate level data
        $validator = Validator::make($levelData, [
            'name' => 'required|string',
            'field_id' => 'exists:App\Models\Field,id',
            'modules' => 'present|array', 
            'modules.*.name.required' => 'required|string',
            'classrooms' => 'present|array', 
            'classrooms.*.name' => 'required|string',
        ]);
    
        // If validation fails, throw an exception with validation errors
        if ($validator->fails()) {
            throw new \InvalidArgumentException($validator->errors()->first());
        }
    
        // Create the level instance
        $level = Level::create([
            'name' => $levelData['name'],
            'field_id' => $levelData['field_id'],
        ]);
    
        // Create modules for the level using the provided data
        foreach ($levelData['modules'] as $moduleData) {
            Module::create([
                'name' => $moduleData['name'],
                'level_id' => $level->id, // Assign the level ID to the module
            ]);
        }
    
        // Create classrooms for the level using the provided data
        foreach ($levelData['classrooms'] as $classroomData) {
            Classroom::create([
                'name' => $classroomData['name'],
                'level_id' => $level->id, // Assign the level ID to the classroom
            ]);
        }
    
        return $level;
    }


// $level: The current existing level retrieved from the database.
// $levelMap[$level->id]: The updated level from the $levelMap.
private function updateLevel(Level $level, $levelData)
{
    // Validate level data
    $validator = Validator::make($levelData, [
        'name' => 'required|string',
        'field_id' => 'exists:App\Models\Field,id',
        'modules' => 'array', 
        'modules.*.name' => 'required|string',
        'classrooms' => 'array', 
        'classrooms.*.name' => 'required|string',
    ]);

    // If validation fails, throw an exception with validation errors
    if ($validator->fails()) {
        throw new \InvalidArgumentException($validator->errors()->first());
    }

    // Update the level instance with the provided data
    $level->update([
        'name' => $levelData['name'],
        'field_id' => $levelData['field_id'],
    ]);

    // Update or delete existing modules for the level
    if (isset($levelData['modules'])) {
        foreach ($level->modules as $module) {
            // Check if the module exists in the update data
            $moduleData = collect($levelData['modules'])->where('id', $module->id)->first();
            if ($moduleData) {
                // Update the existing module
                $module->update($moduleData);
            } else {
                // Delete the module if it's not present in the update data
                $module->delete();
            }
        }
    }

    // Update or delete existing classrooms for the level
    if (isset($levelData['classrooms'])) {
        foreach ($level->classrooms as $classroom) {
            // Check if the classroom exists in the update data
            $classroomData = collect($levelData['classrooms'])->where('id', $classroom->id)->first();
            if ($classroomData) {
                // Update the existing classroom
                $classroom->update($classroomData);
            } else {
                // Delete the classroom if it's not present in the update data
                $classroom->delete();
            }
        }
    }

    return $level;
}


}