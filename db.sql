-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: nicehotels
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `city` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(250) DEFAULT NULL,
  `IdCountry` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IdCountry` (`IdCountry`),
  CONSTRAINT `city_FK` FOREIGN KEY (`IdCountry`) REFERENCES `country` (`id`),
  CONSTRAINT `City_ibfk_1` FOREIGN KEY (`IdCountry`) REFERENCES `country` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES (1,'Medellín',1),(2,'Cartagena',1),(3,'Bogota',1),(4,'Cali',1),(5,'Barranquilla',1),(6,'Santa Marta',1),(13,'Test City',NULL);
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `country` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` VALUES (1,'Colombia');
/*!40000 ALTER TABLE `country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documenttype`
--

DROP TABLE IF EXISTS `documenttype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documenttype` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documenttype`
--

LOCK TABLES `documenttype` WRITE;
/*!40000 ALTER TABLE `documenttype` DISABLE KEYS */;
INSERT INTO `documenttype` VALUES (1,'Cédula de Ciudadanía'),(2,'Tarjeta de identidad'),(3,'Pasaporte');
/*!40000 ALTER TABLE `documenttype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipment`
--

DROP TABLE IF EXISTS `equipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipment` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipment`
--

LOCK TABLES `equipment` WRITE;
/*!40000 ALTER TABLE `equipment` DISABLE KEYS */;
INSERT INTO `equipment` VALUES (1,'Aire Acondicionado con Control Individual'),(2,'Baño con ducha'),(3,'Cajilla de Seguridad electrónica con capacidad para Laptop'),(4,'Conexión gratuita de banda ancha por Cable y WiFi'),(5,'Iluminación nocturna situada en la cabecera de la cama'),(6,'Secador de Cabello'),(7,'Corriente 110 V y Cerradura Electrónica'),(8,'Escritorio con punto de Red y Eléctrico'),(9,'Radio Despertador'),(10,'Refrigerador'),(11,'TV LCD de 32 pulgadas con canales internacionales'),(12,'Vista al mar'),(13,'Baño con ducha y Set de amenities de baño'),(25,'Refrigerador, Mini Bar y Cafetera'),(26,'Cojines de lujo con tejidos artesanales'),(27,'Asientos y mesa artesanal tallada en madera'),(28,'Sistema de audio independiente High Quality con pantalla táctil'),(29,'Conexión a bluethooth y radio FM'),(30,'TV LCD de 40 pulgadas con canales internacionales'),(31,'Escritorio y silla ejecutiva con lámpara, punto de red y eléctrico'),(32,'Set de amenities de baño, bata y zapatillas de baño'),(33,'Espejo cosmético y de cuerpo entero'),(34,'Cafetera y pods de cortesía'),(35,'Televisor LED 42\", y canales internacionales');
/*!40000 ALTER TABLE `equipment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guest`
--

DROP TABLE IF EXISTS `guest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guest` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(250) DEFAULT NULL,
  `LastName` varchar(250) DEFAULT NULL,
  `Document` varchar(250) DEFAULT NULL,
  `IdDocumentType` int DEFAULT NULL,
  `DateBirth` datetime DEFAULT NULL,
  `Gender` varchar(100) DEFAULT NULL,
  `PhoneNumber` varchar(100) DEFAULT NULL,
  `Email` varchar(250) DEFAULT NULL,
  `IdCity` int DEFAULT NULL,
  `Address` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IdCity` (`IdCity`),
  KEY `IdDocumentType` (`IdDocumentType`),
  CONSTRAINT `Guest_ibfk_3` FOREIGN KEY (`IdCity`) REFERENCES `city` (`Id`),
  CONSTRAINT `Guest_ibfk_4` FOREIGN KEY (`IdDocumentType`) REFERENCES `documenttype` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guest`
--

LOCK TABLES `guest` WRITE;
/*!40000 ALTER TABLE `guest` DISABLE KEYS */;
INSERT INTO `guest` VALUES (2,'sebastian','Prado Escobar ','1007008009',1,'2000-05-06 05:00:00','Hombre','3004568952','Sebasprueba@gmail.com',2,NULL),(3,'Juan Pablo','Garcia','1037668100',1,'1999-05-06 05:00:00','Hombre','3136991907','pablo.velez0506@gmail.com',2,NULL);
/*!40000 ALTER TABLE `guest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guestroomreservated`
--

DROP TABLE IF EXISTS `guestroomreservated`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guestroomreservated` (
  `IdRoomReservated` int NOT NULL,
  `IdGuest` int NOT NULL,
  `IsResponsibleRoom` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`IdRoomReservated`,`IdGuest`),
  KEY `IdGuest` (`IdGuest`),
  CONSTRAINT `GuestRoomReservated_ibfk_1` FOREIGN KEY (`IdRoomReservated`) REFERENCES `roomreservated` (`Id`),
  CONSTRAINT `GuestRoomReservated_ibfk_2` FOREIGN KEY (`IdGuest`) REFERENCES `guest` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guestroomreservated`
--

LOCK TABLES `guestroomreservated` WRITE;
/*!40000 ALTER TABLE `guestroomreservated` DISABLE KEYS */;
INSERT INTO `guestroomreservated` VALUES (4,3,1);
/*!40000 ALTER TABLE `guestroomreservated` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hotel`
--

DROP TABLE IF EXISTS `hotel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hotel` (
  `Cod` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(250) DEFAULT NULL,
  `Description` varchar(2500) DEFAULT NULL,
  `IdCity` int DEFAULT NULL,
  `Ubication` varchar(200) DEFAULT NULL,
  `Address` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`Cod`),
  KEY `IdCity` (`IdCity`),
  CONSTRAINT `Hotel_ibfk_1` FOREIGN KEY (`IdCity`) REFERENCES `city` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=272 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotel`
--

LOCK TABLES `hotel` WRITE;
/*!40000 ALTER TABLE `hotel` DISABLE KEYS */;
INSERT INTO `hotel` VALUES (1,'Catalonia Santo Domingo','Catalonia Santo Domingo es un sensacional hotel de 21 pisos que se encuentra frente al mar, con ventanales que permiten disfrutar la hermosa vista desde todos los pisos. El hotel cuenta con 228 habitaciones decoradas de acuerdo a las exigencias del cliente corporativo y de negocio y ofrecen conexión a internet WiFi gratis, restaurante, piscina, entre otros muchos más servicios. Dispone de 1,150 m² de espacio para eventos.',4,'18.458064233083654, -69.90983222464564','\r\nAv. George Washington 500, Santo Domingo 10104, República Dominicana'),(3,'Hotel Cartagena Plaza','El Hotel Cartagena Plaza, miembro de la cadena Hotelera EM HOTELS inició operaciones en el año de 1993. El Hotel cuenta con 310 confortables habitaciones estándar, una Suite y una Junior Suite con la mejor vista al mar y a la ciudad antigua, un panorama espectacular que lo envuelve en la magia del caribe.',2,'10.402461410042378, -75.55698388796071','Bocagrande Cra 1ra No 6-154, Cartagena de Indias D.T. y C. Colombia'),(4,'Tamacá Beach Resort','En Tamacá Beach Resort puedes vivir una experiencia única de calidez y servicio lejos de casa. Con la mejor vista de la bahía del Rodadero. Todas nuestras habitaciones tienen vista al mar. También contamos con una carta exclusiva de platos típicos e internacionales, además de Bar de Cócteles y cevichería!\r\n',6,'11.200858721299356, -74.22722490622839','El Rodadero Carrera 2 #11A - 98, Gaira, Santa Marta, Magdalena, Colombia');
/*!40000 ALTER TABLE `hotel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hotelmedia`
--

DROP TABLE IF EXISTS `hotelmedia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hotelmedia` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `CodHotel` int DEFAULT NULL,
  `Name` varchar(250) DEFAULT NULL,
  `URL` varchar(500) DEFAULT NULL,
  `FileType` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `CodHotel` (`CodHotel`),
  CONSTRAINT `HotelMedia_ibfk_1` FOREIGN KEY (`CodHotel`) REFERENCES `hotel` (`Cod`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotelmedia`
--

LOCK TABLES `hotelmedia` WRITE;
/*!40000 ALTER TABLE `hotelmedia` DISABLE KEYS */;
INSERT INTO `hotelmedia` VALUES (1,3,'Banner','https://appemhotels.s3.amazonaws.com/hotelMedia/hotel-1-cartagena-plaza1.png','.png'),(2,3,'Logo','https://appemhotels.s3.amazonaws.com/hotelMedia/logo-cartagena-plaza1.png','.png'),(3,1,'Banner','https://appemhotels.s3.amazonaws.com/hotelMedia/hotel-2-catalonia-santodomingo.png','.png'),(4,1,'Logo','https://appemhotels.s3.amazonaws.com/hotelMedia/logo-catalonia-santodomingo.png','.png'),(5,4,'Banner','https://appemhotels.s3.amazonaws.com/hotelMedia/hotel-3-tamaca.png','.png'),(6,4,'Logo','https://appemhotels.s3.amazonaws.com/hotelMedia/logo-tamaca.png','.png'),(7,3,'carousel','https://appemhotels.s3.amazonaws.com/hotelMedia/hotel-cartagena-plaza1.png','.png'),(8,3,'carousel','https://appemhotels.s3.amazonaws.com/hotelMedia/hotel-cartagena-plaza2.png','.png'),(9,3,'carousel','https://appemhotels.s3.amazonaws.com/hotelMedia/hotel-cartagena-plaza3.png','.png'),(10,3,'carousel','https://appemhotels.s3.amazonaws.com/hotelMedia/hotel-cartagena-plaza4.png','.png'),(11,3,'carousel','https://appemhotels.s3.amazonaws.com/hotelMedia/hotel-cartagena-plaza5.png','.png'),(12,3,'carousel','https://appemhotels.s3.amazonaws.com/hotelMedia/hotel-cartagena-plaza6.png','.png'),(13,1,'carousel','https://appemhotels.s3.amazonaws.com/hotelMedia/hotelcatalonia1.png','.png'),(14,1,'carousel','https://appemhotels.s3.amazonaws.com/hotelMedia/hotelcatalonia2.png','.png'),(15,1,'carousel','https://appemhotels.s3.amazonaws.com/hotelMedia/hotelcatalonia3.png','.png'),(16,1,'carousel','https://appemhotels.s3.amazonaws.com/hotelMedia/hotelcatalonia4.png','.png'),(17,1,'carousel','https://appemhotels.s3.amazonaws.com/hotelMedia/hotelcatalonia5.png','.png'),(18,1,'carousel','https://appemhotels.s3.amazonaws.com/hotelMedia/hotelcatalonia6.png','.png'),(19,4,'carousel','https://appemhotels.s3.amazonaws.com/hotelMedia/hoteltamaca1.png','.png'),(20,4,'carousel','https://appemhotels.s3.amazonaws.com/hotelMedia/hoteltamaca2.png','.png'),(21,4,'carousel','https://appemhotels.s3.amazonaws.com/hotelMedia/hoteltamaca3.pnghttps://appemhotels.s3.amazonaws.com/hotelMedia/hoteltamaca3.png','.png'),(22,4,'carousel','https://appemhotels.s3.amazonaws.com/hotelMedia/hoteltamaca4.png','.png'),(23,4,'carousel','https://appemhotels.s3.amazonaws.com/hotelMedia/hoteltamaca5.png','.png'),(24,4,'carousel','https://appemhotels.s3.amazonaws.com/hotelMedia/hoteltamaca6.png','.png');
/*!40000 ALTER TABLE `hotelmedia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `installation`
--

DROP TABLE IF EXISTS `installation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `installation` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `CodHotel` int DEFAULT NULL,
  `Name` varchar(250) DEFAULT NULL,
  `Description` varchar(500) DEFAULT NULL,
  `Schedule` varchar(250) DEFAULT NULL,
  `DressCode` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `CodHotel` (`CodHotel`),
  CONSTRAINT `Installation_ibfk_1` FOREIGN KEY (`CodHotel`) REFERENCES `hotel` (`Cod`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=184 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `installation`
--

LOCK TABLES `installation` WRITE;
/*!40000 ALTER TABLE `installation` DISABLE KEYS */;
INSERT INTO `installation` VALUES (1,3,'Restaurante Lucía','La cultura caribeña y mediterránea se fusionan para brindarte una oferta gastronómica inolvidable.','lunes a viernes de 5:00am a 5:00pm','Pantalon'),(2,3,'Restaurante Le Place','Deleite su paladar con la mejor comida nacional e internacional.','lunes a viernes de 5:00am a 5:00pm','Vestidura negra'),(3,3,'Restaurante Kazabe','Propuesta gastronómica auténtica diseñada por el chef Cartagenero Charlie Otero.','lunes a viernes de 5:00am a 5:00pm','Vestidura negra'),(18,1,'Restaurante Sea Blue','Completo desayuno buffet con gran variedad de productos (también dietéticos y sin gluten)','Restaurante','Restaurante'),(22,4,'Restaurante','Un espacio apacible donde te serviremos platos exquisitos para que comas como un rey.',NULL,NULL),(23,1,'Restaurante Filigrana','Ubicado en el quinto piso ofrece una magnífica vista al mar con ventanales panorámicos.',NULL,NULL);
/*!40000 ALTER TABLE `installation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `installationmedia`
--

DROP TABLE IF EXISTS `installationmedia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `installationmedia` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `IdInstallation` int DEFAULT NULL,
  `Name` varchar(250) DEFAULT NULL,
  `URL` varchar(500) DEFAULT NULL,
  `FileType` varchar(250) DEFAULT NULL,
  `TypeMedia` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IdInstallation` (`IdInstallation`),
  CONSTRAINT `InstallationMedia_ibfk_1` FOREIGN KEY (`IdInstallation`) REFERENCES `installation` (`Id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `installationmedia`
--

LOCK TABLES `installationmedia` WRITE;
/*!40000 ALTER TABLE `installationmedia` DISABLE KEYS */;
INSERT INTO `installationmedia` VALUES (28,1,'menu-cartagena.pdf','https://appemhotels.s3.amazonaws.com/menu-cartagena.pdf','application/pdf',NULL),(29,3,'document2.pdf','https://appemhotels.s3.amazonaws.com/document2.pdf','application/pdf',NULL),(30,2,'document2.pdf','https://appemhotels.s3.amazonaws.com/document2.pdf','application/pdf',NULL),(34,3,'test44','TESTE3T','test',NULL),(35,23,'main','https://appemhotels.s3.amazonaws.com/installationMedia/catalonia+Res-1-1.png',NULL,'main'),(36,23,'carousel','https://appemhotels.s3.amazonaws.com/installationMedia/catalonia+Res-1-2.png',NULL,'carousel'),(37,23,'carousel','https://appemhotels.s3.amazonaws.com/installationMedia/catalonia+Res-1-3.png',NULL,'carousel'),(38,18,'main','https://appemhotels.s3.amazonaws.com/installationMedia/catalonia+Res-2-1.png',NULL,'main'),(39,18,'carousel','https://appemhotels.s3.amazonaws.com/installationMedia/catalonia+Res-2-2.png',NULL,'carousel'),(40,18,'carousel','https://appemhotels.s3.amazonaws.com/installationMedia/catalonia+Res-2-3.png',NULL,'carousel'),(41,1,'main','https://appemhotels.s3.amazonaws.com/installationMedia/cartagena+Res-1-1.png',NULL,'main'),(42,1,'carousel','https://appemhotels.s3.amazonaws.com/installationMedia/cartagena+Res-1-2.png',NULL,'carousel'),(43,1,'carousel','https://appemhotels.s3.amazonaws.com/installationMedia/cartagena+Res-1-3.png',NULL,'carousel'),(44,2,'main','https://appemhotels.s3.amazonaws.com/installationMedia/cartagena+Res-2-1.png',NULL,'main'),(45,2,'carousel','https://appemhotels.s3.amazonaws.com/installationMedia/cartagena+Res-2-2.png',NULL,'carousel'),(46,2,'carousel','https://appemhotels.s3.amazonaws.com/installationMedia/cartagena+Res-2-3.png',NULL,'carousel'),(47,3,'main','https://appemhotels.s3.amazonaws.com/installationMedia/cartagena+Res-3-1.png',NULL,'main'),(48,3,'carousel','https://appemhotels.s3.amazonaws.com/installationMedia/cartagena+Res-3-2.png',NULL,'carousel'),(49,3,'carousel','https://appemhotels.s3.amazonaws.com/installationMedia/cartagena+Res-3-3.png',NULL,'carousel'),(50,22,'main','https://appemhotels.s3.amazonaws.com/installationMedia/tamaca+Res-1-1.png',NULL,'main'),(51,22,'carousel','https://appemhotels.s3.amazonaws.com/installationMedia/tamaca+Res-1-2.png',NULL,'carousel');
/*!40000 ALTER TABLE `installationmedia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `installationroomreservated`
--

DROP TABLE IF EXISTS `installationroomreservated`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `installationroomreservated` (
  `IdInstallation` int NOT NULL,
  `IdRoomReservated` int NOT NULL,
  `DateReservation` datetime DEFAULT NULL,
  `Total` float DEFAULT NULL,
  PRIMARY KEY (`IdInstallation`,`IdRoomReservated`),
  KEY `IdRoomReservated` (`IdRoomReservated`),
  CONSTRAINT `InstallationRoomReservated_ibfk_1` FOREIGN KEY (`IdRoomReservated`) REFERENCES `roomreservated` (`Id`),
  CONSTRAINT `InstallationRoomReservated_ibfk_2` FOREIGN KEY (`IdInstallation`) REFERENCES `installation` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `installationroomreservated`
--

LOCK TABLES `installationroomreservated` WRITE;
/*!40000 ALTER TABLE `installationroomreservated` DISABLE KEYS */;
/*!40000 ALTER TABLE `installationroomreservated` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `installationtype`
--

DROP TABLE IF EXISTS `installationtype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `installationtype` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `installationtype`
--

LOCK TABLES `installationtype` WRITE;
/*!40000 ALTER TABLE `installationtype` DISABLE KEYS */;
INSERT INTO `installationtype` VALUES (1,'Restaurante'),(2,'Servicio al cuarto');
/*!40000 ALTER TABLE `installationtype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `IdInstallation` int DEFAULT NULL,
  `Name` varchar(250) DEFAULT NULL,
  `Description` varchar(500) DEFAULT NULL,
  `Cost` float DEFAULT NULL,
  `IsRoomService` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IdInstallation` (`IdInstallation`),
  CONSTRAINT `Product_ibfk_1` FOREIGN KEY (`IdInstallation`) REFERENCES `installation` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,1,'Huevos','Deliciosos huevos',5000,1),(2,1,'Salchichas','Deliciosas salchichas',6000,0),(3,3,'Limpieza de loza','La mejor limpieza, para ti.',0,1),(4,2,'Salchichas','Deliciosas salchichas alfredo',6000,0),(11,1,'Cafe con leche','bebida caliente',5000,1),(13,3,'prueba2','prueba2',0,1),(23,3,'Prueba desde el front Angular','Pequeña Descripcion actualizada de nuevo',0,1);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productmedia`
--

DROP TABLE IF EXISTS `productmedia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productmedia` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `IdProduct` int DEFAULT NULL,
  `Name` varchar(250) DEFAULT NULL,
  `URL` varchar(500) DEFAULT NULL,
  `FileType` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IdProduct` (`IdProduct`),
  CONSTRAINT `ProductMedia_ibfk_1` FOREIGN KEY (`IdProduct`) REFERENCES `product` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productmedia`
--

LOCK TABLES `productmedia` WRITE;
/*!40000 ALTER TABLE `productmedia` DISABLE KEYS */;
/*!40000 ALTER TABLE `productmedia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productroomservicedetail`
--

DROP TABLE IF EXISTS `productroomservicedetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productroomservicedetail` (
  `IdProduct` int NOT NULL,
  `IdRoomService` int NOT NULL,
  `Quantity` smallint DEFAULT NULL,
  `Observations` varchar(250) DEFAULT NULL,
  `Taxes` float DEFAULT NULL,
  `Total` float DEFAULT NULL,
  PRIMARY KEY (`IdProduct`,`IdRoomService`),
  KEY `IdRoomService` (`IdRoomService`),
  CONSTRAINT `ProductRoomServiceDetail_ibfk_1` FOREIGN KEY (`IdProduct`) REFERENCES `product` (`Id`),
  CONSTRAINT `ProductRoomServiceDetail_ibfk_2` FOREIGN KEY (`IdRoomService`) REFERENCES `roomservice` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productroomservicedetail`
--

LOCK TABLES `productroomservicedetail` WRITE;
/*!40000 ALTER TABLE `productroomservicedetail` DISABLE KEYS */;
/*!40000 ALTER TABLE `productroomservicedetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recommendedsite`
--

DROP TABLE IF EXISTS `recommendedsite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recommendedsite` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `CodHotel` int DEFAULT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `Description` varchar(2000) DEFAULT NULL,
  `Address` varchar(100) DEFAULT NULL,
  `Ubication` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `CodHotel` (`CodHotel`),
  CONSTRAINT `RecommendedSite_ibfk_1` FOREIGN KEY (`CodHotel`) REFERENCES `hotel` (`Cod`)
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recommendedsite`
--

LOCK TABLES `recommendedsite` WRITE;
/*!40000 ALTER TABLE `recommendedsite` DISABLE KEYS */;
INSERT INTO `recommendedsite` VALUES (1,3,'Monumento Torre del Reloj','La Puerta del Reloj, Torre del Reloj o Boca del Puente o Plaza Internacional Carlos Campillo es la puerta de entrada principal al centro histórico de Cartagena de Indias en Colombia y la entrada original a la ciudad fortificada. Está ubicado entre las plazas de Independencia y de los Coches. El nombre \"Puerta del Reloj\" responde al reloj con el que fue coronada la torre a principios del siglo XVIII. Mientras que el nombre de Boca del Puente se debe al hecho que, durante el período colonial español, se levantó un puente levadizo al pie del antiguo Canal de San Anastasio, que unía la Ciudad Amurallada con el legendario Barrio Getsemaní. El puente sirvió además como defensa de la ciudad, ya que en caso de ataque enemigo, este se alzó para impedir el acceso de piratas y bucaneros. También la puerta estaba protegida por los bastiones de San Pedro Apóstol y el de San Juan Bautista. Tiene un estilo postclásico en su fachada, precursor de los que preconizaron los tratados sobre fortificación de la segunda mitad del siglo XVIII.','Boca del Puente, Centro, Cartagena de Indias, Provincia de Cartagena, Bolívar','10.422203715659304, -75.548684592485'),(3,1,'test2','test2','calle 22 # 33A',''),(23,3,'Centro Historico','El Centro Histórico de Cartagena es un hermoso y pintoresco barrio ubicado en la ciudad de Cartagena de Indias, en la costa Caribe de Colombia. ','Centro Historico Cartagena','10.422906,-75.54961'),(24,3,'Plaza de Santo Domingo','La Plaza de Santo Domingo es una pintoresca plaza ubicada en el Centro Histórico de Cartagena de Indias, en la costa Caribe de Colombia.La plaza es conocida por su hermosa iglesia colonial.','Plaza de Santo Domingo de Cartagena','10.42434,-75.551975'),(25,3,'Museo del Oro Zenú','Exposición de la riqueza cultural y artesanal de la cultura Zenú.','Museo del Oro Zenú de Cartagena','10.4229724,-75.5508527'),(26,3,'Teatro Adolfo Mejía','Histórico teatro neoclásico para eventos culturales y artísticos en Cartagena.','Teatro Adolfo Mejía de Cartagena','10.4266111,-75.5511837');
/*!40000 ALTER TABLE `recommendedsite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recommendedsitemedia`
--

DROP TABLE IF EXISTS `recommendedsitemedia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recommendedsitemedia` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `IdRecommendedSite` int DEFAULT NULL,
  `Name` varchar(250) DEFAULT NULL,
  `URL` varchar(500) DEFAULT NULL,
  `FileType` varchar(250) DEFAULT NULL,
  `TypeMedia` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IdRecommendedSite` (`IdRecommendedSite`),
  CONSTRAINT `RecommendedSiteMedia_ibfk_1` FOREIGN KEY (`IdRecommendedSite`) REFERENCES `recommendedsite` (`Id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recommendedsitemedia`
--

LOCK TABLES `recommendedsitemedia` WRITE;
/*!40000 ALTER TABLE `recommendedsitemedia` DISABLE KEYS */;
INSERT INTO `recommendedsitemedia` VALUES (1,1,'main','https://cdn.colombia.com/sdi/2015/10/18/torre-del-reloj-704593.jpg','jpg','main'),(2,23,'main','https://blogapi.uber.com/wp-content/uploads/2019/05/Sitios-hist%C3%B3ricos-de-Cartagena-conoce-x-maravillas-de-este-para%C3%ADso-1024x512.png','png','main'),(3,24,'main','https://upload.wikimedia.org/wikipedia/commons/c/c9/Vista_de_la_plaza_e_iglesis_de_Santo_Domingo_Cartagena._Colombia..JPG','jpg','main'),(4,25,'main','https://intercartagena.com/wp-content/uploads/2019/12/plaza-de-la-aduana-cartagena-7-1024x683.jpg','jpg','main'),(5,26,'main','https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/39/8d/97.jpg','jpg','main');
/*!40000 ALTER TABLE `recommendedsitemedia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation` (
  `Num` int NOT NULL,
  `StartDate` datetime DEFAULT NULL,
  `EndDate` datetime DEFAULT NULL,
  `TotalAdults` smallint DEFAULT NULL,
  `TotalKids` smallint DEFAULT NULL,
  `TotalBabys` smallint DEFAULT NULL,
  `NumberNights` smallint DEFAULT NULL,
  `SubTotal` float DEFAULT NULL,
  `Total` float DEFAULT NULL,
  PRIMARY KEY (`Num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation`
--

LOCK TABLES `reservation` WRITE;
/*!40000 ALTER TABLE `reservation` DISABLE KEYS */;
INSERT INTO `reservation` VALUES (1,'2023-01-05 15:38:41','2023-01-12 15:38:51',2,1,0,5,2000000,2500000),(2,'2023-01-05 15:38:41','2023-01-12 15:38:51',1,0,0,7,2000000,2500000);
/*!40000 ALTER TABLE `reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `Id` varchar(250) NOT NULL,
  `Name` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES ('1a7b8e8f-9d2d-4055-8a04-c72d1bdcdfda','InstallationAdmin'),('1c7337ac-b616-437a-8e19-eb746c047d95','HotelAdmin'),('5f1e2f15-59fe-4aa1-93e1-d1aa06ea43eb','RoomServiceAdmin'),('cfad205e-a026-47b3-9915-9b7babba3101','EmployeeHotel'),('fbbc0021-8719-4e7a-b3d9-47c07b8e747f','SuperAdmin');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `Cod` int NOT NULL AUTO_INCREMENT,
  `CodHotel` int DEFAULT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `Description` varchar(1000) DEFAULT NULL,
  `CostNight` float DEFAULT NULL,
  PRIMARY KEY (`Cod`),
  KEY `CodHotel` (`CodHotel`),
  CONSTRAINT `Room_ibfk_1` FOREIGN KEY (`CodHotel`) REFERENCES `hotel` (`Cod`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (1,3,'Estándar','Cómodas y confortables habitaciones de 30M²., muy bien dotadas, donde vivirá una experiencia única de hospitalidad, servicio y confort. Sus grandes espacios la hacen el lugar ideal para relajarse y descansar. Cuenta con dos (2) camas dobles y (1) Sofá cama doble (para tercer adulto y/o persona adicional).',737100),(3,3,'Superior con vistas al mar','Contempla Medellín o sus montañas desde una habitación Doble Superior donde el silencio te acompaña y te invita a pasar plácidas noches.​',764100),(4,3,'Superior con vistas a la ciudad','Nuestras habitaciones Superiores City View cuentan con espacios especialmente diseñados para disfrutar ó trabajar dentro del marco de la amplitud y luminosidad en un ambiente moderno.',764100),(7,3,'Music Room','Disfrute de la increíble vista al mar caribe, en una mezcla de comodidad, entretenimiento y confort,',845100),(15,4,'Habitación Superior 1 cama','El Tamacá Beach Resort Hotel cuenta con habitaciones individuales Superiores. Se trata de amplias, funcionales, y confortables estancias,',488000),(16,4,'Habitación Superior 2 camas\r\n','El Hotel Tamacá Beach Resort en Santa Marta ofrece amplias habitaciones superiores con impresionantes vistas a la Bahía del Rodadero.',488000),(17,1,'Ocean View','Las habitaciones ocean view son espaciosas con equipamiento básico, cómodas y acogedoras. Ideal para huéspedes que buscan relajarse. ',640000),(18,1,'Ocean Front','Espaciosas habitaciones con equipamiento básico. Ideal para huéspedes que disfrutan de una vista frontal al mar a través de ventanal panorámico.',696000);
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roommedia`
--

DROP TABLE IF EXISTS `roommedia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roommedia` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `CodRoom` int DEFAULT NULL,
  `Name` varchar(250) DEFAULT NULL,
  `URL` varchar(500) DEFAULT NULL,
  `FileType` varchar(250) DEFAULT NULL,
  `TypeMedia` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `CodRoom` (`CodRoom`),
  CONSTRAINT `RoomMedia_ibfk_1` FOREIGN KEY (`CodRoom`) REFERENCES `room` (`Cod`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roommedia`
--

LOCK TABLES `roommedia` WRITE;
/*!40000 ALTER TABLE `roommedia` DISABLE KEYS */;
INSERT INTO `roommedia` VALUES (1,1,'main','https://appemhotels.s3.amazonaws.com/roomMedia/cartagena+Hab-1-1.png',NULL,'main'),(2,1,'carousel','https://appemhotels.s3.amazonaws.com/roomMedia/cartagena+Hab-1-2.png',NULL,'carousel'),(3,1,'carousel','https://appemhotels.s3.amazonaws.com/roomMedia/cartagena+Hab-1-3.png',NULL,'carousel'),(4,7,'main','https://appemhotels.s3.amazonaws.com/roomMedia/cartagena+Hab-2-1.png',NULL,'main'),(5,7,'carousel','https://appemhotels.s3.amazonaws.com/roomMedia/cartagena+Hab-2-2.png',NULL,'carousel'),(6,7,'carousel','https://appemhotels.s3.amazonaws.com/roomMedia/cartagena+Hab-2-3.png',NULL,'carousel'),(7,4,'main','https://appemhotels.s3.amazonaws.com/roomMedia/cartagena+Hab-3-1.png',NULL,'main'),(8,4,'carousel','https://appemhotels.s3.amazonaws.com/roomMedia/cartagena+Hab-3-2.png',NULL,'carousel'),(9,4,'carousel','https://appemhotels.s3.amazonaws.com/roomMedia/cartagena+Hab-3-3.png',NULL,'carousel'),(10,3,'main','https://appemhotels.s3.amazonaws.com/roomMedia/cartagena+Hab-4-1.png',NULL,'main'),(11,3,'carousel','https://appemhotels.s3.amazonaws.com/roomMedia/cartagena+Hab-4-2.png',NULL,'carousel'),(12,3,'carousel','https://appemhotels.s3.amazonaws.com/roomMedia/cartagena+Hab-4-3.png',NULL,'carousel'),(13,18,'main','https://appemhotels.s3.amazonaws.com/roomMedia/catalonia+Hab-1-1.png',NULL,'main'),(14,18,'carousel','https://appemhotels.s3.amazonaws.com/roomMedia/catalonia+Hab-1-2.png',NULL,'carousel'),(15,18,'carousel','https://appemhotels.s3.amazonaws.com/roomMedia/catalonia+Hab-1-3.png',NULL,'carousel'),(16,17,'main','https://appemhotels.s3.amazonaws.com/roomMedia/catalonia+Hab-2-1.png',NULL,'main'),(17,17,'carousel','https://appemhotels.s3.amazonaws.com/roomMedia/catalonia+Hab-2-2.png',NULL,'carousel'),(18,17,'carousel','https://appemhotels.s3.amazonaws.com/roomMedia/catalonia+Hab-2-3.png',NULL,'carousel'),(19,15,'main','https://appemhotels.s3.amazonaws.com/roomMedia/tamaca+Hab-1-1.png',NULL,'main'),(20,15,'carousel','https://appemhotels.s3.amazonaws.com/roomMedia/tamaca+Hab-1-2.png',NULL,'carousel'),(21,15,'carousel','https://appemhotels.s3.amazonaws.com/roomMedia/tamaca+Hab-1-3.png',NULL,'carousel'),(22,16,'main','https://appemhotels.s3.amazonaws.com/roomMedia/tamaca+Hab-2-1.png',NULL,'main'),(23,16,'carousel','https://appemhotels.s3.amazonaws.com/roomMedia/tamaca+Hab-2-2.png',NULL,'carousel'),(24,16,'carousel','https://appemhotels.s3.amazonaws.com/roomMedia/tamaca+Hab-2-3.png',NULL,'carousel');
/*!40000 ALTER TABLE `roommedia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roomnumber`
--

DROP TABLE IF EXISTS `roomnumber`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roomnumber` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Num` int DEFAULT NULL,
  `CodRoom` int DEFAULT NULL,
  `IsAvailable` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `CodRoom` (`CodRoom`),
  CONSTRAINT `RoomNumber_ibfk_1` FOREIGN KEY (`CodRoom`) REFERENCES `room` (`Cod`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roomnumber`
--

LOCK TABLES `roomnumber` WRITE;
/*!40000 ALTER TABLE `roomnumber` DISABLE KEYS */;
INSERT INTO `roomnumber` VALUES (1,1005,1,1),(2,1006,1,1),(5,1015,3,1),(6,1016,3,1),(12,4443,3,0),(24,1231,7,0),(25,4413,3,0);
/*!40000 ALTER TABLE `roomnumber` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roomreservated`
--

DROP TABLE IF EXISTS `roomreservated`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roomreservated` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `NumReservation` int DEFAULT NULL,
  `IdRoomNumber` int DEFAULT NULL,
  `NumberAdults` smallint DEFAULT NULL,
  `NumberKids` smallint DEFAULT NULL,
  `NumberBabys` smallint DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `NumReservation` (`NumReservation`),
  KEY `IdRoomNumber` (`IdRoomNumber`),
  CONSTRAINT `RoomReservated_ibfk_1` FOREIGN KEY (`NumReservation`) REFERENCES `reservation` (`Num`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `RoomReservated_ibfk_2` FOREIGN KEY (`IdRoomNumber`) REFERENCES `roomnumber` (`Id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roomreservated`
--

LOCK TABLES `roomreservated` WRITE;
/*!40000 ALTER TABLE `roomreservated` DISABLE KEYS */;
INSERT INTO `roomreservated` VALUES (3,2,2,2,1,0),(4,1,1,1,0,0);
/*!40000 ALTER TABLE `roomreservated` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roomservice`
--

DROP TABLE IF EXISTS `roomservice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roomservice` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `IdRoomReservated` int NOT NULL,
  `DateRoomService` datetime DEFAULT NULL,
  `SubTotal` float DEFAULT NULL,
  `Total` float DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IdRoomReservated` (`IdRoomReservated`),
  CONSTRAINT `RoomService_ibfk_1` FOREIGN KEY (`IdRoomReservated`) REFERENCES `roomreservated` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roomservice`
--

LOCK TABLES `roomservice` WRITE;
/*!40000 ALTER TABLE `roomservice` DISABLE KEYS */;
INSERT INTO `roomservice` VALUES (2,4,'2023-01-11 15:38:51',15000,15000);
/*!40000 ALTER TABLE `roomservice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service`
--

DROP TABLE IF EXISTS `service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `IdInstallation` int DEFAULT NULL,
  `CodHotel` int DEFAULT NULL,
  `Name` varchar(250) DEFAULT NULL,
  `Description` varchar(500) DEFAULT NULL,
  `Cost` float DEFAULT NULL,
  `IsRoomService` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IdInstallation` (`IdInstallation`),
  KEY `CodHotel` (`CodHotel`),
  CONSTRAINT `Service_ibfk_1` FOREIGN KEY (`IdInstallation`) REFERENCES `installation` (`Id`),
  CONSTRAINT `Service_ibfk_2` FOREIGN KEY (`CodHotel`) REFERENCES `hotel` (`Cod`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service`
--

LOCK TABLES `service` WRITE;
/*!40000 ALTER TABLE `service` DISABLE KEYS */;
INSERT INTO `service` VALUES (6,NULL,3,'Recoger Loza','Servicio Para Recoger Platos y Loza En General directamente en tu Cuarto',0,NULL),(7,NULL,3,'Servicio de Limpieza de Habitación','Limpieza y desinfección de Cuarto del un Huésped ',0,NULL),(8,NULL,3,'Préstamo de Adaptador ','Préstamo de Adaptador de Toma Corriente de tipo Europeo a Americano ',0,NULL),(11,NULL,3,'Toalla extra','Se realiza servicio de toalla extra, para el huesped.',0,NULL);
/*!40000 ALTER TABLE `service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicereservation`
--

DROP TABLE IF EXISTS `servicereservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicereservation` (
  `IdProduct` int NOT NULL,
  `NumReservation` int NOT NULL,
  `Quantity` smallint DEFAULT NULL,
  `Date` datetime DEFAULT NULL,
  `Total` float DEFAULT NULL,
  PRIMARY KEY (`IdProduct`,`NumReservation`),
  KEY `NumReservation` (`NumReservation`),
  CONSTRAINT `ServiceReservation_ibfk_1` FOREIGN KEY (`NumReservation`) REFERENCES `reservation` (`Num`),
  CONSTRAINT `ServiceReservation_ibfk_2` FOREIGN KEY (`IdProduct`) REFERENCES `product` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicereservation`
--

LOCK TABLES `servicereservation` WRITE;
/*!40000 ALTER TABLE `servicereservation` DISABLE KEYS */;
/*!40000 ALTER TABLE `servicereservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `serviceroomservicedetail`
--

DROP TABLE IF EXISTS `serviceroomservicedetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `serviceroomservicedetail` (
  `IdService` int NOT NULL,
  `IdRoomService` int NOT NULL,
  `Quantity` smallint DEFAULT NULL,
  `Observations` varchar(250) DEFAULT NULL,
  `Taxes` float DEFAULT NULL,
  `Total` float DEFAULT NULL,
  PRIMARY KEY (`IdService`,`IdRoomService`),
  KEY `IdRoomService` (`IdRoomService`),
  CONSTRAINT `ServiceRoomServiceDetail_ibfk_1` FOREIGN KEY (`IdService`) REFERENCES `service` (`Id`),
  CONSTRAINT `ServiceRoomServiceDetail_ibfk_2` FOREIGN KEY (`IdRoomService`) REFERENCES `roomservice` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `serviceroomservicedetail`
--

LOCK TABLES `serviceroomservicedetail` WRITE;
/*!40000 ALTER TABLE `serviceroomservicedetail` DISABLE KEYS */;
/*!40000 ALTER TABLE `serviceroomservicedetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'nicehotels'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-23 20:45:21
