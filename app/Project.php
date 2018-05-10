<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'customer_id',
        'manager_id',
        'title',
        'deadline',
        'description',
        'specification_path'
    ];

    public function customer()
    {
        return $this->belongsTo(User::class,'customer_id');
    }

    public function manager()
    {
        return $this->belongsTo(User::class, 'manager_id');
    }

    public function team()
    {
        return $this->belongsTo(Team::class,'team_id');
    }

    public function completed()
    {
        return $this->where('completed', '=', true);
    }

    public function incompleted()
    {
        return $this->where('completed','=', false);
    }
}
