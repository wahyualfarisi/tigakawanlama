<?php
defined('BASEPATH') OR exit('No direct script access allowed ') ;

class Administrator extends CI_Controller {

    function __construct(){
        parent::__construct();
        if($this->session->userdata('login') != 1){
            redirect(base_url() );
            $this->output->cache(n);
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

    function detailkaryawan($nik)
    {
        $this->load->view('admin/pages/v_detail_karyawan');
    }

    function infoabsensi()
    {
        $this->load->view('admin/pages/v_infoabsensi');
    }

    function importabsensi($tgl_penggajian)
    {
        $this->load->view('admin/pages/v_import_absensi2');
    }

    function absensi()
    {
        $this->load->view('admin/pages/v_absensi_detail');
    }

    function uploadabsensi()
    {
        $this->load->view('admin/pages/v_upload_absensi');
    }

    function kelolauser()
    {
        $this->load->view('admin/pages/v_kelola_user');
    }

    function kelolajabatan()
    {
        $this->load->view('admin/pages/v_kelola_jabatan');
    }

    function detailinformasigaji()
    {
        $this->load->view('admin/pages/detailinformasigaji');
    }
}