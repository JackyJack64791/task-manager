<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = ['customer_id','manager_id', 'deadline','description', 'specification'];
    public function customer()
    {
        return $this->belongsTo(User::class,'customer_id');
    }

    public function manager()
    {
        return $this->belongsTo(User::class, 'manager_id');
    }

    public function isComplete()
    {
        return false;
    }
}
