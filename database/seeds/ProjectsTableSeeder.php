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
            'customer_id' => 7,
            'manager_id' => 1,
            'deadline' => \Carbon\Carbon::now()->subDays(42),
            'description' => 'Необходимо создать "посадочную" страницу для представителя Renault в России.',
        ]);

        Project::create([
            'title' => 'Реализация интернет-магазина по продаже строительных материалов',
            'customer_id' => 8,
            'manager_id' => 1,
            'deadline' => \Carbon\Carbon::now()->subDays(12),
            'description' => 'Необходима реализация современного интернет-магазина(Shopify) строительных материалов (напольные покрытия, облицовка, т.д.) ',
            'specification_link' => 'https://docviewer.yandex.ru/view/104645270/?*=wa4KOdNexCWjT%2FTgryM%2BOvElZSB7InVybCI6InlhLW1haWw6Ly8xNjUyMjU4MTEzMjkxNjUyMzIvMS4yIiwidGl0bGUiOiLQmtC%2B0YHQtdC90LrQviDQvtGC0YfQtdGCICgxINCy0LXRgNGB0LjRjywgMjkuMDMuMjAxOCkgLmRvY3giLCJ1aWQiOiIxMDQ2NDUyNzAiLCJ5dSI6IjE4ODY3NzY4MDE1MjIwMDE0ODgiLCJub2lmcmFtZSI6ZmFsc2UsInRzIjoxNTIzMzA0NjEwMzc1fQ%3D%3D',
        ]);

        Project::create([
            'title' => 'Создание "посадочной" страницы автомагазина',
            'customer_name' => 'Дмитрий Ожегов',
            'manager_id' => 2,
            'deadline' => \Carbon\Carbon::now()->subDays(24),
            'description' => 'Необходимо создать "посадочную" страницу для представителя Renault в России.',
            'specification_path' => 'projects/1.docx',
        ]);

    }
}
