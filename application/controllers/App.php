<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class App extends CI_Controller {

    public function __construct(){
        parent::__construct();
    }


   function index()
   {
       $this->load->view('auth/v_login');
   }

}
