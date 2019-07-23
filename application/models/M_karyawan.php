<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_karyawan extends CI_Model{

    function fetch_data($query)
    {
        $this->db->select('*');
        $this->db->from('t_karyawan');
        if($query != ''){
            $this->db->like('nik', $query);
            $this->db->or_like('email', $query);
            $this->db->or_like('nama_depan', $query);
        }
        $this->db->order_by('tgl_gabung', 'asc');
        return $this->db->get();
    }

    function fetch_karyawan($nik)
    {
        $query = $this->db->query("SELECT * FROM t_karyawan , t_jabatan WHERE t_karyawan.kode_jabatan = t_jabatan.kode_jabatan AND t_karyawan.nik = '$nik' ");
        return $query;
    }

    function get_karyawan_not_admin()
    {
        $query = $this->db->query("SELECT * FROM t_karyawan, t_jabatan WHERE t_karyawan.kode_jabatan = t_jabatan.kode_jabatan AND t_jabatan.nama_jabatan != 'admin' ");
        return $query;
    }

    function get_karyawan_only_admin()
    {
        $query = $this->db->query("SELECT * FROM t_karyawanm t_jabatan WHERE t_karyawan.kode_jabatan = t_jabatan.kode_jabatan AND t_jabatan.nama_jabatan == 'admin' ");
        return $query;
    }

    function fetch_slip_gaji($nik, $query)
    {
        $query = "SELECT a.id_absensi , a.tanggal_import , a.status,
                         b.tgl_penggajian, b.status_penggajian,
                         c.id_penggajian, c.total_gaji, c.potongan, c.total_lemburan, 
                         d.nik, d.email, CONCAT(d.nama_depan, ' ', d.nama_belakang) as nama_lengkap, d.no_rekening, d.nama_bank, d.atas_nama,
                         e.kode_jabatan, e.nama_jabatan, e.gaji, e.potongan, e.lemburan
                  FROM t_absensi a LEFT JOIN t_penggajian b ON a.tgl_penggajian = b.tgl_penggajian
                                   LEFT JOIN t_gaji_karyawan c ON a.id_absensi = c.id_absensi 
                                   LEFT JOIN t_karyawan d ON a.nik = d.nik
                                   LEFT JOIN t_jabatan e ON d.kode_jabatan = e.kode_jabatan
                  WHERE a.nik = '$nik' AND a.tgl_penggajian LIKE '%$query%'
                  GROUP BY a.id_absensi
        ";
        return $this->db->query($query);
    }

    function print_slip($id_absensi)
    {
        $query = "SELECT a.id_absensi , a.tanggal_import , a.status,
        b.tgl_penggajian, b.status_penggajian,
        c.id_penggajian, c.total_gaji, c.potongan as total_potongan, c.total_lemburan, 
        d.nik, d.email, CONCAT(d.nama_depan, ' ', d.nama_belakang) as nama_lengkap, d.jk,  d.no_rekening, d.nama_bank, d.atas_nama, d.tgl_lahir, 
        e.kode_jabatan, e.nama_jabatan, e.gaji, e.potongan, e.lemburan
        FROM t_absensi a LEFT JOIN t_penggajian b ON a.tgl_penggajian = b.tgl_penggajian
                        LEFT JOIN t_gaji_karyawan c ON a.id_absensi = c.id_absensi 
                        LEFT JOIN t_karyawan d ON a.nik = d.nik
                        LEFT JOIN t_jabatan e ON d.kode_jabatan = e.kode_jabatan
        WHERE a.id_absensi = '$id_absensi'
        GROUP BY a.id_absensi
        ";
        return $this->db->query($query);
    }


}
