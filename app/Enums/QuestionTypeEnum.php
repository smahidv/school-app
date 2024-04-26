<?php

namespace App\Enums;

enum QuestionTypeEnum: string
{
    case Text = 'text';
    case Radio = 'radio';
    case Checkbox = 'checkbox';
}
