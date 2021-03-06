-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 26, 2019 at 12:38 PM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 5.6.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_tigakawanlama`
--

-- --------------------------------------------------------

--
-- Table structure for table `t_absensi`
--

CREATE TABLE `t_absensi` (
  `id_absensi` varchar(15) NOT NULL,
  `nik` varchar(10) NOT NULL,
  `tanggal_import` date NOT NULL,
  `status` varchar(10) NOT NULL,
  `tgl_penggajian` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `t_absensi`
--

INSERT INTO `t_absensi` (`id_absensi`, `nik`, `tanggal_import`, `status`, `tgl_penggajian`) VALUES
('ab-001', '6870702111', '2019-07-23', 'success', '2019-08-24'),
('ab-004', '7201160111', '2019-07-23', 'success', '2019-08-24'),
('ab-005', '6870702111', '2019-07-23', 'success', '2019-09-25'),
('ab-008', '6870702111', '2019-07-26', 'success', '2019-07-26'),
('ab-011', '7201160111', '2019-07-26', 'success', '2019-07-26');

-- --------------------------------------------------------

--
-- Table structure for table `t_admin`
--

CREATE TABLE `t_admin` (
  `kode_admin` varchar(6) NOT NULL,
  `email` varchar(30) NOT NULL,
  `nama_depan` varchar(20) NOT NULL,
  `nama_belakang` varchar(20) NOT NULL,
  `password` varchar(10) NOT NULL,
  `akses` varchar(5) NOT NULL,
  `login_terakhir` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `t_admin`
--

INSERT INTO `t_admin` (`kode_admin`, `email`, `nama_depan`, `nama_belakang`, `password`, `akses`, `login_terakhir`) VALUES
('adm001', 'admin@tigakawanlama.com', 'hery', 'yanto', '1234', 'admin', '2019-07-26 14:20:24'),
('adm002', 'owner@gmail.com', 'wahyu', 'alfarisi', '1234', 'OWNER', '2019-07-26 12:59:42'),
('adm003', 'gio@tigakawanlama.com', 'gio', 'stevani', '1234', 'ADMIN', '2019-07-23 20:41:00');

-- --------------------------------------------------------

--
-- Table structure for table `t_detail_absensi`
--

CREATE TABLE `t_detail_absensi` (
  `id_absensi` varchar(15) NOT NULL,
  `tgl_absen` date NOT NULL,
  `jam_masuk` time NOT NULL,
  `jam_keluar` time NOT NULL,
  `scan_masuk` time NOT NULL,
  `scan_keluar` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `t_detail_absensi`
--

INSERT INTO `t_detail_absensi` (`id_absensi`, `tgl_absen`, `jam_masuk`, `jam_keluar`, `scan_masuk`, `scan_keluar`) VALUES
('ab-001', '2019-06-01', '08:00:00', '17:00:00', '12:00:00', '17:00:00'),
('ab-001', '2019-06-02', '08:00:00', '17:00:00', '10:00:00', '17:00:00'),
('ab-001', '2019-06-03', '08:00:00', '17:00:00', '09:20:00', '17:00:00'),
('ab-001', '2019-06-04', '08:00:00', '17:00:00', '08:40:00', '17:00:00'),
('ab-001', '2019-06-05', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-001', '2019-06-06', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-001', '2019-06-07', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-001', '2019-06-08', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-001', '2019-06-09', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-001', '2019-06-10', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-001', '2019-06-11', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-001', '2019-06-12', '08:00:00', '17:00:00', '06:00:00', '17:00:00'),
('ab-001', '2019-06-13', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-001', '2019-06-14', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-001', '2019-06-15', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-001', '2019-06-16', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-001', '2019-06-17', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-001', '2019-06-18', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-001', '2019-06-19', '08:00:00', '17:00:00', '08:00:00', '19:00:00'),
('ab-001', '2019-06-20', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-001', '2019-06-21', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-001', '2019-06-22', '08:00:00', '17:00:00', '07:26:00', '17:00:00'),
('ab-001', '2019-06-23', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-004', '2019-06-01', '08:00:00', '17:00:00', '12:00:00', '17:00:00'),
('ab-004', '2019-06-02', '08:00:00', '17:00:00', '10:00:00', '17:00:00'),
('ab-004', '2019-06-03', '08:00:00', '17:00:00', '09:20:00', '17:00:00'),
('ab-004', '2019-06-04', '08:00:00', '17:00:00', '08:40:00', '17:00:00'),
('ab-004', '2019-06-05', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-004', '2019-06-06', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-004', '2019-06-07', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-004', '2019-06-08', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-004', '2019-06-09', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-004', '2019-06-10', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-004', '2019-06-11', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-004', '2019-06-12', '08:00:00', '17:00:00', '06:00:00', '17:00:00'),
('ab-004', '2019-06-13', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-004', '2019-06-14', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-004', '2019-06-15', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-004', '2019-06-16', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-004', '2019-06-17', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-004', '2019-06-18', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-004', '2019-06-19', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-004', '2019-06-20', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-004', '2019-06-21', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-004', '2019-06-22', '08:00:00', '17:00:00', '07:26:00', '17:00:00'),
('ab-004', '2019-06-23', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-005', '2019-06-01', '08:00:00', '17:00:00', '12:00:00', '17:00:00'),
('ab-005', '2019-06-02', '08:00:00', '17:00:00', '10:00:00', '17:00:00'),
('ab-005', '2019-06-03', '08:00:00', '17:00:00', '09:20:00', '17:00:00'),
('ab-005', '2019-06-04', '08:00:00', '17:00:00', '08:40:00', '17:00:00'),
('ab-005', '2019-06-05', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-005', '2019-06-06', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-005', '2019-06-07', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-005', '2019-06-08', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-005', '2019-06-09', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-005', '2019-06-10', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-005', '2019-06-11', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-005', '2019-06-12', '08:00:00', '17:00:00', '06:00:00', '17:00:00'),
('ab-005', '2019-06-13', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-005', '2019-06-14', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-005', '2019-06-15', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-005', '2019-06-16', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-005', '2019-06-17', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-005', '2019-06-18', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-005', '2019-06-19', '08:00:00', '17:00:00', '08:00:00', '19:00:00'),
('ab-005', '2019-06-20', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-005', '2019-06-21', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-005', '2019-06-22', '08:00:00', '17:00:00', '07:26:00', '17:00:00'),
('ab-005', '2019-06-23', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-008', '2019-06-01', '08:00:00', '17:00:00', '12:00:00', '17:00:00'),
('ab-008', '2019-06-02', '08:00:00', '17:00:00', '10:00:00', '17:00:00'),
('ab-008', '2019-06-03', '08:00:00', '17:00:00', '09:20:00', '17:00:00'),
('ab-008', '2019-06-04', '08:00:00', '17:00:00', '08:40:00', '17:00:00'),
('ab-008', '2019-06-05', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-008', '2019-06-06', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-008', '2019-06-07', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-008', '2019-06-08', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-008', '2019-06-09', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-008', '2019-06-10', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-008', '2019-06-11', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-008', '2019-06-12', '08:00:00', '17:00:00', '06:00:00', '17:00:00'),
('ab-008', '2019-06-13', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-008', '2019-06-14', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-008', '2019-06-15', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-008', '2019-06-16', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-008', '2019-06-17', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-008', '2019-06-18', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-008', '2019-06-19', '08:00:00', '17:00:00', '08:00:00', '19:00:00'),
('ab-008', '2019-06-20', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-008', '2019-06-21', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-008', '2019-06-22', '08:00:00', '17:00:00', '07:26:00', '17:00:00'),
('ab-008', '2019-06-23', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-011', '2019-06-01', '08:00:00', '17:00:00', '12:00:00', '17:00:00'),
('ab-011', '2019-06-02', '08:00:00', '17:00:00', '10:00:00', '17:00:00'),
('ab-011', '2019-06-03', '08:00:00', '17:00:00', '09:20:00', '17:00:00'),
('ab-011', '2019-06-04', '08:00:00', '17:00:00', '08:40:00', '17:00:00'),
('ab-011', '2019-06-05', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-011', '2019-06-06', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-011', '2019-06-07', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-011', '2019-06-08', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-011', '2019-06-09', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-011', '2019-06-10', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-011', '2019-06-11', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-011', '2019-06-12', '08:00:00', '17:00:00', '06:00:00', '17:00:00'),
('ab-011', '2019-06-13', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-011', '2019-06-14', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-011', '2019-06-15', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-011', '2019-06-16', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-011', '2019-06-17', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-011', '2019-06-18', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-011', '2019-06-19', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-011', '2019-06-20', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-011', '2019-06-21', '08:00:00', '17:00:00', '08:00:00', '17:00:00'),
('ab-011', '2019-06-22', '08:00:00', '17:00:00', '07:26:00', '17:00:00'),
('ab-011', '2019-06-23', '08:00:00', '17:00:00', '08:00:00', '17:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `t_gaji_karyawan`
--

CREATE TABLE `t_gaji_karyawan` (
  `id_penggajian` int(4) NOT NULL,
  `id_absensi` varchar(15) NOT NULL,
  `total_gaji` int(8) NOT NULL,
  `potongan` int(8) NOT NULL,
  `total_lemburan` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `t_gaji_karyawan`
--

INSERT INTO `t_gaji_karyawan` (`id_penggajian`, `id_absensi`, `total_gaji`, `potongan`, `total_lemburan`) VALUES
(4050, 'ab-005', 6340000, 280000, 120000),
(9899, 'ab-004', 5290000, 210000, 0),
(10954, 'ab-001', 6340000, 280000, 120000),
(12573, 'ab-011', 5290000, 210000, 0),
(18890, 'ab-008', 6340000, 280000, 120000);

-- --------------------------------------------------------

--
-- Table structure for table `t_jabatan`
--

CREATE TABLE `t_jabatan` (
  `kode_jabatan` varchar(10) NOT NULL,
  `nama_jabatan` varchar(20) NOT NULL,
  `gaji` int(8) NOT NULL,
  `potongan` int(8) NOT NULL,
  `lemburan` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `t_jabatan`
--

INSERT INTO `t_jabatan` (`kode_jabatan`, `nama_jabatan`, `gaji`, `potongan`, `lemburan`) VALUES
('kd_001', 'ADMIN', 5500000, 30000, 26000),
('kd_002', 'TEKNISI', 4500000, 14000, 20000),
('kd_003', 'MARKETING', 6500000, 40000, 60000);

-- --------------------------------------------------------

--
-- Table structure for table `t_karyawan`
--

CREATE TABLE `t_karyawan` (
  `nik` varchar(10) NOT NULL,
  `email` varchar(25) NOT NULL,
  `password` varchar(10) NOT NULL,
  `nama_depan` varchar(20) NOT NULL,
  `nama_belakang` varchar(20) NOT NULL,
  `alamat` text NOT NULL,
  `tgl_lahir` date NOT NULL,
  `tgl_gabung` date NOT NULL,
  `no_telp` varchar(12) NOT NULL,
  `agama` varchar(11) NOT NULL,
  `jk` enum('','P','L') NOT NULL,
  `no_rekening` varchar(20) NOT NULL,
  `nama_bank` varchar(10) NOT NULL,
  `atas_nama` varchar(40) NOT NULL,
  `kode_jabatan` varchar(10) NOT NULL,
  `login_terakhir` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `t_karyawan`
--

INSERT INTO `t_karyawan` (`nik`, `email`, `password`, `nama_depan`, `nama_belakang`, `alamat`, `tgl_lahir`, `tgl_gabung`, `no_telp`, `agama`, `jk`, `no_rekening`, `nama_bank`, `atas_nama`, `kode_jabatan`, `login_terakhir`) VALUES
('6870702111', 'Eko@gmail.com', '12345', 'Eko', 'Prasetyo', 'Jakarta', '2019-07-03', '2019-07-20', '081317726873', 'ISLAM', 'L', '678767668', 'BCA', 'eko praset', 'kd_003', '0000-00-00 00:00:00'),
('7201160111', 'wahyualfarisi30@gmail.com', '12345', 'Wahyu', 'Alfarisi', 'Jakarta', '2019-07-19', '2019-07-19', '081317726873', 'ISLAM', 'L', '6879797877', 'BCA', 'Wahyu Alfa', 'kd_001', '2019-07-26 16:01:31');

-- --------------------------------------------------------

--
-- Table structure for table `t_penggajian`
--

CREATE TABLE `t_penggajian` (
  `tgl_penggajian` date NOT NULL,
  `status_penggajian` enum('','process','approved','waiting') NOT NULL,
  `kode_admin` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `t_penggajian`
--

INSERT INTO `t_penggajian` (`tgl_penggajian`, `status_penggajian`, `kode_admin`) VALUES
('2019-07-26', 'approved', 'adm001'),
('2019-08-24', 'approved', 'adm001'),
('2019-09-25', 'approved', 'adm001');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `t_absensi`
--
ALTER TABLE `t_absensi`
  ADD PRIMARY KEY (`id_absensi`),
  ADD KEY `nik` (`nik`),
  ADD KEY `tgl_penggajian` (`tgl_penggajian`);

--
-- Indexes for table `t_admin`
--
ALTER TABLE `t_admin`
  ADD PRIMARY KEY (`kode_admin`);

--
-- Indexes for table `t_detail_absensi`
--
ALTER TABLE `t_detail_absensi`
  ADD KEY `id_absensi` (`id_absensi`);

--
-- Indexes for table `t_gaji_karyawan`
--
ALTER TABLE `t_gaji_karyawan`
  ADD PRIMARY KEY (`id_penggajian`),
  ADD KEY `nik` (`id_absensi`);

--
-- Indexes for table `t_jabatan`
--
ALTER TABLE `t_jabatan`
  ADD PRIMARY KEY (`kode_jabatan`);

--
-- Indexes for table `t_karyawan`
--
ALTER TABLE `t_karyawan`
  ADD PRIMARY KEY (`nik`),
  ADD KEY `kode_jabatan` (`kode_jabatan`);

--
-- Indexes for table `t_penggajian`
--
ALTER TABLE `t_penggajian`
  ADD PRIMARY KEY (`tgl_penggajian`),
  ADD KEY `kode_admin` (`kode_admin`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `t_absensi`
--
ALTER TABLE `t_absensi`
  ADD CONSTRAINT `t_absensi_ibfk_1` FOREIGN KEY (`nik`) REFERENCES `t_karyawan` (`nik`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `t_absensi_ibfk_2` FOREIGN KEY (`tgl_penggajian`) REFERENCES `t_penggajian` (`tgl_penggajian`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `t_detail_absensi`
--
ALTER TABLE `t_detail_absensi`
  ADD CONSTRAINT `t_detail_absensi_ibfk_1` FOREIGN KEY (`id_absensi`) REFERENCES `t_absensi` (`id_absensi`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `t_gaji_karyawan`
--
ALTER TABLE `t_gaji_karyawan`
  ADD CONSTRAINT `t_gaji_karyawan_ibfk_1` FOREIGN KEY (`id_absensi`) REFERENCES `t_absensi` (`id_absensi`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `t_karyawan`
--
ALTER TABLE `t_karyawan`
  ADD CONSTRAINT `t_karyawan_ibfk_1` FOREIGN KEY (`kode_jabatan`) REFERENCES `t_jabatan` (`kode_jabatan`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `t_penggajian`
--
ALTER TABLE `t_penggajian`
  ADD CONSTRAINT `t_penggajian_ibfk_1` FOREIGN KEY (`kode_admin`) REFERENCES `t_admin` (`kode_admin`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
