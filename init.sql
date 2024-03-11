GRANT ALL PRIVILEGES ON * . * TO 'new'@'%';
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";



CREATE TABLE `customer` (
  `idcus` int(3) NOT NULL,
  `name` varchar(255) NOT NULL,
  `idmenu` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



INSERT INTO `customer` (`idcus`, `name`, `idmenu`) VALUES
(108, 'film', 103),
(109, 'new', 103);



CREATE TABLE `menu` (
  `idmenu` int(3) NOT NULL,
  `namemunu` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



INSERT INTO `menu` (`idmenu`, `namemunu`) VALUES
(101, 'Tom Yum Goong'),
(102, 'Ice Cream'),
(103, 'Fired egg'),
(104, 'Water');


ALTER TABLE `customer`
  ADD PRIMARY KEY (`idcus`),
  ADD KEY `idmenu` (`idmenu`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`idmenu`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `idcus` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`idmenu`) REFERENCES `menu` (`idmenu`);
COMMIT;

