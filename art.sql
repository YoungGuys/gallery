-- phpMyAdmin SQL Dump
-- version 4.2.6deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 24, 2015 at 10:28 PM
-- Server version: 5.5.43-0ubuntu0.14.10.1
-- PHP Version: 5.5.12-2ubuntu4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `art`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_login`
--

CREATE TABLE IF NOT EXISTS `admin_login` (
`id` int(11) NOT NULL,
  `login` varchar(45) DEFAULT NULL,
  `pass` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `asfsadfsdaf`
--

CREATE TABLE IF NOT EXISTS `asfsadfsdaf` (
  `sdafsaff` int(11) NOT NULL,
  `sadf` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `group`
--

CREATE TABLE IF NOT EXISTS `group` (
`id` int(11) NOT NULL,
  `name_ukr` varchar(45) DEFAULT NULL,
  `name_eng` varchar(45) DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `group`
--

INSERT INTO `group` (`id`, `name_ukr`, `name_eng`) VALUES
(1, 'name_ukr', 'name_eng');

-- --------------------------------------------------------

--
-- Table structure for table `jury`
--

CREATE TABLE IF NOT EXISTS `jury` (
`id_jury` int(11) NOT NULL,
  `fio` varchar(120) DEFAULT NULL,
  `bio` text,
  `login` varchar(45) DEFAULT NULL,
  `pass` varchar(32) DEFAULT NULL,
  `photo` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE IF NOT EXISTS `projects` (
`id_project` int(11) NOT NULL,
  `id_statement` int(11) DEFAULT NULL,
  `title_ukr` varchar(100) DEFAULT NULL,
  `title_eng` varchar(100) DEFAULT NULL,
  `title_long` varchar(500) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `description_ukr` text,
  `description_eng` text,
  `material` varchar(45) DEFAULT NULL,
  `sizes` varchar(45) DEFAULT NULL,
  `recomendation` int(11) DEFAULT NULL,
  `owner` int(11) DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id_project`, `id_statement`, `title_ukr`, `title_eng`, `title_long`, `type`, `description_ukr`, `description_eng`, `material`, `sizes`, `recomendation`, `owner`) VALUES
(1, 1, 'title_ukr11', 'title_eng11', 'title_long11', 'type11', 'description_ukr11', 'description_eng11', 'material11', 'sizes11', 0, 0),
(2, 1, 'title_ukr2222', 'title_eng2222', 'title_long2222', 'type2222', 'description_ukr2222', 'description_eng2222', 'material2222', 'sizes2222', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `project_photos`
--

CREATE TABLE IF NOT EXISTS `project_photos` (
`id_photo` int(11) NOT NULL,
  `id_project` int(11) DEFAULT NULL,
  `src` varchar(45) DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `project_photos`
--

INSERT INTO `project_photos` (`id_photo`, `id_project`, `src`) VALUES
(1, 1, 'dafa'),
(2, 1, 'dasdasdasd'),
(3, 1, '13123fda s'),
(4, 2, '123123');

-- --------------------------------------------------------

--
-- Table structure for table `rating`
--

CREATE TABLE IF NOT EXISTS `rating` (
  `id_rate` int(11) NOT NULL,
  `id_project` int(11) DEFAULT NULL,
  `id_jury` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `statements`
--

CREATE TABLE IF NOT EXISTS `statements` (
`id_statement` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_group` int(11) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `photo` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `bio` text,
  `participant` int(11) DEFAULT NULL,
  `exhibition_list` varchar(500) DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `statements`
--

INSERT INTO `statements` (`id_statement`, `id_user`, `id_group`, `type`, `phone`, `photo`, `email`, `bio`, `participant`, `exhibition_list`) VALUES
(1, NULL, 1, 0, 'baalonn', 'baalonn', 'baalonn', 'baalonn', 0, 'baalonn');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
`id_user` int(11) NOT NULL,
  `id_group` int(11) DEFAULT NULL,
  `fio_ukr` varchar(100) DEFAULT NULL,
  `fio_eng` varchar(100) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `education` varchar(300) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `region` varchar(45) DEFAULT NULL,
  `town` varchar(45) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `passport_seria` varchar(10) DEFAULT NULL,
  `passport_number` int(11) DEFAULT NULL,
  `passport_who` varchar(450) DEFAULT NULL,
  `passport_when` date DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `id_group`, `fio_ukr`, `fio_eng`, `birthday`, `education`, `country`, `region`, `town`, `address`, `phone`, `passport_seria`, `passport_number`, `passport_who`, `passport_when`) VALUES
(1, 1, 'fio_ukr999', 'fio_eng999', '0000-00-00', 'education999', 'country999', 'region999', 'town999', 'address999', 'phone999', 'pass1port_', 33221, 'passport_who999', '0000-00-00'),
(2, 1, 'fio_ukr29999', 'fio_eng29999', '0000-00-00', 'education29999', 'country29999', 'region29999', 'town29999', 'address29999', 'phone29999', 'passport_s', 1122, 'passport_who29999', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `users_copy1`
--

CREATE TABLE IF NOT EXISTS `users_copy1` (
`id_user` int(11) NOT NULL,
  `fio_ukr` varchar(100) DEFAULT NULL,
  `fio_eng` varchar(100) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `education` varchar(300) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `region` varchar(45) DEFAULT NULL,
  `town` varchar(45) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `passport_seria` varchar(10) DEFAULT NULL,
  `passport_number` int(11) DEFAULT NULL,
  `passport_who` varchar(450) DEFAULT NULL,
  `passport_when` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_login`
--
ALTER TABLE `admin_login`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `login_UNIQUE` (`login`);

--
-- Indexes for table `asfsadfsdaf`
--
ALTER TABLE `asfsadfsdaf`
 ADD PRIMARY KEY (`sdafsaff`);

--
-- Indexes for table `group`
--
ALTER TABLE `group`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jury`
--
ALTER TABLE `jury`
 ADD PRIMARY KEY (`id_jury`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
 ADD PRIMARY KEY (`id_project`), ADD KEY `fk_projects_1_idx` (`id_statement`);

--
-- Indexes for table `project_photos`
--
ALTER TABLE `project_photos`
 ADD PRIMARY KEY (`id_photo`), ADD KEY `fk_project_photos_1_idx` (`id_project`);

--
-- Indexes for table `rating`
--
ALTER TABLE `rating`
 ADD PRIMARY KEY (`id_rate`), ADD KEY `fk_rating_1_idx` (`id_project`), ADD KEY `fk_rating_2_idx` (`id_jury`);

--
-- Indexes for table `statements`
--
ALTER TABLE `statements`
 ADD PRIMARY KEY (`id_statement`), ADD KEY `fk_statements_2_idx` (`id_user`), ADD KEY `fk_statements_1_idx` (`id_group`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
 ADD PRIMARY KEY (`id_user`), ADD UNIQUE KEY `passport_number_UNIQUE` (`passport_number`), ADD KEY `fk_users_1_idx` (`id_group`);

--
-- Indexes for table `users_copy1`
--
ALTER TABLE `users_copy1`
 ADD PRIMARY KEY (`id_user`), ADD UNIQUE KEY `passport_number_UNIQUE` (`passport_number`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_login`
--
ALTER TABLE `admin_login`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `group`
--
ALTER TABLE `group`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `jury`
--
ALTER TABLE `jury`
MODIFY `id_jury` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
MODIFY `id_project` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `project_photos`
--
ALTER TABLE `project_photos`
MODIFY `id_photo` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `statements`
--
ALTER TABLE `statements`
MODIFY `id_statement` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `users_copy1`
--
ALTER TABLE `users_copy1`
MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `projects`
--
ALTER TABLE `projects`
ADD CONSTRAINT `fk_projects_1` FOREIGN KEY (`id_statement`) REFERENCES `statements` (`id_statement`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `project_photos`
--
ALTER TABLE `project_photos`
ADD CONSTRAINT `fk_project_photos_1` FOREIGN KEY (`id_project`) REFERENCES `projects` (`id_project`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `rating`
--
ALTER TABLE `rating`
ADD CONSTRAINT `fk_rating_1` FOREIGN KEY (`id_project`) REFERENCES `projects` (`id_project`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `fk_rating_2` FOREIGN KEY (`id_jury`) REFERENCES `jury` (`id_jury`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `statements`
--
ALTER TABLE `statements`
ADD CONSTRAINT `fk_statements_1` FOREIGN KEY (`id_group`) REFERENCES `group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `fk_statements_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
ADD CONSTRAINT `fk_users_1` FOREIGN KEY (`id_group`) REFERENCES `group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
