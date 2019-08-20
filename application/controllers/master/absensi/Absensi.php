<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Absensi extends CI_Controller {

    public function __construct(){
        parent::__construct();
        $this->table = 't_absensi';
        $this->primary = 'id_absensi';
        $this->load->model('m_core');
        $this->load->model('m_absensi');
        $this->load->model('m_karyawan');
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
       $countKaryawan = $this->m_karyawan->get_karyawan_not_admin('t_karyawan','nik','asc')->num_rows();
       echo json_encode(array(
        'total_absensi'  => $countAbsensi,
        'total_karyawan' => $countKaryawan
       ));
    }

    function created_absensi()
    {
        $nik = $this->input->post('nik_karyawan');
        $tgl_penggajian = $this->input->post('tanggal_penggajian');

        $data = array(
            'id_absensi'     => $this->generateCodeMatic(),
            'nik'            => $nik,
            'tanggal_import' => date('Y-m-d'),
            'status'         => $this->input->post('status'),
            'tgl_penggajian' => $tgl_penggajian
        );
        $where = array(
            'nik' => $nik,
            'tgl_penggajian' => $tgl_penggajian
        );


        $insert = $this->m_core->add_data($this->table, $data);
        if($insert){
            $res = array('msg' => 'Berhasil Menambahkan ', 'code' => 200);
            echo json_encode($res);
        }else{
            $res = array('msg' => 'Gagal Menambahkan', 'code' => 400);
            echo json_encode($res);
        }
    }

    function importbanyajKaryawan()
    {
        $count = count($this->input->post('nik')) ? count($this->input->post('nik')) : 0;
        for($i = 0; $i<$count; $i++)
        {
            $data = array(
                'id_absensi' => 'abs-'.rand(0,300),
                'nik' => $this->input->post('nik')[$i],
                'tanggal_import' => date('Y-m-d'),
                'status' => $this->input->post('status'),
                'tgl_penggajian' => $this->input->post('tgl_penggajian')
            );
            $insert = $this->m_core->add_data('t_absensi', $data);
        }
        if($insert){
            echo json_encode(array(
                'res' => 'berhasil menambahkan penggajian',
                'status' => true
            ));
        }else{
            echo json_encode(array(
                'res' => 'gagal menambahkan penggajian',
                'status' => false
            ));
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
            $getData = $this->m_absensi->fetch_current_karyawan_not_admin($dataabsensi);
            echo json_encode($getData->result());
        }else{
            $getData = $this->m_karyawan->get_karyawan_not_admin();
            echo json_encode($getData->result());
        }      
    }

    function show_current_admin($tgl_penggajian)
    {
        
        $where = array(
            'tgl_penggajian' => $tgl_penggajian
        );

        $absensi = $this->m_core->get_where($this->table, $where);
        if($absensi->num_rows() > 0){
            foreach($absensi->result() as $rowabsensi)
            {
                $dataabsensi[] = $rowabsensi->nik;
            }
            $getData = $this->m_absensi->fetch_karyawan_only_admin($dataabsensi);
            echo json_encode($getData->result() );
        }else{
            $getData = $this->m_karyawan->get_karyawan_only_admin();
            echo json_encode($getData->result() );
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
                            $perJam        = getJam($jam_masuk, $scan_masuk);
                        }else{
                            $terlambat     = '-';
                            $perJam        = 0;
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
                            'telat_perjam' => $perJam,
                            'total_jam_kerja' => $total_jam_kerja,
                            'lemburan_perjam' => getJam($scan_keluar, $jam_keluar),
                            'test' => selisih("16:00", "17:00")
                        );
                    }
            }
            echo json_encode($data);
        }
    }

    function show_karyawan_nik($nik)
    {
        $data = $this->m_karyawan->fetch_karyawan($nik)->result();
        echo json_encode($data);        
    }

    function simpanabsensi()
    {
        //single value
        $nik        = $this->input->post('nik');
        $id_absensi = $this->input->post('id_absensi');
        $potongan   = $this->input->post('potongan');
        $total_gaji = $this->input->post('total_gaji');
        $lemburan   = $this->input->post('total_lembur');


        //array value
        $tgl_absen  = $this->input->post('tgl_absen');
        $jam_masuk  = $this->input->post('jam_masuk');
        $jam_keluar = $this->input->post('jam_keluar');
        $scan_masuk = $this->input->post('scan_masuk');
        $scan_keluar = $this->input->post('scan_keluar');
        
        //insert gaji karyawan
        $data_gaji_karyawan = array(
            'id_penggajian' => $this->generateCodeGajiKaryawan(),
            'id_absensi' => $id_absensi,
            'total_gaji' => $total_gaji,
            'potongan'   => $potongan,
            'total_lemburan' => $lemburan
        );
        

        $this->m_core->add_data('t_gaji_karyawan', $data_gaji_karyawan);

        for($i=0; $i<count($tgl_absen); $i++)
        {
            $data[] = array(
                'id_absensi' => $id_absensi,
                'tgl_absen' => $tgl_absen[$i],
                'jam_masuk' => $jam_masuk[$i],
                'jam_keluar' => $jam_keluar[$i],
                'scan_masuk' => $scan_masuk[$i],
                'scan_keluar' => $scan_keluar[$i]
            );
        }
        
        $where = array(
            'id_absensi' => $id_absensi
        );

        $data_update = array(
            'status' => 'success'
        );
        $this->m_core->update_where($this->table,$data_update,$where);
        $insert = $this->db->insert_batch('t_detail_absensi', $data);
        
        if($insert){
                $res = array('msg' => 'absensi berhasil di simpan', 'code' => 200);
                echo json_encode($res);             
        }else{
            $res = array('msg' => 'Gagal menyimpan absensi', 'code' => 400);
            echo json_encode($res);
        }
    }

    function waiting_approved()
    {
        $status = $this->input->post('status');
        $tgl_penggajian = $this->input->post('tgl');
        $where = array(
            'tgl_penggajian' => $tgl_penggajian
        );
        $data  = array(
            'status_penggajian' => $status
        );
        $update = $this->m_core->update_where('t_penggajian', $data, $where);
        if($update){
            $res = array('msg' => 'berhasil dikirim ke owner', 'code' => 200);
            echo json_encode($res);
        }else{
            $res = array('msg' => 'Gagal mengirim absensi', 'code' => 400);
            echo json_encode($res);
        }
    }

    function deleteAbsensi()
    {
        $id = $this->input->post('idTarget');
        $where = array('id_absensi' => $id);
        $delete = $this->m_core->delete_rows($this->table, $where);
        if($delete){
            $res = array('msg' => 'Berhasil Menghapus Data Absensi', 'code' => 200);
            echo json_encode($res);
        }else{
            $res = array('msg' => 'Gagal Menghapus Data Absensi' ,'code' => 400);
            echo json_encode($res);
        }
    }

    function fetch_absensi_karyawan($id)
    {
        $data = $this->m_absensi->fetch_absensi_karyawan($id);
        foreach($data->result() as $item)
        {
            $check_telat       = terlambat($item->jam_masuk, $item->scan_masuk);
            if($check_telat < 0){
                $terlambat     = selisih($item->jam_masuk, $item->scan_masuk);
                $perJam        = getJam($item->jam_masuk, $item->scan_masuk);
            }else{
                $terlambat     = '-';
                $perJam        = 0;
            }
            $absensi[] = array(
                'tgl_absen'   => $item->tgl_absen,
                'jam_masuk'   => $item->jam_masuk,
                'jam_keluar'  => $item->jam_keluar,
                'scan_masuk'  => $item->scan_masuk,
                'scan_keluar' => $item->scan_keluar,
                'terlambat'   => $terlambat,
                'telat_perjam' => $perJam,
                'total_jam_kerja' => selisih($item->scan_keluar, $item->scan_masuk),
                'lemburan_perjam' => getJam($item->scan_keluar, $item->jam_keluar) === 0 ? '-' : getJam($item->scan_keluar, $item->jam_keluar).' Jam' 
            );
        }
        echo json_encode($absensi);
    }

    function generateCodeMatic()
    {
        $data = $this->m_core->autoNumber($this->primary, $this->table);
        $kode = $data->result()[0]->maxKode;
        $nourut = (int) substr($kode, 4 , 4);
        $nourut++;

        $char = 'abs_';
        $newID = $char . sprintf('%03s', $nourut);
        return $newID;
    }

    function generateCodeGajiKaryawan()
    {
        $data = $this->m_core->autoNumber('id_penggajian', 't_gaji_karyawan');
        $kode = $data->result()[0]->maxKode;
        $nourut = (int) substr($kode, 4 , 4);
        $nourut++;

        $char = 'pgj_';
        $newID = $char . sprintf('%03s', $nourut);
        return $newID;
    }


    function testing()
    {
        $data = $this->m_absensi->fetch_absensi_karyawan('ab-003');
        echo json_encode($data->result());
    }

 

   
}