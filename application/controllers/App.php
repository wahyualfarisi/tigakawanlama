<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class App extends CI_Controller {

    public function __construct()
    {
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
            'email'    => $this->input->post('email'),
            'password' => $this->input->post('password')
       );

       $datamaster = array(
            'email' => $this->input->post('email'),
            'password' => $this->input->post('password'),
            'akses' => $this->input->post('akses')
       );

       switch ($akses) {

           case 'karyawan':
                    $check = $this->m_core->get_where($this->tablekaryawan, $data);
                    if($check->num_rows() > 0){
                        foreach($check->result() as $user)
                        {
                            $data_session = array(
                                'nik'   => $user->nik,
                                'email' => $user->email
                            );
                            $this->session->set_userdata($data_session);
                        } 
                        $res = array('msg' => 'Login berhasil', 'toLocation' => 'Karyawan', 'code' => 200);
                        echo json_encode($res);
                        return;
                    }
                    $res = array('msg' => 'Akses Login Salah , Silahkan periksa kembali', 'code' => 400);
                    echo json_encode($res);
                    break;

             case 'admin':
                    $check = $this->m_core->get_where($this->tableadmin, $datamaster);
                    if($check->num_rows() > 0)
                    {
                        foreach($check->result() as $admin)
                        {
                            $data_session = array(
                                'kode_admin'   => $admin->kode_admin,
                                'email'        => $admin->email,
                                'nama_lengkap' => $admin->nama_depan.' '.$admin->nama_belakang
                            );
                            $this->session->set_userdata($data_session);
                        }
                        $res = array('msg' => 'Login Berhasil', 'toLocation' => 'Administrator', 'code' => 200);
                        echo json_encode($res);
                        return;
                    }
                    $res = array('msg' => 'Akses Login Salah, Silahkan periksa kembali', 'code' => 400);
                    echo json_encode($res);
                   break;
            
            case 'owner':
                    $check = $this->m_core->get_where($this->tableadmin, $datamaster);
                    if($check->num_rows() > 0)
                    {
                        foreach($check->result() as $owner)
                        {
                            $data_session = array(
                                'kode_admin'   => $owner->kode_admin,
                                'email'        => $owner->email,
                                'nama_lengkap' => $owner->nama_depan.' '.$owner->nama_belakang
                            );
                            $session = $this->session->set_userdata($data_session);
                        }
                        $res = array('msg' => 'Login Berhasil', 'toLocation' => 'Pimpinan', 'code' => 200);
                        echo json_encode($res);
                        return;
                    }
                    $res = array('msg' => 'Akses Login Salah, Silahkan periksa kembali', 'code' => 400);
                    echo json_encode($res);
                    break;


           default:
               echo json_encode(array('msg' => 'server error', 'code' => 500));
               break;
       }

    
   }

}
