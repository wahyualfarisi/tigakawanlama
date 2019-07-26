<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_dashboard extends CI_Model {

    function grafik_penggajian()
    {
        $query = "SELECT a.tgl_penggajian, a.status_penggajian, 
                         COUNT(b.id_absensi) as total_absensi ,
                         SUM(c.total_gaji) as total_pengeluaran
                  FROM t_penggajian a LEFT JOIN t_absensi b ON a.tgl_penggajian = b.tgl_penggajian
                                      LEFT JOIN t_gaji_karyawan c ON b.id_absensi = c.id_absensi
                                      WHERE a.status_penggajian = 'approved' 
                                      GROUP BY a.tgl_penggajian
        ";
        return $this->db->query($query);
    }
   
    public function get_gaji_waiting()
    {
        $query = "SELECT * FROM t_penggajian WHERE status_penggajian = 'waiting'; ";
        return $this->db->query($query);
    }

    public function total_all_pengeluaran()
    {
        $query = "SELECT a.tgl_penggajian,
                         b.id_absensi, 
                         c.id_penggajian, SUM(c.total_gaji) as total_pengeluaran
                  FROM t_penggajian a LEFT JOIN t_absensi b ON a.tgl_penggajian = b.tgl_penggajian 
                                      LEFT JOIN t_gaji_karyawan c ON b.id_absensi = c.id_absensi    
                  WHERE a.status_penggajian = 'approved'     
        ";
        return $this->db->query($query);
    }

    public function gaji_karyawan($nik)
    {
        $query = "SELECT a.id_absensi, a.nik,
                         b.id_penggajian, b.total_gaji, b.potongan, b.total_lemburan
                  FROM t_absensi a LEFT JOIN t_gaji_karyawan b ON a.id_absensi = b.id_absensi
                  WHERE a.nik = '$nik'
        ";
        return $this->db->query($query);
    }

    public function absensi_karyawan($nik)
    {
        $query = "SELECT * FROM t_absensi WHERE nik = '$nik' ";
        return $this->db->query($query);
    }


}
