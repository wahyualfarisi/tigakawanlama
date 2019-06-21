<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_absensi extends CI_Model {


    function fetch_absensi_created($tgl_penggajian)
    {
        $query = $this->db->query(
                "SELECT a.nik , CONCAT(a.nama_depan,' ', a.nama_belakang) as nama_lengkap , b.status, b.tgl_penggajian, b.id_absensi, c.nama_jabatan 
                 FROM t_karyawan a LEFT JOIN t_absensi b ON a.nik = b.nik 
                 LEFT JOIN t_gaji c ON a.kode_jabatan = c.kode_jabatan 
                 WHERE b.tgl_penggajian = '$tgl_penggajian' "
        );
        return $query;
    }

    function fetch_widget_absensi($tgl_penggajian)
    {
        $query = $this->db->query(
            "SELECT a.tgl_penggajian, a.status_penggajian,  CONCAT(b.nama_depan, ' ', b.nama_belakang) as nama_admin 
             FROM t_penggajian a JOIN t_administrator b ON a.kode_admin = b.kode_admin WHERE a.tgl_penggajian = '$tgl_penggajian' "
        );
        return $query;
    }

    function fetch_current_karyawan_not_admin($arrString)
    {
        $arrString = implode(', ', $arrString);
        $query    = $this->db->query("SELECT * FROM t_karyawan, t_gaji WHERE t_karyawan.kode_jabatan = t_gaji.kode_jabatan AND  t_karyawan.nik NOT IN ($arrString) AND t_gaji.nama_jabatan != 'admin' ");
        return $query;
    }

}