<?php

use App\Role;
use App\Skill;
use App\Team;
use App\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->delete();

        $roles = Role::all();
        $skills = Skill::all();
        $teams = Team::all();

        $user = User::create([
            'full_name' => 'Алексей Косенко',
            'email' => 'manager1@user.com',
            'login' => 'JackyJack',
//            'team_id' => 1,
            'password' => bcrypt(1234),
            'address' => 'Новосибирск, Россия',
            'bank_card' => '4400676894316426',
            'phone' => '88005553535',
            'img_path' => '/users/1.png',
        ]);
        $user->skills()->sync($skills->random(rand(1, 5))->pluck('id')->toArray());
        $user->roles()->sync($roles->get(0));
        $user->teams()->sync($teams->get(0));

        $user = User::create([
            'full_name' => 'Геннадий Ефремов',
            'email' => 'manager2@user.com',
            'login' => 'GennadiyManager',
//            'team_id' => 2,
            'password' => bcrypt(1234),
            'address' => 'Нью-Йорк, США',
            'bank_card' => '6478535467971313',
            'phone' => '19568643134',
            'img_path' => '/users/2.png',
        ]);

        $user->skills()->sync($skills->random(rand(1, 5))->pluck('id')->toArray());
        $user->roles()->sync($roles->get(0));
        $user->teams()->sync($teams->get(1));

        $user = User::create([
            'full_name' => 'Матвей Меркушев',
            'email' => 'developer1@user.com',
            'login' => 'MatveyDev',
//            'team_id' => 1,
            'password' => bcrypt(1234),
            'address' => 'Новосибирск, Россия',
            'bank_card' => '4400921567832526',
            'phone' => '89527686164',
            'img_path' => '/users/3.png',
        ]);

        $user->skills()->sync($skills->random(rand(1, 5))->pluck('id')->toArray());
        $user->roles()->sync($roles->get(1));
        $user->teams()->sync($teams->get(0));

        $user = User::create([
            'full_name' => 'Евгений Гуляев',
            'email' => 'developer2@user.com',
            'login' => 'EugeneDev',
//            'team_id' => 2,
            'password' => bcrypt(1234),
            'address' => 'Владивосток, Россия',
            'bank_card' => '5555647921214365',
            'phone' => '89486734567',
            'img_path' => '/users/4.png',
        ]);

        $user->skills()->sync($skills->random(rand(1, 5))->pluck('id')->toArray());
        $user->roles()->sync($roles->get(1));
        $user->teams()->sync($teams->get(1));

        $user = User::create([
            'full_name' => 'Владимир Королев',
            'email' => 'tester1@user.com',
            'login' => 'VladimirTest',
//            'team_id' => 1,
            'password' => bcrypt(1234),
            'address' => 'Новосибирск, Россия',
            'bank_card' => '9764732154346791',
            'phone' => '89836468915',
            'img_path' => '/users/5.png',
        ]);

        $user->skills()->sync($skills->random(rand(1, 5))->pluck('id')->toArray());
        $user->roles()->sync($roles->get(2));
        $user->teams()->sync($teams->get(0));

        $user = User::create([
            'full_name' => 'Елена Брагина',
            'email' => 'tester2@user.com',
            'login' => 'ElenaTest',
//            'team_id' => 2,
            'password' => bcrypt(1234),
            'address' => 'Санкт-Петербург, Россия',
            'bank_card' => '9761437861246479',
            'phone' => '89138457679',
            'img_path' => '/users/6.png',
        ]);

        $user->skills()->sync($skills->random(rand(1, 5))->pluck('id')->toArray());
        $user->roles()->sync($roles->get(2));
        $user->teams()->sync($teams->get(1));

        $user = User::create([
            'full_name' => 'Лариса Кузнецова',
            'email' => 'client1@user.com',
            'login' => 'LarisaClient',
//            'team_id' => 1,
            'password' => bcrypt(1234),
            'address' => 'Воронеж, Россия',
            'bank_card' => '9467813467915254',
            'phone' => '89634678285',
            'img_path' => '/users/7.png',
        ]);

        $user->skills()->sync($skills->random(rand(1, 5))->pluck('id')->toArray());
        $user->roles()->sync($roles->get(3));
        $user->teams()->sync($teams->get(0));

        $user = User::create([
            'full_name' => 'Семен Мясников',
            'email' => 'client2@user.com',
            'login' => 'SemenClient',
//            'team_id' => 2,
            'password' => bcrypt(1234),
            'address' => 'Торонто, Канада',
            'bank_card' => '4687943146843478',
            'phone' => '89467683164',
            'img_path' => '/users/8.png',
        ]);

        $user->skills()->sync($skills->random(rand(1, 5))->pluck('id')->toArray());
        $user->roles()->sync($roles->get(3));
        $user->teams()->sync($teams->get(1));

        $user = User::create([
            'full_name' => 'Администратор',
            'email' => 'admin@admin.com',
            'login' => 'Admin',
//            'team_id' => 2,
            'password' => bcrypt(1234),
            'address' => '-',
            'bank_card' => '-',
            'phone' => '-',
            'img_path' => '/users/9.png',
        ]);

        $user->skills()->sync($skills->random(rand(1, 5))->pluck('id')->toArray());
        $user->roles()->sync($roles->get(4));
        $user->teams()->sync($teams->get(1));
    }
}
