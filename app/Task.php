<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    public function author()
    {
        return $this->belongsTo(User::class);
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function performer()
    {
        return $this->belongsTo(User::class);
    }

    public function skills()
    {
        return $this->belongsToMany(Skill::class,'task_skill');
    }
}
