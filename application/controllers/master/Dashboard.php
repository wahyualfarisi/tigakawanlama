<?php
defined('BASEPATH') OR exit('No direct script access allowed ') ;

class Dashboard extends CI_Controller {

    function __construct(){
        parent::__construct();
        if($this->session->userdata('login') != 1){
            redirect(base_url() );
            $this->output->cache(n);
        }
        $this->load->model('m_core');
        $this->load->model('m_dashboard');
    }

    public function count_qty()
    {
        $data_karyawan       = $this->m_core->get_all('t_karyawan')->num_rows();
        $penggajian_process  = $this->m_core->get_where('t_penggajian', array('status_penggajian' => 'process'))->num_rows();
        $penggajian_waiting  = $this->m_core->get_where('t_penggajian',array('status_penggajian' => 'waiting'))->num_rows();
        $penggajian_approved = $this->m_core->get_where('t_penggajian', array('status_penggajian' => 'approved'))->num_rows();

        $output = json_encode(array(
            'total_karyawan' => $data_karyawan,
            'count_process' => $penggajian_process,
            'count_waiting' => $penggajian_waiting,
            'count_approved' => $penggajian_approved
        )); 
        echo $output;
    }

    public function grafik_penggajian()
    {
        $data = $this->m_dashboard->grafik_penggajian();
        echo json_encode($data->result() );
    }

    public function dashboard_owner()
    {
        $menunggu_validasi = $this->m_dashboard->get_gaji_waiting();
        $total_pengeluaran = $this->m_dashboard->total_all_pengeluaran();

        $output = json_encode(array(
            'menunggu_validasi' => $menunggu_validasi->num_rows(),
            'total_pengeluaran' => $total_pengeluaran->result()
        ));
        echo $output;
    }

    public function dashboard_karyawan($nik)
    {
        $gaji_karyawan = $this->m_dashboard->gaji_karyawan($nik);
        $absensi_karyawan = $this->m_dashboard->absensi_karyawan($nik);

        $output = json_encode(array(
            'gaji_karyawan' => $gaji_karyawan->result(),
            'absensi_karyawan' => $absensi_karyawan->result()
        ));
        echo $output;
    }

}