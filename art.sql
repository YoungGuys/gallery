-- phpMyAdmin SQL Dump
-- version 4.2.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: May 10, 2015 at 12:30 PM
-- Server version: 5.5.38
-- PHP Version: 5.5.18

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

CREATE TABLE `admin_login` (
`id` int(11) NOT NULL,
  `login` varchar(45) DEFAULT NULL,
  `pass` varchar(32) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `admin_login`
--

INSERT INTO `admin_login` (`id`, `login`, `pass`) VALUES
(1, 'admin', '3fc0a7acf087f549ac2b266baf94b8b1');

-- --------------------------------------------------------

--
-- Table structure for table `asfsadfsdaf`
--

CREATE TABLE `asfsadfsdaf` (
  `sdafsaff` int(11) NOT NULL,
  `sadf` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `group`
--

CREATE TABLE `group` (
`id` int(11) NOT NULL,
  `name_ukr` varchar(45) DEFAULT NULL,
  `name_eng` varchar(45) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `group`
--

INSERT INTO `group` (`id`, `name_ukr`, `name_eng`) VALUES
(1, 'name_ukr', 'name_eng');

-- --------------------------------------------------------

--
-- Table structure for table `jury`
--

CREATE TABLE `jury` (
`id_jury` int(11) NOT NULL,
  `fio` varchar(120) DEFAULT NULL,
  `bio` text,
  `login` varchar(45) DEFAULT NULL,
  `pass` varchar(32) DEFAULT NULL,
  `photo` varchar(45) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `jury`
--

INSERT INTO `jury` (`id_jury`, `fio`, `bio`, `login`, `pass`, `photo`) VALUES
(1, 'Popovych Andrii', 'web developer', 'balon', '827ccb0eea8a706c4c34a16891f84e7b', '529526_581380481935424_348599822_n.jpg'),
(2, 'Koval Mykola (Jury)', 'Jury jury jury...', 'mikolka', '827ccb0eea8a706c4c34a16891f84e7b', 'mykola_koval.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
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
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id_project`, `id_statement`, `title_ukr`, `title_eng`, `title_long`, `type`, `description_ukr`, `description_eng`, `material`, `sizes`, `recomendation`, `owner`) VALUES
(36, 8, NULL, 'My cats', NULL, NULL, NULL, 'cats, cats ...', NULL, NULL, NULL, NULL),
(37, 6, NULL, 'Be happy', NULL, NULL, NULL, 'happy...', NULL, NULL, NULL, NULL),
(38, 5, NULL, 'Cats', NULL, NULL, NULL, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci asperiores laudantium nisi odio optio quas reprehenderit totam unde voluptate! Aspernatur doloremque dolores explicabo fuga id ipsam minima qui recusandae ut?\n\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci asperiores laudantium nisi odio optio quas reprehenderit totam unde voluptate! Aspernatur doloremque dolores explicabo fuga id ipsam minima qui recusandae ut?\n\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci asperiores laudantium nisi odio optio quas reprehenderit totam unde voluptate! Aspernatur doloremque dolores explicabo fuga id ipsam minima qui recusandae ut?', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `project_photos`
--

CREATE TABLE `project_photos` (
`id_photo` int(11) NOT NULL,
  `id_project` int(11) DEFAULT NULL,
  `src` varchar(45) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `project_photos`
--

INSERT INTO `project_photos` (`id_photo`, `id_project`, `src`) VALUES
(7, 36, 'images (1).jpeg'),
(8, 36, 'images.jpeg'),
(9, 37, 'rOgzABQ8hYo.jpg'),
(10, 38, 'cat2.jpg'),
(11, 38, 'cat.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `rating`
--

CREATE TABLE `rating` (
`id_rate` int(11) NOT NULL,
  `id_project` int(11) DEFAULT NULL,
  `id_jury` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `rating`
--

INSERT INTO `rating` (`id_rate`, `id_project`, `id_jury`) VALUES
(1, 38, 1);

-- --------------------------------------------------------

--
-- Table structure for table `statements`
--

CREATE TABLE `statements` (
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `statements`
--

INSERT INTO `statements` (`id_statement`, `id_user`, `id_group`, `type`, `phone`, `photo`, `email`, `bio`, `participant`, `exhibition_list`) VALUES
(5, 5, NULL, NULL, NULL, 'andrii_popovich.jpg', NULL, 'hihihihihihihi', NULL, NULL),
(6, 6, NULL, NULL, NULL, 'mykola_koval.jpg', NULL, '.......', NULL, NULL),
(8, 8, NULL, NULL, NULL, 'dima_drozd.jpg', NULL, '....', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `id_group`, `fio_ukr`, `fio_eng`, `birthday`, `education`, `country`, `region`, `town`, `address`, `phone`, `passport_seria`, `passport_number`, `passport_who`, `passport_when`) VALUES
(5, NULL, 'Попович Андрій', 'Popovych Andrii', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6, NULL, NULL, 'Koval Mykola', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(8, NULL, NULL, 'Drozd Dima', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users_copy1`
--

CREATE TABLE `users_copy1` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `group`
--
ALTER TABLE `group`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `jury`
--
ALTER TABLE `jury`
MODIFY `id_jury` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
MODIFY `id_project` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=39;
--
-- AUTO_INCREMENT for table `project_photos`
--
ALTER TABLE `project_photos`
MODIFY `id_photo` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `rating`
--
ALTER TABLE `rating`
MODIFY `id_rate` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `statements`
--
ALTER TABLE `statements`
MODIFY `id_statement` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
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
