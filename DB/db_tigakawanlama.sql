-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 23, 2019 at 07:00 AM
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

-- --------------------------------------------------------

--
-- Table structure for table `t_administrator`
--

CREATE TABLE `t_administrator` (
  `kode_admin` varchar(10) NOT NULL,
  `email` varchar(30) NOT NULL,
  `nama_depan` varchar(10) NOT NULL,
  `nama_belakang` varchar(10) NOT NULL,
  `password` varchar(10) NOT NULL,
  `akses` varchar(5) NOT NULL,
  `login_terakhir` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `t_administrator`
--

INSERT INTO `t_administrator` (`kode_admin`, `email`, `nama_depan`, `nama_belakang`, `password`, `akses`, `login_terakhir`) VALUES
('kd001', 'admin@tigakawanlama.com', 'Susanto', 'Hirawan', '1234', 'admin', '2019-06-22 15:38:03'),
('kd002', 'owner@tigakawanlama.com', 'heru', 'owner', '1234', 'owner', '2019-06-22 15:43:20');

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

-- --------------------------------------------------------

--
-- Table structure for table `t_gaji`
--

CREATE TABLE `t_gaji` (
  `kode_jabatan` varchar(10) NOT NULL,
  `nama_jabatan` varchar(20) NOT NULL,
  `gaji` int(11) NOT NULL,
  `potongan` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `t_gaji`
--

INSERT INTO `t_gaji` (`kode_jabatan`, `nama_jabatan`, `gaji`, `potongan`) VALUES
('kd_id_001', 'operational', 5000000, 10000),
('kd_id_002', 'marketing', 6000000, 15000),
('kd_id_003', 'admin', 6500000, 20000);

-- --------------------------------------------------------

--
-- Table structure for table `t_gaji_karyawan`
--

CREATE TABLE `t_gaji_karyawan` (
  `id_penggajian` int(11) NOT NULL,
  `id_absensi` varchar(15) NOT NULL,
  `total_gaji` int(11) NOT NULL,
  `potongan` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `t_karyawan`
--

CREATE TABLE `t_karyawan` (
  `nik` varchar(15) NOT NULL,
  `email` varchar(25) NOT NULL,
  `password` varchar(10) NOT NULL,
  `nama_depan` varchar(10) NOT NULL,
  `nama_belakang` varchar(10) NOT NULL,
  `alamat` text NOT NULL,
  `tgl_lahir` date NOT NULL,
  `tgl_gabung` date NOT NULL,
  `no_telp` varchar(12) NOT NULL,
  `agama` varchar(11) NOT NULL,
  `jk` enum('','P','L') NOT NULL,
  `no_rekening` varchar(20) NOT NULL,
  `nama_bank` varchar(10) NOT NULL,
  `atas_nama` varchar(10) NOT NULL,
  `kode_jabatan` varchar(10) NOT NULL,
  `login_terakhir` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `t_karyawan`
--

INSERT INTO `t_karyawan` (`nik`, `email`, `password`, `nama_depan`, `nama_belakang`, `alamat`, `tgl_lahir`, `tgl_gabung`, `no_telp`, `agama`, `jk`, `no_rekening`, `nama_bank`, `atas_nama`, `kode_jabatan`, `login_terakhir`) VALUES
('5464746474', 'fahmi@gmail.co', '12345', 'fahmi', 'fahreza', 'jakarta', '2019-06-18', '2019-06-18', '081317726873', 'islam', 'L', '973298372732873', 'MANDIRI', 'Fahmi', 'kd_id_001', '0000-00-00 00:00:00'),
('6870702111', 'Eko@gmail.com', '12345', 'Eko', 'Prasetyo', 'Jakarta', '2019-06-18', '2019-06-18', '081317726873', 'islam', 'L', '823478327482374', 'BNI', 'eko ', 'kd_id_001', '0000-00-00 00:00:00'),
('7201145423', 'athifah@gmail.com', '12345', 'Athifah', 'Alkhawaris', 'bekasi', '2019-06-25', '2019-06-28', '08131772874', '0', 'P', '081317722872', 'MANDIRI', 'Wahyu Alfa', 'kd_id_001', '0000-00-00 00:00:00'),
('7201160110', 'Raisa@gmail.com', '12345', 'Raisa ', 'Sarasvati', 'Bandung', '2019-12-31', '2018-12-31', '081317726873', 'Islam', 'L', '081827368346837', 'MANDIRI', 'Isyana Sar', 'kd_id_003', '0000-00-00 00:00:00'),
('7201160111', 'wahyualfarisi30@gmail.com', '12345', 'wahyu', 'alfarisi', 'Jakarta , Indonesia', '2010-08-25', '2014-10-29', '081317726873', 'Islam', 'L', '367463724623874', 'BCA', 'Wahyu Alfa', 'kd_id_003', '2019-06-22 15:38:38'),
('7291119171', 'gogo@gmail.com', '12345', 'gogo', 'junior', 'Jakarta', '2019-06-11', '2019-06-27', '081317726873', 'Islam', 'L', '327847823478237', 'BRI', 'Wahyu Alfa', 'kd_id_002', '0000-00-00 00:00:00'),
('7501127262', 'isyana@gmail.com', '12345', 'Isyana', 'Sarasvati', 'Jakarta', '2019-12-31', '2019-12-31', '081317726873', 'Islam', 'L', '083763763763763', 'BRI', 'Isyana Sar', 'kd_id_001', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `t_penggajian`
--

CREATE TABLE `t_penggajian` (
  `tgl_penggajian` date NOT NULL,
  `status_penggajian` enum('','process','approved','waiting') NOT NULL,
  `kode_admin` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
-- Indexes for table `t_administrator`
--
ALTER TABLE `t_administrator`
  ADD PRIMARY KEY (`kode_admin`);

--
-- Indexes for table `t_detail_absensi`
--
ALTER TABLE `t_detail_absensi`
  ADD KEY `id_absensi` (`id_absensi`);

--
-- Indexes for table `t_gaji`
--
ALTER TABLE `t_gaji`
  ADD PRIMARY KEY (`kode_jabatan`);

--
-- Indexes for table `t_gaji_karyawan`
--
ALTER TABLE `t_gaji_karyawan`
  ADD PRIMARY KEY (`id_penggajian`),
  ADD KEY `nik` (`id_absensi`);

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
  ADD CONSTRAINT `t_karyawan_ibfk_1` FOREIGN KEY (`kode_jabatan`) REFERENCES `t_gaji` (`kode_jabatan`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `t_penggajian`
--
ALTER TABLE `t_penggajian`
  ADD CONSTRAINT `t_penggajian_ibfk_1` FOREIGN KEY (`kode_admin`) REFERENCES `t_administrator` (`kode_admin`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
