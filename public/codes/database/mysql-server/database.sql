-- MySQL dump 10.13  Distrib 8.3.0, for Linux (x86_64)
--
-- Host: localhost    Database: monitor_db
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'Alice','alice@email.com'),(2,'Bob','bob@email.com'),(3,'Charlie','charlie@email.com');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admins_hosts`
--

DROP TABLE IF EXISTS `admins_hosts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins_hosts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `admin_id` int NOT NULL,
  `host_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins_hosts`
--

LOCK TABLES `admins_hosts` WRITE;
/*!40000 ALTER TABLE `admins_hosts` DISABLE KEYS */;
INSERT INTO `admins_hosts` VALUES (1,1,2),(2,2,2),(3,2,3),(4,3,3);
/*!40000 ALTER TABLE `admins_hosts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hosts`
--

DROP TABLE IF EXISTS `hosts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hosts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hosts`
--

LOCK TABLES `hosts` WRITE;
/*!40000 ALTER TABLE `hosts` DISABLE KEYS */;
INSERT INTO `hosts` VALUES (1,'www.ifpb.edu.br','200.10.10.10'),(2,'www.ifrn.edu.br','200.10.10.11'),(3,'www.ifpb.edu.br','200.10.10.12');
/*!40000 ALTER TABLE `hosts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `icmps`
--

DROP TABLE IF EXISTS `icmps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `icmps` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bytes` int NOT NULL,
  `ttl` int NOT NULL,
  `time` float NOT NULL,
  `ping_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `icmps`
--

LOCK TABLES `icmps` WRITE;
/*!40000 ALTER TABLE `icmps` DISABLE KEYS */;
INSERT INTO `icmps` VALUES (1,56,54,74.7,2),(2,56,54,74,2),(3,56,54,72.5,2),(4,56,54,43.5,3),(5,56,54,44.6,3);
/*!40000 ALTER TABLE `icmps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pings`
--

DROP TABLE IF EXISTS `pings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createAt` datetime NOT NULL,
  `host_id` int NOT NULL,
  `stat_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pings`
--

LOCK TABLES `pings` WRITE;
/*!40000 ALTER TABLE `pings` DISABLE KEYS */;
INSERT INTO `pings` VALUES (1,'2024-02-28 02:50:55',2,0),(2,'2024-02-28 02:50:55',2,1),(3,'2024-02-28 02:50:55',3,2),(4,'2024-02-28 02:50:55',3,0),(5,'2024-02-28 02:50:55',2,0);
/*!40000 ALTER TABLE `pings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stats`
--

DROP TABLE IF EXISTS `stats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stats` (
  `id` int NOT NULL AUTO_INCREMENT,
  `transmitted` int NOT NULL,
  `received` int NOT NULL,
  `time` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stats`
--

LOCK TABLES `stats` WRITE;
/*!40000 ALTER TABLE `stats` DISABLE KEYS */;
INSERT INTO `stats` VALUES (1,4,4,221.2),(2,7,4,88.1);
/*!40000 ALTER TABLE `stats` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-28  4:40:37
