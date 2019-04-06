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
-- Table structure for table `answers`
--

DROP TABLE IF EXISTS `answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `answers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `version` int(11) DEFAULT NULL,
  `source` varchar(255) DEFAULT NULL,
  `question_code` text,
  `answer` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1513 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answers`
--

LOCK TABLES `answers` WRITE;
/*!40000 ALTER TABLE `answers` DISABLE KEYS */;
INSERT INTO `answers` VALUES (1448,355,NULL,'rentor','zipcode','55343','2019-04-06 04:42:30','2019-04-06 04:42:30'),(1449,355,NULL,'rentor','loc_description','Near the general store','2019-04-06 04:42:30','2019-04-06 04:42:30'),(1450,355,NULL,'rentor','age','55','2019-04-06 04:42:30','2019-04-06 04:42:30'),(1451,355,NULL,'rentor','age_min','18','2019-04-06 04:42:30','2019-04-06 04:42:30'),(1452,355,NULL,'rentor','age_max','100','2019-04-06 04:42:30','2019-04-06 04:42:30'),(1453,355,NULL,'rentor','values_level','3','2019-04-06 04:42:30','2019-04-06 04:42:30'),(1454,355,NULL,'rentor','price','766','2019-04-06 04:42:30','2019-04-06 04:42:30'),(1455,355,NULL,'rentor','gender','M','2019-04-06 04:42:30','2019-04-06 04:42:30'),(1456,355,NULL,'rentor','gender_opt','N','2019-04-06 04:42:30','2019-04-06 04:42:30'),(1457,356,NULL,'rentor','zipcode','55352','2019-04-06 04:43:34','2019-04-06 04:43:34'),(1458,356,NULL,'rentor','loc_description','Near A&W','2019-04-06 04:43:34','2019-04-06 04:43:34'),(1459,356,NULL,'rentor','age','55','2019-04-06 04:43:34','2019-04-06 04:43:34'),(1460,356,NULL,'rentor','age_min','18','2019-04-06 04:43:34','2019-04-06 04:43:34'),(1461,356,NULL,'rentor','age_max','100','2019-04-06 04:43:34','2019-04-06 04:43:34'),(1462,356,NULL,'rentor','values_level','3','2019-04-06 04:43:34','2019-04-06 04:43:34'),(1463,356,NULL,'rentor','price','666','2019-04-06 04:43:34','2019-04-06 04:43:34'),(1464,356,NULL,'rentor','gender','M','2019-04-06 04:43:34','2019-04-06 04:43:34'),(1465,356,NULL,'rentor','gender_opt','N','2019-04-06 04:43:34','2019-04-06 04:43:34'),(1466,357,NULL,'rentor','zipcode','55344','2019-04-06 04:45:04','2019-04-06 04:45:04'),(1467,357,NULL,'rentor','loc_description','near EP shopping center','2019-04-06 04:45:04','2019-04-06 04:45:04'),(1468,357,NULL,'rentor','age','55','2019-04-06 04:45:04','2019-04-06 04:45:04'),(1469,357,NULL,'rentor','age_min','18','2019-04-06 04:45:04','2019-04-06 04:45:04'),(1470,357,NULL,'rentor','age_max','100','2019-04-06 04:45:04','2019-04-06 04:45:04'),(1471,357,NULL,'rentor','values_level','3','2019-04-06 04:45:04','2019-04-06 04:45:04'),(1472,357,NULL,'rentor','price','666','2019-04-06 04:45:04','2019-04-06 04:45:04'),(1473,357,NULL,'rentor','gender','M','2019-04-06 04:45:04','2019-04-06 04:45:04'),(1474,357,NULL,'rentor','gender_opt','N','2019-04-06 04:45:04','2019-04-06 04:45:04'),(1475,358,NULL,'rentor','zipcode','55345','2019-04-06 04:47:10','2019-04-06 04:47:10'),(1476,358,NULL,'rentor','loc_description','I live in a van down by the river','2019-04-06 04:47:10','2019-04-06 04:47:10'),(1477,358,NULL,'rentor','age','46','2019-04-06 04:47:10','2019-04-06 04:47:10'),(1478,358,NULL,'rentor','age_min','18','2019-04-06 04:47:10','2019-04-06 04:47:10'),(1479,358,NULL,'rentor','age_max','100','2019-04-06 04:47:10','2019-04-06 04:47:10'),(1480,358,NULL,'rentor','values_level','3','2019-04-06 04:47:10','2019-04-06 04:47:10'),(1481,358,NULL,'rentor','price','652','2019-04-06 04:47:10','2019-04-06 04:47:10'),(1482,358,NULL,'rentor','gender','M','2019-04-06 04:47:10','2019-04-06 04:47:10'),(1483,358,NULL,'rentor','gender_opt','N','2019-04-06 04:47:10','2019-04-06 04:47:10'),(1484,359,NULL,'rentee','zipcode','55423','2019-04-06 04:50:12','2019-04-06 04:50:12'),(1485,359,NULL,'rentee','age_min','18','2019-04-06 04:50:12','2019-04-06 04:50:12'),(1486,359,NULL,'rentee','radius','333','2019-04-06 04:50:12','2019-04-06 04:50:12'),(1487,359,NULL,'rentee','age_max','100','2019-04-06 04:50:12','2019-04-06 04:50:12'),(1488,359,NULL,'rentee','age','33','2019-04-06 04:50:12','2019-04-06 04:50:12'),(1489,359,NULL,'rentee','values_level','3','2019-04-06 04:50:12','2019-04-06 04:50:12'),(1490,359,NULL,'rentee','price_min','1','2019-04-06 04:50:12','2019-04-06 04:50:12'),(1491,359,NULL,'rentee','price_max','5555','2019-04-06 04:50:12','2019-04-06 04:50:12'),(1492,359,NULL,'rentee','gender','M','2019-04-06 04:50:12','2019-04-06 04:50:12'),(1493,359,NULL,'rentee','gender_opt','N','2019-04-06 04:50:12','2019-04-06 04:50:12'),(1494,360,NULL,'rentee','zipcode','55423','2019-04-06 04:55:16','2019-04-06 04:55:16'),(1495,360,NULL,'rentee','radius','2222','2019-04-06 04:55:16','2019-04-06 04:55:16'),(1496,360,NULL,'rentee','age','33','2019-04-06 04:55:16','2019-04-06 04:55:16'),(1497,360,NULL,'rentee','age_min','18','2019-04-06 04:55:16','2019-04-06 04:55:16'),(1498,360,NULL,'rentee','values_level','3','2019-04-06 04:55:16','2019-04-06 04:55:16'),(1499,360,NULL,'rentee','age_max','100','2019-04-06 04:55:16','2019-04-06 04:55:16'),(1500,360,NULL,'rentee','price_min','1','2019-04-06 04:55:16','2019-04-06 04:55:16'),(1501,360,NULL,'rentee','price_max','5555','2019-04-06 04:55:16','2019-04-06 04:55:16'),(1502,360,NULL,'rentee','gender','M','2019-04-06 04:55:16','2019-04-06 04:55:16'),(1503,360,NULL,'rentee','gender_opt','N','2019-04-06 04:55:16','2019-04-06 04:55:16'),(1504,361,NULL,'rentor','zipcode','55437','2019-04-06 06:23:18','2019-04-06 06:23:18'),(1505,361,NULL,'rentor','loc_description','By the gas station','2019-04-06 06:23:18','2019-04-06 06:23:18'),(1506,361,NULL,'rentor','age','55','2019-04-06 06:23:18','2019-04-06 06:23:18'),(1507,361,NULL,'rentor','age_min','18','2019-04-06 06:23:18','2019-04-06 06:23:18'),(1508,361,NULL,'rentor','age_max','100','2019-04-06 06:23:18','2019-04-06 06:23:18'),(1509,361,NULL,'rentor','values_level','3','2019-04-06 06:23:18','2019-04-06 06:23:18'),(1510,361,NULL,'rentor','price','762','2019-04-06 06:23:18','2019-04-06 06:23:18'),(1511,361,NULL,'rentor','gender','M','2019-04-06 06:23:18','2019-04-06 06:23:18'),(1512,361,NULL,'rentor','gender_opt','N','2019-04-06 06:23:18','2019-04-06 06:23:18');
/*!40000 ALTER TABLE `answers` ENABLE KEYS */;
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
