<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $fillable = [
        'name',
        'description',
        'img_path',
        'author_id',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'team_user');
    }

    public function projects()
    {
        return $this->hasMany(Project::class);
    }
}
