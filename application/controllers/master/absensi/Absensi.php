<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Absensi extends CI_Controller {

    public function __construct(){
        parent::__construct();
        $this->table = 't_absensi';
        $this->primary = 'id_absensi';
        $this->load->model('m_core');
        $this->load->model('m_absensi');
    }


    function show_data_widget($tgl_penggajian)
    {
        $data = $this->m_absensi->fetch_widget_absensi($tgl_penggajian)->result();
        echo json_encode($data);

    }

    function show_absensi_created($tgl_penggajian)
    {
        $data = $this->m_absensi->fetch_absensi_created($tgl_penggajian)->result();
        echo json_encode($data);
    }

    function progress_absensi($tgl_penggajian)
    {
       $where_absensi = array(
        'tgl_penggajian' => $tgl_penggajian,
        'status'         => 'success'
       );
       $countAbsensi  = $this->m_core->get_where($this->table, $where_absensi)->num_rows();
       $countKaryawan = $this->m_core->get_all_table('t_karyawan','nik','asc')->num_rows();
       echo json_encode(array(
        'total_absensi'  => $countAbsensi,
        'total_karyawan' => $countKaryawan
       ));
    }

    function created_absensi()
    {
        $data = array(
            'id_absensi'     => rand(1, 3000),
            'nik'            => $this->input->post('nik_karyawan'),
            'tanggal_import' => date('Y-m-d'),
            'status'         => $this->input->post('status'),
            'tgl_penggajian' => $this->input->post('tanggal_penggajian')
        );
        $where = array(
            'nik' => $this->input->post('nik_karyawan'),
            'tgl_penggajian' => $this->input->post('tanggal_penggajian')
        );
        $check = $this->m_core->get_where($this->table, $where);
        if($check->num_rows() > 0){
            $res = array('msg' => 'Gagal Menambahkan, Nik Sudah Di tambahkan', 'code' => 400);
            echo json_encode($res);
            return;
        }

        $insert = $this->m_core->add_data($this->table, $data);
        if($insert){
            $res = array('msg' => 'Berhasil Menambahkan ', 'code' => 200);
            echo json_encode($res);
        }else{
            $res = array('msg' => 'Gagal Menambahkan', 'code' => 400);
            echo json_encode($res);
        }
    
    }

}