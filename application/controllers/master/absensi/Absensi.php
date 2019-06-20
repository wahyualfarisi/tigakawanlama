<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Absensi extends CI_Controller {

    public function __construct(){
        parent::__construct();
        $this->table = 't_absensi';
        $this->primary = 'id_absensi';
        $this->load->model('m_core');
        $this->load->model('m_absensi');
        $this->load->library('excel');
        $this->load->helper('selisih');
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

    function show_current_karyawan($tgl_penggajian)
    {
        $where = array(
            'tgl_penggajian' => $tgl_penggajian
        );
        $absensi  = $this->m_core->get_where($this->table, $where);
        if($absensi->num_rows() > 0) 
        {
            foreach($absensi->result() as $rowabsensi)
            {
                $dataabsensi[] = $rowabsensi->nik; 
            }
            $getData = $this->m_absensi->fetch_current_karyawan($dataabsensi);
            echo json_encode($getData->result());
        }else{
            $getData = $this->m_core->get_all_table('t_karyawan','nik','asc');
            echo json_encode($getData->result());
        }      
    }

    function upload_absensi()
    {
        if(isset($_FILES['file']['name']) ){
            $path   = $_FILES['file']['tmp_name'];
            $object = PHPExcel_IOFactory::load($path);


            foreach($object->getWorksheetIterator() as $worksheet)
            {
                $highestRow = $worksheet->getHighestRow();
                $highestColumn = $worksheet->getHighestColumn();


                    for($row = 2; $row <= $highestRow; $row++ )
                    {
                        $nik        = $worksheet->getCellByColumnAndRow(0, $row)->getValue();
                        $tgl_absen  = $worksheet->getCellByColumnAndRow(1, $row)->getFormattedValue();
                        $jam_masuk  = $worksheet->getCellByColumnAndRow(2, $row)->getFormattedValue();
                        $jam_keluar = $worksheet->getCellByColumnAndRow(3, $row)->getFormattedValue();
                        $scan_masuk = $worksheet->getCellByColumnAndRow(4, $row)->getFormattedValue();
                        $scan_keluar = $worksheet->getCellByColumnAndRow(5, $row)->getFormattedValue();
                       
                        $check_telat       = terlambat($jam_masuk, $scan_masuk);
                        if($check_telat < 0){
                            $terlambat     = selisih($jam_masuk, $scan_masuk);
                        }else{
                            $terlambat     = '-';
                        }

                        $total_jam_kerja = selisih($scan_keluar, $scan_masuk);

                        $data[] = array(
                            'nik'         => $nik,
                            'id_absensi'  => $this->input->post('id_absensi'),
                            'tgl_absen'   => $tgl_absen,
                            'jam_masuk'   => $jam_masuk,
                            'jam_keluar'  => $jam_keluar,
                            'scan_masuk'  => $scan_masuk,
                            'scan_keluar' => $scan_keluar,
                            'terlambat'   => $terlambat,
                            'total_jam_kerja' => $total_jam_kerja
                        );
                    }
            }
            echo json_encode($data);
        }
    }


    function testing()
    {
        $terlambat =  terlambat("08:00", "09:10");
        if($terlambat < 0){
            echo "kamu terlambat ".selisih("08:00","09:10");
        }else{
            echo "kamu tidak terlambat";
        }

        
    }

   
}