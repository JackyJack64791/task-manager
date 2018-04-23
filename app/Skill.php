<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    protected $fillable = [
        'skill',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'skill_user');
    }
}
