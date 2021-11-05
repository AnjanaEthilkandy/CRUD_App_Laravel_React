<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;


class Gmail extends Mailable
{
    use Queueable, SerializesModels;

    public $details;


    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($details)
    {
        $this->details = $details;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        Log::info($this->details);
        return $this->subject('Mail from Laravel 8 Settly')
        ->view('emails.gmail')
        ->from('anjanaethilkandy@gmail.com');

    }
}
