<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_core extends CI_Model {


    function add_data($table, $data)
    {
        return $this->db->insert($table, $data);
    }

    function get_order_where_list($table, $where, $fieldOrder, $methodOrder)
    {
        $this->db
            ->select('*')
            ->from($table)
            ->where($where)
            ->order_by($fieldOrder, $methodOrder);
            return $this->db->get();
    }

    function get_all_table()
    {
        $this->db
             ->select('*')
             ->from($table)
             ->order_by($fieldOrder, $methodOrder);
            return $this->db->get();
    }

    function get_where($table, $where)
    {
        return $this->db->get_where($table, $where);
    }

    function update_where($table, $data,  $where)
    {
      return  $this->db
            ->where($where)
            ->update($table, $data);
       
    }




}