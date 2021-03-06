<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_absensi extends CI_Model {


    function fetch_absensi_created($tgl_penggajian)
    {
        $query = $this->db->query(
                "SELECT a.nik , CONCAT(a.nama_depan,' ', a.nama_belakang) as nama_lengkap , b.status, b.tgl_penggajian, b.id_absensi, c.nama_jabatan , b.status , d.total_gaji, d.potongan
                 FROM t_karyawan a LEFT JOIN t_absensi b ON a.nik = b.nik 
                 LEFT JOIN t_jabatan c ON a.kode_jabatan = c.kode_jabatan 
                 LEFT JOIN t_gaji_karyawan d ON d.id_absensi = b.id_absensi
                
                 WHERE b.tgl_penggajian = '$tgl_penggajian'  ORDER BY a.nik ASC  "
        );
        return $query;
    }

    function fetch_widget_absensi($tgl_penggajian)
    {
        $query = $this->db->query(
            "SELECT a.tgl_penggajian, a.status_penggajian,  CONCAT(b.nama_depan, ' ', b.nama_belakang) as nama_admin 
             FROM t_penggajian a JOIN t_admin b ON a.kode_admin = b.kode_admin WHERE a.tgl_penggajian = '$tgl_penggajian' "
        );
        return $query;
    }

    function fetch_current_karyawan_not_admin($arrString)
    {
        $arrString = implode(', ', $arrString);
        $query    = $this->db->query("SELECT * FROM t_karyawan, t_jabatan WHERE t_karyawan.kode_jabatan = t_jabatan.kode_jabatan AND  t_karyawan.nik NOT IN ($arrString) AND t_jabatan.nama_jabatan != 'admin' ");
        return $query;
    }

    function fetch_karyawan_only_admin($arrString)
    {
        $arrString = implode(', ', $arrString);
        $query    = $this->db->query("SELECT * FROM t_karyawan, t_jabatan WHERE t_karyawan.kode_jabatan = t_jabatan.kode_jabatan AND  t_karyawan.nik NOT IN ($arrString) AND t_jabatan.nama_jabatan = 'admin' ");
        return $query;
    }

    function fetch_absensi_karyawan($id_absensi)
    {
        $query = "SELECT
                  a.tgl_absen , a.jam_masuk, a.jam_keluar, a.scan_masuk, a.scan_keluar , 
                  b.id_absensi AS absensi , b.tgl_penggajian, c.status_penggajian 
                  FROM t_detail_absensi a 
                    LEFT JOIN t_absensi b ON a.id_absensi = b.id_absensi 
                    LEFT JOIN t_penggajian c ON b.tgl_penggajian = c.tgl_penggajian 
                  WHERE b.id_absensi = '$id_absensi'";
        return $this->db->query($query);
    }


}