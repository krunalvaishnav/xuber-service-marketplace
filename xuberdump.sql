-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: hexainfosoft_urban
-- ------------------------------------------------------
-- Server version	8.0.40

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
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `picture` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `gender` enum('male','female','others') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `mobile` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `paypal_email` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `admins_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'Xuber Services','admin@xuber.com','$2y$10$eY..Ddz500K3wUR8/UhJquF5L5x0YBQ/1oZ/gW.xgL.TrRGZrlM1O','1741344373670_Panda.jpg','male','9006318092',NULL,'okd9qttYMli8rNWAd9RjmSFOFPrjIoA9j95tNFKF2hmgNOVlhe7VMy9OQh9l',NULL,'2025-03-07 10:46:13');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cards`
--

DROP TABLE IF EXISTS `cards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cards` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `last_four` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `card_id` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `brand` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `is_default` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cards`
--

LOCK TABLES `cards` WRITE;
/*!40000 ALTER TABLE `cards` DISABLE KEYS */;
/*!40000 ALTER TABLE `cards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chats`
--

DROP TABLE IF EXISTS `chats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chats` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `request_id` int NOT NULL,
  `user_id` int NOT NULL,
  `provider_id` int NOT NULL,
  `message` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `type` enum('up','pu') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `delivered` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chats`
--

LOCK TABLES `chats` WRITE;
/*!40000 ALTER TABLE `chats` DISABLE KEYS */;
/*!40000 ALTER TABLE `chats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documents`
--

DROP TABLE IF EXISTS `documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documents` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documents`
--

LOCK TABLES `documents` WRITE;
/*!40000 ALTER TABLE `documents` DISABLE KEYS */;
INSERT INTO `documents` VALUES (1,'Aadhar Card (Front & Back)','Personal','2025-03-07 13:06:58',NULL),(2,'PAN Card','Personal','2025-03-07 13:07:08',NULL),(3,'Driving License','Personal','2025-03-07 13:07:22',NULL),(4,'Electricity Bill','Address Proof','2025-03-07 13:07:32',NULL),(5,'Bank Passbook','Bank','2025-03-07 13:07:44',NULL),(6,'Medical Insurance','Medical','2025-03-07 13:08:01',NULL),(7,'RC Book','Vehicle','2025-03-07 13:08:40',NULL),(8,'Vehicle Insurance','Vehicle','2025-03-07 13:08:49',NULL),(9,'Passport Size Photo','Personal','2025-03-10 04:30:51',NULL);
/*!40000 ALTER TABLE `documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ltm_translations`
--

DROP TABLE IF EXISTS `ltm_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ltm_translations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `status` int NOT NULL DEFAULT '0',
  `locale` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `group` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `key` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `value` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=199 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ltm_translations`
--

LOCK TABLES `ltm_translations` WRITE;
/*!40000 ALTER TABLE `ltm_translations` DISABLE KEYS */;
INSERT INTO `ltm_translations` VALUES (1,1,'en','pagination','previous','&laquo; Previous','2023-10-26 07:13:17','2023-10-26 07:13:17'),(2,1,'en','pagination','next','Next &raquo;','2023-10-26 07:13:17','2023-10-26 07:13:17'),(3,1,'en','passwords','password','Passwords must be at least six characters and match the confirmation.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(4,1,'en','passwords','reset','Your password has been reset!','2023-10-26 07:13:17','2023-10-26 07:13:17'),(5,1,'en','passwords','sent','We have e-mailed your password reset link!','2023-10-26 07:13:17','2023-10-26 07:13:17'),(6,1,'en','passwords','token','This password reset token is invalid.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(7,1,'en','passwords','user','We can\'t find a user with that e-mail address.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(9,1,'en','validation','active_url','The :attribute is not a valid URL.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(10,1,'en','validation','after','The :attribute must be a date after :date.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(11,1,'en','validation','after_or_equal','The :attribute must be a date after or equal to :date.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(12,1,'en','validation','alpha','The :attribute may only contain letters.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(13,1,'en','validation','alpha_dash','The :attribute may only contain letters, numbers, and dashes.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(14,1,'en','validation','alpha_num','The :attribute may only contain letters and numbers.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(15,1,'en','validation','array','The :attribute must be an array.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(16,1,'en','validation','before','The :attribute must be a date before :date.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(17,1,'en','validation','before_or_equal','The :attribute must be a date before or equal to :date.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(18,1,'en','validation','between.numeric','The :attribute must be between :min and :max.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(19,1,'en','validation','between.file','The :attribute must be between :min and :max kilobytes.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(20,1,'en','validation','between.string','The :attribute must be between :min and :max characters.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(21,1,'en','validation','between.array','The :attribute must have between :min and :max items.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(22,1,'en','validation','boolean','The :attribute field must be true or false.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(23,1,'en','validation','confirmed','The :attribute confirmation does not match.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(24,1,'en','validation','date','The :attribute is not a valid date.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(25,1,'en','validation','date_format','The :attribute does not match the format :format.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(26,1,'en','validation','different','The :attribute and :other must be different.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(27,1,'en','validation','digits','The :attribute must be :digits digits.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(28,1,'en','validation','digits_between','The :attribute must be between :min and :max digits.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(29,1,'en','validation','dimensions','The :attribute has invalid image dimensions.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(30,1,'en','validation','distinct','The :attribute field has a duplicate value.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(31,1,'en','validation','email','The :attribute must be a valid email address.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(32,1,'en','validation','exists','The selected :attribute is invalid.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(33,1,'en','validation','file','The :attribute must be a file.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(34,1,'en','validation','filled','The :attribute field is required.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(35,1,'en','validation','image','The :attribute must be an image.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(36,1,'en','validation','in','The selected :attribute is invalid.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(37,1,'en','validation','in_array','The :attribute field does not exist in :other.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(38,1,'en','validation','integer','The :attribute must be an integer.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(39,1,'en','validation','ip','The :attribute must be a valid IP address.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(40,1,'en','validation','json','The :attribute must be a valid JSON string.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(41,1,'en','validation','max.numeric','The :attribute may not be greater than :max.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(42,1,'en','validation','max.file','The :attribute may not be greater than :max kilobytes.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(43,1,'en','validation','max.string','The :attribute may not be greater than :max characters.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(44,1,'en','validation','max.array','The :attribute may not have more than :max items.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(45,1,'en','validation','mimes','The :attribute must be a file of type: :values.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(46,1,'en','validation','mimetypes','The :attribute must be a file of type: :values.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(47,1,'en','validation','min.numeric','The :attribute must be at least :min.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(48,1,'en','validation','min.file','The :attribute must be at least :min kilobytes.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(49,1,'en','validation','min.string','The :attribute must be at least :min characters.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(50,1,'en','validation','min.array','The :attribute must have at least :min items.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(51,1,'en','validation','not_in','The selected :attribute is invalid.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(52,1,'en','validation','numeric','The :attribute must be a number.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(53,1,'en','validation','present','The :attribute field must be present.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(54,1,'en','validation','regex','The :attribute format is invalid.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(55,1,'en','validation','required','The :attribute field is required.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(56,1,'en','validation','required_if','The :attribute field is required when :other is :value.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(57,1,'en','validation','required_unless','The :attribute field is required unless :other is in :values.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(58,1,'en','validation','required_with','The :attribute field is required when :values is present.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(59,1,'en','validation','required_with_all','The :attribute field is required when :values is present.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(60,1,'en','validation','required_without','The :attribute field is required when :values is not present.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(61,1,'en','validation','required_without_all','The :attribute field is required when none of :values are present.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(62,1,'en','validation','same','The :attribute and :other must match.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(63,1,'en','validation','size.numeric','The :attribute must be :size.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(64,1,'en','validation','size.file','The :attribute must be :size kilobytes.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(65,1,'en','validation','size.string','The :attribute must be :size characters.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(66,1,'en','validation','size.array','The :attribute must contain :size items.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(67,1,'en','validation','string','The :attribute must be a string.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(68,1,'en','validation','timezone','The :attribute must be a valid zone.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(69,1,'en','validation','unique','The :attribute has already been taken.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(70,1,'en','validation','uploaded','The :attribute failed to upload.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(71,1,'en','validation','url','The :attribute format is invalid.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(72,1,'en','validation','custom.attribute-name.rule-name','custom-message','2023-10-26 07:13:17','2023-10-26 07:13:17'),(73,1,'en','user','profile.old_password','Old Password','2023-10-26 07:13:17','2023-10-26 07:13:17'),(74,1,'en','user','profile.password','Password','2023-10-26 07:13:17','2023-10-26 07:13:17'),(75,1,'en','user','profile.confirm_password','Confirm Password','2023-10-26 07:13:17','2023-10-26 07:13:17'),(76,1,'en','user','profile.first_name','First Name','2023-10-26 07:13:17','2023-10-26 07:13:17'),(77,1,'en','user','profile.last_name','Last Name','2023-10-26 07:13:17','2023-10-26 07:13:17'),(78,1,'en','user','profile.email','Email','2023-10-26 07:13:17','2023-10-26 07:13:17'),(79,1,'en','user','profile.mobile','Mobile','2023-10-26 07:13:17','2023-10-26 07:13:17'),(80,1,'en','user','profile.general_information','General Information','2023-10-26 07:13:17','2023-10-26 07:13:17'),(81,1,'en','user','profile.profile_picture','Profile Picture','2023-10-26 07:13:17','2023-10-26 07:13:17'),(82,1,'en','user','profile.wallet_balance','Wallet Balance','2023-10-26 07:13:17','2023-10-26 07:13:17'),(83,1,'en','user','profile.edit','Edit','2023-10-26 07:13:17','2023-10-26 07:13:17'),(84,1,'en','user','profile.save','Save','2023-10-26 07:13:17','2023-10-26 07:13:17'),(85,1,'en','user','profile.edit_information','Edit Information','2023-10-26 07:13:17','2023-10-26 07:13:17'),(86,1,'en','user','profile.change_password','Change Password','2023-10-26 07:13:17','2023-10-26 07:13:17'),(87,1,'en','user','profile.profile','Profile','2023-10-26 07:13:17','2023-10-26 07:13:17'),(88,1,'en','user','profile.logout','Logout','2023-10-26 07:13:17','2023-10-26 07:13:17'),(89,1,'en','user','profile.name','Name','2023-10-26 07:13:17','2023-10-26 07:13:17'),(90,1,'en','user','cash','CASH','2023-10-26 07:13:17','2023-10-26 07:13:17'),(91,1,'en','user','service_number','Car Number','2023-10-26 07:13:17','2023-10-26 07:13:17'),(92,1,'en','user','service_model','Car Model','2023-10-26 07:13:17','2023-10-26 07:13:17'),(93,1,'en','user','card.fullname','Full Name','2023-10-26 07:13:17','2023-10-26 07:13:17'),(94,1,'en','user','card.card_no','Card Number','2023-10-26 07:13:17','2023-10-26 07:13:17'),(95,1,'en','user','card.cvv','CVV','2023-10-26 07:13:17','2023-10-26 07:13:17'),(96,1,'en','user','card.add_card','Add Card','2023-10-26 07:13:17','2023-10-26 07:13:17'),(97,1,'en','user','card.delete','Delete','2023-10-26 07:13:17','2023-10-26 07:13:17'),(98,1,'en','user','card.month','Month','2023-10-26 07:13:17','2023-10-26 07:13:17'),(99,1,'en','user','card.year','Year','2023-10-26 07:13:17','2023-10-26 07:13:17'),(100,1,'en','user','card.default','Default','2023-10-26 07:13:17','2023-10-26 07:13:17'),(101,1,'en','user','fare_breakdown','FARE BREAKDOWN','2023-10-26 07:13:17','2023-10-26 07:13:17'),(102,1,'en','user','ride.finding_driver','Finding your Provider','2023-10-26 07:13:17','2023-10-26 07:13:17'),(103,1,'en','user','ride.accepted_ride','Accepted Your Service','2023-10-26 07:13:17','2023-10-26 07:13:17'),(104,1,'en','user','ride.arrived_ride','Arrived At your Location','2023-10-26 07:13:17','2023-10-26 07:13:17'),(105,1,'en','user','ride.onride','Enjoy your Service','2023-10-26 07:13:17','2023-10-26 07:13:17'),(106,1,'en','user','ride.waiting_payment','Waiting for Payment','2023-10-26 07:13:17','2023-10-26 07:13:17'),(107,1,'en','user','ride.rate_and_review','Rate and Review','2023-10-26 07:13:17','2023-10-26 07:13:17'),(108,1,'en','user','ride.ride_now','Request a Service','2023-10-26 07:13:17','2023-10-26 07:13:17'),(109,1,'en','user','ride.cancel_request','Cancel Request','2023-10-26 07:13:17','2023-10-26 07:13:17'),(110,1,'en','user','ride.ride_status','Service Status','2023-10-26 07:13:17','2023-10-26 07:13:17'),(111,1,'en','user','ride.dropped_ride','Your Service is Completed','2023-10-26 07:13:17','2023-10-26 07:13:17'),(112,1,'en','user','ride.ride_details','Service Details','2023-10-26 07:13:17','2023-10-26 07:13:17'),(113,1,'en','user','ride.invoice','Invoice','2023-10-26 07:13:17','2023-10-26 07:13:17'),(114,1,'en','user','ride.base_price','Base Fare','2023-10-26 07:13:17','2023-10-26 07:13:17'),(115,1,'en','user','ride.tax_price','Tax Fare','2023-10-26 07:13:17','2023-10-26 07:13:17'),(116,1,'en','user','ride.distance_price','Hourly Fare','2023-10-26 07:13:17','2023-10-26 07:13:17'),(117,1,'en','user','ride.comment','Comment','2023-10-26 07:13:17','2023-10-26 07:13:17'),(118,1,'en','user','ride.detection_wallet','Wallet Detection','2023-10-26 07:13:17','2023-10-26 07:13:17'),(119,1,'en','user','ride.rating','Rating','2023-10-26 07:13:17','2023-10-26 07:13:17'),(120,1,'en','user','ride.km','Kilometer','2023-10-26 07:13:17','2023-10-26 07:13:17'),(121,1,'en','user','ride.total','Total','2023-10-26 07:13:17','2023-10-26 07:13:17'),(122,1,'en','user','ride.amount_paid','Amount to be Paid','2023-10-26 07:13:17','2023-10-26 07:13:17'),(123,1,'en','user','ride.promotion_applied','Promotion Applied','2023-10-26 07:13:17','2023-10-26 07:13:17'),(124,1,'en','user','dashboard','Dashboard','2023-10-26 07:13:17','2023-10-26 07:13:17'),(125,1,'en','user','payment','Payment','2023-10-26 07:13:17','2023-10-26 07:13:17'),(126,1,'en','user','wallet','Wallet','2023-10-26 07:13:17','2023-10-26 07:13:17'),(127,1,'en','user','my_wallet','My Wallet','2023-10-26 07:13:17','2023-10-26 07:13:17'),(128,1,'en','user','my_trips','My Requests','2023-10-26 07:13:17','2023-10-26 07:13:17'),(129,1,'en','user','in_your_wallet','in your wallet','2023-10-26 07:13:17','2023-10-26 07:13:17'),(130,1,'en','user','status','Status','2023-10-26 07:13:17','2023-10-26 07:13:17'),(131,1,'en','user','driver_name','Provider Name','2023-10-26 07:13:17','2023-10-26 07:13:17'),(132,1,'en','user','driver_rating','Provider Rating','2023-10-26 07:13:17','2023-10-26 07:13:17'),(133,1,'en','user','payment_mode','Payment Mode','2023-10-26 07:13:17','2023-10-26 07:13:17'),(134,1,'en','user','add_money','Add Money','2023-10-26 07:13:17','2023-10-26 07:13:17'),(135,1,'en','user','date','Date','2023-10-26 07:13:17','2023-10-26 07:13:17'),(136,1,'en','user','amount','Total Amount','2023-10-26 07:13:17','2023-10-26 07:13:17'),(137,1,'en','user','type','Type','2023-10-26 07:13:17','2023-10-26 07:13:17'),(138,1,'en','user','time','Time','2023-10-26 07:13:17','2023-10-26 07:13:17'),(139,1,'en','user','request_id','Request ID','2023-10-26 07:13:17','2023-10-26 07:13:17'),(140,1,'en','user','paid_via','PAID VIA','2023-10-26 07:13:17','2023-10-26 07:13:17'),(141,1,'en','user','from','From','2023-10-26 07:13:17','2023-10-26 07:13:17'),(142,1,'en','user','total_distance','Total Distance','2023-10-26 07:13:17','2023-10-26 07:13:17'),(143,1,'en','user','eta','ETA','2023-10-26 07:13:17','2023-10-26 07:13:17'),(144,1,'en','user','to','To','2023-10-26 07:13:17','2023-10-26 07:13:17'),(145,1,'en','user','use_wallet_balance','Use Wallet Balance','2023-10-26 07:13:17','2023-10-26 07:13:17'),(146,1,'en','user','available_wallet_balance','Available Wallet Balance','2023-10-26 07:13:17','2023-10-26 07:13:17'),(147,1,'en','user','estimated_fare','Estimated Fare','2023-10-26 07:13:17','2023-10-26 07:13:17'),(148,1,'en','user','charged','CHARGED','2023-10-26 07:13:17','2023-10-26 07:13:17'),(149,1,'en','user','payment_method','Payment Methods','2023-10-26 07:13:17','2023-10-26 07:13:17'),(150,1,'en','user','promotion','Promotions','2023-10-26 07:13:17','2023-10-26 07:13:17'),(151,1,'en','user','add_promocode','Add Promocode','2023-10-26 07:13:17','2023-10-26 07:13:17'),(152,1,'en','user','schedule_date','Scheduled Date','2023-10-26 07:13:17','2023-10-26 07:13:17'),(153,1,'en','user','upcoming_trips','Upcoming Requests','2023-10-26 07:13:17','2023-10-26 07:13:17'),(154,1,'en','user','request_inprogress','Ride Already in Progress','2023-10-26 07:13:17','2023-10-26 07:13:17'),(155,1,'en','user','request_scheduled','Ride Already Scheduled on this time','2023-10-26 07:13:17','2023-10-26 07:13:17'),(156,1,'en','user','before_comment','Before Service Comment','2023-10-26 07:13:17','2023-10-26 07:13:17'),(157,1,'en','user','after_comment','After Service Comment','2023-10-26 07:13:17','2023-10-26 07:13:17'),(158,1,'en','user','before_image','Before Service Image','2023-10-26 07:13:17','2023-10-26 07:13:17'),(159,1,'en','user','after_image','After Service Image','2023-10-26 07:13:17','2023-10-26 07:13:17'),(160,1,'en','user','booking','Booking ID','2023-10-26 07:13:17','2023-10-26 07:13:17'),(161,1,'en','auth','failed','These credentials do not match our records.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(162,1,'en','auth','throttle','Too many login attempts. Please try again in :seconds seconds.','2023-10-26 07:13:17','2023-10-26 07:13:17'),(163,1,'en','api','user.incorrect_password','Incorrect Password','2023-10-26 07:13:17','2023-10-26 07:13:17'),(164,1,'en','api','user.password_updated','Password Updated','2023-10-26 07:13:17','2023-10-26 07:13:17'),(165,1,'en','api','user.location_updated','Location Updated','2023-10-26 07:13:17','2023-10-26 07:13:17'),(166,1,'en','api','user.profile_updated','Profile Updated','2023-10-26 07:13:17','2023-10-26 07:13:17'),(167,1,'en','api','user.user_not_found','User Not Found','2023-10-26 07:13:17','2023-10-26 07:13:17'),(168,1,'en','api','user.not_paid','User Not Paid','2023-10-26 07:13:17','2023-10-26 07:13:17'),(169,1,'en','api','ride.request_inprogress','Already Request in Progress','2023-10-26 07:13:17','2023-10-26 07:13:17'),(170,1,'en','api','ride.no_providers_found','No Providers Found','2023-10-26 07:13:17','2023-10-26 07:13:17'),(171,1,'en','api','ride.request_cancelled','Your Ride Cancelled','2023-10-26 07:13:17','2023-10-26 07:13:17'),(172,1,'en','api','ride.already_cancelled','Already Ride Cancelled','2023-10-26 07:13:17','2023-10-26 07:13:17'),(173,1,'en','api','ride.already_onride','Already You are Onride','2023-10-26 07:13:17','2023-10-26 07:13:17'),(174,1,'en','api','ride.provider_rated','Provider Rated','2023-10-26 07:13:17','2023-10-26 07:13:17'),(175,1,'en','api','ride.request_scheduled','Ride Already Scheduled','2023-10-26 07:13:17','2023-10-26 07:13:17'),(176,1,'en','api','ride.request_already_scheduled','Ride Already Scheduled','2023-10-26 07:13:17','2023-10-26 07:13:17'),(177,1,'en','api','something_went_wrong','Something Went Wrong','2023-10-26 07:13:17','2023-10-26 07:13:17'),(178,1,'en','api','logout_success','Logged out Successfully','2023-10-26 07:13:17','2023-10-26 07:13:17'),(179,1,'en','api','services_not_found','Services Not Found','2023-10-26 07:13:17','2023-10-26 07:13:17'),(180,1,'en','api','promocode_applied','Promocode Applied','2023-10-26 07:13:17','2023-10-26 07:13:17'),(181,1,'en','api','promocode_expired','Promocode Expired','2023-10-26 07:13:17','2023-10-26 07:13:17'),(182,1,'en','api','promocode_already_in_user','Promocode Already in Use','2023-10-26 07:13:17','2023-10-26 07:13:17'),(183,1,'en','api','paid','Paid','2023-10-26 07:13:17','2023-10-26 07:13:17'),(184,1,'en','api','added_to_your_wallet','Added to your Wallet','2023-10-26 07:13:17','2023-10-26 07:13:17'),(185,1,'en','api','push.request_accepted','Your Ride Accepted by a Provider','2023-10-26 07:13:17','2023-10-26 07:13:17'),(186,1,'en','api','push.arrived','Provider Arrived at your Location','2023-10-26 07:13:17','2023-10-26 07:13:17'),(187,1,'en','api','push.incoming_request','New Incoming Ride','2023-10-26 07:13:17','2023-10-26 07:13:17'),(188,1,'en','api','push.added_money_to_wallet',' Added to your Wallet','2023-10-26 07:13:17','2023-10-26 07:13:17'),(189,1,'en','api','push.charged_from_wallet',' Charged from your Wallet','2023-10-26 07:13:17','2023-10-26 07:13:17'),(190,1,'en','api','push.document_verfied','Your Documents are verified, Now you are ready to Start your Business','2023-10-26 07:13:17','2023-10-26 07:13:17'),(191,1,'en','api','push.provider_not_available','Sorry for inconvience time, Our partner are busy. Please try after some time','2023-10-26 07:13:17','2023-10-26 07:13:17'),(192,1,'en','api','push.user_cancelled','User Cancelled the Ride','2023-10-26 07:13:17','2023-10-26 07:13:17'),(193,1,'en','api','push.provider_cancelled','Provider Cancelled the Ride','2023-10-26 07:13:17','2023-10-26 07:13:17'),(194,1,'en','api','push.schedule_start','Your schedule ride has been started','2023-10-26 07:13:17','2023-10-26 07:13:17'),(195,1,'en','api','push.ride_scheduled','Your Service has been Scheduled','2023-10-26 07:13:17','2023-10-26 07:13:17'),(196,1,'en','main','user','User','2023-10-26 07:13:17','2023-10-26 07:13:17'),(197,1,'en','main','provider','Provider','2023-10-26 07:13:17','2023-10-26 07:13:17'),(198,1,'en','main','service','Service','2023-10-26 07:13:17','2023-10-26 07:13:17');
/*!40000 ALTER TABLE `ltm_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_04_02_193005_create_translations_table',1),(2,'2014_10_12_000000_create_users_table',1),(3,'2014_10_12_100000_create_password_resets_table',1),(4,'2015_08_25_172600_create_settings_table',1),(5,'2016_06_01_000001_create_oauth_auth_codes_table',1),(6,'2016_06_01_000002_create_oauth_access_tokens_table',1),(7,'2016_06_01_000003_create_oauth_refresh_tokens_table',1),(8,'2016_06_01_000004_create_oauth_clients_table',1),(9,'2016_06_01_000005_create_oauth_personal_access_clients_table',1),(10,'2017_01_11_180503_create_admins_table',1),(11,'2017_01_11_180511_create_providers_table',1),(12,'2017_01_11_181312_create_cards_table',1),(13,'2017_01_11_181357_create_chats_table',1),(14,'2017_01_11_181558_create_promocodes_table',1),(15,'2017_01_11_182454_create_provider_documents_table',1),(16,'2017_01_11_182536_create_provider_services_table',1),(17,'2017_01_11_182649_create_user_requests_table',1),(18,'2017_01_11_182717_create_request_filters_table',1),(19,'2017_01_11_182738_create_service_types_table',1),(20,'2017_01_25_172422_create_documents_table',1),(21,'2017_01_31_122021_create_provider_devices_table',1),(22,'2017_02_02_192703_create_user_request_ratings_table',1),(23,'2017_02_06_080124_create_user_request_payments_table',1),(24,'2017_02_14_135859_create_provider_profiles_table',1),(25,'2017_02_21_131429_create_promocode_usages_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_access_tokens`
--

DROP TABLE IF EXISTS `oauth_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_access_tokens` (
  `id` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `user_id` int DEFAULT NULL,
  `client_id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `scopes` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_access_tokens_user_id_index` (`user_id`),
  KEY `oauth_access_tokens_client_id_index` (`client_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_access_tokens`
--

LOCK TABLES `oauth_access_tokens` WRITE;
/*!40000 ALTER TABLE `oauth_access_tokens` DISABLE KEYS */;
INSERT INTO `oauth_access_tokens` VALUES ('ddaae9a476ca8a5c795ead56aafd46762f46e67ab491beff60b6af3f06b215ff0bcf13adf0231c5c',31,2,NULL,'[]',0,'2018-12-23 10:31:59','2018-12-23 10:31:59','2019-01-07 10:31:59');
/*!40000 ALTER TABLE `oauth_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_auth_codes`
--

DROP TABLE IF EXISTS `oauth_auth_codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_auth_codes` (
  `id` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `user_id` int NOT NULL,
  `client_id` int NOT NULL,
  `scopes` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_auth_codes`
--

LOCK TABLES `oauth_auth_codes` WRITE;
/*!40000 ALTER TABLE `oauth_auth_codes` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth_auth_codes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_clients`
--

DROP TABLE IF EXISTS `oauth_clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_clients` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `secret` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `redirect` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_clients_user_id_index` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_clients`
--

LOCK TABLES `oauth_clients` WRITE;
/*!40000 ALTER TABLE `oauth_clients` DISABLE KEYS */;
INSERT INTO `oauth_clients` VALUES (1,NULL,'Tranxit Personal Access Client','s4TZtAGFoPoShm2olvl7szz1HUxJAbSx18JU6mx0','http://localhost',1,0,0,'2018-12-23 10:23:25','2018-12-23 10:23:25'),(2,NULL,'Tranxit Password Grant Client','e5lxjm6m9xnGD7TETzsHzuKZmweaCcFY0BPRfvqr','http://localhost',0,1,0,'2018-12-23 10:23:25','2018-12-23 10:23:25');
/*!40000 ALTER TABLE `oauth_clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_personal_access_clients`
--

DROP TABLE IF EXISTS `oauth_personal_access_clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_personal_access_clients` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `client_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_personal_access_clients_client_id_index` (`client_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_personal_access_clients`
--

LOCK TABLES `oauth_personal_access_clients` WRITE;
/*!40000 ALTER TABLE `oauth_personal_access_clients` DISABLE KEYS */;
INSERT INTO `oauth_personal_access_clients` VALUES (1,1,'2018-12-23 10:23:25','2018-12-23 10:23:25');
/*!40000 ALTER TABLE `oauth_personal_access_clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_refresh_tokens`
--

DROP TABLE IF EXISTS `oauth_refresh_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_refresh_tokens` (
  `id` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `access_token_id` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_refresh_tokens`
--

LOCK TABLES `oauth_refresh_tokens` WRITE;
/*!40000 ALTER TABLE `oauth_refresh_tokens` DISABLE KEYS */;
INSERT INTO `oauth_refresh_tokens` VALUES ('a605b340065f48013cbffcc132c67b412762d3a2826745f4c56205786c6c5dfd8227e32791d9e466','ddaae9a476ca8a5c795ead56aafd46762f46e67ab491beff60b6af3f06b215ff0bcf13adf0231c5c',0,'2019-03-23 10:31:59');
/*!40000 ALTER TABLE `oauth_refresh_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`),
  KEY `password_resets_token_index` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
INSERT INTO `password_resets` VALUES ('divyeshparmar112001@gmail.com','c2eb79941bd03766d14013be8f0e8d84d810afd64cf94f53b3ca34e5f6034ee5','2023-09-26 08:12:26');
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promocode_usages`
--

DROP TABLE IF EXISTS `promocode_usages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promocode_usages` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `promocode_id` int NOT NULL,
  `status` enum('ADDED','USED','EXPIRED') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promocode_usages`
--

LOCK TABLES `promocode_usages` WRITE;
/*!40000 ALTER TABLE `promocode_usages` DISABLE KEYS */;
/*!40000 ALTER TABLE `promocode_usages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promocodes`
--

DROP TABLE IF EXISTS `promocodes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promocodes` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `promo_code` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `discount` double(10,2) NOT NULL DEFAULT '0.00',
  `expiration` datetime NOT NULL,
  `status` enum('ADDED','EXPIRED') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promocodes`
--

LOCK TABLES `promocodes` WRITE;
/*!40000 ALTER TABLE `promocodes` DISABLE KEYS */;
INSERT INTO `promocodes` VALUES (1,'Divyesh45',21.00,'2023-09-30 00:00:00','EXPIRED','2023-09-27 04:52:58','2023-10-04 02:01:03');
/*!40000 ALTER TABLE `promocodes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provider_devices`
--

DROP TABLE IF EXISTS `provider_devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `provider_devices` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `provider_id` int NOT NULL,
  `udid` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `sns_arn` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `type` enum('android','ios') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provider_devices`
--

LOCK TABLES `provider_devices` WRITE;
/*!40000 ALTER TABLE `provider_devices` DISABLE KEYS */;
/*!40000 ALTER TABLE `provider_devices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provider_documents`
--

DROP TABLE IF EXISTS `provider_documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `provider_documents` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `provider_id` int NOT NULL,
  `document_id` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `url` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `unique_id` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `status` enum('ASSESSING','ACTIVE') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provider_documents`
--

LOCK TABLES `provider_documents` WRITE;
/*!40000 ALTER TABLE `provider_documents` DISABLE KEYS */;
INSERT INTO `provider_documents` VALUES (97,61,'1','1741695905086_Motorola edge 50 fusion.png','U','ACTIVE',NULL,'2025-03-11 12:25:05',NULL),(98,60,'1','1741696256776_Motorola edge 50 fusion.png','UID_788442','ACTIVE',NULL,'2025-03-11 12:30:56',NULL),(99,60,'2','1741696256776_Redmi 10 5g.png','UID_492017','ACTIVE',NULL,'2025-03-11 12:30:56',NULL),(100,60,'3','1741696256779_Apple MacBook AIR M2.webp','UID_608382','ACTIVE',NULL,'2025-03-11 12:30:56',NULL),(101,60,'4','1741696256780_Apple 10.webp','UID_608050','ACTIVE',NULL,'2025-03-11 12:30:56',NULL),(102,60,'5','1741696256780_moto g45 5g.webp','UID_623301','ACTIVE',NULL,'2025-03-11 12:30:56',NULL),(103,61,'2','1741696353080_Extrnal guide.png','UID_213475','ACTIVE',NULL,'2025-03-11 12:32:33',NULL),(104,61,'3','1741696353082_Mysy.png','UID_681529','ACTIVE',NULL,'2025-03-11 12:32:33',NULL),(105,61,'4','1741696353082_Result.png','UID_223274','ACTIVE',NULL,'2025-03-11 12:32:33',NULL),(106,61,'5','1741696353084_Project details.png','UID_353248','ACTIVE',NULL,'2025-03-11 12:32:33',NULL),(107,61,'6','1741696353085_Screenshot 2025-01-22 170533.png','UID_853786','ACTIVE',NULL,'2025-03-11 12:32:33',NULL),(108,61,'7','1741696353086_Screenshot 2025-01-28 125838.png','UID_449834','ACTIVE',NULL,'2025-03-11 12:32:33',NULL),(109,61,'8','1741696353086_Screenshot 2025-01-28 160037.png','UID_150069','ACTIVE',NULL,'2025-03-11 12:32:33',NULL),(110,61,'9','1741696353087_Mysy Student Status .png','UID_274403','ACTIVE',NULL,'2025-03-11 12:32:33',NULL);
/*!40000 ALTER TABLE `provider_documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provider_profiles`
--

DROP TABLE IF EXISTS `provider_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `provider_profiles` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `provider_id` int NOT NULL,
  `language` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `address_secondary` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `city` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `country` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `postal_code` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provider_profiles`
--

LOCK TABLES `provider_profiles` WRITE;
/*!40000 ALTER TABLE `provider_profiles` DISABLE KEYS */;
INSERT INTO `provider_profiles` VALUES (1,32,NULL,'100 Johannesburg road',NULL,NULL,NULL,NULL,'2018-12-22 19:32:01','2018-12-22 19:32:01'),(2,35,NULL,'Premal Apartment, Thaltej, Ahmedabad',NULL,NULL,NULL,NULL,'2023-09-22 03:17:37','2023-09-22 03:17:37'),(3,34,NULL,'Premal Apartment, Thaltej, Ahmedabad',NULL,NULL,NULL,NULL,'2023-09-28 00:39:29','2023-09-28 00:39:29'),(4,37,NULL,'',NULL,NULL,NULL,NULL,'2023-10-26 03:53:10','2023-10-26 03:53:10'),(8,52,NULL,NULL,NULL,NULL,NULL,NULL,'2025-02-14 13:17:36',NULL),(9,53,'hindi','S.G.highway',NULL,NULL,NULL,NULL,'2025-02-14 13:33:04','2025-02-27 13:31:11'),(10,54,NULL,NULL,NULL,NULL,NULL,NULL,'2025-02-14 13:34:28',NULL),(11,55,'','Taluka heth office near jetpur rode dhoraji',NULL,NULL,NULL,NULL,'2025-02-18 11:54:59','2025-02-18 11:55:30'),(12,56,NULL,NULL,NULL,NULL,NULL,NULL,'2025-02-27 13:13:28',NULL),(13,57,NULL,NULL,NULL,NULL,NULL,NULL,'2025-02-28 08:06:11',NULL),(14,58,NULL,NULL,NULL,NULL,NULL,NULL,'2025-03-03 04:42:09',NULL),(15,61,'','asd',NULL,NULL,NULL,NULL,'2025-03-04 09:43:39','2025-04-04 05:32:31'),(16,62,NULL,NULL,NULL,NULL,NULL,NULL,'2025-03-12 07:51:05',NULL),(17,63,NULL,NULL,NULL,NULL,NULL,NULL,'2025-04-02 07:45:54',NULL);
/*!40000 ALTER TABLE `provider_profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provider_services`
--

DROP TABLE IF EXISTS `provider_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `provider_services` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `provider_id` int NOT NULL,
  `service_type_id` int NOT NULL DEFAULT '0',
  `status` enum('active','offline','riding') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `service_number` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `service_model` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=207 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provider_services`
--

LOCK TABLES `provider_services` WRITE;
/*!40000 ALTER TABLE `provider_services` DISABLE KEYS */;
INSERT INTO `provider_services` VALUES (2,2,1,'active',NULL,NULL,'2018-12-22 18:12:38','2018-12-22 18:12:38'),(3,3,1,'active',NULL,NULL,'2018-12-22 18:12:38','2018-12-22 18:12:38'),(4,4,1,'active',NULL,NULL,'2018-12-22 18:12:38','2018-12-22 18:12:38'),(5,5,1,'active',NULL,NULL,'2018-12-22 18:12:38','2018-12-22 18:12:38'),(6,6,1,'active',NULL,NULL,'2018-12-22 18:12:38','2018-12-22 18:12:38'),(7,7,1,'active',NULL,NULL,'2018-12-22 18:12:38','2018-12-22 18:12:38'),(8,8,1,'active',NULL,NULL,'2018-12-22 18:12:38','2018-12-22 18:12:38'),(9,9,1,'active',NULL,NULL,'2018-12-22 18:12:38','2018-12-22 18:12:38'),(10,10,1,'active',NULL,NULL,'2018-12-22 18:12:38','2018-12-22 18:12:38'),(11,11,1,'active',NULL,NULL,'2018-12-22 18:12:38','2018-12-22 18:12:38'),(12,12,1,'active',NULL,NULL,'2018-12-22 18:12:38','2018-12-22 18:12:38'),(13,13,1,'active',NULL,NULL,'2018-12-22 18:12:38','2018-12-22 18:12:38'),(14,14,1,'active',NULL,NULL,'2018-12-22 18:12:38','2018-12-22 18:12:38'),(15,15,1,'active',NULL,NULL,'2018-12-22 18:12:38','2018-12-22 18:12:38'),(16,16,1,'active',NULL,NULL,'2018-12-22 18:12:38','2018-12-22 18:12:38'),(17,17,1,'active',NULL,NULL,'2018-12-22 18:12:38','2018-12-22 18:12:38'),(18,18,1,'active',NULL,NULL,'2018-12-22 18:12:38','2018-12-22 18:12:38'),(19,19,1,'active',NULL,NULL,'2018-12-22 18:12:38','2018-12-22 18:12:38'),(20,20,1,'active',NULL,NULL,'2018-12-22 18:12:38','2018-12-22 18:12:38'),(21,21,1,'active',NULL,NULL,'2018-12-22 18:12:38','2018-12-22 18:12:38'),(22,22,1,'active',NULL,NULL,'2018-12-22 18:12:38','2018-12-22 18:12:38'),(23,23,1,'active',NULL,NULL,'2018-12-22 18:12:38','2018-12-22 18:12:38'),(24,24,1,'active',NULL,NULL,'2018-12-22 18:12:38','2018-12-22 18:12:38'),(25,25,1,'active',NULL,NULL,'2018-12-22 18:12:38','2018-12-22 18:12:38'),(26,26,1,'active',NULL,NULL,'2018-12-22 18:12:38','2018-12-22 18:12:38'),(27,27,1,'active',NULL,NULL,'2018-12-22 18:12:38','2018-12-22 18:12:38'),(28,28,1,'active',NULL,NULL,'2018-12-22 18:12:38','2018-12-22 18:12:38'),(29,29,1,'active',NULL,NULL,'2018-12-22 18:12:38','2018-12-22 18:12:38'),(30,30,1,'active',NULL,NULL,'2018-12-22 18:12:38','2018-12-22 18:12:38'),(31,35,2,'active',NULL,NULL,'2023-09-22 03:20:54','2023-09-22 03:27:47'),(35,32,1,'offline',NULL,NULL,'2023-09-29 01:30:29','2023-09-29 01:30:29'),(40,28,2,'offline',NULL,NULL,'2023-09-29 06:43:24','2023-09-29 06:43:24'),(44,33,1,'offline',NULL,NULL,'2023-10-03 02:07:11','2023-10-03 02:07:11'),(45,31,3,'offline',NULL,NULL,'2023-10-03 04:55:16','2023-10-03 04:55:16'),(47,36,1,'offline',NULL,NULL,'2023-10-04 02:04:09','2023-10-04 02:04:09'),(48,36,2,'offline',NULL,NULL,'2023-10-04 02:04:15','2023-10-04 02:04:15'),(51,34,2,'offline',NULL,NULL,'2023-10-26 05:35:57','2023-10-26 05:35:57'),(108,58,3,'active',NULL,NULL,'2025-03-04 05:10:47',NULL),(112,37,1,'active',NULL,NULL,'2025-03-04 09:38:14',NULL),(114,47,2,'active',NULL,NULL,'2025-03-04 13:11:49',NULL),(144,37,2,'active',NULL,NULL,'2025-03-19 05:40:51',NULL),(156,59,2,'active',NULL,NULL,'2025-03-19 06:51:27',NULL),(157,59,3,'active',NULL,NULL,'2025-03-19 06:51:40',NULL),(170,59,1,'active',NULL,NULL,'2025-03-19 10:50:00',NULL),(171,59,4,'active',NULL,NULL,'2025-03-19 10:50:03',NULL),(198,61,1,'active',NULL,NULL,'2025-03-28 13:19:01','2025-05-11 13:30:30'),(199,60,1,'active',NULL,NULL,'2025-04-01 07:43:56',NULL),(200,60,2,'active',NULL,NULL,'2025-04-01 07:43:58',NULL),(201,60,4,'active',NULL,NULL,'2025-04-01 07:43:59',NULL),(202,60,5,'active',NULL,NULL,'2025-04-01 07:44:00',NULL),(203,60,3,'active',NULL,NULL,'2025-04-01 07:44:01',NULL),(206,63,1,'active',NULL,NULL,'2025-05-11 13:29:22',NULL);
/*!40000 ALTER TABLE `provider_services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `providers`
--

DROP TABLE IF EXISTS `providers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `providers` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `last_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `mobile` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `rating` decimal(4,2) NOT NULL DEFAULT '5.00',
  `status` enum('Approved','Banned','Onboarding') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT 'Onboarding',
  `latitude` double(15,8) DEFAULT NULL,
  `longitude` double(15,8) DEFAULT NULL,
  `rating_count` int NOT NULL DEFAULT '0',
  `otp` int NOT NULL DEFAULT '0',
  `remember_token` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `providers_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `providers`
--

LOCK TABLES `providers` WRITE;
/*!40000 ALTER TABLE `providers` DISABLE KEYS */;
INSERT INTO `providers` VALUES (1,'Appoets','Demo','demo@appoets.com',NULL,'$2y$10$UAvnBSvWUwIsOWlifQSv1urt9A.6GgEoKMd.Eo.fj7RNZywzB9aZi','http://lorempixel.com/512/512/business/Xuber-Services',NULL,5.00,'Approved',26.90752400,75.73963900,0,0,NULL,'2010-12-22 18:12:36','2018-12-22 18:12:36'),(2,'Thomas','Jenkins','thomas@appoets.com',NULL,'$2y$10$KRd1Rjntc58MSXhyAj9yyuaIAEKtEw4IxbvqOSX88quAKyqyQ/sBC','http://lorempixel.com/512/512/business/Xuber-Services',NULL,5.00,'Approved',12.12000000,76.68000000,0,0,NULL,'2018-12-22 18:12:36','2018-12-22 18:12:36'),(3,'Rachel','Burns','rachel@appoets.com',NULL,'$2y$10$T84lyUEYR.laSfvAC4tSbuWVUe20oMlnKgbKuVTKXiGLDSXANItQK','http://lorempixel.com/512/512/business/Xuber-Services',NULL,5.00,'Approved',24.87999900,74.62999700,0,0,NULL,'2018-12-22 18:12:36','2018-12-22 18:12:36'),(4,'Lorraine','Harris','lorraine@appoets.com',NULL,'$2y$10$KfDRVsxGq3bJwCaPN/xXwu7q/Uk2hRwV8WduhLZ0X.xIzh/89pqIq','http://lorempixel.com/512/512/business/Xuber-Services',NULL,5.00,'Approved',16.99444400,73.30000300,0,0,NULL,'2018-12-22 18:12:36','2018-12-22 18:12:36'),(5,'Adam','Wagner','adam@appoets.com',NULL,'$2y$10$uVxcZ9XyWJXrsj4LxzObNe9UBd.WqXQrFCJpheUbQqsYaKV6RAJBu','http://lorempixel.com/512/512/business/Xuber-Services',NULL,5.00,'Approved',21.25000000,81.62999700,0,0,NULL,'2018-12-22 18:12:36','2018-12-22 18:12:36'),(6,'Christine','Forshee','christine@appoets.com',NULL,'$2y$10$.WlVHchg4.RZlimedtlnAOn6eHY1LoyvSegzU.SD2hr0oov.XdbA.','http://lorempixel.com/512/512/business/Xuber-Services',NULL,5.00,'Approved',26.85000000,80.94999700,0,0,NULL,'2018-12-22 18:12:36','2018-12-22 18:12:36'),(7,'Logan','Arce','logan@appoets.com',NULL,'$2y$10$dlo/HN2lNEv.gCZjckjTRekc0O7A9UTtawnIOGoDm02Vd56vP3QFq','http://lorempixel.com/512/512/business/Xuber-Services',NULL,5.00,'Approved',28.67907900,77.06971000,0,0,NULL,'2018-12-22 18:12:36','2018-12-22 18:12:36'),(8,'Joe','Demo','joe@appoets.com',NULL,'$2y$10$EKhEZtyEdq/YiM0Z9.Fom.h8LIoOMJ6T.BcGR9oJ4Of4hlfPkIDFm','http://lorempixel.com/512/512/business/Xuber-Services',NULL,5.00,'Approved',13.00000000,80.00000000,0,0,NULL,'2018-12-22 18:12:36','2018-12-22 18:12:36'),(9,'Price','Jett','price@appoets.com',NULL,'$2y$10$jkWwwVuEPCYkKlzA7iYuGOEmNVmLyquL3pEuMq9jGxRLaym.VPiVW','http://lorempixel.com/512/512/business/Xuber-Services',NULL,5.00,'Approved',24.63356800,87.84925100,0,0,NULL,'2018-12-22 18:12:37','2018-12-22 18:12:37'),(10,'Lloyd','Bradley','lloyd@appoets.com',NULL,'$2y$10$m1qTGdoGNAnzSIpqypl4z.tIUcw2uu5Yqx0dexsi0wtzZ0zOdFMny','http://lorempixel.com/512/512/business/Xuber-Services',NULL,5.00,'Approved',22.72839200,71.63707700,0,0,NULL,'2018-12-22 18:12:37','2018-12-22 18:12:37'),(11,'Evans','Thompson','evans@appoets.com',NULL,'$2y$10$1aH6I0E697nKCKAcCKqseO8.VmU3xyTSA3wCptioO42lV2Vctla3C','http://lorempixel.com/512/512/business/Xuber-Services',NULL,5.00,'Approved',9.38345200,76.57405900,0,0,NULL,'2018-12-22 18:12:37','2018-12-22 18:12:37'),(12,'Jerry','Neely','jerry@appoets.com',NULL,'$2y$10$VA.AHkpzVMYIxMf8PBm94.1JId80BaLdwbtbXORlDiQT2XAupTjIG','http://lorempixel.com/512/512/business/Xuber-Services',NULL,5.00,'Approved',23.84932500,72.12662500,0,0,NULL,'2018-12-22 18:12:37','2018-12-22 18:12:37'),(13,'Teresa','Vaughn','teresa@appoets.com',NULL,'$2y$10$PBA5wQe1jTN0t1.6VMEGseTYHg5TH1Vy2d3KgbgK1sWXDBx1VFeD.','http://lorempixel.com/512/512/business/Xuber-Services',NULL,5.00,'Approved',21.10500100,71.77164500,0,0,NULL,'2018-12-22 18:12:37','2018-12-22 18:12:37'),(14,'Sarah','Gibson','sarah@appoets.com',NULL,'$2y$10$.aOEItKRzcatkHbPX2Aa0.18DqmhPlTL1zQLCXfMpLKqPZQKWZyAG','http://lorempixel.com/512/512/business/Xuber-Services',NULL,5.00,'Approved',8.89321200,76.61414300,0,0,NULL,'2018-12-22 18:12:37','2018-12-22 18:12:37'),(15,'Regina','Delacruz','regina@appoets.com',NULL,'$2y$10$XKaErnXFMmQZySjkTO8B6OnnCDOYkNbZAkQ.pVgq4JQBnF5MgGL8m','http://lorempixel.com/512/512/business/Xuber-Services',NULL,5.00,'Approved',22.96051000,88.56740600,0,0,NULL,'2018-12-22 18:12:37','2018-12-22 18:12:37'),(16,'Anthony','Ferguson','anthony@appoets.com',NULL,'$2y$10$GKqMzJHGibhCmYFuOXFoUeOPHU/FBdlXQ2fDUlb/nQPMxemAZfbKm','http://lorempixel.com/512/512/business/Xuber-Services',NULL,5.00,'Approved',22.65601500,86.35288200,0,0,NULL,'2018-12-22 18:12:37','2018-12-22 18:12:37'),(17,'Gary','Maple','rasheed@appoets.com',NULL,'$2y$10$efkWeqzWl8XnHa6D2pm.5.9lj1y22BcwYL/RXk7nK1Tdt2G5ksNra','http://lorempixel.com/512/512/business/Xuber-Services',NULL,5.00,'Approved',13.00000000,80.00000000,0,0,NULL,'2018-12-22 18:12:37','2018-12-22 18:12:37'),(18,'Robert','Ferguson','jack@appoets.com',NULL,'$2y$10$6T17kV9nTRzG6mSAdR5Cwe8220j6ttrKTg04QLpqiTBxMt003QIIS','http://lorempixel.com/512/512/business/Xuber-Services',NULL,5.00,'Approved',21.96194600,70.79229700,0,0,NULL,'2018-12-22 18:12:37','2018-12-22 18:12:37'),(19,'Charles','Ferguson','bobby@appoets.com',NULL,'$2y$10$NoDa6b5cgOaPvNX1pt3edushtKav0T2Zjkwiqmydj2XrLje0Ax3xC','http://lorempixel.com/512/512/business/Xuber-Services',NULL,5.00,'Approved',21.19044900,81.28492000,0,0,NULL,'2018-12-22 18:12:37','2018-12-22 18:12:37'),(20,'Michael','Ferguson','chunky@appoets.com',NULL,'$2y$10$Odyhf8Yk8zfYxjs9cTOMveYMXSn8p9WhgQLaOA753Ub9jO5mPupW.','http://lorempixel.com/512/512/business/Xuber-Services',NULL,5.00,'Approved',23.59796900,72.96981800,0,0,NULL,'2018-12-22 18:12:37','2018-12-22 18:12:37'),(21,'Patrick','Ferguson','silk@appoets.com',NULL,'$2y$10$w0L9bV5XUxSosKSiFQRrUOGCdD2cCOBPNpT02eUPKOoN45ZfymfGK','http://lorempixel.com/512/512/business/Xuber-Services',NULL,5.00,'Approved',25.36917900,85.53006000,0,0,NULL,'2018-12-22 18:12:37','2018-12-22 18:12:37'),(22,'Arturo','Arturo','gil@appoets.com',NULL,'$2y$10$USYgggysZ.Ku/4LdAHmV5upKpBc75sphpOJ2nExMgu9oG0dkNRPVO','http://lorempixel.com/512/512/business/Xuber-Services',NULL,5.00,'Approved',11.62337700,92.72648600,0,0,NULL,'2018-12-22 18:12:38','2018-12-22 18:12:38'),(23,'Anthony','Ken','stego@appoets.com',NULL,'$2y$10$rmZpVVB.IOdKSH029ChHuetTXb2qZ7kDmq0N1TbDT/HyITeoLT.Di','http://lorempixel.com/512/512/business/Xuber-Services',NULL,5.00,'Approved',23.54675700,74.43383000,0,0,NULL,'2018-12-22 18:12:38','2018-12-22 18:12:38'),(24,'Anthony','Clinton','rodney@appoets.com',NULL,'$2y$10$6prK07VwHIS5bltDkEFM7.06aQ5IVGzCTAcgmm9x.gIF6cHnjuja6','http://lorempixel.com/512/512/business/Xuber-Services',NULL,5.00,'Approved',29.85426300,77.88800000,0,0,NULL,'2018-12-22 18:12:38','2018-12-22 18:12:38'),(25,'Gabriel','Ferguson','spork@appoets.com',NULL,'$2y$10$yeInKZ4i41k95fiWLFxpauamtGeSivf.trZylG6Zd9GTvKTsvGQ3y','http://lorempixel.com/512/512/business/Xuber-Services',NULL,5.00,'Approved',23.17393900,81.56512500,0,0,NULL,'2018-12-22 18:12:38','2018-12-22 18:12:38'),(26,'Paul','Ferguson','paul@appoets.com',NULL,'$2y$10$/JBHFdYi7hbPuAuRtx3nz.QLgfpWpRy.K3pg33RgS3i/vK09Ek1vi','http://lorempixel.com/512/512/business/Xuber-Services',NULL,5.00,'Approved',32.04194300,75.40533400,0,0,NULL,'2018-12-22 18:12:38','2018-12-22 18:12:38'),(27,'Gabriel','Giuseppe','giuseppe@appoets.com',NULL,'$2y$10$ITF5oh2/h7tmoXuFVeKEaOt3FBygMTnNpDCbhMe9Au3KF5Bl1dLEy','http://lorempixel.com/512/512/business/Xuber-Services',NULL,5.00,'Approved',25.20480000,55.27080000,0,0,NULL,'2018-12-22 18:12:38','2018-12-22 18:12:38'),(28,'Pog','Ferguson','pog@appoets.com',NULL,'$2y$10$fMw2qmrOyCCIFVKMdAKk9uvPjg5wF1z4hNhVUro/0iI2rjqvPgeX2','http://lorempixel.com/512/512/business/Xuber-Services',NULL,5.00,'Approved',13.12000000,80.00000000,0,0,NULL,'2018-12-22 18:12:38','2018-12-22 18:12:38'),(29,'Steve','Ferguson','steve@appoets.com ',NULL,'$2y$10$2XjtDOtUEPNXM8pkHWGLxumCD9ibrEmbquXVvvIjYARPMXfIsZeA6','http://lorempixel.com/512/512/business/Xuber-Services',NULL,5.00,'Approved',13.12340000,80.00000000,0,0,NULL,'2018-12-22 18:12:38','2018-12-22 18:12:38'),(30,'Pog','AJJS','beauregard@appoets.com',NULL,'$2y$10$A2iug/4xCaKX5bSQgnADeep30Ddy86jf8fInJbEWYGs7KCAHUKTte','http://lorempixel.com/512/512/business/Xuber-Services',NULL,5.00,'Approved',13.00000001,80.00000000,0,0,NULL,'2018-12-22 18:12:38','2023-10-03 04:17:18'),(31,'Shripal','Jadhav ','jadhavshripal510@gmail.com',NULL,'$2y$10$0hTf.knG/ZYPF/aM3oTQw.OYx0KG6dER7GYn9.JEDblWHng85lJja',NULL,NULL,5.00,'Approved',24.52007790,72.88387530,0,0,NULL,'2018-12-22 18:18:40','2023-10-26 05:32:48'),(32,'Bideen','Younus','bideenyounus@gmail.com','0838425881','$2y$10$75A5DuQjr9rcdD6BCVqIluNs7RylVQ8Na3kvtCwIQPVKOhjId8.dC',NULL,NULL,5.00,'Approved',24.52596100,72.88387530,0,0,'ZhR13Vv5SSQ51SdNyKM6iEx70PcvhTr3EaB1qQzfoRQp2wihVkWccTcHyrZW','2018-12-22 19:27:42','2018-12-22 19:52:24'),(33,'shripal','jadhav','provider@gmail.com',NULL,'$2y$10$1wDmSbQJYePQXtgWp0jNfehwOQ8pcFewETxGEt3JUvbCYtY0JF1yK',NULL,NULL,3.00,'Approved',24.45597790,72.88387530,0,0,NULL,'2018-12-23 07:46:05','2018-12-23 07:46:05'),(34,'Divyesh','provider','admin@xuber.com','9328487662','$2y$10$mieJc.7PYSKM2y924a8mye6QJBDV/GfqBSfD4lLGACtcbDRobYeJe','provider/profile/aeb094deae0ed87c8172fe5c0dba8054.png',NULL,1.00,'Approved',24.52597790,72.88387530,0,0,'0YpI3k6FRuPIukF8d8WFtyQ3dzim2TCUCnwIVfr85ggmFaWyHuyi7klz3XRO','2023-09-20 01:12:43','2024-01-10 00:41:46'),(36,'fenil','provider','fenil@gmail.com',NULL,'$2y$10$adRUFfM5FdlLUJiNwLEzv.g.26oTfvejBcxCmgRZO53JCwM/LZnje',NULL,NULL,4.00,'Approved',19.52597790,53.88387530,0,0,NULL,'2023-10-03 01:49:38','2023-10-03 06:07:27'),(37,'Rajesh','provider','rajesh.kumar@hexagoninfosoft.in','78678','$2y$10$kkSVrTsDR13mdx4HWLYXBO5BR3aaQCZ85IyEbm31GNkWRO0/McoBy',NULL,NULL,3.00,'Approved',18.52597754,74.88387530,0,0,'4THiEQVQx6r2F3mKVrAQ8DYj0hp7fqIPi86WBcqzf9aRIQmldyjDF6qBZ91P','2023-10-04 03:13:38','2023-10-27 01:50:11'),(59,'jay','provider','jay@gmail.com','1234567890','$2a$10$nwaSLj2rrQXj.0viUTvCQecM1hvYwh3QCb7JHPgQHvZZJuC/Ntim2','1740977826033_Flower.jpg',NULL,2.00,'Approved',18.53597790,73.88387530,0,0,NULL,'2025-03-03 04:57:06',NULL),(60,'hi','provider','hi@gmail.com','0840176917','$2a$10$F35dakQ6/kjYz4d8RsWDCO9zzvy.7igCMI.zzDm5oXgnUg3zsfr.i','1741341873386_Flower.jpg',NULL,3.00,'Approved',18.52597790,73.88387530,0,0,NULL,'2025-03-03 05:00:35','2025-03-07 10:04:33'),(61,'Krunal','provider','provider@krunal.com','2143245566','$2a$10$Zdyr0RAp1hnZfP5xPqNcQeh0U37BjzByTYdPxsseZqgCcuG4jajAG','1743744751579_Panda.jpg','',4.00,'Approved',21.73481200,70.44915380,0,0,NULL,'2025-03-04 09:43:39','2025-04-04 05:32:31'),(63,'hi','as','Provider1020@gmail.com','7043754777','$2a$10$/7rWv.K0xW/efRWkJ8V0IeYcZNEyRP3tOxq2oKg4eSWkMfFVfAi8e',NULL,NULL,3.40,'Approved',22.84254910,79.74869210,0,0,NULL,'2025-04-02 07:45:54',NULL);
/*!40000 ALTER TABLE `providers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request_filters`
--

DROP TABLE IF EXISTS `request_filters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `request_filters` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `request_id` int NOT NULL,
  `provider_id` int NOT NULL,
  `status` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request_filters`
--

LOCK TABLES `request_filters` WRITE;
/*!40000 ALTER TABLE `request_filters` DISABLE KEYS */;
/*!40000 ALTER TABLE `request_filters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_otp_verifications`
--

DROP TABLE IF EXISTS `service_otp_verifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_otp_verifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `request_id` int DEFAULT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `provider_id` int DEFAULT NULL,
  `otp` varchar(6) DEFAULT NULL,
  `otp_verified` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_otp_verifications`
--

LOCK TABLES `service_otp_verifications` WRITE;
/*!40000 ALTER TABLE `service_otp_verifications` DISABLE KEYS */;
INSERT INTO `service_otp_verifications` VALUES (18,232,'vaishnavkrunal2004@gmail.com',70,61,'912326',0,'2025-03-27 13:04:04',NULL),(19,219,'vaishnavkrunal2004@gmail.com',70,61,'269507',2,'2025-03-27 13:05:38','2025-03-28 06:03:30'),(20,218,'vaishnavkrunal2004@gmail.com',70,61,'678116',0,'2025-03-27 13:14:55','2025-03-27 13:33:19'),(21,221,'vaishnavkrunal2004@gmail.com',70,61,'635467',1,'2025-03-28 05:42:06','2025-03-28 06:01:03'),(22,220,'vaishnavkrunal2004@gmail.com',70,61,'478962',1,'2025-03-28 06:01:51','2025-03-28 06:34:47'),(23,233,'vaishnavkrunal2004@gmail.com',70,61,'810343',1,'2025-03-28 06:03:55','2025-03-28 06:04:03'),(24,238,'vaishnavkrunal2004@gmail.com',70,61,'485331',1,'2025-03-28 06:48:47',NULL),(25,236,'vaishnavkrunal2004@gmail.com',70,61,'467617',1,'2025-03-28 06:55:13',NULL),(26,235,'vaishnavkrunal2004@gmail.com',70,61,'561386',1,'2025-03-28 07:09:57',NULL),(27,234,'vaishnavkrunal2004@gmail.com',70,61,'535610',1,'2025-03-28 07:17:47','2025-03-28 07:18:09'),(28,240,'vaishnavkrunal2004@gmail.com',70,61,'273880',1,'2025-03-28 07:19:03','2025-03-28 07:26:26'),(29,241,'vaishnavkrunal2004@gmail.com',70,61,'201712',1,'2025-03-28 07:27:43',NULL),(30,243,'vaishnavkrunal2004@gmail.com',70,61,'419696',1,'2025-03-28 07:40:26','2025-03-28 08:06:46'),(31,242,'vaishnavkrunal2004@gmail.com',70,61,'237436',1,'2025-03-28 10:48:20',NULL),(32,244,'vaishnavkrunal2004@gmail.com',70,61,'945261',1,'2025-03-28 12:56:10',NULL),(33,247,'vaishnavkrunal2004@gmail.com',70,61,'660034',1,'2025-03-28 13:23:33','2025-03-31 06:22:54'),(34,248,'vaishnavkrunal2004@gmail.com',70,61,'346830',1,'2025-03-28 13:27:40','2025-03-31 06:27:36'),(35,251,'vaishnavkrunal2004@gmail.com',70,61,'544027',1,'2025-03-28 13:38:32',NULL),(36,237,'vaishnavkrunal2004@gmail.com',70,61,'885557',1,'2025-03-31 04:47:26',NULL),(37,245,'vaishnavkrunal2004@gmail.com',70,61,'365861',1,'2025-03-31 04:48:01',NULL),(38,250,'vaishnavkrunal2004@gmail.com',70,61,'458942',1,'2025-03-31 05:30:09',NULL),(39,246,'vaishnavkrunal2004@gmail.com',70,61,'228224',1,'2025-03-31 06:11:43',NULL),(40,249,'vaishnavkrunal2004@gmail.com',70,61,'338748',1,'2025-03-31 06:31:52',NULL),(41,239,'vaishnavkrunal2004@gmail.com',70,61,'668831',1,'2025-03-31 06:39:00',NULL),(42,231,'vaishnavkrunal2004@gmail.com',70,60,'772692',0,'2025-03-31 07:16:56',NULL),(43,253,'vaishnavkrunal2004@gmail.com',70,60,'386202',1,'2025-03-31 07:17:40',NULL),(44,254,'vaishnavkrunal2004@gmail.com',70,60,'594200',1,'2025-03-31 07:20:02',NULL),(45,255,'vaishnavkrunal2004@gmail.com',70,60,'277867',1,'2025-03-31 07:20:44',NULL),(46,256,'vaishnavkrunal2004@gmail.com',70,60,'885938',1,'2025-03-31 07:21:25',NULL),(47,269,'vaishnavkrunal2004@gmail.com',70,59,'969211',1,'2025-04-01 10:11:47',NULL),(48,270,'vaishnavkrunal2004@gmail.com',70,59,'159861',1,'2025-04-01 10:12:43',NULL),(49,266,'vaishnavkrunal2004@gmail.com',70,61,'369386',1,'2025-04-01 10:48:32',NULL),(50,268,'vaishnavkrunal2004@gmail.com',70,61,'398881',1,'2025-04-01 11:10:43',NULL),(51,271,'vaishnavkrunal2004@gmail.com',70,61,'947952',1,'2025-04-01 11:11:11',NULL),(52,272,'vaishnavkrunal2004@gmail.com',70,61,'565152',1,'2025-04-01 13:02:09',NULL),(53,273,'vaishnavkrunal2004@gmail.com',70,61,'962144',1,'2025-04-02 04:40:05',NULL),(54,276,'vaishnavkrunal2004@gmail.com',70,60,'258921',1,'2025-04-02 06:35:16',NULL),(55,275,'vaishnavkrunal2004@gmail.com',70,61,'431910',1,'2025-04-02 07:00:01',NULL),(56,280,'vaishnavkrunal2004@gmail.com',70,63,'358903',1,'2025-04-02 10:23:09',NULL),(57,274,'vaishnavkrunal2004@gmail.com',70,61,'570232',1,'2025-04-02 13:22:46',NULL),(58,277,'vaishnavkrunal2004@gmail.com',70,61,'104542',1,'2025-04-02 13:28:50',NULL),(59,278,'vaishnavkrunal2004@gmail.com',70,61,'778818',1,'2025-04-02 13:33:19',NULL),(60,279,'vaishnavkrunal2004@gmail.com',70,61,'123177',1,'2025-04-03 06:45:11',NULL),(61,281,'vaishnavkrunal2004@gmail.com',70,61,'355587',1,'2025-04-03 06:49:02',NULL),(62,282,'vaishnavkrunal2004@gmail.com',70,63,'398152',1,'2025-04-03 06:56:17',NULL),(63,283,'vaishnavkrunal2004@gmail.com',70,61,'221294',1,'2025-04-03 07:01:34',NULL),(64,286,'johndoe@gmail.com',87,61,'262640',1,'2025-04-04 07:13:17',NULL),(65,287,'johndoe@gmail.com',87,63,'353409',1,'2025-04-04 07:14:45',NULL),(66,289,'johndoe@gmail.com',87,61,'396944',1,'2025-04-04 07:16:48',NULL),(67,292,'johndoe@gmail.com',87,61,'235216',1,'2025-04-04 07:17:46',NULL);
/*!40000 ALTER TABLE `service_otp_verifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_types`
--

DROP TABLE IF EXISTS `service_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_types` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `provider_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `fixed` int DEFAULT NULL,
  `price` int DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_types`
--

LOCK TABLES `service_types` WRITE;
/*!40000 ALTER TABLE `service_types` DISABLE KEYS */;
INSERT INTO `service_types` VALUES (1,'Electrician','Electrician Bhai','https://urban.hexagoninfosoft.in/asset/img/services/electrician.jpg',150,100,NULL,1,'2018-12-22 18:12:33','2018-12-22 18:12:33'),(2,'Plumbing','Plumber Bhai','https://urban.hexagoninfosoft.in/asset/img/services/plumbing.jpg',120,80,NULL,1,'2018-12-22 18:12:33','2018-12-22 18:12:33'),(3,'Carpenter','Carpenter Bhai','https://urban.hexagoninfosoft.in/asset/img/services/carpenter.jpg',200,120,NULL,1,'2018-12-22 18:12:33','2018-12-22 18:12:33'),(4,'Mechanic','Mechanic Bhai','https://urban.hexagoninfosoft.in/asset/img/services/mechanic.jpg',230,130,NULL,1,'2018-12-22 18:12:33','2025-03-05 05:47:54'),(5,'Testing','Testing Bhai','1741343972477_Flower.jpg',110,50,NULL,0,'2025-03-05 06:36:19','2025-03-24 04:34:40');
/*!40000 ALTER TABLE `service_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `settings` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `value` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `settings_key_index` (`key`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES (1,'site_title','Xuber Services'),(2,'site_logo','1742283135083_xuber_logo1.jpg'),(3,'site_mail_icon','1741169524669_Flower.jpg'),(4,'site_icon','1742280561875_Panda.jpg'),(5,'provider_select_timeout','1000'),(6,'search_radius','100'),(7,'base_price','50'),(8,'price_per_minute','50'),(9,'tax_percentage','18'),(10,'stripe_secret_key',''),(11,'stripe_publishable_key',''),(12,'CASH','1'),(13,'CARD','0'),(14,'manual_request','0'),(15,'default_lang','en'),(16,'currency','$'),(17,'scheduled_cancel_time_exceed','10'),(18,'price_per_kilometer','10'),(19,'commission_percentage','20'),(20,'email_logo',''),(21,'play_store_link','afd'),(22,'app_store_link','sdajj'),(23,'daily_target','3'),(24,'surge_percentage','0'),(25,'surge_trigger','0'),(26,'distance','Km'),(27,'demo_mode','0'),(28,'booking_prefix','TRNX'),(29,'daily_target','1'),(30,'contact_number','9876543210'),(31,'contact_email','admin@xuber.com'),(32,'page_privacy',''),(33,'contact_text','We will Contact you soon'),(34,'contact_title','Xuber Services Help');
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_request_payments`
--

DROP TABLE IF EXISTS `user_request_payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_request_payments` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `request_id` int NOT NULL,
  `promocode_id` int DEFAULT NULL,
  `payment_id` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `payment_mode` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `fixed` double(10,2) NOT NULL DEFAULT '0.00',
  `distance` double(10,2) NOT NULL DEFAULT '0.00',
  `commision` double(10,2) NOT NULL DEFAULT '0.00',
  `time_price` double(10,2) NOT NULL DEFAULT '0.00',
  `discount` double(10,2) NOT NULL DEFAULT '0.00',
  `tax` double(10,2) NOT NULL DEFAULT '0.00',
  `wallet` double(10,2) NOT NULL DEFAULT '0.00',
  `total` double(10,2) NOT NULL DEFAULT '0.00',
  `provider_earnings` double(10,2) NOT NULL DEFAULT '0.00',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_request_payments`
--

LOCK TABLES `user_request_payments` WRITE;
/*!40000 ALTER TABLE `user_request_payments` DISABLE KEYS */;
INSERT INTO `user_request_payments` VALUES (36,221,NULL,NULL,'CASH',150.00,518.26,35.41,0.03,0.00,27.00,0.00,177.00,12.00,'2025-03-28 12:44:29',NULL),(37,240,NULL,NULL,'CASH',120.00,1630.16,29.60,5.44,0.00,22.58,0.00,148.00,118.42,'2025-03-28 12:48:32',NULL),(38,244,NULL,NULL,'CASH',120.00,110.52,1232.32,5101.69,0.00,939.90,0.00,6161.00,4929.27,'2025-03-31 04:44:13',NULL),(39,237,NULL,NULL,'CASH',150.00,1630.16,35.43,0.14,0.00,27.02,0.00,177.00,141.73,'2025-03-31 05:03:21',NULL),(40,251,NULL,NULL,'CASH',150.00,505.81,35.42,0.08,0.00,27.02,0.00,177.00,141.68,'2025-03-31 05:03:26',NULL),(41,250,NULL,NULL,'CASH',150.00,505.81,35.47,0.28,0.00,27.05,0.00,177.00,141.86,'2025-03-31 05:31:23',NULL),(42,245,NULL,NULL,'CASH',150.00,1630.16,36.53,4.81,0.00,27.86,0.00,182.00,146.14,'2025-03-31 06:09:01',NULL),(43,246,NULL,NULL,'CASH',120.00,505.81,28.37,0.22,0.00,21.64,0.00,141.86,113.49,'2025-03-31 06:17:20',NULL),(44,247,NULL,NULL,'CASH',150.00,505.81,30.43,2.17,0.00,27.39,0.00,179.56,149.12,'2025-03-31 06:24:42',NULL),(45,248,NULL,NULL,'CASH',150.00,505.81,30.99,4.97,0.00,27.89,0.00,182.87,151.87,'2025-03-31 06:30:54',NULL),(46,249,NULL,NULL,'CASH',150.00,505.81,30.03,0.17,0.00,27.03,0.00,177.20,120.13,'2025-03-31 06:32:17',NULL),(47,239,NULL,NULL,'CASH',150.00,1630.16,33.34,16.69,0.00,30.00,0.00,196.70,133.36,'2025-03-31 06:49:38',NULL),(48,231,NULL,NULL,'CASH',150.00,0.00,1854.23,9121.14,0.00,1668.81,0.00,10939.94,7416.91,'2025-03-31 07:17:05',NULL),(49,253,NULL,NULL,'CASH',150.00,0.00,30.24,1.19,0.00,27.21,0.00,178.41,120.96,'2025-03-31 07:19:18',NULL),(50,254,NULL,NULL,'CASH',150.00,0.00,30.18,0.92,0.00,27.16,0.00,178.08,120.73,'2025-03-31 07:21:12',NULL),(51,255,NULL,NULL,'CASH',150.00,0.00,30.14,0.72,0.00,27.13,0.00,177.85,120.58,'2025-03-31 07:21:45',NULL),(52,256,NULL,NULL,'CASH',150.00,0.00,474.19,2220.97,0.00,426.77,0.00,2797.75,1896.78,'2025-04-01 05:34:27',NULL),(53,269,NULL,NULL,'CASH',120.00,1157.10,24.40,2.00,0.00,21.96,0.00,143.96,97.60,'2025-04-01 10:13:50',NULL),(54,270,NULL,NULL,'CASH',150.00,1157.10,30.43,2.17,0.00,27.39,0.00,179.56,121.73,'2025-04-01 10:15:18',NULL),(55,266,NULL,NULL,'CASH',120.00,1630.16,29.76,28.78,0.00,26.78,0.00,175.56,119.02,'2025-04-01 11:10:35',NULL),(56,268,NULL,NULL,'CASH',150.00,1630.16,30.03,0.14,0.00,27.02,0.00,177.16,120.11,'2025-04-01 11:11:06',NULL),(57,271,NULL,NULL,'CASH',150.00,2615.35,30.03,0.14,0.00,27.02,0.00,177.16,120.11,'2025-04-01 11:12:49',NULL),(58,272,NULL,NULL,'CASH',150.00,1630.16,30.01,0.03,0.00,27.00,0.00,177.03,120.02,'2024-04-02 04:43:33',NULL),(59,273,NULL,NULL,'CASH',150.00,1630.16,32.57,12.86,0.00,29.32,0.00,192.18,130.29,'2024-04-02 04:48:11',NULL),(60,276,NULL,NULL,'CASH',150.00,0.00,30.06,0.28,0.00,27.05,0.00,177.33,120.22,'2024-04-02 06:36:04',NULL),(61,275,NULL,NULL,'CASH',150.00,1630.16,30.00,0.00,0.00,27.00,0.00,177.00,120.00,'2024-04-02 07:00:23',NULL),(62,274,NULL,NULL,'CASH',150.00,1630.16,31.71,8.53,0.00,28.54,0.00,187.06,126.82,'2024-04-02 13:28:17',NULL),(63,277,NULL,NULL,'CASH',150.00,274.10,30.50,2.50,0.00,27.45,0.00,179.95,122.00,'2025-04-02 13:30:38',NULL),(64,278,NULL,NULL,'CASH',150.00,1630.16,366.14,1680.69,0.00,329.52,0.00,2160.22,1464.56,'2025-04-03 06:22:02',NULL),(65,279,NULL,NULL,'CASH',150.00,110.52,30.08,0.39,0.00,27.07,0.00,177.46,120.31,'2025-04-03 06:47:33',NULL),(66,281,NULL,NULL,'CASH',150.00,1630.16,30.03,0.14,0.00,27.02,0.00,177.16,120.11,'2025-04-03 06:49:36',NULL),(67,280,NULL,NULL,'CASH',150.00,1157.10,440.74,2053.72,0.00,396.67,0.00,2600.39,1762.98,'2025-04-03 06:55:51',NULL),(68,282,NULL,NULL,'CASH',150.00,2156.83,30.06,0.28,0.00,27.05,0.00,177.33,120.22,'2025-04-03 06:56:57',NULL),(69,283,NULL,NULL,'CASH',150.00,1630.16,30.13,0.67,0.00,27.12,0.00,177.79,120.53,'2025-04-03 07:02:15',NULL),(70,286,NULL,NULL,'CASH',150.00,1630.16,30.49,2.47,0.00,27.45,0.00,179.92,121.98,'2025-04-04 07:15:13',NULL),(72,287,NULL,NULL,'CASH',120.00,0.00,24.12,0.62,0.00,21.71,0.00,142.33,96.50,'2025-04-04 07:15:36',NULL),(73,289,NULL,NULL,'CASH',120.00,1630.16,24.06,0.29,0.00,21.65,0.00,141.94,96.23,'2025-04-04 07:17:24',NULL),(74,292,NULL,NULL,'CASH',150.00,1630.16,31.07,5.36,0.00,27.96,0.00,183.33,124.29,'2025-04-04 07:21:17',NULL);
/*!40000 ALTER TABLE `user_request_payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_request_ratings`
--

DROP TABLE IF EXISTS `user_request_ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_request_ratings` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `booking_id` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `user_id` int NOT NULL,
  `provider_id` int DEFAULT NULL,
  `user_rating` int NOT NULL DEFAULT '0',
  `provider_rating` int DEFAULT NULL,
  `user_comment` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `provider_comment` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_request_ratings`
--

LOCK TABLES `user_request_ratings` WRITE;
/*!40000 ALTER TABLE `user_request_ratings` DISABLE KEYS */;
INSERT INTO `user_request_ratings` VALUES (34,'66198',70,NULL,0,NULL,'asd',NULL,'2025-02-13 07:50:31',NULL),(35,'50795',70,NULL,3,NULL,'hi',NULL,'2025-02-13 07:59:07',NULL),(36,'97062',70,NULL,5,NULL,'qwertyui',NULL,'2025-02-13 07:59:20',NULL),(37,'66198',70,NULL,3,NULL,'zxccv',NULL,'2025-02-13 09:15:40',NULL),(38,'94474',70,NULL,0,NULL,'',NULL,'2025-02-13 11:06:44',NULL),(39,'94816',70,NULL,3,NULL,'Rating is done\n',NULL,'2025-02-13 11:41:56',NULL),(40,'66198',70,NULL,3,NULL,'qwe',NULL,'2025-02-13 11:51:06',NULL),(41,'66198',70,NULL,4,NULL,'ADdads',NULL,'2025-02-14 04:42:15',NULL),(42,'23357',70,NULL,3,NULL,'sdf',NULL,'2025-02-17 11:49:58',NULL),(43,'23357',70,NULL,4,NULL,'HIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIIHIHHIHHIHIHIIIHIHIHIHIHHIHIHIHIHI\n\n',NULL,'2025-03-05 09:37:03',NULL),(44,'86848',87,NULL,4,NULL,'compale\n',NULL,'2025-03-05 10:07:05',NULL),(45,'22681',87,NULL,2,NULL,'dfgfgujtyiuyeastghretidasfhskgfa sjlfjksdafjk sdafjjfkljdsfjkjkfjkdskfhskdhfkhsdkjfhklsjdh',NULL,'2025-03-05 10:07:14',NULL),(46,'27162',86,NULL,4,NULL,'sdfwer',NULL,'2025-03-05 10:08:51',NULL),(47,'TRNX56565',70,NULL,4,NULL,'asd',NULL,'2025-03-31 05:08:01',NULL),(48,'TRNX63778',70,NULL,3,NULL,'asdasd',NULL,'2025-03-31 05:08:12',NULL),(49,'TRNX81729',70,NULL,4,NULL,'asdsadqw',NULL,'2025-03-31 05:08:32',NULL),(50,'TRNX11651',70,NULL,4,NULL,'asd',NULL,'2025-03-31 05:08:36',NULL),(51,'TRNX64614',70,NULL,3,NULL,'adwerfxcvvsdavf',NULL,'2025-03-31 05:08:44',NULL),(52,'TRNX63778',70,NULL,3,NULL,'sadfw r',NULL,'2025-03-31 05:08:48',NULL),(53,'TRNX72357',70,NULL,4,NULL,'XZCADF CWESF',NULL,'2025-03-31 05:09:01',NULL),(54,'TRNX64614',70,NULL,4,NULL,'QWE RF243QYRHN',NULL,'2025-03-31 05:09:06',NULL),(55,'TRNX63778',70,NULL,5,NULL,'QEWT G2EW, DCWHJRB\n',NULL,'2025-03-31 05:09:11',NULL),(56,'TRNX63778',70,NULL,3,NULL,'dsfwejkhfwlkfjl;vcsxzcwef',NULL,'2025-03-31 05:09:21',NULL),(57,'TRNX11651',70,NULL,4,NULL,'nkjcwhfwejlasjlnN j flkwj',NULL,'2025-03-31 05:09:28',NULL),(58,'TRNX81729',70,NULL,3,NULL,'ghghjt',NULL,'2025-03-31 07:26:44',NULL),(59,'TRNX53954',70,NULL,4,NULL,'ASQWDQEW',NULL,'2025-03-31 07:27:33',NULL),(60,'TRNX55477',70,NULL,3,NULL,'QWEQWEQEWEQW',NULL,'2025-03-31 07:27:37',NULL),(61,'TRNX30320',70,NULL,5,NULL,'ASDQERWERTGFBCVNFY',NULL,'2025-03-31 07:27:42',NULL),(62,'TRNX56565',70,NULL,4,NULL,'ERTCXQWE NMY',NULL,'2025-03-31 07:27:48',NULL),(63,'TRNX57622',70,NULL,3,NULL,'SDFERUTUOIGHN',NULL,'2025-03-31 07:27:54',NULL),(64,'TRNX68703',70,NULL,4,NULL,'ASRWEFXCBGHKJHVB F  S',NULL,'2025-03-31 07:28:00',NULL),(65,'TRNX68703',70,NULL,4,NULL,'ASRWEFXCBGHKJHVB F  S',NULL,'2025-03-31 07:28:00',NULL),(66,'TRNX13507',70,NULL,3,NULL,'SDFERGFXCVV S WQFEGVTRNUHN',NULL,'2025-03-31 07:28:05',NULL),(67,'TRNX53954',70,NULL,1,NULL,'ASD',NULL,'2025-03-31 07:34:16',NULL),(68,'TRNX53954',70,NULL,3,NULL,'ASD',NULL,'2025-03-31 07:35:48',NULL),(69,'TRNX68558',70,NULL,4,NULL,'asdqweqwx',NULL,'2025-04-01 05:54:10',NULL),(70,'TRNX93936',70,NULL,2,NULL,'qwedasx',NULL,'2025-04-01 05:54:13',NULL),(71,'TRNX14478',70,NULL,4,NULL,'qwe32edczxc',NULL,'2025-04-01 05:54:16',NULL),(72,'TRNX68558',70,NULL,5,NULL,'SECND2222',NULL,'2025-04-01 05:54:24',NULL),(73,'TRNX99285',70,NULL,3,NULL,'DFBRTGFBVC',NULL,'2025-04-01 05:54:51',NULL),(74,'TRNX48677',70,NULL,5,NULL,'ERTGDFVRWESR',NULL,'2025-04-01 05:54:54',NULL),(75,'TRNX90926',70,NULL,4,NULL,'ERTGEFDVC ER',NULL,'2025-04-01 05:54:58',NULL),(76,'TRNX53954',70,NULL,4,NULL,'DSFVWSF',NULL,'2025-04-01 05:55:01',NULL),(77,'TRNX55477',70,NULL,4,NULL,'SFDWRESTGFV ',NULL,'2025-04-01 05:55:05',NULL),(78,'TRNX29985',70,NULL,4,NULL,'asdqed1q',NULL,'2025-04-07 16:39:15',NULL),(79,'TRNX71367',87,NULL,2,NULL,'hi',NULL,'2025-04-07 16:51:11',NULL),(80,'TRNX48695',87,NULL,4,NULL,'ko',NULL,'2025-04-07 16:52:21',NULL);
/*!40000 ALTER TABLE `user_request_ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_requests`
--

DROP TABLE IF EXISTS `user_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_requests` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `booking_id` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `user_id` int NOT NULL,
  `provider_id` int DEFAULT '0',
  `current_provider_id` int DEFAULT NULL,
  `service_type_id` int DEFAULT NULL,
  `before_image` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `before_comment` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `after_image` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `after_comment` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `rejected_providers` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `status` enum('PENDING','CANCELLED','ACCEPTED','STARTED','ARRIVED','PICKEDUP','DROPPED','COMPLETED','SCHEDULED') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `cancelled_by` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `payment_mode` enum('CASH','CARD','PAYPAL') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `paid` tinyint(1) NOT NULL DEFAULT '0',
  `distance` double(15,8) NOT NULL DEFAULT '0.00000000',
  `s_address` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `s_latitude` double(15,8) NOT NULL,
  `s_longitude` double(15,8) NOT NULL,
  `d_address` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `d_latitude` double(15,8) NOT NULL DEFAULT '0.00000000',
  `d_longitude` double(15,8) NOT NULL DEFAULT '0.00000000',
  `assigned_at` timestamp NULL DEFAULT NULL,
  `schedule_at` timestamp NULL DEFAULT NULL,
  `started_at` timestamp NULL DEFAULT NULL,
  `finished_at` timestamp NULL DEFAULT NULL,
  `user_rated` tinyint(1) NOT NULL DEFAULT '0',
  `provider_rated` tinyint(1) NOT NULL DEFAULT '0',
  `use_wallet` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=294 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_requests`
--

LOCK TABLES `user_requests` WRITE;
/*!40000 ALTER TABLE `user_requests` DISABLE KEYS */;
INSERT INTO `user_requests` VALUES (200,'TRNX81729',70,61,NULL,1,NULL,NULL,NULL,NULL,NULL,'CANCELLED','USER','CASH',0,0.00000000,'Ahmedabad, India',23.02250000,72.57140000,'Ambasamudram, Railway station Road, Tirunelveli, Ambasamudram - 627400, Tamil Nadu, India',8.70825380,77.43827320,NULL,NULL,NULL,NULL,0,0,0,'2024-03-26 04:50:01','2025-03-26 04:50:12'),(201,'TRNX75114',70,61,NULL,1,NULL,NULL,NULL,NULL,NULL,'CANCELLED','PROVIDER','CASH',0,0.00000000,'Ahmedabad, India',23.02250000,72.57140000,'Ambasamudram, Railway station Road, Tirunelveli, Ambasamudram - 627400, Tamil Nadu, India',8.70825380,77.43827320,NULL,NULL,NULL,NULL,0,0,0,'2024-03-26 05:17:48','2025-03-26 05:21:08'),(202,'TRNX16263',70,61,NULL,1,NULL,NULL,NULL,NULL,NULL,'CANCELLED','PROVIDER','CASH',0,0.00000000,'Ahmedabad, India',23.02250000,72.57140000,'asd, Pune District, Pune - 411001, Maharashtra, India',18.52597790,73.88387530,NULL,NULL,NULL,NULL,0,0,0,'2024-03-26 05:21:55','2025-03-26 05:22:04'),(203,'TRNX26233',70,61,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,'Ahmedabad, India',23.02250000,72.57140000,'Ambasamudram, Railway station Road, Tirunelveli, Ambasamudram - 627400, Tamil Nadu, India',8.70825380,77.43827320,NULL,NULL,'2025-03-26 05:31:02','2025-03-26 05:31:06',0,0,0,'2024-03-26 05:29:54','2025-03-28 06:42:33'),(204,'TRNX55942',70,61,NULL,2,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,'Ahmedabad, India',23.02250000,72.57140000,'Ambasamudram, Railway station Road, Tirunelveli, Ambasamudram - 627400, Tamil Nadu, India',8.70825380,77.43827320,NULL,NULL,'2025-03-26 05:30:51','2025-03-26 05:30:53',0,0,0,'2024-03-26 05:30:05','2025-03-26 13:34:24'),(205,'TRNX36871',70,61,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,'Ahmedabad, India',23.02250000,72.57140000,'asd, Pune District, Pune - 411001, Maharashtra, India',18.52597790,73.88387530,NULL,'2025-03-25 22:00:00','2025-03-26 05:47:42','2025-03-26 05:57:47',0,0,0,'2024-03-26 05:30:25','2025-03-28 06:42:39'),(206,'TRNX24360',70,61,NULL,2,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,'Ahmedabad, India',23.02250000,72.57140000,'DAS, Panipat Road, South Andaman, Port Blair - 744102, Andaman and Nicobar Islands, India',11.71300960,92.71547090,NULL,'2025-03-27 05:30:00','2025-03-26 05:46:05','2025-03-26 05:46:17',0,0,0,'2025-03-26 05:30:40','2025-03-26 11:53:17'),(207,'TRNX16943',70,61,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,'Ahmedabad, India',23.02250000,72.57140000,'Ambasamudram, Railway station Road, Tirunelveli, Ambasamudram - 627400, Tamil Nadu, India',8.70825380,77.43827320,NULL,NULL,'2025-03-26 10:32:35','2025-03-26 10:32:36',0,0,0,'2025-03-26 05:47:53','2025-03-26 11:53:35'),(208,'TRNX16367',70,61,NULL,2,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,'Ahmedabad, India',23.02250000,72.57140000,'Ambasamudram, Railway station Road, Tirunelveli, Ambasamudram - 627400, Tamil Nadu, India',8.70825380,77.43827320,NULL,'2025-03-26 05:54:00','2025-03-26 05:58:52','2025-03-26 05:58:52',0,0,0,'2025-03-26 05:48:10','2025-03-26 11:53:23'),(209,'TRNX32383',70,61,NULL,2,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,'Ahmedabad, India',23.02250000,72.57140000,'Ambasamudram, Railway station Road, Tirunelveli, Ambasamudram - 627400, Tamil Nadu, India',8.70825380,77.43827320,NULL,'2025-03-26 05:53:00','2025-03-26 05:57:52','2025-03-26 05:57:54',0,0,0,'2025-03-26 05:49:39','2025-03-26 11:53:28'),(210,'TRNX49618',70,61,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,'Ahmedabad, India',23.02250000,72.57140000,'Ambasamudram, Railway station Road, Tirunelveli, Ambasamudram - 627400, Tamil Nadu, India',8.70825380,77.43827320,NULL,'2025-03-26 06:02:00','2025-03-26 06:04:28','2025-03-26 06:04:29',0,0,0,'2025-03-26 05:59:09','2025-03-28 06:42:57'),(211,'TRNX50502',70,61,NULL,2,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,'Ahmedabad, India',23.02250000,72.57140000,'asd, Pune District, Pune - 411001, Maharashtra, India',18.52597790,73.88387530,NULL,'2025-03-26 06:03:00','2025-03-26 06:04:22','2025-03-26 06:04:24',0,0,0,'2025-03-26 05:59:24','2025-03-26 13:33:38'),(212,'TRNX58101',70,60,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,'Ahmedabad, India',23.02250000,72.57140000,'Ambasamudram, Railway station Road, Tirunelveli, Ambasamudram - 627400, Tamil Nadu, India',8.70825380,77.43827320,NULL,'2025-03-26 06:05:00','2025-03-26 06:17:15','2025-03-26 06:17:19',0,0,0,'2025-03-26 06:03:58','2025-03-26 13:30:38'),(213,'TRNX41643',70,60,NULL,2,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,'Ahmedabad, India',23.02250000,72.57140000,'Ambasamudram, Railway station Road, Tirunelveli, Ambasamudram - 627400, Tamil Nadu, India',8.70825380,77.43827320,NULL,'2025-03-26 06:16:00','2025-03-26 06:17:21','2025-03-26 06:17:22',0,0,0,'2025-03-26 06:14:28','2025-03-26 13:24:15'),(214,'TRNX13010',70,60,NULL,2,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,'Ahmedabad, India',23.02250000,72.57140000,'asd, Pune District, Pune - 411001, Maharashtra, India',18.52597790,73.88387530,NULL,'2025-03-26 06:19:00','2025-03-26 06:27:34','2025-03-26 06:27:34',0,0,0,'2025-03-26 06:17:34','2025-03-26 11:53:10'),(215,'TRNX11785',70,60,NULL,2,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,'Ahmedabad, India',23.02250000,72.57140000,'Sad, Narwar Tahsil, India',25.61958770,78.24422120,NULL,'2025-03-26 06:21:00','2025-03-26 06:27:30','2025-03-26 06:27:31',0,0,0,'2025-03-26 06:19:28','2025-03-26 11:48:33'),(216,'TRNX44487',70,60,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,'Ahmedabad, India',23.02250000,72.57140000,'Ambasamudram, Railway station Road, Tirunelveli, Ambasamudram - 627400, Tamil Nadu, India',8.70825380,77.43827320,NULL,'2025-03-26 06:29:00','2025-03-27 10:05:05','2025-03-27 10:06:07',0,0,0,'2025-03-26 06:27:52','2025-03-28 06:42:46'),(217,'TRNX66156',70,60,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,'Ahmedabad, India',23.02250000,72.57140000,'Delhi Shahdara Junction, Makki Sarai Railway Road, Shahdara, - 110032, Delhi, India',28.67345570,77.29220870,NULL,'2025-03-26 06:30:00','2025-03-27 10:32:48','2025-03-27 10:32:49',0,0,0,'2025-03-26 06:29:30','2025-03-28 06:43:06'),(218,'TRNX87965',70,60,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,'Ahmedabad, India',23.02250000,72.57140000,'Ambasamudram, Railway station Road, Tirunelveli, Ambasamudram - 627400, Tamil Nadu, India',8.70825380,77.43827320,NULL,'2025-03-26 06:40:00','2025-03-28 06:35:28','2025-03-28 06:35:46',0,0,0,'2025-03-26 06:38:23','2025-03-28 06:43:12'),(219,'TRNX95904',70,60,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,'Ahmedabad, India',23.02250000,72.57140000,'asd, Pune District, Pune - 411001, Maharashtra, India',18.52597790,73.88387530,NULL,NULL,'2025-03-28 06:35:50','2025-03-28 06:38:10',0,0,0,'2025-03-26 06:41:28','2025-03-28 06:43:18'),(220,'TRNX66492',70,60,NULL,2,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,'Ahmedabad, India',23.02250000,72.57140000,'asd, Pune District, Pune - 411001, Maharashtra, India',18.52597790,73.88387530,NULL,'2025-03-26 06:43:00','2025-03-28 06:35:09','2025-03-28 06:35:18',0,0,0,'2025-03-26 06:41:39','2025-03-28 06:43:25'),(221,'TRNX31727',70,61,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,'Ahmedabad, India',23.02250000,72.57140000,'asd, Pune District, Pune - 411001, Maharashtra, India',18.52597790,73.88387530,NULL,'2025-03-26 06:53:00','2025-03-28 06:53:34','2025-03-28 06:53:35',0,0,0,'2025-03-26 06:51:06','2025-03-28 12:44:29'),(222,'TRNX83572',70,61,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,'Ahmedabad, India',23.02250000,72.57140000,'Ambasamudram, Railway station Road, Tirunelveli, Ambasamudram - 627400, Tamil Nadu, India',8.70825380,77.43827320,NULL,'2025-03-26 06:58:00','2025-03-27 09:22:26','2025-03-27 09:22:28',0,0,0,'2025-03-26 06:54:46','2025-03-28 06:43:31'),(223,'TRNX88033',70,61,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,'Ahmedabad, India',23.02250000,72.57140000,'Ambasamudram, Railway station Road, Tirunelveli, Ambasamudram - 627400, Tamil Nadu, India',8.70825380,77.43827320,NULL,'2025-03-26 07:04:00','2025-03-27 12:19:57','2025-03-27 12:20:05',0,0,0,'2025-03-26 07:03:15','2025-03-28 06:43:35'),(224,'TRNX46485',70,61,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,'Ahmedabad, India',23.02250000,72.57140000,'Ambasamudram, Railway station Road, Tirunelveli, Ambasamudram - 627400, Tamil Nadu, India',8.70825380,77.43827320,NULL,NULL,'2025-03-27 12:05:21','2025-03-27 12:05:22',0,0,0,'2025-03-26 07:04:44','2025-03-28 06:43:39'),(225,'TRNX51490',70,61,NULL,2,NULL,NULL,NULL,NULL,NULL,'CANCELLED','PROVIDER','CASH',0,0.00000000,'Ahmedabad, India',23.02250000,72.57140000,'Ambasamudram, Railway station Road, Tirunelveli, Ambasamudram - 627400, Tamil Nadu, India',8.70825380,77.43827320,NULL,'2025-03-26 07:05:00',NULL,NULL,0,0,0,'2025-03-26 07:04:56','2025-03-26 10:04:44'),(226,'TRNX19408',70,61,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,'Ahmedabad, India',23.02250000,72.57140000,'asd, Pune District, Pune - 411001, Maharashtra, India',18.52597790,73.88387530,NULL,'2025-03-26 07:08:00','2025-03-26 09:41:57','2025-03-26 09:42:10',0,0,0,'2025-03-26 07:06:05','2025-03-26 11:46:47'),(227,'TRNX62240',70,61,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,'Ahmedabad, India',23.02250000,72.57140000,'Rajsamand, Jainagar - 311302, Rajasthan, India',25.90412800,74.30283310,NULL,'2025-03-26 07:28:00','2025-03-26 07:29:31','2025-03-26 07:29:32',0,0,0,'2025-03-26 07:27:07','2025-03-26 11:18:41'),(228,'TRNX67693',70,61,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,'Ahmedabad, India',8.70825380,77.43827320,'Ambasamudram, Railway station Road, Tirunelveli, Ambasamudram - 627400, Tamil Nadu, India',8.70825380,77.43827320,NULL,NULL,'2025-03-26 13:34:48','2025-03-27 04:35:58',0,0,0,'2025-03-26 12:19:19','2025-03-27 04:42:56'),(229,'TRNX26315',70,61,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,NULL,8.70825380,77.43827320,'asd, Pune District, Pune - 411001, Maharashtra, India',18.52597790,73.88387530,NULL,NULL,'2025-03-26 13:24:49','2025-03-26 13:29:19',0,0,0,'2025-03-26 12:23:45','2025-03-26 13:29:39'),(230,'TRNX12868',70,61,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,NULL,21.73481200,70.44915380,'Jetpur, Jetpur Taluka, India',21.75437250,70.61893910,NULL,NULL,'2025-03-26 13:23:53','2025-03-26 13:23:53',0,0,0,'2025-03-26 13:02:21','2025-03-26 13:24:00'),(231,'TRNX73524',70,60,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,NULL,18.52597790,73.88387530,'asd, Pune District, Pune - 411001, Maharashtra, India',18.52597790,73.88387530,NULL,NULL,'2025-03-27 12:04:12','2025-03-31 07:16:53',0,0,0,'2025-03-27 10:36:48','2025-03-31 07:17:05'),(232,'TRNX69950',70,61,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,NULL,21.73481200,70.44915380,'asd, Pune District, Pune - 411001, Maharashtra, India',18.52597790,73.88387530,NULL,NULL,'2025-03-28 04:38:49','2025-03-28 04:38:57',0,0,0,'2025-03-27 13:03:55','2025-03-28 06:42:24'),(233,'TRNX68662',70,61,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,NULL,21.73481200,70.44915380,'Ambasamudram, Railway station Road, Tirunelveli, Ambasamudram - 627400, Tamil Nadu, India',8.70825380,77.43827320,NULL,NULL,'2025-03-28 06:38:23','2025-03-28 06:38:24',0,0,0,'2025-03-28 06:03:48','2025-03-28 06:42:16'),(234,'TRNX34714',70,61,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,NULL,21.73481200,70.44915380,'Dhasa Junction, SH21, Botad, - 365430, Gujarat, India',21.78274190,71.51805600,NULL,NULL,'2025-03-28 07:34:59','2025-03-28 08:00:40',0,0,0,'2025-03-28 06:38:17','2025-03-28 12:18:01'),(235,'TRNX95901',70,61,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,NULL,21.73481200,70.44915380,'Sudsar, Bikaner, Sudsar - 331811, Rajasthan, India',28.01245120,73.78634710,NULL,NULL,'2025-03-28 07:10:14','2025-03-28 07:10:36',0,0,0,'2025-03-28 06:39:20','2025-03-28 07:11:58'),(236,'TRNX71220',70,61,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,NULL,21.73481200,70.44915380,'Ambasamudram, Railway station Road, Tirunelveli, Ambasamudram - 627400, Tamil Nadu, India',8.70825380,77.43827320,NULL,NULL,'2025-03-28 06:55:36','2025-03-28 06:55:54',0,0,0,'2025-03-28 06:39:55','2025-03-28 06:57:53'),(237,'TRNX67147',70,61,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,NULL,21.73481200,70.44915380,'Ambasamudram, Railway station Road, Tirunelveli, Ambasamudram - 627400, Tamil Nadu, India',8.70825380,77.43827320,NULL,NULL,'2025-03-31 04:47:53','2025-03-31 04:47:58',0,0,0,'2025-03-28 06:44:03','2025-03-31 05:03:21'),(238,'TRNX95840',70,61,NULL,2,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,NULL,21.73481200,70.44915380,'123-P, Jigani, Bengaluru - 560105, Karnataka, India',12.77553830,77.63590240,NULL,NULL,'2025-03-28 06:49:31','2025-03-28 06:50:53',0,0,0,'2025-03-28 06:44:15','2025-03-28 06:51:01'),(239,'TRNX94338',70,61,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,NULL,21.73481200,70.44915380,'Ambasamudram, Railway station Road, Tirunelveli, Ambasamudram - 627400, Tamil Nadu, India',8.70825380,77.43827320,NULL,NULL,'2025-03-31 06:39:17','2025-03-31 06:49:18',0,0,0,'2025-03-28 07:18:48','2025-03-31 06:49:38'),(240,'TRNX56793',70,61,NULL,2,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,NULL,21.73481200,70.44915380,'Ambasamudram, Railway station Road, Tirunelveli, Ambasamudram - 627400, Tamil Nadu, India',8.70825380,77.43827320,NULL,NULL,'2025-03-28 12:44:24','2025-03-28 12:48:29',0,0,0,'2025-03-28 07:18:57','2025-03-28 12:48:32'),(241,'TRNX72357',70,61,NULL,2,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,NULL,21.73481200,70.44915380,'asd, Pune District, Pune - 411001, Maharashtra, India',18.52597790,73.88387530,NULL,NULL,'2025-03-28 11:57:04','2025-03-28 11:57:14',0,0,0,'2025-03-28 07:27:38','2025-03-28 12:05:25'),(242,'TRNX11651',70,61,NULL,2,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,NULL,21.73481200,70.44915380,'Ambasamudram, Railway station Road, Tirunelveli, Ambasamudram - 627400, Tamil Nadu, India',8.70825380,77.43827320,NULL,NULL,'2025-03-28 10:48:38','2025-03-28 10:49:37',0,0,0,'2025-03-28 07:34:38','2025-03-28 10:50:23'),(243,'TRNX63778',70,61,NULL,2,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,NULL,21.73481200,70.44915380,'Dhasa Junction, SH21, Botad, - 365430, Gujarat, India',21.78274190,71.51805600,NULL,NULL,'2025-03-28 08:07:07','2025-03-28 08:07:47',0,0,0,'2025-03-28 07:34:47','2025-03-28 08:08:22'),(244,'TRNX64614',70,61,NULL,2,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,NULL,21.73481200,70.44915380,'Dhasa Junction, SH21, Botad, - 365430, Gujarat, India',21.78274190,71.51805600,NULL,NULL,'2025-03-28 12:57:07','2025-03-31 04:43:23',0,0,0,'2025-03-28 12:55:56','2025-03-31 04:44:13'),(245,'TRNX85850',70,61,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,NULL,21.73481200,70.44915380,'Ambasamudram, Railway station Road, Tirunelveli, Ambasamudram - 627400, Tamil Nadu, India',8.70825380,77.43827320,NULL,NULL,'2025-03-31 05:53:57','2025-03-31 05:56:50',0,0,0,'2025-03-28 13:18:55','2025-03-31 06:09:01'),(246,'TRNX62112',70,61,NULL,2,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,NULL,21.73481200,70.44915380,'asd, Pune District, Pune - 411001, Maharashtra, India',18.52597790,73.88387530,NULL,NULL,'2025-03-31 06:12:05','2025-03-31 06:12:15',0,0,0,'2025-03-28 13:19:07','2025-03-31 06:17:20'),(247,'TRNX34337',70,61,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,NULL,21.73481200,70.44915380,'asd, Pune District, Pune - 411001, Maharashtra, India',18.52597790,73.88387530,NULL,'2025-03-28 13:25:00','2025-03-31 06:23:10','2025-03-31 06:24:28',0,0,0,'2025-03-28 13:23:22','2025-03-31 06:24:42'),(248,'TRNX13507',70,61,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,NULL,21.73481200,70.44915380,'asd, Pune District, Pune - 411001, Maharashtra, India',18.52597790,73.88387530,NULL,'2025-03-28 13:28:00','2025-03-31 06:27:51','2025-03-31 06:30:50',0,0,0,'2025-03-28 13:27:32','2025-03-31 06:30:54'),(249,'TRNX68703',70,61,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,NULL,21.73481200,70.44915380,'asd, Pune District, Pune - 411001, Maharashtra, India',18.52597790,73.88387530,NULL,'2025-03-28 13:31:00','2025-03-31 06:32:09','2025-03-31 06:32:15',0,0,0,'2025-03-28 13:30:06','2025-03-31 06:32:17'),(250,'TRNX57622',70,61,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,NULL,21.73481200,70.44915380,'asd, Pune District, Pune - 411001, Maharashtra, India',18.52597790,73.88387530,NULL,'2025-03-28 13:34:00','2025-03-31 05:30:29','2025-03-31 05:30:39',0,0,0,'2025-03-28 13:31:29','2025-03-31 05:31:23'),(251,'TRNX56565',70,61,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,NULL,21.73481200,70.44915380,'asd, Pune District, Pune - 411001, Maharashtra, India',18.52597790,73.88387530,NULL,'2025-03-28 13:36:00','2025-03-31 04:46:14','2025-03-31 04:46:17',0,0,0,'2025-03-28 13:34:46','2025-03-31 05:03:26'),(252,'TRNX56356',70,61,NULL,1,NULL,NULL,NULL,NULL,NULL,'CANCELLED','PROVIDER','CASH',0,0.00000000,NULL,21.73481200,70.44915380,'asd, Pune District, Pune - 411001, Maharashtra, India',18.52597790,73.88387530,NULL,NULL,NULL,NULL,0,0,0,'2025-03-30 06:52:56','2025-03-31 13:19:28'),(253,'TRNX30320',70,60,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,NULL,18.52597790,73.88387530,'asd, Pune District, Pune - 411001, Maharashtra, India',18.52597790,73.88387530,NULL,NULL,'2025-03-31 07:18:33','2025-03-31 07:19:16',0,0,0,'2025-03-30 07:17:34','2025-03-31 07:19:18'),(254,'TRNX55477',70,60,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,NULL,18.52597790,73.88387530,'asd, Pune District, Pune - 411001, Maharashtra, India',18.52597790,73.88387530,NULL,NULL,'2025-03-31 07:20:38','2025-03-31 07:21:11',0,0,0,'2025-03-30 07:19:32','2025-03-31 07:21:12'),(255,'TRNX53954',70,60,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,NULL,18.52597790,73.88387530,'asd, Pune District, Pune - 411001, Maharashtra, India',18.52597790,73.88387530,NULL,NULL,'2025-03-31 07:21:17','2025-03-31 07:21:43',0,0,0,'2025-03-29 07:19:38','2025-03-31 07:21:45'),(256,'TRNX90926',70,60,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,NULL,18.52597790,73.88387530,'asd, Pune District, Pune - 411001, Maharashtra, India',18.52597790,73.88387530,NULL,NULL,'2025-03-31 07:21:49','2025-04-01 05:34:24',0,0,0,'2024-03-31 07:19:46','2025-04-01 05:34:27'),(257,'TRNX48677',70,60,NULL,2,NULL,NULL,NULL,NULL,NULL,'CANCELLED','PROVIDER','CASH',0,0.00000000,NULL,21.73481200,70.44915380,'asd, Pune District, Pune - 411001, Maharashtra, India',18.52597790,73.88387530,NULL,NULL,NULL,NULL,0,0,0,'2025-03-31 07:19:52','2025-04-01 05:37:39'),(258,'TRNX56999',70,60,NULL,1,NULL,NULL,NULL,NULL,NULL,'CANCELLED','PROVIDER','CASH',0,0.00000000,NULL,18.52597790,73.88387530,'Delhi Shahdara Junction, Makki Sarai Railway Road, Shahdara, - 110032, Delhi, India',28.67345570,77.29220870,NULL,NULL,NULL,NULL,0,0,0,'2025-03-31 13:16:13','2025-04-01 05:34:32'),(259,'TRNX99285',70,60,NULL,1,NULL,NULL,NULL,NULL,NULL,'CANCELLED','PROVIDER','CASH',0,0.00000000,NULL,21.73481200,70.44915380,'Ambasamudram, Railway station Road, Tirunelveli, Ambasamudram - 627400, Tamil Nadu, India',8.70825380,77.43827320,NULL,NULL,NULL,NULL,0,0,0,'2025-03-31 13:16:18','2025-04-01 05:37:43'),(260,'TRNX14478',70,60,NULL,1,NULL,NULL,NULL,NULL,NULL,'CANCELLED','PROVIDER','CASH',0,0.00000000,NULL,21.73481200,70.44915380,'asd, Pune District, Pune - 411001, Maharashtra, India',18.52597790,73.88387530,NULL,NULL,NULL,NULL,0,0,0,'2025-03-31 13:16:25','2025-04-01 05:37:46'),(261,'TRNX93936',70,60,NULL,1,NULL,NULL,NULL,NULL,NULL,'CANCELLED','PROVIDER','CASH',0,0.00000000,NULL,18.52597790,73.88387530,'asd, Pune District, Pune - 411001, Maharashtra, India',18.52597790,73.88387530,NULL,NULL,NULL,NULL,0,0,0,'2025-04-01 05:37:07','2025-04-01 05:37:33'),(262,'TRNX68558',70,60,NULL,2,NULL,NULL,NULL,NULL,NULL,'CANCELLED','PROVIDER','CASH',0,0.00000000,NULL,21.73481200,70.44915380,'Ambasamudram, Railway station Road, Tirunelveli, Ambasamudram - 627400, Tamil Nadu, India',8.70825380,77.43827320,NULL,NULL,NULL,NULL,0,0,0,'2025-04-01 05:37:13','2025-04-01 05:37:49'),(263,'TRNX93000',70,61,NULL,2,NULL,NULL,NULL,NULL,NULL,'CANCELLED','PROVIDER','CASH',0,0.00000000,NULL,21.73481200,70.44915380,'asd, Pune District, Pune - 411001, Maharashtra, India',18.52597790,73.88387530,NULL,NULL,NULL,NULL,0,0,0,'2025-04-01 06:23:39','2025-04-01 06:26:35'),(264,'TRNX84739',70,NULL,NULL,1,NULL,NULL,NULL,NULL,'59,60,61,63','PENDING',NULL,'CASH',0,0.00000000,NULL,23.02250000,72.57140000,'Ambasamudram, Railway station Road, Tirunelveli, Ambasamudram - 627400, Tamil Nadu, India',8.70825380,77.43827320,NULL,NULL,NULL,NULL,0,0,0,'2025-04-01 06:42:35',NULL),(266,'TRNX54822',70,61,NULL,2,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,NULL,21.73481200,70.44915380,'Ambasamudram, Railway station Road, Tirunelveli, Ambasamudram - 627400, Tamil Nadu, India',8.70825380,77.43827320,NULL,NULL,'2025-04-01 10:48:58','2025-04-01 11:10:33',0,0,0,'2025-04-01 06:42:59','2025-04-01 11:10:35'),(268,'TRNX22388',70,61,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,NULL,21.73481200,70.44915380,'Ambasamudram, Railway station Road, Tirunelveli, Ambasamudram - 627400, Tamil Nadu, India',8.70825380,77.43827320,NULL,'2025-04-01 09:11:00','2025-04-01 11:10:59','2025-04-01 11:11:04',0,0,0,'2025-04-01 07:09:05','2025-04-01 11:11:06'),(269,'TRNX51004',70,59,NULL,2,NULL,NULL,NULL,NULL,'59,61','COMPLETED',NULL,'CASH',1,0.00000000,NULL,18.52597790,73.88387530,'Ambasamudram, Railway station Road, Tirunelveli, Ambasamudram - 627400, Tamil Nadu, India',8.70825380,77.43827320,NULL,NULL,'2025-04-01 10:12:18','2025-04-01 10:13:48',0,0,0,'2025-04-01 07:09:11','2025-04-01 10:13:50'),(270,'TRNX32668',70,59,NULL,1,NULL,NULL,NULL,NULL,'61,60','COMPLETED',NULL,'CASH',1,0.00000000,NULL,18.52597790,73.88387530,'Ambasamudram, Railway station Road, Tirunelveli, Ambasamudram - 627400, Tamil Nadu, India',8.70825380,77.43827320,NULL,NULL,'2025-04-01 10:13:57','2025-04-01 10:15:15',0,0,0,'2025-04-01 07:44:18','2025-04-01 10:15:18'),(271,'TRNX37398',70,61,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,NULL,21.73481200,70.44915380,'DAS, Panipat Road, South Andaman, Port Blair - 744102, Andaman and Nicobar Islands, India',11.71300960,92.71547090,NULL,NULL,'2025-04-01 11:12:42','2025-04-01 11:12:47',0,0,0,'2025-04-01 10:48:26','2025-04-01 11:12:49'),(272,'TRNX36394',70,61,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,NULL,21.73481200,70.44915380,'Ambasamudram, Railway station Road, Tirunelveli, Ambasamudram - 627400, Tamil Nadu, India',8.70825380,77.43827320,NULL,NULL,'2025-04-01 13:02:26','2025-04-01 13:02:27',0,0,0,'2025-04-01 12:55:30','2025-04-02 04:43:33'),(273,'TRNX99273',70,61,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,NULL,21.73481200,70.44915380,'Ambasamudram, Railway station Road, Tirunelveli, Ambasamudram - 627400, Tamil Nadu, India',8.70825380,77.43827320,NULL,NULL,'2025-04-02 04:40:26','2025-04-02 04:48:09',0,0,0,'2025-04-02 04:39:52','2025-04-02 04:48:11'),(274,'TRNX65790',70,61,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,NULL,21.73481200,70.44915380,'Ambasamudram, Railway station Road, Tirunelveli, Ambasamudram - 627400, Tamil Nadu, India',8.70825380,77.43827320,NULL,NULL,'2025-04-02 13:23:08','2025-04-02 13:28:15',0,0,0,'2025-04-02 04:48:24','2025-04-02 13:28:17'),(275,'TRNX67552',70,61,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,NULL,21.73481200,70.44915380,'Ambasamudram, Railway station Road, Tirunelveli, Ambasamudram - 627400, Tamil Nadu, India',8.70825380,77.43827320,NULL,NULL,'2025-04-02 07:00:21','2025-04-02 07:00:21',0,0,0,'2025-04-02 05:06:06','2025-04-02 07:00:23'),(276,'TRNX36810',70,60,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,NULL,18.52597790,73.88387530,'asd, Pune District, Pune - 411001, Maharashtra, India',18.52597790,73.88387530,NULL,NULL,'2025-04-02 06:35:52','2025-04-02 06:36:02',0,0,0,'2024-04-02 06:34:31','2025-04-02 06:36:04'),(277,'TRNX96644',70,61,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,NULL,21.73481200,70.44915380,'Akshar Ads, Anand, Anand - 388001, Gujarat, India',22.55527720,72.95883090,NULL,NULL,'2025-04-02 13:29:05','2025-04-02 13:30:35',0,0,0,'2024-04-02 08:06:06','2025-04-02 13:30:38'),(278,'TRNX16783',70,61,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,NULL,21.73481200,70.44915380,'Ambasamudram, Railway station Road, Tirunelveli, Ambasamudram - 627400, Tamil Nadu, India',8.70825380,77.43827320,NULL,NULL,'2025-04-02 13:33:34','2025-04-03 06:21:59',0,0,0,'2024-04-02 09:07:01','2025-04-03 06:22:02'),(279,'TRNX76277',70,61,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,NULL,21.73481200,70.44915380,'Dhasa Junction, SH21, Botad, - 365430, Gujarat, India',21.78274190,71.51805600,NULL,NULL,'2025-04-03 06:45:27','2025-04-03 06:45:41',0,0,0,'2024-04-02 09:18:24','2025-04-03 06:47:33'),(280,'TRNX50894',70,63,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,NULL,18.52597790,73.88387530,'Ambasamudram, Railway station Road, Tirunelveli, Ambasamudram - 627400, Tamil Nadu, India',8.70825380,77.43827320,NULL,NULL,'2025-04-02 10:23:34','2025-04-03 06:55:48',0,0,0,'2024-04-02 09:43:32','2025-04-03 06:55:51'),(281,'TRNX85764',70,61,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,NULL,21.73481200,70.44915380,'Ambasamudram, Railway station Road, Tirunelveli, Ambasamudram - 627400, Tamil Nadu, India',8.70825380,77.43827320,NULL,NULL,'2025-04-03 06:49:21','2025-04-03 06:49:26',0,0,0,'2024-04-02 10:24:08','2025-04-03 06:49:36'),(282,'TRNX86632',70,63,NULL,1,NULL,NULL,NULL,NULL,'61','COMPLETED',NULL,'CASH',1,0.00000000,NULL,18.52597790,73.88387530,'DAS, Panipat Road, South Andaman, Port Blair - 744102, Andaman and Nicobar Islands, India',11.71300960,92.71547090,NULL,NULL,'2025-04-03 06:56:45','2025-04-03 06:56:55',0,0,0,'2024-04-02 11:20:31','2025-04-03 06:56:57'),(283,'TRNX49472',70,61,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,NULL,21.73481200,70.44915380,'Ambasamudram, Railway station Road, Tirunelveli, Ambasamudram - 627400, Tamil Nadu, India',8.70825380,77.43827320,NULL,NULL,'2025-04-03 07:01:49','2025-04-03 07:02:13',0,0,0,'2024-04-03 07:00:57','2025-04-03 07:02:15'),(284,'TRNX29985',70,63,NULL,1,NULL,NULL,NULL,NULL,NULL,'CANCELLED','PROVIDER','CASH',0,0.00000000,NULL,18.52597790,73.88387530,'Ambasamudram, Railway station Road, Tirunelveli, Ambasamudram - 627400, Tamil Nadu, India',8.70825380,77.43827320,NULL,NULL,NULL,NULL,0,0,0,'2024-04-03 09:08:00','2025-04-04 07:14:43'),(285,'TRNX45900',70,NULL,NULL,1,NULL,NULL,NULL,NULL,'61,63','PENDING',NULL,'CASH',0,0.00000000,NULL,23.02250000,72.57140000,'Ambasamudram, Railway station Road, Tirunelveli, Ambasamudram - 627400, Tamil Nadu, India',8.70825380,77.43827320,NULL,NULL,NULL,NULL,0,0,0,'2024-04-03 11:37:26',NULL),(286,'TRNX35553',87,61,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,NULL,21.73481200,70.44915380,'Ambasamudram, Railway station Road, Tirunelveli, Ambasamudram - 627400, Tamil Nadu, India',8.70825380,77.43827320,NULL,NULL,'2025-04-04 07:13:43','2025-04-04 07:15:12',0,0,0,'2025-04-04 07:13:07','2025-04-04 07:15:14'),(287,'TRNX71367',87,63,NULL,2,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,NULL,18.52597790,73.88387530,'asd, Pune District, Pune - 411001, Maharashtra, India',18.52597790,73.88387530,NULL,NULL,'2025-04-04 07:15:07','2025-04-04 07:15:35',0,0,0,'2025-04-04 07:14:15','2025-04-04 07:15:36'),(288,'TRNX18214',87,61,NULL,1,NULL,NULL,NULL,NULL,NULL,'CANCELLED','PROVIDER','CASH',0,0.00000000,NULL,21.73481200,70.44915380,'asd, Pune District, Pune - 411001, Maharashtra, India',18.52597790,73.88387530,NULL,NULL,NULL,NULL,0,0,0,'2025-04-04 07:16:09','2025-04-04 07:16:42'),(289,'TRNX96434',87,61,NULL,2,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,NULL,21.73481200,70.44915380,'Ambasamudram, Railway station Road, Tirunelveli, Ambasamudram - 627400, Tamil Nadu, India',8.70825380,77.43827320,NULL,NULL,'2025-04-04 07:17:09','2025-04-04 07:17:22',0,0,0,'2025-04-04 07:16:17','2025-04-04 07:17:24'),(290,'TRNX48695',87,63,NULL,2,NULL,NULL,NULL,NULL,NULL,'CANCELLED','PROVIDER','CASH',0,0.00000000,NULL,18.52597790,73.88387530,'Ambasamudram, Railway station Road, Tirunelveli, Ambasamudram - 627400, Tamil Nadu, India',8.70825380,77.43827320,NULL,NULL,NULL,NULL,0,0,0,'2025-04-04 07:16:22','2025-04-04 07:17:19'),(291,'TRNX23931',87,61,NULL,1,NULL,NULL,NULL,NULL,NULL,'CANCELLED','PROVIDER','CASH',0,0.00000000,NULL,21.73481200,70.44915380,'Ambasamudram, Railway station Road, Tirunelveli, Ambasamudram - 627400, Tamil Nadu, India',8.70825380,77.43827320,NULL,NULL,NULL,NULL,0,0,0,'2025-04-04 07:16:27','2025-04-04 07:16:46'),(292,'TRNX68981',87,61,NULL,1,NULL,NULL,NULL,NULL,NULL,'COMPLETED',NULL,'CASH',1,0.00000000,NULL,21.73481200,70.44915380,'Ambasamudram, Railway station Road, Tirunelveli, Ambasamudram - 627400, Tamil Nadu, India',8.70825380,77.43827320,NULL,NULL,'2025-04-04 07:18:02','2025-04-04 07:21:15',0,0,0,'2024-04-04 07:17:40','2025-04-04 07:21:17'),(293,'TRNX36721',70,61,NULL,1,NULL,NULL,NULL,NULL,NULL,'ACCEPTED',NULL,'CASH',0,0.00000000,NULL,21.73481200,70.44915380,'Dhoraji, Dhoraji Taluka, India',21.73481200,70.44915380,NULL,NULL,NULL,NULL,0,0,0,'2025-05-11 13:30:07',NULL);
/*!40000 ALTER TABLE `user_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `last_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `payment_mode` enum('CASH','CARD','PAYPAL') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `picture` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `device_token` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `device_id` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `device_type` enum('android','ios') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `login_by` enum('manual','facebook','google') CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `social_unique_id` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mobile` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `latitude` double(15,8) DEFAULT NULL,
  `longitude` double(15,8) DEFAULT NULL,
  `stripe_cust_id` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `wallet_balance` double(8,2) NOT NULL DEFAULT '0.00',
  `rating` decimal(4,2) NOT NULL DEFAULT '5.00',
  `rating_count` int NOT NULL DEFAULT '0',
  `otp` int NOT NULL DEFAULT '0',
  `remember_token` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Appoets','Demo','CASH','demo@appoets.com','$2y$10$ncIDhmUYBKu1FrVMJ7sWMelWFbveBG47nCh1eDa02rIOuyGlA434u','http://lorempixel.com/512/512/business/Xuber-Services',NULL,NULL,'android','manual',NULL,NULL,NULL,NULL,NULL,0.00,5.00,0,0,NULL,'2018-12-22 18:12:34','2018-12-22 18:12:34'),(2,'Emilia','Epps','CASH','emilia@appoets.com','$2y$10$CTpX66X1zT2aL7iO4P1PK.09tr5IZP5FJN0F6.6IB0y10RIwOIOEO','http://lorempixel.com/512/512/business/Xuber-Services',NULL,NULL,'android','manual',NULL,NULL,NULL,NULL,NULL,0.00,5.00,0,0,NULL,'2018-12-22 18:12:34','2018-12-22 18:12:34'),(3,'Perry','Kingsley','CASH','perry@appoets.com','$2y$10$JDfqGmFhKQB.WCUeZi0w1.jEtkKti0jqEs5pLfZXQKT.UcZ.X7xAq','http://lorempixel.com/512/512/business/Xuber-Services',NULL,NULL,'android','manual',NULL,NULL,NULL,NULL,NULL,0.00,5.00,0,0,NULL,'2018-12-22 18:12:34','2018-12-22 18:12:34'),(4,'Joseph','Garrison','CASH','joseph@appoets.com','$2y$10$cCjKPaql4XYrkAIOf/5Mnea/Hpy/vrIGSJo.7TkgqsSC..igxudZG','http://lorempixel.com/512/512/business/Xuber-Services',NULL,NULL,'android','manual',NULL,NULL,NULL,NULL,NULL,0.00,5.00,0,0,NULL,'2018-12-22 18:12:34','2018-12-22 18:12:34'),(5,'Ella','Morrissey','CASH','morrissey@appoets.com','$2y$10$gSeQ3erFLfW8VgSTFIFRs.gyO3Rs/1zDLnM3gfPVKMTgtPZrIG0xW','http://lorempixel.com/512/512/business/Xuber-Services',NULL,NULL,'android','manual',NULL,NULL,NULL,NULL,NULL,0.00,5.00,0,0,NULL,'2018-12-22 18:12:34','2018-12-22 18:12:34'),(6,'Elizabeth','Forshee','CASH','elizabeth@appoets.com','$2y$10$i2EtfNwFj7vRUA1N8EfR7erIzfnNgvIjBrmSpd35Qi7DoNOEm33de','http://lorempixel.com/512/512/business/Xuber-Services',NULL,NULL,'android','manual',NULL,NULL,NULL,NULL,NULL,0.00,5.00,0,0,NULL,'2018-12-22 18:12:34','2018-12-22 18:12:34'),(7,'Douglas','Arce','CASH','douglas@appoets.com','$2y$10$UGqoebmHjIacRslC7/V3ee1uJ8alqqRJzbT3sT/ajvMZ5OCSC9.ZC','http://lorempixel.com/512/512/business/Xuber-Services',NULL,NULL,'android','manual',NULL,NULL,NULL,NULL,NULL,0.00,5.00,0,0,NULL,'2018-12-22 18:12:34','2018-12-22 18:12:34'),(8,'Sara','Nixon','CASH','sara@appoets.com','$2y$10$gapBbsaInJIhwSHAMRzdf.cOLnAtoB.wpfUyuL9tekcpwlKG8ne.a','http://lorempixel.com/512/512/business/Xuber-Services',NULL,NULL,'android','manual',NULL,NULL,NULL,NULL,NULL,0.00,5.00,0,0,NULL,'2018-12-22 18:12:34','2018-12-22 18:12:34'),(9,'Edward','Jett','CASH','edward@appoets.com','$2y$10$dqnZRug8rZjhhBG3zvhzg.gYl8hVm0DrCT/.IY48sZb9TYjHGikCi','http://lorempixel.com/512/512/business/Xuber-Services',NULL,NULL,'android','manual',NULL,NULL,NULL,NULL,NULL,0.00,5.00,0,0,NULL,'2018-12-22 18:12:34','2018-12-22 18:12:34'),(10,'Marilyn','Bradley','CASH','marilyn@appoets.com','$2y$10$s85IekUnlcFkVyITMwavgupuGKCDWgkPuTttUF8wQCqw8zg8JfW6y','http://lorempixel.com/512/512/business/Xuber-Services',NULL,NULL,'android','manual',NULL,NULL,NULL,NULL,NULL,0.00,5.00,0,0,NULL,'2018-12-22 18:12:34','2018-12-22 18:12:34'),(11,'Herman','Thompson','CASH','herman@appoets.com','$2y$10$m6TyL/V4wRqrgaKOH5WfXOL0KnK7y2Pel4DEY9ChHsy8WZDyYqsim','http://lorempixel.com/512/512/business/Xuber-Services',NULL,NULL,'android','manual',NULL,NULL,NULL,NULL,NULL,0.00,5.00,0,0,NULL,'2018-12-22 18:12:34','2018-12-22 18:12:34'),(12,'Darrin','Neel','CASH','darrin@appoets.com','$2y$10$6I7YABJq8iP1UyK4sY8lxO96S0ULZcL15JFwH6jzI95CvcD3wZsGa','http://lorempixel.com/512/512/business/Xuber-Services',NULL,NULL,'android','manual',NULL,'524',NULL,NULL,NULL,0.00,5.00,0,0,NULL,'2018-12-22 18:12:34','2023-10-26 07:28:06'),(13,'Ralph','Vaughn','CASH','ralph@appoets.com','$2y$10$W149yQZjzhQHYLwv6KnDJuSnCvmzEmMhd0AyISPefJBcuLyaMgVTC','http://lorempixel.com/512/512/business/Xuber-Services',NULL,NULL,'android','manual',NULL,NULL,NULL,NULL,NULL,0.00,5.00,0,0,NULL,'2018-12-22 18:12:35','2018-12-22 18:12:35'),(14,'Arturo','Gibson','CASH','arturo@appoets.com','$2y$10$Yehgd2eY.mZUvcklEkkQDem48EropNsVjoDwsapWr6ew26jgSB5DK','http://lorempixel.com/512/512/business/Xuber-Services',NULL,NULL,'android','manual',NULL,NULL,NULL,NULL,NULL,0.00,5.00,0,0,NULL,'2018-12-22 18:12:35','2018-12-22 18:12:35'),(15,'Kevin','Delacruz','CASH','kevin@appoets.com','$2y$10$wY7jWBcGfC8SyQ3MKOLeAeaOu9TtnIbId7fNJ1nZThn16qEqzE9vq','http://lorempixel.com/512/512/business/Xuber-Services',NULL,NULL,'android','manual',NULL,NULL,NULL,NULL,NULL,0.00,5.00,0,0,NULL,'2018-12-22 18:12:35','2018-12-22 18:12:35'),(16,'Catherine','Ferguson','CASH','catherine@appoets.com','$2y$10$a/hzMvG8d1czhRavdTd.t.igPyY8cD8MaA/O/iLF9pLQ1XwCqKvpS','http://lorempixel.com/512/512/business/Xuber-Services',NULL,NULL,'android','manual',NULL,NULL,NULL,NULL,NULL,0.00,5.00,0,0,NULL,'2018-12-22 18:12:35','2018-12-22 18:12:35'),(17,'Gary','Maple','CASH','gary@appoets.com','$2y$10$cWSsUulCMFBNOK8apMZ.CuRY5vnOWGxWNn9MYV32fp8UjSHA7hND6','http://lorempixel.com/512/512/business/Xuber-Services',NULL,NULL,'android','manual',NULL,NULL,NULL,NULL,NULL,0.00,5.00,0,0,NULL,'2018-12-22 18:12:35','2018-12-22 18:12:35'),(18,'Robert','Ferguson','CASH','robert@appoets.com','$2y$10$rzwbcEygHCHfzTHYse88fOA9gQXDGf9BZlmdvjYr0L/vxl9zqhYli','http://lorempixel.com/512/512/business/Xuber-Services',NULL,NULL,'android','manual',NULL,NULL,NULL,NULL,NULL,0.00,5.00,0,0,NULL,'2018-12-22 18:12:35','2018-12-22 18:12:35'),(19,'Charles','Ferguson','CASH','charles@appoets.com','$2y$10$dz36s1kNJ0mXF2HZ58Fake.oVURICQC3XOn9gu8xq4u47qYHU6QLi','http://lorempixel.com/512/512/business/Xuber-Services',NULL,NULL,'android','manual',NULL,NULL,NULL,NULL,NULL,0.00,5.00,0,0,NULL,'2018-12-22 18:12:35','2018-12-22 18:12:35'),(20,'Michael','Ferguson','CASH','michael@appoets.com','$2y$10$L7ttRPIvvBtoAQMYKoMKWe8aVEghRYXmeJ2otLPTdKDLKzNBpiRju','http://lorempixel.com/512/512/business/Xuber-Services',NULL,NULL,'android','manual',NULL,NULL,NULL,NULL,NULL,0.00,5.00,0,0,NULL,'2018-12-22 18:12:35','2018-12-22 18:12:35'),(21,'Patrick','Ferguson','CASH','patrick@appoets.com','$2y$10$lvivp3pVacAg0cHBEA3JCu5aWZ4TVaOwRjebcrcwnQm5gC9TDf6di','http://lorempixel.com/512/512/business/Xuber-Services',NULL,NULL,'android','manual',NULL,NULL,NULL,NULL,NULL,0.00,5.00,0,0,NULL,'2018-12-22 18:12:35','2018-12-22 18:12:35'),(22,'Arturo','Arturo','CASH','arturon@appoets.com','$2y$10$e59.8POhXKYpO8YdbeuOfu5ZNIE.r8u.PgleCvtI7xOH.0ciAiTeG','http://lorempixel.com/512/512/business/Xuber-Services',NULL,NULL,'android','manual',NULL,NULL,NULL,NULL,NULL,0.00,5.00,0,0,NULL,'2018-12-22 18:12:35','2018-12-22 18:12:35'),(23,'Anthony','Ken','CASH','ken@appoets.com','$2y$10$UPvkhxSnPRBsXcG2X6PSDOzGepz66qkh47CWh6007FpOXmlUQJ/7W','http://lorempixel.com/512/512/business/Xuber-Services',NULL,NULL,'android','manual',NULL,NULL,NULL,NULL,NULL,0.00,5.00,0,0,NULL,'2018-12-22 18:12:35','2018-12-22 18:12:35'),(24,'Anthony','Clinton','CASH','clinton@appoets.com','$2y$10$U752UxxkCCPPxvkhb1Vjme49Tl4.Pga7FoGODxDD8wCvKpjX3abRa','http://lorempixel.com/512/512/business/Xuber-Services',NULL,NULL,'android','manual',NULL,NULL,NULL,NULL,NULL,0.00,5.00,0,0,NULL,'2018-12-22 18:12:35','2018-12-22 18:12:35'),(25,'Gabriel','Ferguson','CASH','gabriel@appoets.com','$2y$10$VQjEOOllthl8l257WopGHuZ0TPt6afeb4wRaXJpeJBfzpgmAqPgpO','http://lorempixel.com/512/512/business/Xuber-Services',NULL,NULL,'android','manual',NULL,NULL,NULL,NULL,NULL,0.00,5.00,0,0,NULL,'2018-12-22 18:12:35','2018-12-22 18:12:35'),(26,'Gabriel','Scott','CASH','scott@appoets.com','$2y$10$JA/LxFQFgs9ohCcVf5ayLeYIU1ue.9LpLEySMylARp73s6FgTc0tC','http://lorempixel.com/512/512/business/Xuber-Services',NULL,NULL,'android','manual',NULL,NULL,NULL,NULL,NULL,0.00,5.00,0,0,NULL,'2018-12-22 18:12:36','2018-12-22 18:12:36'),(27,'Raymon','Ferguson','CASH','raymon@appoets.com','$2y$10$STi7etaTcxMHiPJWaeljY.T2PLVrgGnxDcLL2YqpqYMmaxVSXPc12','http://lorempixel.com/512/512/business/Xuber-Services',NULL,NULL,'android','manual',NULL,NULL,NULL,NULL,NULL,0.00,5.00,0,0,NULL,'2018-12-22 18:12:36','2018-12-22 18:12:36'),(28,'Shon','Ferguson','CASH','shon@appoets.com','$2y$10$pItRO8866dEQFYitKpPOheksfgS58bbd/KiDVfklWtRj//nqfK3.m','http://lorempixel.com/512/512/business/Xuber-Services',NULL,NULL,'android','manual',NULL,NULL,NULL,NULL,NULL,0.00,5.00,0,0,NULL,'2018-12-22 18:12:36','2018-12-22 18:12:36'),(29,'Dennis','Ferguson','CASH','dennis@appoets.com','$2y$10$qRpkVdr1Lma22nl1/PP1AeqRj99RnZXtLX4FJ/C4UwRZlKNjAGP82','http://lorempixel.com/512/512/business/Xuber-Services',NULL,NULL,'android','manual',NULL,NULL,NULL,NULL,NULL,0.00,5.00,0,0,NULL,'2018-12-22 18:12:36','2018-12-22 18:12:36'),(30,'Wayne','Ferguson','CASH','wayne@appoets.com','$2y$10$krHyDekQvN/nENIKhp1Nyuv1cJ8RjUzoRSeT7czriqIQqjMrG/3Pm','http://lorempixel.com/512/512/business/Xuber-Services',NULL,NULL,'android','manual',NULL,NULL,NULL,NULL,NULL,0.00,5.00,0,0,NULL,'2018-12-22 18:12:36','2018-12-22 18:12:36'),(31,'Himanshu','Daswnai','CASH','daswanihimanshu010@gmail.com','$2y$10$o7WLwq0lwVivvAECy2aO4O4D8KnWw72q3xdHAWPpSrn8JATEaWl/6','','eX6UreFdKfw:APA91bFgdUc1J8rVn4NUEaAlPca4_kuD6NuaKUUtA9OKUmnrGb-MJtWbVqbNIeh8E0Bydcl47sFOQkjEqmN1inwZYK6J3SPgORB4KTXz4Fd2aNHOg63l8FMZltPzJfERH6y8DgqL9Gfj','e86a5cf7ecec0405','android','manual','','8561972953',NULL,NULL,NULL,0.00,5.00,0,0,NULL,'2018-12-22 18:36:35','2018-12-22 18:36:35'),(32,'Himanshu','Daswnai','CASH','daswanihimanshu080@gmail.com','$2y$10$I.TgVicfRtxWm9P65VxKhuagOxan6juDHzrAUZ7n61p/ZkSuhKBMu','','eX6UreFdKfw:APA91bFgdUc1J8rVn4NUEaAlPca4_kuD6NuaKUUtA9OKUmnrGb-MJtWbVqbNIeh8E0Bydcl47sFOQkjEqmN1inwZYK6J3SPgORB4KTXz4Fd2aNHOg63l8FMZltPzJfERH6y8DgqL9Gfj','e86a5cf7ecec0405','android','manual','','8561972953',NULL,NULL,NULL,0.00,5.00,0,0,NULL,'2018-12-22 18:36:42','2018-12-22 18:36:42'),(33,'Himanshu','Daswnai','CASH','daswanihimanshu090@gmail.com','$2y$10$cpSpBQbWmfxIgfmVf6y4ZeDMIjcy4It97ZgQzh2HB2nT7a7qv5bRm','','eX6UreFdKfw:APA91bFgdUc1J8rVn4NUEaAlPca4_kuD6NuaKUUtA9OKUmnrGb-MJtWbVqbNIeh8E0Bydcl47sFOQkjEqmN1inwZYK6J3SPgORB4KTXz4Fd2aNHOg63l8FMZltPzJfERH6y8DgqL9Gfj','e86a5cf7ecec0405','android','manual','','8561972953',NULL,NULL,NULL,0.00,5.00,0,0,NULL,'2018-12-22 18:37:03','2018-12-22 18:37:03'),(34,'iSearch','Media','CASH','info@searchmedia.co.za','$2y$10$duUeeF0VPbW7dXI33xOQdeWgWj.YesEDWbjLR0KdX4yn0P5BmpP5K',NULL,NULL,NULL,'android','manual',NULL,NULL,NULL,NULL,NULL,0.00,5.00,0,0,'pRKdFTKl4qOorI6vmqhpxfDvBJ7IcMIo812uNCBzmpeS2zPWcB2gTqakiBwP','2018-12-22 19:35:31','2018-12-22 19:51:50'),(36,'Himanshu','Daswani','CASH','daswanihimanshu990@gmail.com','$2y$10$IPApHG37Eq4tzMMQCstdQ..uEkalb4qZesz6JLAqgNvISSoaM2FxC','','eX6UreFdKfw:APA91bFgdUc1J8rVn4NUEaAlPca4_kuD6NuaKUUtA9OKUmnrGb-MJtWbVqbNIeh8E0Bydcl47sFOQkjEqmN1inwZYK6J3SPgORB4KTXz4Fd2aNHOg63l8FMZltPzJfERH6y8DgqL9Gfj','e86a5cf7ecec0405','android','manual','','8561972953',NULL,NULL,NULL,0.00,5.00,0,0,NULL,'2018-12-23 10:21:27','2018-12-23 10:21:27'),(38,'Divyesh','Parmar','CASH','divyesh@user.com','$2y$10$0zHHFaSDBvwix9EP1UHDcOcIlQsM04ZdmakP5kmmfMynrjKZHCA3S','user/profile/6ec1cc72eb6a898df464bb08df519fd3.jpeg',NULL,NULL,'android','manual',NULL,'9328487662',NULL,NULL,NULL,0.00,5.00,0,0,NULL,'2023-09-20 05:18:11','2023-09-20 05:18:11'),(39,'Divyesh','Parmar','CASH','admin@xuber.com','$2y$10$DlYsC6bmlyIDJ7oO4U42CuCMsTgrik4nam3.woJDHxj8nm9C0IiQO',NULL,NULL,NULL,'android','manual',NULL,'9328487662',NULL,NULL,NULL,0.00,5.00,0,0,'HjxQlCaQRexQE5WeGtE01yrWUd5ldLdDvrgHjh518iPKSvHx3x7EwreBUlP4','2023-09-21 06:56:14','2023-12-29 05:07:53'),(40,'virat','kohli','CASH','virat@xuber.com','$2y$10$9f5h/ZGKkgUeHDqzaWe8M.lnYenSCYh1uTH1RJEngNdv0wtKCjtz2',NULL,NULL,NULL,'android','manual',NULL,'1234567890',NULL,NULL,NULL,0.00,5.00,0,0,'vNMu7AVW9ybYv8U9FvgkHNvqwta07iNo8wxDhPFMjiaX9XGM7HRpKLVF8huV','2023-09-22 03:15:19','2023-10-26 06:03:20'),(41,'Dannis','Bhai','CASH','divyeshparmar112001@gmail.com','$2y$10$pjORdO2HTrbi4GBPrAH32eyEHn7lyXMquCqgbgjP/nmHs03MTDmDa',NULL,NULL,NULL,'android','manual',NULL,NULL,NULL,NULL,NULL,0.00,5.00,0,0,'x85gh2qjsFxICybxNOynht74lgmUByRuLt96xRRsit5G7bQIwQ2ZWz5WqtUy','2023-09-26 08:10:47','2023-09-26 08:10:54'),(42,'Naman','Mathur','CASH','rajesh.kumar@hexagoninfosoft.in','$2y$10$cznH1rzvllwmGlKKko0yzeoSSQx2L9Y5d8FsHlVIktOxuFK4hW1vm','user/profile/524a2049bdebf77a9b98f2724f82be76.png',NULL,NULL,'android','manual',NULL,'9',NULL,NULL,NULL,0.00,5.00,0,0,'0AL4lvgDnfooc2NswqJ4Yb26ux0TdN1d0sPFXNN7GoMbG1blAZW9RrQihHA9','2023-10-04 02:00:14','2023-11-01 05:41:24'),(46,'Archu','Singh','CASH','archu.singh@hexagoninfosoft.com','$2y$10$8inzpWxyVyKk6ozHH/PZzucOG2CekJ3.a.6kqNgzHPIA0GfVTMMHG',NULL,NULL,NULL,'android','manual',NULL,NULL,NULL,NULL,NULL,0.00,5.00,0,0,NULL,'2023-12-28 05:46:14','2023-12-28 05:46:14'),(70,'Krunal','Vaishnav','CASH','user@krunal.com','$2a$10$1cCQ/YwSEto4t1KF1KlI4uVz.y7f0p7.45I0uWtFlLcGj0pEDGcrW','1740650883071_Lion.jpg',NULL,NULL,'android','google',NULL,'7043754778',NULL,NULL,NULL,70.00,5.00,0,0,NULL,'2025-02-05 04:45:30','2025-03-20 04:41:22'),(86,'Trada','Savan','CASH','krunalvaishnav2004@gmail.com','$2a$10$bZu6ghNs0mhXbQGqe0BJVeFF5U4fn0X1XiHC2bdd5mwr4RWIkFW0C','1741169071284_Light.jpg',NULL,NULL,'android','manual',NULL,'0840176917',NULL,NULL,NULL,0.00,5.00,0,0,NULL,'2025-03-05 10:04:31',NULL),(87,'John','Doe','CASH','johndoe@gmail.com','$2a$10$Tl4v5NHv/D4Z1Y3Mz/yHwe.bLgDcDi.XrBGsBsUBEYW3kktzxsn4m','1741341821819_Panda.jpg',NULL,NULL,'android','manual',NULL,'0840176917',NULL,NULL,NULL,0.00,5.00,0,0,NULL,'2025-03-05 10:05:16','2025-03-07 10:03:41');
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

-- Dump completed on 2025-06-01 15:44:24
