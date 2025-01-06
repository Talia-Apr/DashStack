-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 06 Jan 2025 pada 12.54
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dashstack`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `customers`
--

INSERT INTO `customers` (`id`, `code`, `name`, `phone`, `email`, `address`, `city`, `country`, `createdAt`, `updatedAt`) VALUES
(5, 'CS_001', 'Siti Nurhaliza', '0876543210', 'siti@gmail.com', 'Jl. Braga No.5', 'Bandung', 'Indonesia', '2025-01-04 14:23:54', '2025-01-04 14:23:54'),
(6, 'CS_002', 'Gina Maulinda', '0893847829', 'gina@gmail.com', 'Jl. Tunjungan No.10', 'Surabaya', 'Indonesia', '2025-01-04 14:24:44', '2025-01-04 14:24:44'),
(7, 'CS_003', 'Ahmad Fikri', '08123456789', 'fikri@gmail.com', 'Jl. Sudirman No.25', 'Jakarta', 'Indonesia', '2025-01-04 14:25:45', '2025-01-04 14:25:45');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sessions`
--

CREATE TABLE `sessions` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `sessions`
--

INSERT INTO `sessions` (`sid`, `expires`, `data`, `createdAt`, `updatedAt`) VALUES
('-koa5R8vIzjRVGs5Vd18TeH_4NYGfc57', '2025-01-05 18:03:12', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-04 18:03:12', '2025-01-04 18:03:12'),
('-stJPIJqzEpiyvFOus_5tgFxmFQeIQW6', '2025-01-07 17:59:06', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-06 17:59:06', '2025-01-06 17:59:06'),
('03Wv1oHSX1JTPCf78rpV_1RyAglXRgoA', '2025-01-07 18:05:39', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":13}', '2025-01-06 18:04:46', '2025-01-06 18:05:39'),
('0W8V4CIh2A5RdpRG_O7xMZvJRlIe-thp', '2025-01-06 14:29:29', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-05 14:29:29', '2025-01-05 14:29:29'),
('1rwRImW6wqtwlfK1DwvZgktirpXImA-j', '2025-01-06 14:47:29', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-05 14:47:29', '2025-01-05 14:47:29'),
('3Yy9pPf1VpCpInKUClSHRU42C2f5BH9G', '2025-01-06 14:20:44', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-05 14:20:44', '2025-01-05 14:20:44'),
('41YDv7JyQSxi77X8L1V4zu4LrvbYx_Oi', '2025-01-05 17:55:54', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-04 17:55:54', '2025-01-04 17:55:54'),
('4wxRsywv7Ya0fcht_4HatVKmWfcYMv-J', '2025-01-06 14:30:03', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-05 14:30:03', '2025-01-05 14:30:03'),
('6H3FLVeDzrJe67CMHXnmPrKkbLiADgnk', '2025-01-06 14:29:29', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-05 14:29:29', '2025-01-05 14:29:29'),
('6NCNq5EE0H4mHOirMvnDpfuclj8ycWBu', '2025-01-06 14:31:07', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-05 14:31:07', '2025-01-05 14:31:07'),
('6SRlwxEzD57Dl1w_mZoP7UxRuuyPN6OV', '2025-01-05 18:02:36', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-04 18:02:36', '2025-01-04 18:02:36'),
('77j6op9MjXvuZKPPOhSiEY7qPPe_jm8U', '2025-01-06 14:06:45', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-05 14:06:45', '2025-01-05 14:06:45'),
('7c7pSxMbGzEphVOuMCq-Krv6dxWJmg-D', '2025-01-06 16:08:50', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-05 16:08:50', '2025-01-05 16:08:50'),
('7ZK_hWntXGUrbvz39c_5gXR3kf6Uicnu', '2025-01-07 18:05:21', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-06 18:05:21', '2025-01-06 18:05:21'),
('8B7h16qSqScrwNuUgC8gd870YVXJdcPO', '2025-01-06 14:46:39', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-05 14:46:39', '2025-01-05 14:46:39'),
('8xu_IuV1bZnG-EujunbQyG7WBn2WgTCh', '2025-01-06 14:30:15', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-05 14:30:15', '2025-01-05 14:30:15'),
('8yCdMFutSdyYcQ9y0LVn2RLhpdhTJD57', '2025-01-05 17:54:58', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-04 17:54:58', '2025-01-04 17:54:58'),
('agcReYfyAcg5PEDgCPviuiQj8B98dyTZ', '2025-01-07 18:00:41', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-06 18:00:41', '2025-01-06 18:00:41'),
('aHvyym8q0TIzJz-rVS6BCpcHnxoWOg3j', '2025-01-07 17:59:45', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-06 17:59:45', '2025-01-06 17:59:45'),
('Alp99hL_eJLTcPXYJu_m75uh1NKkoHsN', '2025-01-06 14:21:09', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-05 14:21:09', '2025-01-05 14:21:09'),
('a_dvTo_p-8YZAMzW6NpqIujz9FxQaxRo', '2025-01-07 18:00:34', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-06 18:00:34', '2025-01-06 18:00:34'),
('BDM_6iNljSS339TdvNCcPU_RQBjdBUCD', '2025-01-05 17:54:58', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-04 17:54:58', '2025-01-04 17:54:58'),
('C4Ev9N6NzTjrW3Ih62gVqyAPcryouRRI', '2025-01-05 17:32:35', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-04 17:32:35', '2025-01-04 17:32:35'),
('cB1bSDUb8orVWGk5jXiDbxNHNnJXHIR5', '2025-01-07 18:04:46', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-06 18:04:46', '2025-01-06 18:04:46'),
('cZjMJQCHZTDFAneoTZIusYUURCTzKPw5', '2025-01-06 14:31:06', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-05 14:31:06', '2025-01-05 14:31:06'),
('dD1Xg2hrOZnIrFokDzKIQqXcYH5bAFmu', '2025-01-07 18:05:01', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-06 18:05:01', '2025-01-06 18:05:01'),
('DxdT7jLLFb3PCfsqqorGOUQg5zs1AzYZ', '2025-01-07 18:04:47', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-06 18:04:47', '2025-01-06 18:04:47'),
('EhDc23O-JMXej46QBnapoM7O3dyXti5K', '2025-01-06 14:48:24', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-05 14:48:24', '2025-01-05 14:48:24'),
('ez_ySwwrwWaffITkvBN6wo6unDobLSu8', '2025-01-05 18:02:39', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-04 18:02:39', '2025-01-04 18:02:39'),
('f7MTHasL3G-ESRIELopV1kLH8W9spbdh', '2025-01-07 18:05:31', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-06 18:05:31', '2025-01-06 18:05:31'),
('F7QFcAwWnavEi2ob6so8cpZ82Y7Y0Vy1', '2025-01-06 14:19:53', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-05 14:19:53', '2025-01-05 14:19:53'),
('FQu-sYEBZWOUKspA2oMDUvhIwjWkOrfE', '2025-01-05 17:32:40', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-04 17:32:40', '2025-01-04 17:32:40'),
('fUDtplYiZPsKUMru9Wuwr3QaMY6P6lNC', '2025-01-06 14:00:00', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-05 14:00:01', '2025-01-05 14:00:01'),
('g8h1JGK6KxOvJSUahtN3gX6lAmULpWHb', '2025-01-06 14:31:07', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-05 14:31:07', '2025-01-05 14:31:07'),
('gH6aRkBRGt3TvZzz4JD_2BwmXqX7YJ2L', '2025-01-07 18:05:01', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-06 18:05:01', '2025-01-06 18:05:01'),
('gLFYZRQFFwcksyeuBM4J6J3zFWg9T2zB', '2025-01-06 14:29:57', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-05 14:29:57', '2025-01-05 14:29:57'),
('HVLRZ3m94M1uxBCzl5Z_rwFl8uH6TQ6E', '2025-01-06 14:46:40', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-05 14:46:40', '2025-01-05 14:46:40'),
('IcRz9_J5sq0zY5MfyVEHeqjG3jVrwqVv', '2025-01-05 18:03:12', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-04 18:03:12', '2025-01-04 18:03:12'),
('iS3xfNRO78Zu6DKguhRU7PeLjUVWfKjI', '2025-01-05 17:55:02', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-04 17:55:02', '2025-01-04 17:55:02'),
('JRtMQiXNQkvwVHkM0kKwpP850kolD9RZ', '2025-01-06 14:47:30', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-05 14:47:30', '2025-01-05 14:47:30'),
('KiI-XM5YI6R6_O7_O6INyvZGoBQUWHug', '2025-01-07 18:05:01', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-06 18:05:01', '2025-01-06 18:05:01'),
('LCGHSJwEjKgRHpolTF6JhHFSspazy2Jo', '2025-01-06 14:44:51', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-05 14:44:51', '2025-01-05 14:44:51'),
('myEYweDEfF2o78iIQs5bW5-oRK2ettIR', '2025-01-05 17:59:10', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-04 17:59:10', '2025-01-04 17:59:10'),
('mZbiWICvfumDvzRhmIJIwaZgRFNh7kTa', '2025-01-05 17:54:58', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-04 17:54:58', '2025-01-04 17:54:58'),
('n0EL7oRtn7e0xQJH3gaVgPIKglM-E5-5', '2025-01-07 18:00:42', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-06 18:00:42', '2025-01-06 18:00:42'),
('NIjzMT051JgAQ2XdK88pYm1DOfPqVesY', '2025-01-05 17:55:54', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-04 17:55:55', '2025-01-04 17:55:55'),
('ociVZb_1cykyum7t0znn4bhJc9T0Gp58', '2025-01-06 14:30:03', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-05 14:30:03', '2025-01-05 14:30:03'),
('Pofc7bHBCTBIXdO6Gx2FsLRvIAQljU9f', '2025-01-06 16:08:47', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-05 16:08:47', '2025-01-05 16:08:47'),
('puvUZhOLSDzAGJcBDUVmfoa5JZhQhb8k', '2025-01-07 18:05:39', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-06 18:05:39', '2025-01-06 18:05:39'),
('QHFVWP5XlvtbUDD5d9Tcmh_Nxzt3Inly', '2025-01-06 14:20:17', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-05 14:20:17', '2025-01-05 14:20:17'),
('QpFseD8_TBkqAxbtvDiarpi6dzBlMVLc', '2025-01-06 14:44:52', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-05 14:44:52', '2025-01-05 14:44:52'),
('rAAJeddQjcB1Vx2PP3YdqvvrHxZMOs6q', '2025-01-07 17:59:05', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-06 17:59:05', '2025-01-06 17:59:05'),
('sEjDRrq_EO2VQbNmifG5Dg_Wo6pQMK-y', '2025-01-07 18:00:45', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-06 18:00:45', '2025-01-06 18:00:45'),
('SfI-LHMYDloLFyryRhD-erx-NvTCc9XC', '2025-01-06 14:48:23', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-05 14:48:23', '2025-01-05 14:48:23'),
('T3q7lwfPR3C-vpjYMEF8zfCdsPYrfU5k', '2025-01-07 17:59:33', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-06 17:59:33', '2025-01-06 17:59:33'),
('TuAqJE-kNcEanV4D8bI5HkWutSPxodZD', '2025-01-06 14:29:58', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-05 14:29:58', '2025-01-05 14:29:58'),
('u3u0LBdxaeBXBwGhZsLdcfQYD-6uvTkO', '2025-01-05 17:32:34', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-04 17:32:34', '2025-01-04 17:32:34'),
('Uha_q1MS44Bi0m9DW325Ejq4UxrFXDJq', '2025-01-06 14:30:11', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-05 14:30:11', '2025-01-05 14:30:11'),
('VfjrG2NL2PelTxNsUy8UxXz2Qp_Qp8vI', '2025-01-05 18:02:35', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-04 18:02:35', '2025-01-04 18:02:35'),
('wnB7MGeeshonHZ2A2s95sM7znI6xr9Nw', '2025-01-06 14:30:03', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-05 14:30:03', '2025-01-05 14:30:03'),
('wUembq2bUC1RoUkMeGXXo_q8zSc46IUi', '2025-01-05 17:59:15', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-04 17:59:15', '2025-01-04 17:59:15'),
('x7e_VdbFpnWMaLRxCCZNJ_pNN5F-S7a7', '2025-01-05 17:59:09', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-04 17:59:09', '2025-01-04 17:59:09'),
('zByifpLdt_8cJ8DgWIfYVREbIQR6_MnJ', '2025-01-05 17:55:54', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-04 17:55:54', '2025-01-04 17:55:54'),
('zD5tA75jssWv0J-WOh_GnxTCScK8C26d', '2025-01-05 18:03:11', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-04 18:03:11', '2025-01-04 18:03:11'),
('ZezTAEeZpvdIxrUV8wNVmtFsJckwTQ9_', '2025-01-06 16:08:46', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-05 16:08:46', '2025-01-05 16:08:46'),
('ztATJekmW7Q22LWc0ZYMkm2rA5mDlq0W', '2025-01-06 14:04:21', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2025-01-05 14:04:21', '2025-01-05 14:04:21');

-- --------------------------------------------------------

--
-- Struktur dari tabel `suppliers`
--

CREATE TABLE `suppliers` (
  `id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `suppliers`
--

INSERT INTO `suppliers` (`id`, `code`, `name`, `phone`, `email`, `address`, `city`, `country`, `createdAt`, `updatedAt`) VALUES
(3, 'SP_001', 'PT XYZ', '0849382993', 'xyz@gmail.com', 'Jl. Braga No.5', 'Bandung', 'Indonesia', '2025-01-04 14:23:23', '2025-01-04 14:23:23');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `profilImg` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `refresh_token` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `phone`, `profilImg`, `email`, `password`, `role`, `status`, `refresh_token`, `createdAt`, `updatedAt`) VALUES
(13, 'Talia Aprianti', '0859389201839', 'uploads/profil.jpeg', 'taliaaprianti46@gmail.com', '$2b$10$MWoL8cui84f4/7DwuPAfWuq3tKKTr6oOIBzh/21MMsxKtxeemTA..', 'Admin', 'Active', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzLCJuYW1lIjoiVGFsaWEgQXByaWFudGkiLCJwaG9uZSI6IjA4NTkzODkyMDE4MzkiLCJwcm9maWxJbWciOiJ1cGxvYWRzL3Byb2ZpbC5qcGVnIiwiZW1haWwiOiJ0YWxpYWFwcmlhbnRpNDZAZ21haWwuY29tIiwicm9sZSI6IkFkbWluIiwic3RhdHVzIjoiQWN0aXZlIiwiaWF0IjoxNzM2MTYxNDg2LCJleHAiOjE3MzYyNDc4ODZ9.OvIbOjqQ3lEMAc8EVxzA5OVT_WaRb2y4LcsiRwmR3Eo', '2025-01-03 08:16:55', '2025-01-06 18:04:46'),
(18, 'Kasir Dashstack', '0859389201839', 'uploads/profil.jpeg', 'kasir@gmail.com', '$2b$10$xZIT71u26BQP1wFHhSoCTOyCmtDtO8b1sOi9cSGz7h2oQS6AGxaPK', 'Kasir', 'Active', NULL, '2025-01-03 10:00:14', '2025-01-05 16:08:50'),
(20, 'Admin Dashstack', '0859389201839', 'uploads/profil.jpeg', 'admin@gmail.com', '$2b$10$DiIKS6dl67xdKRvLfW/lQu3ru0FEH/EAsgufskQGeoRFuzz2cG7QW', 'Admin', 'Non Active', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIwLCJuYW1lIjoiQWRtaW4gRGFzaHN0YWNrIiwicGhvbmUiOiIwODM4NDk3Mjc0NDkiLCJwcm9maWxJbWciOiJ1cGxvYWRzL3Byb2ZpbC5qcGVnIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiQWRtaW4iLCJzdGF0dXMiOiJBY3RpdmUiLCJpYXQiOjE3MzU5ODg1OTEsImV4cCI6MTczNjA3NDk5MX0.L9Bm-XtbtC4Hb2g-eHDGWl7IP_0_r-TvJ_qmkfvZgYM', '2025-01-03 19:01:16', '2025-01-04 18:03:11'),
(21, 'Manager Dashstack', '0859389201839', 'uploads/profil.jpeg', 'manager@gmail.com', '$2b$10$5Snih2dbstbpSU3Hjc8.4eRIK6TXfb9GwPAJm7vULhW4rK40y4IP.', 'Manager', 'Active', NULL, '2025-01-03 19:11:44', '2025-01-03 19:18:47');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`sid`);

--
-- Indeks untuk tabel `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
