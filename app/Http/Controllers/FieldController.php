<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFieldRequest;
use App\Http\Requests\UpdateFieldRequest;
use App\Http\Resources\FieldResource;
use App\Models\Field;
use App\Models\Level;
use App\Models\Module;
use Illuminate\Http\Request;
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

        $field->load('levels.modules');

        return response()->json($field);
    }

    /**
     * Update the resource in storage.
     */
    public function update(UpdateFieldRequest $request, $id)
    {

        $data = $request->validated();


        $field = Field::findOrFail($id);


        $field->update([
            'name' => $data['name'],
            'acronym' => $data['acronym'],
        ]);


        foreach ($data['levels'] as $levelData) {

            $level = Level::updateOrCreate(
                [


                    'name' => $levelData['name'],
                    'field_id' => $field->id,

                ]
            );


            foreach ($levelData['modules'] as $moduleData) {
                Module::updateOrCreate([
                    'name' => $moduleData['name'],
                    'level_id' => $level->id,

                ]);
            }
        }


        return response()->json([
            'message' => 'The field was updated',
            'field' => $field->refresh(),
        ]);
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
}
