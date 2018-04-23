<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = [
        'author_id',
        'text',
    ];

    public function author()
    {
        return $this->belongsTo(User::class);
    }

}
