-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: tap_iii_canteen_maypen
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `drinks`
--

DROP TABLE IF EXISTS `drinks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `drinks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `beverage` varchar(45) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drinks`
--

LOCK TABLES `drinks` WRITE;
/*!40000 ALTER TABLE `drinks` DISABLE KEYS */;
INSERT INTO `drinks` VALUES (1,'TRU JUICE-340ML-FRUIT PUNCH',54,'4pA4eWZh5v_Tru-Juice_Nectar_Fruit_Punch_340ml_11.5oz_tagged__42596_zoom.jpg','Our juices are made in Jamaica from the finest fruits and vegetables and blended to perfection to provide the best product for our consumers.');
/*!40000 ALTER TABLE `drinks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meals_schedule`
--

DROP TABLE IF EXISTS `meals_schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meals_schedule` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `menu_id` int DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `drink_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `student_id_idx` (`user_id`),
  KEY `menu_id_idx` (`menu_id`),
  CONSTRAINT `menu_id` FOREIGN KEY (`menu_id`) REFERENCES `menu` (`id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meals_schedule`
--

LOCK TABLES `meals_schedule` WRITE;
/*!40000 ALTER TABLE `meals_schedule` DISABLE KEYS */;
INSERT INTO `meals_schedule` VALUES (1,1,1,'2024-03-01 00:00:00',NULL);
/*!40000 ALTER TABLE `meals_schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `item_name` varchar(45) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES (1,'Chicken Burger',16,'A chicken burger the whole family enjoys','qFVic4u65Q_chicken-burger.png'),(5,'Grace Corned Beef Fried Rice',10,'cooked rice, scrambled eggs, soy sauce and all purpose seasoning','ixXu82YpNi_cropped-Grace-Corned-Beef-Fried-Rice.jpg'),(6,'Meatless Grain Bowl',10,'This meatless grain bowl is made with tofu \"jerked\" to perfection. The addition of roasted sweet potatoes brings a surprise twist—all of which will have your tastebuds dancing for joy!\r\n\r\n','pjsPeLxjne_8584633_Grain-Bowl_Shelia-Johnso.png'),(7,'Chicken Teriyaki Rice Bowls',11,'Skip the takeout with this grilled chicken teriyaki bowl. Grill marinated chicken, pineapple, and seasoned broccoli and red pepper and serve over rice.\r\n\r\n','pjsPeLxjne_7372857_ChickenTeriyakiRiceBowls.png'),(8,'Steak and Rice Bowls with Vegetable Relish',9,'This marinade does double duty. Prepare it in advance, when you have time, and use part for the steak. Reserve some to use on the colorful vegetable relish that is served on the side!\r\n\r\n','pjsPeLxjne_8543757_Steak-and-Rice-Bowls-wit.png');
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `location` varchar(45) DEFAULT NULL,
  `phone_num` varchar(45) DEFAULT NULL,
  `trn` int DEFAULT NULL,
  `roles` varchar(45) DEFAULT NULL,
  `password` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `trn_UNIQUE` (`trn`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'TONI-ANN','NEIL','toni@mail.com','MAY PEN','8765363454',123678976,'USER','$2a$14$PiLOctrfpwRM6igZ7u99IOgfU5P8JDKZTUWQJd/wBQICNbgqfA5Am'),(2,'Admin','','admin@mail.com',NULL,NULL,NULL,'ADMIN','$2a$14$wpu4eS9EdZRbitUmxA9RDu4f4pX3LSX3KqbOH4URLzbYCWTcENOHK'),(3,'JEVARDO','WILLIAMSON','jev@mail.com','MAY PEN','18765223846',123087564,'USER','$2a$14$yvTpptncfMx74l6zMc9uv.GzpqFJaXN37raIg31cKu/JnVN0buIhi'),(5,'ANDRE','CHAMBERS','andre@mail.com','MAY PEN','8776567733',123654786,'USER','$2a$14$1uRvHTPdCxE/WtODsCiGMOBvDSA9mA3kWmWuIyXRqw3zfXx1E6wYm'),(6,'SHELLORNA','BROWN','itzlorna@mail.com','MAY PEN','876456543637',123098657,'USER','$2a$14$CnxXep4lu34M5rluvFlB0u3ygwz79ZS.Hq/GKONTTy5chQ.KEfXgi');
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

-- Dump completed on 2024-03-01 10:26:34
