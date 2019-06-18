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


}