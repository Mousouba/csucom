-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Apr 03, 2019 at 06:01 PM
-- Server version: 5.7.25
-- PHP Version: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `csucom`
--

-- --------------------------------------------------------

--
-- Table structure for table `chambre`
--

CREATE TABLE `chambre` (
  `id` int(11) NOT NULL,
  `libelle` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `chambre`
--

INSERT INTO `chambre` (`id`, `libelle`) VALUES
(1, 'chambre 1'),
(2, 'chambre 2'),
(3, 'chambre 3'),
(4, 'chambre 4'),
(5, 'chambre 5'),
(6, 'chambre 6'),
(10, 'chambre 7'),
(11, 'chambre 8');

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE `client` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `sexe` varchar(50) NOT NULL,
  `birth_date` datetime DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  `assure` int(11) NOT NULL,
  `register_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tag` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`id`, `name`, `firstname`, `sexe`, `birth_date`, `number`, `assure`, `register_date`, `tag`) VALUES
(1, 'FAll', 'LEFA', 'Homme', '2015-08-05 00:00:00', NULL, 0, '2019-03-20 11:28:25', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `compte_medecin`
--

CREATE TABLE `compte_medecin` (
  `id` int(11) NOT NULL,
  `medecin_id` int(11) NOT NULL,
  `money` int(11) NOT NULL,
  `update_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `designation`
--

CREATE TABLE `designation` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `service_id` int(11) NOT NULL,
  `price_U` int(11) DEFAULT NULL,
  `register_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `designation`
--

INSERT INTO `designation` (`id`, `name`, `service_id`, `price_U`, `register_date`) VALUES
(1, 'Du Ventre', 1, 15000, '2019-03-20 11:57:50'),
(2, 'Du pied', 1, 10000, '2019-03-20 11:57:50');

-- --------------------------------------------------------

--
-- Table structure for table `gestionnaire`
--

CREATE TABLE `gestionnaire` (
  `id` int(11) NOT NULL,
  `pseudo` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `rang` int(11) NOT NULL DEFAULT '0',
  `register_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `login_date` datetime DEFAULT NULL,
  `attempt` int(11) NOT NULL DEFAULT '4',
  `etat` int(11) NOT NULL DEFAULT '0',
  `numero` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `gestionnaire`
--

INSERT INTO `gestionnaire` (`id`, `pseudo`, `email`, `pass`, `rang`, `register_date`, `login_date`, `attempt`, `etat`, `numero`) VALUES
(1, 'Icore', 'core.irie@gmail.com', 'cc7b555a56ef4e4dea39c6f376474aa5bcb24232590e85d8db1014a42da78800', 0, '2019-03-20 09:52:22', '2019-04-03 15:12:05', 4, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `lit`
--

CREATE TABLE `lit` (
  `id` int(11) NOT NULL,
  `libelle` varchar(20) NOT NULL,
  `id_chambre` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lit`
--

INSERT INTO `lit` (`id`, `libelle`, `id_chambre`) VALUES
(4, 'lit 4', 1),
(5, 'lit 2', 2),
(6, 'lit 1', 2),
(7, 'lit 3', 1),
(8, 'lit 5', 2),
(9, 'lit 4', 2);

-- --------------------------------------------------------

--
-- Table structure for table `medecin`
--

CREATE TABLE `medecin` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `cni` varchar(200) NOT NULL,
  `number` int(11) NOT NULL,
  `fonction` varchar(255) NOT NULL,
  `specilalite` varchar(200) NOT NULL,
  `habitation` varchar(200) NOT NULL,
  `register_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `medecin`
--

INSERT INTO `medecin` (`id`, `name`, `firstname`, `email`, `cni`, `number`, `fonction`, `specilalite`, `habitation`, `register_date`) VALUES
(1, 'Okou', 'Franck ', 'okou@gmail.com', 'C 0091 2314 7689 1', 48803377, 'Medecin', 'Génécoloque', 'Cocody Angré', '2019-03-20 10:14:38');

-- --------------------------------------------------------

--
-- Table structure for table `observation`
--

CREATE TABLE `observation` (
  `id` int(11) NOT NULL,
  `prescription_id` int(11) NOT NULL,
  `chambre` int(11) NOT NULL,
  `lit` int(11) NOT NULL,
  `enter_date` datetime DEFAULT NULL,
  `back_date` datetime DEFAULT NULL,
  `etat` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `observation`
--

INSERT INTO `observation` (`id`, `prescription_id`, `chambre`, `lit`, `enter_date`, `back_date`, `etat`) VALUES
(1, 1, 1, 4, '2019-03-20 00:00:00', '2019-03-27 18:00:00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `ph_article`
--

CREATE TABLE `ph_article` (
  `id` int(11) NOT NULL,
  `libelle` varchar(200) NOT NULL,
  `describes` text NOT NULL,
  `priceAchat` int(11) NOT NULL,
  `priceVente` int(11) NOT NULL,
  `ref` varchar(200) NOT NULL,
  `date_peremption` datetime NOT NULL,
  `qtes` int(11) NOT NULL,
  `conditionnement` text NOT NULL,
  `famille_id` int(11) NOT NULL,
  `register_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ph_article`
--

INSERT INTO `ph_article` (`id`, `libelle`, `describes`, `priceAchat`, `priceVente`, `ref`, `date_peremption`, `qtes`, `conditionnement`, `famille_id`, `register_date`) VALUES
(1, 'Marvim', 'Déparasitant de frusque fab..\r\nData science\r\nnovaginale', 3765, 3965, '2546256561', '2020-10-01 00:00:00', 34, 'Au Frais', 1, '2019-03-20 10:18:06');

-- --------------------------------------------------------

--
-- Table structure for table `ph_famille`
--

CREATE TABLE `ph_famille` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `register_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ph_famille`
--

INSERT INTO `ph_famille` (`id`, `name`, `register_date`) VALUES
(1, 'Déparasitant', '2019-03-20 10:15:46'),
(2, 'Efferversant', '2019-03-20 10:15:46');

-- --------------------------------------------------------

--
-- Table structure for table `ph_journalVente`
--

CREATE TABLE `ph_journalVente` (
  `id` int(11) NOT NULL,
  `keyGen` varchar(200) NOT NULL,
  `name_client` varchar(200) NOT NULL,
  `encaisse` int(11) NOT NULL,
  `register` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `gestionnaire_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ph_journalVente`
--

INSERT INTO `ph_journalVente` (`id`, `keyGen`, `name_client`, `encaisse`, `register`, `gestionnaire_id`) VALUES
(1, '45678', 'Robert', 5465, '2019-04-03 17:32:55', 1);

-- --------------------------------------------------------

--
-- Table structure for table `ph_product_select`
--

CREATE TABLE `ph_product_select` (
  `id` int(11) NOT NULL,
  `ph_article_id` int(11) NOT NULL,
  `ph_journalVente_id` int(11) NOT NULL,
  `register_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `prescription`
--

CREATE TABLE `prescription` (
  `id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `medecin_id` int(11) NOT NULL,
  `designation_id` int(11) NOT NULL,
  `keyGen` int(11) NOT NULL,
  `register_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `gestionaire_id` int(11) NOT NULL,
  `ristourne` int(11) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `prescription`
--

INSERT INTO `prescription` (`id`, `client_id`, `medecin_id`, `designation_id`, `keyGen`, `register_date`, `gestionaire_id`, `ristourne`, `price`) VALUES
(1, 1, 1, 1, 56678, '2019-03-20 12:01:13', 1, 10, 15000);

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `service`
--

INSERT INTO `service` (`id`, `name`) VALUES
(1, 'Echographie');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chambre`
--
ALTER TABLE `chambre`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `compte_medecin`
--
ALTER TABLE `compte_medecin`
  ADD PRIMARY KEY (`id`),
  ADD KEY `medecin_id` (`medecin_id`);

--
-- Indexes for table `designation`
--
ALTER TABLE `designation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `service_id` (`service_id`);

--
-- Indexes for table `gestionnaire`
--
ALTER TABLE `gestionnaire`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lit`
--
ALTER TABLE `lit`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_chambre` (`id_chambre`);

--
-- Indexes for table `medecin`
--
ALTER TABLE `medecin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `observation`
--
ALTER TABLE `observation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `client_id` (`prescription_id`);

--
-- Indexes for table `ph_article`
--
ALTER TABLE `ph_article`
  ADD PRIMARY KEY (`id`),
  ADD KEY `famille_id` (`famille_id`);

--
-- Indexes for table `ph_famille`
--
ALTER TABLE `ph_famille`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ph_journalVente`
--
ALTER TABLE `ph_journalVente`
  ADD PRIMARY KEY (`id`),
  ADD KEY `gestionnaire_id` (`gestionnaire_id`);

--
-- Indexes for table `ph_product_select`
--
ALTER TABLE `ph_product_select`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ph_article_id` (`ph_article_id`),
  ADD KEY `ph_journalVente_id` (`ph_journalVente_id`);

--
-- Indexes for table `prescription`
--
ALTER TABLE `prescription`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `key` (`keyGen`),
  ADD KEY `client_id` (`client_id`),
  ADD KEY `medecin_id` (`medecin_id`),
  ADD KEY `designation_id` (`designation_id`),
  ADD KEY `gestionaire_id` (`gestionaire_id`);

--
-- Indexes for table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chambre`
--
ALTER TABLE `chambre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `client`
--
ALTER TABLE `client`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `designation`
--
ALTER TABLE `designation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `gestionnaire`
--
ALTER TABLE `gestionnaire`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `lit`
--
ALTER TABLE `lit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `medecin`
--
ALTER TABLE `medecin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `observation`
--
ALTER TABLE `observation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ph_article`
--
ALTER TABLE `ph_article`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ph_famille`
--
ALTER TABLE `ph_famille`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ph_journalVente`
--
ALTER TABLE `ph_journalVente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ph_product_select`
--
ALTER TABLE `ph_product_select`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `prescription`
--
ALTER TABLE `prescription`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `service`
--
ALTER TABLE `service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `compte_medecin`
--
ALTER TABLE `compte_medecin`
  ADD CONSTRAINT `compte_medecin_ibfk_1` FOREIGN KEY (`medecin_id`) REFERENCES `medecin` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `designation`
--
ALTER TABLE `designation`
  ADD CONSTRAINT `designation_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `observation`
--
ALTER TABLE `observation`
  ADD CONSTRAINT `observation_ibfk_1` FOREIGN KEY (`prescription_id`) REFERENCES `prescription` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `ph_article`
--
ALTER TABLE `ph_article`
  ADD CONSTRAINT `ph_article_ibfk_1` FOREIGN KEY (`famille_id`) REFERENCES `ph_famille` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ph_journalVente`
--
ALTER TABLE `ph_journalVente`
  ADD CONSTRAINT `ph_journalvente_ibfk_1` FOREIGN KEY (`gestionnaire_id`) REFERENCES `gestionnaire` (`id`);

--
-- Constraints for table `ph_product_select`
--
ALTER TABLE `ph_product_select`
  ADD CONSTRAINT `ph_product_select_ibfk_1` FOREIGN KEY (`ph_article_id`) REFERENCES `ph_article` (`id`),
  ADD CONSTRAINT `ph_product_select_ibfk_2` FOREIGN KEY (`ph_journalVente_id`) REFERENCES `ph_journalVente` (`id`);

--
-- Constraints for table `prescription`
--
ALTER TABLE `prescription`
  ADD CONSTRAINT `prescription_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `client` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `prescription_ibfk_2` FOREIGN KEY (`designation_id`) REFERENCES `designation` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `prescription_ibfk_3` FOREIGN KEY (`gestionaire_id`) REFERENCES `gestionnaire` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `prescription_ibfk_4` FOREIGN KEY (`medecin_id`) REFERENCES `medecin` (`id`) ON UPDATE CASCADE;
