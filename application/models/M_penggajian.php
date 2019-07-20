<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_penggajian extends CI_Model {


    function fetch_data($query)
    {
        $this->db->select('*');
        $this->db->from('t_penggajian');
        if($query != ''){
            $this->db->like('tgl_penggajian', $query);
            $this->db->or_like('status_penggajian', $query);
        }
        $this->db->order_by('tgl_penggajian', 'DESC');
        return $this->db->get();
    }

    function approval_gaji()
    {
        $query = "SELECT a.tgl_penggajian, a.status_penggajian,
                         b.kode_admin, b.email, CONCAT(b.nama_depan, ' ', b.nama_belakang) as nama_admin,
                         COUNT(c.id_absensi) as jumlah_absensi,
                         SUM(d.total_gaji) as total_pengeluaran_gaji
                  FROM t_penggajian a LEFT JOIN t_admin b ON a.kode_admin = b.kode_admin
                                      LEFT JOIN t_absensi c ON a.tgl_penggajian = c.tgl_penggajian
                                      LEFT JOIN t_gaji_karyawan d ON c.id_absensi = d.id_absensi
                                      WHERE a.status_penggajian = 'waiting'
                                      GROUP BY a.tgl_penggajian
        ";
        return $this->db->query($query);
    }

    function detail_penggajian($tgl_penggajian)
    {
        $query = "SELECT a.id_absensi, a.tanggal_import, a.status, a.tgl_penggajian,
                         b.nik, b.email, CONCAT(b.nama_depan ,' ',b.nama_belakang) as nama_karyawan, b.jk,
                         c.kode_jabatan, c.nama_jabatan, c.gaji, c.potongan, c.lemburan,
                         d.id_penggajian, d.total_gaji, d.potongan as total_potongan, d.total_lemburan
                 FROM t_absensi a LEFT JOIN t_karyawan b ON a.nik = b.nik
                                  LEFT JOIN t_jabatan c ON b.kode_jabatan = c.kode_jabatan
                                  LEFT JOIN t_gaji_karyawan d ON a.id_absensi = d.id_absensi
                                  
                                  WHERE a.tgl_penggajian = '$tgl_penggajian'
        ";
        return $this->db->query($query);
    }

    function calculate_data_penggajian()
    {
        
    }


}