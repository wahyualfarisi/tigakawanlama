<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Absensi2 extends CI_Controller {

    public function __construct(){
        parent::__construct();
        $this->table = 't_absensi';
        $this->primary = 'id_absensi';
        $this->load->model('m_core');
        $this->load->library('excel');
        $this->load->helper('selisih');
    }

    function upload_absensi()
    {
        if(isset($_FILES['file']['name']) ){
            
            $path   = $_FILES['file']['tmp_name'];
            $object = PHPExcel_IOFactory::load($path);

            $storeNik = [];

            foreach($object->getWorksheetIterator() as $worksheet)
            {
                $highestRow = $worksheet->getHighestRow();
                $highestColumn = $worksheet->getHighestColumn();


                    for($row = 2; $row <= $highestRow; $row++ )
                    {
                        $nik        = $worksheet->getCellByColumnAndRow(0, $row)->getValue();
                        array_push($storeNik, $nik);


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

                        $data_absensi[] = array(
                            'nik'         => $nik,
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

            $filteredNik = $this->filterNik($storeNik);
        
            foreach($filteredNik as $keynik => $valueNik)
            {
                    
                    $checknik = $this->m_core->get_where('t_karyawan', array('nik' => $valueNik) );
                    if($checknik->num_rows() > 0 ){
                        foreach($checknik->result() as $item)
                        {
                            $Resultfiltered[] = $item->nik;
                           
                            $get_jabatan = $this->m_core->get_where('t_jabatan' , array('kode_jabatan' => $item->kode_jabatan) );

                            $jabatan[] = array(
                                'nik' => $item->nik,
                                'jabatan' => $get_jabatan->result()
                            );

                        } 
                    }       
            }

            echo json_encode(array(
                'output' => array(
                    'data_absensi' => $data_absensi,
                    'jabatan' => $jabatan,
                    'karyawan' => $karyawan
                ) ,
                'nik' => $Resultfiltered
            )); 
        }
    }

   

    public function filterNik($data)
    {
        $nik = [];
        foreach($data as $key)
        {
            array_push($nik, $key);
        }
        return array_unique($nik) ;
    }

    public function simpan_penggajian()
    {
        $nik          = $this->input->post('nik');
        $total_lembur = $this->input->post('totallembur');
        $total_telat  = $this->input->post('totaltelat');
        $total_gaji   = $this->input->post('totalgaji');

        $nik_absensi  = $this->input->post('nik_absensi');
        $tgl_absen    = $this->input->post('tgl_absen');
        $jam_masuk    = $this->input->post('jam_masuk');
        $jam_keluar   = $this->input->post('jam_keluar');
        $scan_masuk   = $this->input->post('scan_masuk');
        $scan_keluar  = $this->input->post('scan_keluar');

        $tgl_penggajian = $this->input->post('tgl_penggajian');

        //data absensi 
        $id_absensi = [];
        $countnik = count($nik) ? count($nik) : 0 ;
        for($i = 0; $i<$countnik; $i++)
        {
            array_push($id_absensi, $this->generateCodeMatic());

            $data_absensi = array(
                'id_absensi' => $this->generateCodeMatic(),
                'nik' => $this->input->post('nik')[$i],
                'tanggal_import' => date('Y-m-d'),
                'status' => 'process',
                'tgl_penggajian' => $tgl_penggajian
            );
            $this->m_core->add_data('t_absensi', $data_absensi);
        }

        // echo print_r($data_absensi);

        //data gaji karyawan
  
            for($v = 0; $v<$countnik; $v++)
            {
                $data_penggajian = array(
                    'id_penggajian' => $this->generateCodeGajiKaryawan(),
                    'id_absensi' => $id_absensi[$v],
                    'total_gaji' => $total_gaji[$v],
                    'potongan' => $total_telat[$v],
                    'total_lemburan' => $total_lembur[$v]
                );
                $this->m_core->add_data('t_gaji_karyawan', $data_penggajian);
            }
        




        // echo print_r($data_penggajian);
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



   


}