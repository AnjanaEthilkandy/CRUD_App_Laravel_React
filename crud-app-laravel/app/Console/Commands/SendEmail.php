<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
//use App\Mail\Gmail;
//use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class SendEmail extends Command
{

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'weekly:email';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send a weekly client update';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        Log::info("inside command send email");
        $users = DB::table('clients')->get();
        Log::info("Weekly client list");
        Log::info($users);
        Log::info("exiting command send email");
        echo "Operation completed -  command send email";
        return Command::SUCCESS;
    }
}
