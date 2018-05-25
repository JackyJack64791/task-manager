<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'author_id',
        'project_id',
        'title',
        'description',
        'priority',
        'difficulty',
        'status',
        'completion_percent',
        'hours_count',
        'date_completion',
        'performer_id',
        'possible_performer_id',
        'time_search',
    ];
    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function performer()
    {
        return $this->belongsTo(User::class, 'performer_id');
    }

    public function possible_performer()
    {
        return $this->belongsTo(User::class,'possible_performer_id');
    }

    public function skills()
    {
        return $this->belongsToMany(Skill::class,'task_skill');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
