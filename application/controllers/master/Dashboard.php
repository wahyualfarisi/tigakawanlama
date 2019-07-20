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

}