-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 23, 2023 at 01:11 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `grocery_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_grocery_items`
--

CREATE TABLE `tbl_grocery_items` (
  `item_id` varchar(200) NOT NULL DEFAULT uuid(),
  `name` varchar(200) NOT NULL,
  `qty` int(11) DEFAULT 1,
  `price` decimal(10,2) NOT NULL,
  `grocery_id` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_grocery_items`
--

INSERT INTO `tbl_grocery_items` (`item_id`, `name`, `qty`, `price`, `grocery_id`, `created_at`, `updated_at`) VALUES
('33ab4fff-d184-44b9-95b7-139f255ec272', 'Sardinas', 10, '23.00', '55846726-029d-4786-a8bc-f21b706d254f', '2023-11-22 23:37:37', '2023-11-22 23:37:37');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_grocery_items`
--
ALTER TABLE `tbl_grocery_items`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `grocery_id` (`grocery_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_grocery_items`
--
ALTER TABLE `tbl_grocery_items`
  ADD CONSTRAINT `tbl_grocery_items_ibfk_1` FOREIGN KEY (`grocery_id`) REFERENCES `tbl_groceries` (`grocery_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
