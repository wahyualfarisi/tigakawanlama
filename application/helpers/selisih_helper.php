<?php
function selisih($jam_masuk, $jam_keluar){

  list($h,$m,$s) = explode(":",$jam_masuk);
  $dtAwal = mktime($h,$m,$s,"1","1","1");
  list($h,$m,$s) = explode(":",$jam_keluar);
  $dtAkhir = mktime($h,$m,$s,"1","1","1");
  
  $dtSelisih = $dtAkhir-$dtAwal;
  $totalmenit=$dtSelisih/60;
  $jam =explode(".",$totalmenit/60);
  $sisamenit=($totalmenit/60)-$jam[0];

  $sisamenit2=$sisamenit*60;
  $jml_jam=$jam[0];
  return abs($jml_jam)." jam - ".abs($sisamenit2)." menit";
}

function insertselisih($jam_masuk, $jam_keluar){

  list($h,$m,$s) = explode(":",$jam_masuk);
  $dtAwal = mktime($h,$m,$s,"1","1","1");
  list($h,$m,$s) = explode(":",$jam_keluar);
  $dtAkhir = mktime($h,$m,$s,"1","1","1");
  
  $dtSelisih = $dtAkhir-$dtAwal;
  $totalmenit=$dtSelisih/60;
  $jam =explode(".",$totalmenit/60);
  $sisamenit=($totalmenit/60)-$jam[0];

  $sisamenit2=$sisamenit*60;
  $jml_jam=$jam[0];
  return abs($jml_jam).":00".abs($sisamenit2).":00";
}

function getJam($jam_masuk, $jam_keluar){

  list($h,$m,$s) = explode(":",$jam_masuk);
  $dtAwal = mktime($h,$m,$s,"1","1","1");
  list($h,$m,$s) = explode(":",$jam_keluar);
  $dtAkhir = mktime($h,$m,$s,"1","1","1");
  $dtSelisih = $dtAkhir-$dtAwal;
  $totalmenit=$dtSelisih/60;
  $jam =explode(".",$totalmenit/60);
  $sisamenit=($totalmenit/60)-$jam[0];

  $sisamenit2=$sisamenit*60;
  $jml_jam=$jam[0];
  return abs($jml_jam);
}

 ?>
