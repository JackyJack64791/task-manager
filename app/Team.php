<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $fillable = [
        'name',
        'description',
        'img_path'
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
