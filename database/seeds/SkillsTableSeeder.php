<?php

use App\Skill;
use Illuminate\Database\Seeder;

class SkillsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('skills')->delete();

        Skill::create([
            'skill' => 'PHP'
        ]);

        Skill::create([
            'skill' => 'MySQL'
        ]);

        Skill::create([
            'skill' => 'Node.js'
        ]);

        Skill::create([
            'skill' => 'HTML'
        ]);

        Skill::create([
            'skill' => 'CSS'
        ]);

        Skill::create([
            'skill' => 'Ruby'
        ]);

        Skill::create([
            'skill' => 'Python'
        ]);

        Skill::create([
            'skill' => 'Laravel'
        ]);

        Skill::create([
            'skill' => 'Django'
        ]);

        Skill::create([
            'skill' => 'Ruby on Rails'
        ]);

        Skill::create([
            'skill' => 'C#'
        ]);

        Skill::create([
            'skill' => 'ASP.NET'
        ]);

        Skill::create([
            'skill' => 'Node.js Express'
        ]);

        Skill::create([
            'skill' => 'Adobe Photoshop'
        ]);

        Skill::create([
            'skill' => 'Javascript'
        ]);

        Skill::create([
            'skill' => 'React.js'
        ]);

        Skill::create([
            'skill' => 'Angular'
        ]);

        Skill::create([
            'skill' => 'Vue.js'
        ]);

        Skill::create([
            'skill' => 'Wordpress'
        ]);

        Skill::create([
            'skill' => 'MS SQL'
        ]);

        Skill::create([
            'skill' => 'Mocha'
        ]);

        Skill::create([
            'skill' => 'PHPUnit'
        ]);

        Skill::create([
            'skill' => 'Модульное тестирование'
        ]);

        Skill::create([
            'skill' => 'Интеграционное тестирование'
        ]);

        Skill::create([
            'skill' => 'Веб-дизайн'
        ]);

        Skill::create([
            'skill' => 'Разработка технической документации'
        ]);

        Skill::create([
            'skill' => 'IOS'
        ]);

        Skill::create([
            'skill' => 'Android'
        ]);
    }
}
