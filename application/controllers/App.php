<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class App extends CI_Controller {

    public function __construct(){
        parent::__construct();
        $this->tableadmin = 't_administrator';
        $this->tablekaryawan = 't_karyawan';
        $this->load->model('m_core');
    }


   function index()
   {
       $this->load->view('auth/v_login');
   }

   function loginprocess()
   {
       $akses = $this->input->post('akses');
       
       $data = array(
            'email' => $this->input->post('email'),
            'password' => $this->input->post('password')
       );

       if($akses == 'karyawan'){
            $check = $this->m_core->get_where($this->tablekaryawan, $data);
            echo $check->num_rows();
       }elseif($akses == 'administrator'){
            $check = $this->m_core->get_where($this->tableadmin, $data);
            echo $check->num_rows();
       }elseif($akses == 'owner'){
            $check = $this->m_core->get_where($this->tableadmin, $data);
            echo $check->num_rows();
       }
   }

}
