<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('author_id');
            $table->integer('project_id');
            $table->text('description');
            $table->enum('priority',['1','2', '3']);
            $table->enum('difficulty',['easy','medium','hard']);
            $table->enum('status',['new task','task is performing','task is ready','task is confirmed']);
            $table->decimal('completion_percent');
            $table->integer('hours_count')->nullable();
            $table->date('date_completion')->nullable();
            $table->integer('performer_id')->nullable();
            $table->time('time_search')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tasks');
    }
}
