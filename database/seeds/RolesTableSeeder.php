<?php

use App\Role;
use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->delete();

        Role::create([
            'role' => 'project_manager'
        ]);

        Role::create([
            'role' => 'developer'
        ]);

        Role::create([
            'role' => 'tester'
        ]);

        Role::create([
            'role' => 'client'
        ]);

        Role::create([
            'role' => 'admin'
        ]);
    }
}
