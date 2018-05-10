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
            'team_id'=> 2,
            'customer_id' => 7,
            'manager_id' => 1,
            'deadline' => \Carbon\Carbon::now()->subDays(42),
            'description' => 'Необходимо создать "посадочную" страницу для представителя Renault в России.',
        ]);

        Project::create([
            'title' => 'Реализация интернет-магазина по продаже строительных материалов',
            'customer_id' => 8,
            'manager_id' => 1,
            'team_id' => 2,
            'deadline' => \Carbon\Carbon::now()->subDays(12),
            'description' => 'Необходима реализация современного интернет-магазина(Shopify) строительных материалов (напольные покрытия, облицовка, т.д.) ',
            'specification_path' => 'http://google.com'
        ]);


    }
}
