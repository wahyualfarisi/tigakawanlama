<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Karyawan extends CI_Controller {

    public function __construct(){
        parent::__construct();
    }


   function index()
   {
       $this->load->view('karyawan/root');
   }

   function dashboard()
   {
       $this->load->view('karyawan/pages/v_dashboard');
   }

   function slipgaji()
   {
       $this->load->view('karyawan/pages/v_slipgaji');
   }

   function absensi()
   {
       $this->load->view('karyawan/pages/v_absensi');
   }

}
