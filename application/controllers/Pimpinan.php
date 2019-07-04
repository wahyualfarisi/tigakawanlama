<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Pimpinan extends CI_Controller {

    public function __construct(){
        parent::__construct();
    }


   function index()
   {
       $this->load->view('pimpinan/root');
   }

   function dashboard()
   {
       $this->load->view('pimpinan/pages/dashboard');
   }

}
