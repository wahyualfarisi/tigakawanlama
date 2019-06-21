<?php
defined('BASEPATH') OR exit('No direct script access allowed ') ;

class Administrator extends CI_Controller {

    function __construct(){
        parent::__construct();
        if($this->session->userdata('login') != 1){
            redirect(base_url() );
        }
    }

    function index()
    {
        $this->load->view('admin/root');
    }

    function dashboard(){
        $this->load->view('admin/pages/v_dashboard');
    }

    function penggajian()
    {
        $this->load->view('admin/pages/v_penggajian');
    }

    function informasigaji()
    {
        $this->load->view('admin/pages/v_informasigaji');
    }

    function tambahkaryawan()
    {
        $this->load->view('admin/pages/v_infokaryawan');
    }

    function listkaryawan()
    {
        $this->load->view('admin/pages/v_list_karyawan');
    }

    function infoabsensi()
    {
        $this->load->view('admin/pages/v_infoabsensi');
    }

    function importabsensi($tgl_penggajian)
    {
        $this->load->view('admin/pages/v_import_absensi');
    }

    function absensi($id_absensi)
    {
        $this->load->view('admin/pages/v_absensi_detail');
    }

    function uploadabsensi()
    {
        $this->load->view('admin/pages/v_upload_absensi');
    }
}