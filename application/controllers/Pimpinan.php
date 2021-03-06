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

   function approvalgaji()
   {
       $this->load->view('pimpinan/pages/approvalgaji');
   }

   function detailinformasigaji($tgl_penggajian)
   {
      $this->load->view('pimpinan/pages/detailinformasigaji');
   }

   function uploadabsensi($tgl_penggajian)
   {
       if($tgl_penggajian){
          $this->load->view('pimpinan/pages/uploadabsensi');
       }
   }

   function absensi()
   {
      
       $this->load->view('pimpinan/pages/v_detail_absensi');
       
   }

   function importabsensi()
   {
       $this->load->view('pimpinan/pages/v_import_absensi');
   }

   function laporan()
   {
       $this->load->view('pimpinan/pages/v_laporan');
   }

   function infokaryawan()
   {
       $this->load->view('pimpinan/pages/v_karyawan');
   }

   function detailkaryawan($nik)
    {
        $this->load->view('pimpinan/pages/v_detail_karyawan');
    }

}
