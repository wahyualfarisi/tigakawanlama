<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Karyawan extends CI_Controller {

    public function __construct(){
        parent::__construct();
        $this->table = 't_karyawan';
        $this->primary = 'nik';
        $this->load->model('m_core');
        $this->load->model('m_karyawan');
    }

    function add()
    {
        $data = array(
            'nik' => $this->input->post('nik'),
            'email' => $this->input->post('email'),
            'password' => '12345',
            'nama_depan' => $this->input->post('nama_depan'),
            'nama_belakang' => $this->input->post('nama_belakang'),
            'alamat' => $this->input->post('alamat'),
            'tgl_lahir' => $this->input->post('tanggal_lahir'),
            'tgl_gabung' => $this->input->post('tanggal_gabung'),
            'no_telp' => $this->input->post('no_telp'),
            'agama' => $this->input->post('agama'),
            'jk' => $this->input->post('jenis_kelamin'),
            'no_rekening' => $this->input->post('no_rekening'),
            'nama_bank' => $this->input->post('nama_bank'),
            'atas_nama' => $this->input->post('atas_nama'),
            'kode_jabatan' => $this->input->post('kode_jabatan')
        );

        $insert = $this->m_core->add_data($this->table, $data);

        if($insert){
            $res = array('msg' => 'Data Karyawan Berhasil Di Tambah', 'code' => 200);
            echo json_encode($res);
        }else{
            $res = array('msg' => 'Tidak Dapat Menambah Data', 'code' => 400);
            echo json_encode($res);
        }
     
   

    }

    function check_nik_and_email()
    {
        $nik   = $this->input->post('nik');
        $email = $this->input->post('email');

        $data_nik   = $this->m_core->get_where($this->table, array($this->primary => $nik) );
        $data_email = $this->m_core->get_where($this->table, array('email' => $email ) );

        if($data_nik->num_rows() > 0){
            $res = array('msg' => 'Nik Sudah Digunakan', 'code' => 400 );
            echo json_encode($res);
        }else if($data_email->num_rows() > 0){
            $res = array('msg' => 'Email Sudah Digunakan', 'code' => 400);
            echo json_encode($res);
        }else{
            $res = array('code' => 200);
            echo json_encode($res);
        }
    }

    function check_email()
    {

    }

    function update()
    {

        $data = array(
            'email' => $this->input->post('email'),
            'password' => '12345',
            'nama_depan' => $this->input->post('nama_depan'),
            'nama_belakang' => $this->input->post('nama_belakang'),
            'alamat' => $this->input->post('alamat'),
            'tgl_lahir' => $this->input->post('tanggal_lahir'),
            'tgl_gabung' => $this->input->post('tanggal_gabung'),
            'no_telp' => $this->input->post('no_telp'),
            'agama' => $this->input->post('agama'),
            'jk' => $this->input->post('jenis_kelamin'),
            'no_rekening' => $this->input->post('no_rekening'),
            'nama_bank' => $this->input->post('nama_bank'),
            'atas_nama' => $this->input->post('atas_nama'),
            'kode_jabatan' => $this->input->post('kode_jabatan')
        );


        $where = array( $this->primary => $this->input->post('nik') );


        $update = $this->m_core->update_where($this->table, $data, $where);
        if($update){
            $res = array('msg' => 'Berhasil Mengupdate data karyawan', 'code' => 200);
            echo json_encode($res);
        }else{
            $res = array('msg' => 'Gagal Mengupdate data karyawan', 'code' => 400);
            echo json_encode($res);
        }
      
    }

    function delete()
    {
        $nik = $this->input->post('nik');
        $where = array($this->primary => $nik);
        $delete = $this->m_core->delete_rows($this->table, $where);
        if($delete){
            $res = array('msg' => 'Berhasil Menghapus data', 'code' => 200);
            echo json_encode($res);
        }else{
            $res = array('msg' => 'Gagal Menghapus Data', 'code' => 400);
            echo json_encode($res);
        }
    }

    function fetch_all()
    {
        $query = '';
        if($this->input->post('query'))
        {
            $query = $this->input->post('query');
        }
        $data = $this->m_karyawan->fetch_data($query)->result();
        echo json_encode($data);

    }

    function get_where_karyawan($nik)
    {
        $data = $this->m_core->get_where($this->table, array($this->primary => $nik) );
        echo json_encode($data->result() );
    }

    function fetch_slipi($nik)
    {
        $query = '';
        if($this->input->post('query') ){
            $query = $this->input->post('query');
        }
        $data = $this->m_karyawan->fetch_slip_gaji($nik, $query);

        echo json_encode(array(
            'data' => $data->result(),
            'rows' => [$data->num_rows()]
        ));
    }

    function print_slip($id_absensi)
    {
        $data = $this->m_karyawan->print_slip($id_absensi);
        echo json_encode($data->result() );
    }





  

}