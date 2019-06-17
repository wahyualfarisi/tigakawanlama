<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Gaji extends CI_Controller {

    public function __construct(){
        parent::__construct();
        $this->table = 't_gaji';
        $this->primary = 'kode_jabatan';
        $this->load->model('m_core');
    }

    function add()
    {
        $data = array(
            $this->primary => $this->input->post('kode_jabatan'),
            'nama_jabatan' => $this->input->post('nama_jabatan'),
            'gaji'         => $this->input->post('gaji'),
            'potongan'     => $this->input->post('potongan')
        );

        $insert = $this->m_core->add_data($this->table, $data);
        if($insert){
            $res = array('msg' => 'Berhasil Menambahkan Data Gaji', 'code' => 200);
            echo json_encode($res);
        }else{
            $res = array('msg' => 'Gagal Menambahkan Data Gaji', 'code' => 400 );
            echo json_encode($res);
        }
    }

    function delete()
    {
        $where = array($this->primary => $this->input->post('kode_jabatan'));
        $delete = $this->m_core->delete_rows($this->table, $where);
        if($delete){
            $res = array('msg' => 'Berhasil Menghapus Data Gaji', 'code' => 200);
            echo json_encode($res);
        }else{
            $res = array('msg' => 'Gagal Menghapus Data', 'code' => 400);
            echo json_encode($res);
        }
    }

    function update()
    {
        $where = array($this->primary => $this->input->post('kode_jabatan'));
        $data  = array(
            $this->primary => $this->input->post('kode_jabatan'),
            'nama_jabatan' => $this->input->post('nama_jabatan'),
            'gaji'         => $this->input->post('gaji'),
            'potongan'     => $this->input->post('potongan')
        );
        $update = $this->m_core->update_where($this->table, $data , $where);
        if($update){
            $res = array('msg' => 'Berhasil Mengupdate data gaji', 'code' => 200);
            echo json_encode($res);
        }else{
            $res = array('msg' => 'Gagal Mengupdate Data Gaji', 'code' => 400);
            echo json_encode($res);
        }
    }

    function show_jabatan()
    {
        $output  = '';
        $data    = $this->m_core->get_all_table($this->table, $this->primary, 'asc');
        if($data->num_rows() > 0){
            foreach($data->result() as $row)
            {
                $output .= ' <option value="'.$row->kode_jabatan.'"> '.$row->nama_jabatan.' </option>';
            }
        }else{
            $output = '<option value="">Tidak ada Jabatan </option>';
        }

        echo $output;
    }


}