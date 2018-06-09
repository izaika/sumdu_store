# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.22)
# Database: store
# Generation Time: 2018-06-09 09:40:29 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table categories
# ------------------------------------------------------------

DROP TABLE IF EXISTS `categories`;

CREATE TABLE `categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categories_title_unique` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;

INSERT INTO `categories` (`id`, `title`, `created_at`, `updated_at`)
VALUES
	(1,'Vacuum cleaners','2018-06-06 16:09:26','2018-06-06 16:09:26'),
	(2,'Microwave ovens','2018-06-06 16:09:36','2018-06-06 16:09:36'),
	(3,'Air conditioners','2018-06-06 16:09:43','2018-06-06 16:20:13'),
	(4,'TV sets','2018-06-06 16:09:57','2018-06-06 16:09:57'),
	(5,'Washing machines','2018-06-06 16:11:04','2018-06-06 16:11:04');

/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table migrations
# ------------------------------------------------------------

DROP TABLE IF EXISTS `migrations`;

CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;

INSERT INTO `migrations` (`id`, `migration`, `batch`)
VALUES
	(16,'2018_05_28_160436_create_users_table',1),
	(17,'2018_06_04_193752_create_categories_table',1),
	(18,'2018_06_06_130009_create_products_table',1);

/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table products
# ------------------------------------------------------------

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `price` int(11) NOT NULL,
  `category_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `products_category_id_foreign` (`category_id`),
  CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;

INSERT INTO `products` (`id`, `title`, `description`, `price`, `category_id`, `created_at`, `updated_at`)
VALUES
	(6,'Nullam Quam','Etiam porta sem malesuada magna mollis euismod. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Maecenas sed diam eget risus varius blandit sit amet non magna. Vestibulum id ligula porta felis euismod semper. Donec id elit non mi porta gravida at eget metus.',150,3,'2018-06-06 18:45:13','2018-06-06 18:45:13'),
	(7,'Aenean Vehicula','Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna. Donec id elit non mi porta gravida at eget metus. Nullam quis risus eget urna mollis ornare vel eu leo. Curabitur blandit tempus porttitor. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec ullamcorper nulla non metus auctor fringilla.',200,2,'2018-06-06 18:47:48','2018-06-06 19:07:40'),
	(8,'Parturient Tortor','Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Donec id elit non mi porta gravida at eget metus. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.',250,4,'2018-06-06 18:58:43','2018-06-06 18:58:43'),
	(9,'Pellentesque Dapibus','Donec id elit non mi porta gravida at eget metus. Cras mattis consectetur purus sit amet fermentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue.',90,1,'2018-06-07 22:08:35','2018-06-09 12:34:49'),
	(10,'Vulputate Risus','',65,5,'2018-06-07 22:09:02','2018-06-07 22:09:02'),
	(15,'Purus Lorem','',34,5,'2018-06-07 22:18:20','2018-06-07 22:18:20'),
	(16,'Dapibus Ullamcorper','',78,2,'2018-06-07 22:21:45','2018-06-07 22:21:45'),
	(17,'Ornare Consectetur','',80,4,'2018-06-07 22:22:53','2018-06-07 22:22:53'),
	(18,'Risus Euismod','',65,1,'2018-06-07 22:26:34','2018-06-07 22:26:34'),
	(19,'Justo Quam','Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec sed odio dui. Nullam id dolor id nibh ultricies vehicula ut id elit.',76,3,'2018-06-07 22:27:16','2018-06-07 22:27:16'),
	(21,'Euismod Dapibus','Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nulla vitae elit libero, a pharetra augue. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',76,3,'2018-06-07 22:29:21','2018-06-07 22:29:21'),
	(22,'Adipiscing Ornare','',3,2,'2018-06-07 22:31:08','2018-06-07 22:31:08'),
	(24,'asdf','asdf',2,4,'2018-06-07 22:40:31','2018-06-07 22:40:31'),
	(26,'asdf','asdf',3,3,'2018-06-07 22:41:40','2018-06-07 22:41:40'),
	(27,'Venenatis Dolor','',16,2,'2018-06-09 12:17:24','2018-06-09 12:17:24'),
	(28,'Fusce Dolor','Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nulla vitae elit libero, a pharetra augue. Curabitur blandit tempus porttitor. Donec id elit non mi porta gravida at eget metus.',300,4,'2018-06-09 12:27:47','2018-06-09 12:27:47'),
	(29,'Ridiculus Porta','Nullam id dolor id nibh ultricies vehicula ut id elit. Nullam quis risus eget urna mollis ornare vel eu leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Cras justo odio, dapibus ac facilisis in, egestas eget quam.',7,1,'2018-06-09 12:35:10','2018-06-09 12:35:10'),
	(30,'Fusce Bibendum','Maecenas faucibus mollis interdum. Maecenas faucibus mollis interdum. Donec ullamcorper nulla non metus auctor fringilla. Nullam id dolor id nibh ultricies vehicula ut id elit. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Maecenas faucibus mollis interdum.',18,1,'2018-06-09 12:35:39','2018-06-09 12:35:39'),
	(31,'Dolor Risus','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec sed odio dui.',100,5,'2018-06-09 12:38:31','2018-06-09 12:38:31'),
	(32,'Fusce Quam','Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Donec sed odio dui. Vestibulum id ligula porta felis euismod semper. Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Sed posuere consectetur est at lobortis.',50,5,'2018-06-09 12:39:00','2018-06-09 12:39:00');

/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `api_key` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  UNIQUE KEY `users_api_key_unique` (`api_key`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `name`, `email`, `password`, `api_key`, `created_at`, `updated_at`)
VALUES
	(1,'Igor','izaika89@gmail.com','$2y$10$2VnFqkvA6Z7BHHUkxTmVeuvLWil3VHgr8ti.Z5AzeklHZjW8EiRgq',NULL,'2018-06-06 16:08:25','2018-06-09 12:39:16'),
	(2,'Kate','eksam92@gmail.com','$2y$10$I7LWAS.XzdJ9QCuE5Kn4AubDg21JEgocscqIHKHIjoQa1Q/nhxe8G',NULL,'2018-06-06 16:09:00','2018-06-06 16:09:00');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
