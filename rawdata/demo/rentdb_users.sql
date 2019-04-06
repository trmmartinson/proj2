-- MySQL dump 10.13  Distrib 8.0.15, for Linux (x86_64)
--
-- Host: localhost    Database: rentdb
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `username` text,
  `about` text,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `last_login` datetime DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=362 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (355,'Ozzy','Ozborn',NULL,NULL,'ozzy@gmail.com','$2a$08$grarVeo8mZ0ZqlzsWT/1ROJrjxfwFPib6l0hjt/s/Fb8YjnvwzedW',NULL,'active','2019-04-06 04:41:18','2019-04-06 04:41:18'),(356,'Gustave','Holtz',NULL,NULL,'gustave@comcast.net','$2a$08$DFr9SqCgaxIbdItzpkgW3eMi8R9kBbBoET8eS2RygDbnC9gh9ViJu',NULL,'active','2019-04-06 04:42:53','2019-04-06 04:42:53'),(357,'George','Orwell',NULL,NULL,'gorwell@animalfarm.com','$2a$08$VLEHFop0u4Zv1st0T6kpPu/10rXSpPj9UgHm5RnHS6CzWc/2xI3Zm',NULL,'active','2019-04-06 04:44:28','2019-04-06 04:44:28'),(358,'Chris','Farly',NULL,NULL,'chris@hotmail.com','$2a$08$czrbs8fdFL3ooZjE9rOsK.LbdZpShBSn4SyJDNfq38DoLVEZOeZGe',NULL,'active','2019-04-06 04:46:14','2019-04-06 04:46:14'),(359,'t','t',NULL,NULL,'a2342@fit.com','$2a$08$962zFbgGiadsSkESp4i9C.l9flvCFwzgJqv70nYk1ayGm5HQR3/VG',NULL,'active','2019-04-06 04:49:54','2019-04-06 04:49:54'),(360,'asdf','a',NULL,NULL,'asdf@ruasdf.com','$2a$08$kjGj/NIFcU2lMfVO10JgsOQdEn6GNTMrR5gfbWNVab74xf.HrtYya',NULL,'active','2019-04-06 04:55:01','2019-04-06 04:55:01'),(361,'Bill','Boxer',NULL,NULL,'bill@smash.com','$2a$08$9zXshD/GKTypqcRi30.IDuUBK5bph7Wr3/6T9b0tcQtJzwPXMq/wS',NULL,'active','2019-04-06 06:22:22','2019-04-06 06:22:22');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-04-06  2:01:08
