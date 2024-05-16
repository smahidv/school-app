<?php

namespace App\Services;

use DB;

use Illuminate\Support\Facades\File;

use Illuminate\Support\Str;


class ModuleService
{

    public function fetchDataModules($studentClassRoomId)
    {

        $data = DB::select("
        SELECT DISTINCT modules.name as module_name,
        modules.id as module_id,
        users.image, 
               users.first_name, 
               users.last_name,  
               class_rooms.name as class_room_name 
       FROM modules JOIN class_rooms on modules.level_id = class_rooms.level_id
        JOIN users on users.id=modules.user_id
        where class_rooms.id=:student_class_room_id
        ", ['student_class_room_id' => $studentClassRoomId]);

        return $data;
    }

    public function saveImage($image)
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

    


}