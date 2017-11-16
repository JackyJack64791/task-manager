<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Carbon;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'full_name', 'email', 'login', 'address','phone','bank_card', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'role_user');
    }

    public function skills()
    {
        return $this->belongsToMany(Skill::class,'skill_user');
    }

    public function projectsManager()
    {
        return $this->hasMany(Project::class, 'manager_id');
    }

    public function projectsCustomer()
    {
        return $this->hasMany(Project::class, 'customer_id');
    }

    public function tasks()
    {
        return $this->hasMany(Task::class, 'author_id');
    }

}
