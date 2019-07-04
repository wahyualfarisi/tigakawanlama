<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User extends CI_Controller {

    public function __construct(){
        parent::__construct();
        $this->table = 't_administrator';
        $this->primary = 'kode_admin';
        $this->load->model('m_core');
    }

    public function fetch()
    {
        $data = $this->m_core->get_all_table($this->table, $this->primary, 'desc');
        echo json_encode($data->result() );
    }

    public function add()
    {
        $whereEmail['email'] = $this->input->post('email');

        $check_email = $this->m_core->get_where($this->table, $whereEmail);

        if($check_email->num_rows() > 0){
            $res = array('msg' => 'Email Sudah Di gunakan', 'code' => 401);
            echo json_encode($res);
            return;
        }

        $data = array(
            $this->primary => $this->generateAutoKode(),
            'email' => $this->input->post('email'),
            'nama_depan' => $this->input->post('nama_depan'),
            'nama_belakang' => $this->input->post('nama_belakang'),
            'password' => $this->input->post('password'),
            'akses'    => $this->input->post('akses')
        );

        $insert = $this->m_core->add_data($this->table, $data);
        if($insert){
            $res = array(
                'msg' => 'Data Berhasil Disimpan',
                'code' => 200
            );
            echo json_encode($res);
        }else{
            $res = array(
                'msg' => 'Data Gagal Di simpan',
                'code' => 400
            );
            echo json_encode($res);
        }
    }

    public function delete()
    {
        $where[$this->primary] = $this->input->post('idTarget');

        $delete = $this->m_core->delete_rows($this->table, $where);
        if($delete){
            $res = array(
                'msg' => 'User Berhasil Di Hapus',
                'code' => 200
            );
            echo json_encode($res);
        }else{
            $res = array(
                'msg' => 'User Gagal Di Hapus',
                'code' => 400
            );
            echo json_encode($res);
        }
    }

    public function update()
    {
        $where = array(
            'kode_admin' => $this->input->post('kode_admin_edit')
        );

        $data = array(
            'email'      => $this->input->post('email_edit'),
            'nama_depan' => $this->input->post('nama_depan_edit'),
            'nama_belakang' => $this->input->post('nama_belakang_edit'),
            'password' => $this->input->post('password_edit'),
            'akses'    => $this->input->post('akses_edit')
        );

        $update = $this->m_core->update_where($this->table, $data, $where);
        if($update){
            $res = array('msg' => 'User Berhasil Di update', 'code' => 200);
            echo json_encode($res);
        }else{
            $res = array('msg' => 'User Gagal Di update', 'code' => 400);
            echo json_encode($res);
        }

    }

    public function generateAutoKode()
    {
        $data = $this->m_core->autoNumber($this->primary, $this->table);
        $kode = $data->result()[0]->maxKode;
        $nourut = (int) substr($kode, 3, 3);
        $nourut++;

        $previx = 'ad_';
        $newID  = $previx .sprintf('%03s', $nourut);
        return $newID;
    }

    
}
