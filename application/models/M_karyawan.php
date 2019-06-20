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
        $query = $this->db->query("SELECT * FROM t_karyawan , t_gaji WHERE t_karyawan.kode_jabatan = t_gaji.kode_jabatan AND t_karyawan.nik = '$nik' ");
        return $query;
    }


}
