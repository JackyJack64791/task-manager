<?php

use App\Project;
use Illuminate\Database\Seeder;

class ProjectsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('projects')->delete();

        Project::create([
            'title' => 'Создание "посадочной" страницы автомагазина',
            'team_id'=> 1,
            'customer_id' => 7,
            'manager_id' => 1,
            'deadline' => \Carbon\Carbon::now()->subDays(42),
            'description' => 'Необходимо создать "посадочную" страницу для представителя Renault в России.',
        ]);

        Project::create([
            'title' => 'Реализация интернет-магазина по продаже строительных материалов',
            'customer_id' => 7,
            'manager_id' => 1,
            'team_id' => 1,
            'deadline' => \Carbon\Carbon::now()->subDays(12),
            'description' => 'Необходима реализация современного интернет-магазина(Shopify) строительных материалов (напольные покрытия, облицовка, т.д.) ',
            'specification_path' => 'http://google.com'
        ]);

        Project::create([
            'title' => 'Интеграция админ-панели в сайт дизайнерского агенства',
            'customer_id' => 8,
            'manager_id' => 2,
            'team_id' => 2,
            'deadline' => \Carbon\Carbon::now()->subDays(12),
            'description' => 'Необходимо интегрировать панель администратора для управления реализованными проектами в сайт дизайнерского агенства "Shuka"(Laravel)',
            'specification_path' => 'http://shuka.design'
        ]);

        Project::create([
            'title' => 'Оптимизация back-end части приложения',
            'customer_id' => 8,
            'manager_id' => 2,
            'team_id' => 2,
            'deadline' => \Carbon\Carbon::now()->subDays(12),
            'description' => 'Необходима оптимизация серверной части Android-приложения, а именно: оптимизация запросов к серверу, запросов к БД, времени ответа сервера, ',
            'specification_path' => 'http://google.com'
        ]);
    }
}
