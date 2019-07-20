<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_core extends CI_Model {

    function get_all($table)
    {
        return $this->db->get($table);
    }

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

    function get_all_table($table, $fieldOrder, $methodOrder)
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
      $this->db->where($where);
      return $this->db->update($table, $data);
       
    }

    function delete_rows($table, $where)
    {
        $this->db->where($where);
        return $this->db->delete($table); 
    }

    function autoNumber($field, $table)
    {
        $query = "SELECT MAX($field) as maxKode FROM $table ";
        return $this->db->query($query);
    }




}