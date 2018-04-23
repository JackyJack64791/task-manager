<?php

use App\Team;
use Illuminate\Database\Seeder;

class TeamsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('teams')->delete();

        Team::create([
            'name' => 'Symphony',
            'description' => 'Команда фрилансеров из Новосибирска. Основной стек технологй: Laravel(PHP), Python',
            'img_path' => '/teams/1.png',
        ]);

        Team::create([
            'name' => 'NewEra',
            'description' => 'Бюро по созданию сайтов и веб-приложений с уникальным дизайном. Основной стек технологй: Laravel(PHP), Python',
            'img_path' => '/teams/2.png',
        ]);

        Team::create([
            'name' => '.wrk',
            'description' => 'Бюро, предоставляющее услуги по аутсорсингу(аутстаффинг). Основной стек технологй: PHP, Python, Ruby, IOS, Android',
            'img_path' => '/teams/3.png',
        ]);
    }
}
