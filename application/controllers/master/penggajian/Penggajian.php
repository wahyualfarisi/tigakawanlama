<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Penggajian extends CI_Controller {


    public function __construct(){
        parent::__construct();
        $this->table = 't_penggajian';
        $this->primary = 'tgl_penggajian';
        $this->load->model('m_core');
        $this->load->model('m_penggajian');
    }

    function add()
    {
        $kode_admin = $this->session->userdata('kode_admin');
        $tanggal_penggajian = $this->input->post('tanggal_penggajian');
        $status = $this->input->post('status');

        $data = array(
            'tgl_penggajian' => $tanggal_penggajian,
            'status_penggajian' => $status,
            'kode_admin' => $kode_admin
        );
       
        $chekdate  = $this->m_core->get_where($this->table , array('tgl_penggajian' => $tanggal_penggajian) );

        if($chekdate->num_rows() > 0 )
        {
            $res = array('msg' => 'Tanggal Penggajian Sudah Ada', 'code' => 400);
            echo json_encode($res);
            return;
        }

       $insert = $this->m_core->add_data($this->table, $data);
       if($insert){
           $res = array('msg' => 'Berhasil Menambahkan Data Gaji', 'code' => 200);
           echo json_encode($res);
       }else{
           $res = array('msg' => 'Terjadi Masalah', 'code' => 400);
           echo json_encode($res);
       }

       
    }

    function fetch_data()
    {
        $query = '';
        if($this->input->post('query') ){
            $query = $this->input->post('query');
        }
        $data = $this->m_penggajian->fetch_data($query)->result();
        echo json_encode($data);
    }

    function delete()
    {
        $tanggal_penggajian = $this->input->post('query');
        $where              = array('tgl_penggajian' => $tanggal_penggajian);

        $delete             = $this->m_core->delete_rows($this->table, $where);
        if($delete){
            $res = array('msg' => 'Data Penggajian berhasil di hapus', 'code' => 200);
            echo json_encode($res);
        }else{
            $res = array('msg' => 'Data Penggajian Gagal Di hapus', 'code' => 400);
            echo json_encode($res);
        }
        
    }

    function approval_gaji()
    {
        $data = $this->m_penggajian->approval_gaji();
        echo json_encode($data->result() );
    }

    function informasi_gaji()
    {
        $data = $this->m_penggajian->informasi_gaji();
        echo json_encode($data->result() );
    }

    function detail_penggajian($tgl_penggajian)
    {
        $detail_penggajian = $this->m_penggajian->detail_penggajian($tgl_penggajian);
        $data_penggajian   = $this->m_core->get_where('t_penggajian', array('tgl_penggajian' => $tgl_penggajian));
        $output = json_encode(array(
            'detail_penggajian' => $detail_penggajian->result(),
            'data_penggajian'   => $data_penggajian->result()[0]
        ));
        echo $output;
    }

    function approved_penggajian()
    {
        $where = array(
            'tgl_penggajian' => $this->input->post('tgl_penggajian')
        );
        $data = array(
            'status_penggajian' => 'approved'
        );

        $update = $this->m_core->update_where('t_penggajian', $data, $where);
        if($update){
            $res = array(
                'msg' =>  'Data Gajian Berhasil Di Approved',
                'code' => 200
            );
            echo json_encode($res);
        }else{
            $res = array(
                'msg' => 'Terjadi Kesalahan',
                'code' => 500
            );
            echo json_encode($res);
        }
    }

    function reject_penggajian()
    {
        $where = array(
            'tgl_penggajian' => $this->input->post('tgl_penggajian')
        );
        $data = array(
            'status_penggajian' => 'process'
        );

        $update = $this->m_core->update_where('t_penggajian', $data, $where);
        if($update){
            $res = array(
                'msg' =>  'Data Gajian Berhasil Di Reject',
                'code' => 200
            );
            echo json_encode($res);
        }else{
            $res = array(
                'msg' => 'Terjadi Kesalahan',
                'code' => 500
            );
            echo json_encode($res);
        }
    }

    function laporan()
    {
        $dari_bulan = $this->input->post('dari_bulan');
        $sampai_bulan = $this->input->post('sampai_bulan');
        $data = $this->m_penggajian->laporan($dari_bulan,$sampai_bulan);
        echo json_encode($data->result() );
    }






}
