-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: dc
-- ------------------------------------------------------
-- Server version	8.2.0

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
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `IDCliente` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(255) DEFAULT NULL,
  `Correo` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`IDCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'Paola','Pao85@gmail.com'),(2,'Mauricio','Mau@gmai.com'),(3,'Valeria','Vale90@gmail.com'),(4,'Nicolas','Nic04@gmail.com'),(5,'Ximena','Xyimna@gmail.com'),(6,'Javier','javier123@gmail.com'),(7,'Alejandra','aleja_87@hotmail.com'),(8,'Carlos','carlos85@gmail.com'),(9,'Andrea','andrea.smith@yahoo.com'),(10,'Luis','luis88@hotmail.com'),(11,'Gabriela','gabby01@gmail.com'),(12,'Eduardo','edu007@yahoo.com'),(13,'Maria','maria_flores@gmail.com'),(14,'Juan','juanperez@hotmail.com'),(15,'Laura','laura_1990@gmail.com'),(16,'Pedro','pedro_martinez@yahoo.com'),(17,'Diana','diana_22@hotmail.com'),(18,'Sergio','sergio_rivera@gmail.com'),(19,'Ana','ana_cruz@yahoo.com'),(20,'Diego','diego.lopez@gmail.com'),(21,'Elena','elena.smith@hotmail.com'),(22,'Roberto','roberto75@gmail.com'),(23,'Sandra','sandra_09@yahoo.com'),(24,'Oscar','oscar90@hotmail.com'),(25,'Lucia','lucia_perez@gmail.com');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compra`
--

DROP TABLE IF EXISTS `compra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compra` (
  `IDCompra` int NOT NULL AUTO_INCREMENT,
  `IDProducto` varchar(255) DEFAULT NULL,
  `IDCliente` int DEFAULT NULL,
  `Fecha` date DEFAULT NULL,
  PRIMARY KEY (`IDCompra`),
  KEY `IDProducto` (`IDProducto`),
  KEY `IDCliente` (`IDCliente`),
  CONSTRAINT `compra_ibfk_1` FOREIGN KEY (`IDProducto`) REFERENCES `producto` (`IDProducto`),
  CONSTRAINT `compra_ibfk_2` FOREIGN KEY (`IDCliente`) REFERENCES `cliente` (`IDCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compra`
--

LOCK TABLES `compra` WRITE;
/*!40000 ALTER TABLE `compra` DISABLE KEYS */;
INSERT INTO `compra` VALUES (1,'LB3231',1,'2023-10-20'),(2,'LB2231',2,'2023-12-09'),(3,'NP6323',3,'2023-09-27'),(4,'NP6321',4,'2024-04-15'),(5,'MA0016',5,'2023-07-31'),(6,'MA0017',6,'2023-11-18'),(7,'MA4003',7,'2024-01-25'),(8,'MA4012',8,'2023-05-14'),(9,'MA0012',9,'2023-08-09'),(10,'MA0013',10,'2023-11-27'),(11,'MA0014',11,'2024-03-05'),(12,'MA0015',12,'2023-06-23'),(13,'MA0016',13,'2023-10-11'),(14,'MA0017',14,'2024-01-30'),(15,'MA0018',15,'2023-04-18'),(16,'SI1004',16,'2023-08-05'),(17,'AN1133V',17,'2023-11-23'),(18,'AN1133VCH',18,'2024-02-09'),(19,'AN1134VCH',19,'2023-05-28'),(20,'LU1001B2',20,'2023-09-15'),(21,'LU1002B2',21,'2023-12-04'),(22,'LU1003B2',22,'2023-03-23'),(23,'LU1004B2',23,'2023-07-11'),(24,'SH7003',24,'2023-10-20'),(25,'LB1231',25,'2024-02-15'),(26,'SI1003',1,'2023-06-04'),(27,'NP6324',2,'2023-09-21'),(28,'NP6323',3,'2023-12-08'),(29,'NP6321',4,'2024-04-25'),(32,'LB3231',7,'2023-04-19'),(33,'LB2231',8,'2023-08-06'),(34,'NP6323',9,'2023-11-24'),(35,'NP6321',10,'2024-02-10'),(36,'MA0016',11,'2023-05-30'),(37,'MA0017',12,'2023-09-17'),(38,'MA4003',13,'2023-12-05'),(39,'MA4012',14,'2024-03-23'),(40,'MA0012',15,'2023-07-11'),(41,'MA0013',16,'2023-10-29'),(42,'MA0014',17,'2024-02-15'),(43,'MA0015',18,'2023-05-04'),(44,'MA0016',19,'2023-08-22'),(45,'MA0017',20,'2023-12-09'),(46,'MA0018',21,'2024-03-27'),(47,'SI1004',22,'2023-07-05'),(48,'AN1133V',23,'2023-10-03'),(49,'AN1133VCH',24,'2024-01-21'),(50,'AN1134VCH',25,'2023-04-09'),(51,'LU1001B2',1,'2023-07-28');
/*!40000 ALTER TABLE `compra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `encuesta`
--

DROP TABLE IF EXISTS `encuesta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `encuesta` (
  `IDEncuesta` int NOT NULL AUTO_INCREMENT,
  `IDMarca` int DEFAULT NULL,
  `Titulo` varchar(100) DEFAULT NULL,
  `DiasParaEnvio` int DEFAULT NULL,
  `Categoria` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`IDEncuesta`),
  KEY `IDMarca` (`IDMarca`),
  CONSTRAINT `encuesta_ibfk_1` FOREIGN KEY (`IDMarca`) REFERENCES `marca` (`IDMarca`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `encuesta`
--

LOCK TABLES `encuesta` WRITE;
/*!40000 ALTER TABLE `encuesta` DISABLE KEYS */;
INSERT INTO `encuesta` VALUES (1,1,'Feedback de Colchon Lunna Basic 2 indi',15,'Colchon'),(2,1,'Â¡Queremos tu opinion de Kit Cabina + Cabina Lote-CHAR!',15,'General'),(3,1,'Feedback de Sabanas Lunna',15,'Sabanas'),(4,2,'Â¡Queremos tu opinion sobre Almohadas Nooz Essential de Microfibra-KING!',15,'Almohadas'),(5,3,'Â¡Queremos tu opinion sobre Kit Cabina + Cabina Lote-CHAR!',7,'Maletas'),(6,1,'Has comprado recientemente Juego De SÃ¡banas Individual Rosa Limonada, Â¿nos cuentas tu experiencia?',15,'Sabanas'),(7,1,'Feedback de  Lunna Signature',15,'Colchon'),(8,2,'Feedback de  Protector de colchon essential-bamboo',30,'Colchon'),(9,3,'Has comprado recientemente Master maleta Mappa Hard Shell Lote-SAN-GRA Â¿nos cuentas tu experiencia?',7,'Maletas'),(10,1,'Dinos tu opinion sobre tu almohada Luuna',14,'Almohadas');
/*!40000 ALTER TABLE `encuesta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marca`
--

DROP TABLE IF EXISTS `marca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marca` (
  `IDMarca` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`IDMarca`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marca`
--

LOCK TABLES `marca` WRITE;
/*!40000 ALTER TABLE `marca` DISABLE KEYS */;
INSERT INTO `marca` VALUES (1,'LUUNA'),(2,'NOOZ'),(3,'MAPPA'),(4,'ERGO'),(5,'GRIT'),(6,'CHARTER'),(7,'NUBED'),(8,'BRUGMANN'),(9,'UNFOLD'),(10,'HOMEWARE');
/*!40000 ALTER TABLE `marca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pregunta`
--

DROP TABLE IF EXISTS `pregunta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pregunta` (
  `IDPregunta` int NOT NULL AUTO_INCREMENT,
  `Descripcion` varchar(355) DEFAULT NULL,
  `Tipo` varchar(100) DEFAULT NULL,
  `Categoria` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`IDPregunta`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pregunta`
--

LOCK TABLES `pregunta` WRITE;
/*!40000 ALTER TABLE `pregunta` DISABLE KEYS */;
INSERT INTO `pregunta` VALUES (1,'Â¿QuÃ© te pareciÃ³ la compra de {producto}?','Rate','General'),(2,'Â¿QuÃ© edad tienes?:','MCQ','General'),(3,'Â¿Con quiÃ©n compartes tu cama?:','CheckBox','Colchon'),(4,'Â¿En promedio, cuÃ¡ntas horas duermes cada noche?','MCQ','Colchon'),(5,'Â¿Con quiÃ©n duermes?:','CheckBox','Colchon'),(6,'Â¿QuÃ© te han parecido tus productos ?','Rate','General'),(7,'Â¿Por quÃ© elegiste {marca}  vs otras marcas?','CheckBox','General'),(8,'Â¿Cuantas veces viajas al aÃ±o?','MCQ','Maletas'),(9,'Â¿QuÃ© caracterÃ­sticas consideraste mÃ¡s importantes al comprar un colchÃ³n?','CheckBox','Colchon'),(10,'Â¿CÃ³mo ha afectado la calidad de tu sueÃ±o la elecciÃ³n de tu colchÃ³n?','Open','Colchon'),(11,'Â¿CuÃ¡ntas veces has tenido que reemplazar tus maletas en los Ãºltimos aÃ±os?','MCQ','Maletas'),(12,'Â¿QuÃ© factores influyen mÃ¡s en tu decisiÃ³n de comprar una nueva maleta?','CheckBox','Maletas'),(13,'Â¿QuÃ© caracterÃ­sticas consideras mÃ¡s importantes al elegir una maleta?','MCQ','Maletas'),(14,'Â¿QuÃ© tipo de almohada prefieres: suave, firme o de soporte?','MCQ','Almohadas'),(15,'Â¿CÃ³mo ha afectado la elecciÃ³n de tus almohadas a la calidad de tu sueÃ±o?','Open','Almohadas'),(16,'Â¿CuÃ¡ntas horas duermes en promedio cada noche?','MCQ','Almohadas'),(17,'Â¿Con quÃ© frecuencia lavas tus almohadas?','MCQ','Almohadas'),(18,'Â¿CÃ³mo influye el tamaÃ±o de la almohada en tu comodidad para dormir?','MCQ','Almohadas'),(19,'Â¿CÃ³mo afecta la temperatura de tu habitaciÃ³n a tu elecciÃ³n de sÃ¡banas (calurosas, frÃ­as, reguladoras de temperatura, etc.)?','MCQ','Sabanas'),(20,'Â¿Con quÃ© frecuencia cambias tus sÃ¡banas?','MCQ','Sabanas'),(21,'Â¿CÃ³mo influyen los colores y diseÃ±os de las sÃ¡banas en la estÃ©tica de tu dormitorio?','MCQ','Sabanas'),(22,'Â¿QuÃ© opinas sobre la facilidad de planchado y mantenimiento de tus sÃ¡banas actuales?','Open','Sabanas');
/*!40000 ALTER TABLE `pregunta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `preguntaencuesta`
--

DROP TABLE IF EXISTS `preguntaencuesta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `preguntaencuesta` (
  `IDEncuesta` int NOT NULL AUTO_INCREMENT,
  `IDPregunta` int NOT NULL,
  `Obligatorio` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`IDEncuesta`,`IDPregunta`),
  KEY `IDPregunta` (`IDPregunta`),
  CONSTRAINT `preguntaencuesta_ibfk_1` FOREIGN KEY (`IDEncuesta`) REFERENCES `encuesta` (`IDEncuesta`),
  CONSTRAINT `preguntaencuesta_ibfk_2` FOREIGN KEY (`IDPregunta`) REFERENCES `pregunta` (`IDPregunta`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `preguntaencuesta`
--

LOCK TABLES `preguntaencuesta` WRITE;
/*!40000 ALTER TABLE `preguntaencuesta` DISABLE KEYS */;
INSERT INTO `preguntaencuesta` VALUES (1,1,1),(1,3,0),(1,4,1),(3,19,1),(3,20,1),(3,21,1),(3,22,1),(4,14,1),(4,15,1),(4,16,1),(4,17,1),(5,11,1),(5,12,1),(5,13,1),(7,4,1),(7,9,1),(7,10,1),(10,15,1),(10,16,1),(10,17,1),(10,18,1);
/*!40000 ALTER TABLE `preguntaencuesta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `IDProducto` varchar(255) NOT NULL,
  `IDMarca` int DEFAULT NULL,
  `Nombre` varchar(255) DEFAULT NULL,
  `Imagen` varchar(255) DEFAULT NULL,
  `Descripcion` varchar(355) DEFAULT NULL,
  `Categoria` varchar(100) DEFAULT NULL,
  `Titulo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`IDProducto`),
  KEY `IDMarca` (`IDMarca`),
  CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`IDMarca`) REFERENCES `marca` (`IDMarca`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES ('AN1133V',2,'Almohadas Nooz Essential de Microfibra LVP-REG','N/A','Para descansar como rey basta con un par de almohadas rellenas de microfibra cepillada que asemeja a la sensaciÃƒÂ³n de las plumas naturales. Ã‚Â¡CrÃƒÂ©enos  sostendrÃƒÂ¡n tu cabeza como a su majestad!','Almohadas','2 Pack Almohada Essential Regular'),('AN1133VCH',2,'Almohadas Nooz Essential de Microfibra-REG','N/A','Para descansar como rey basta con un par de almohadas rellenas de microfibra cepillada que asemeja a la sensaciÃƒÂ³n de las plumas naturales. Ã‚Â¡CrÃƒÂ©enos  sostendrÃƒÂ¡n tu cabeza como a su majestad!','Almohadas','2 Pack Almohada Essential Regular'),('AN1134VCH',2,'Almohadas Nooz Essential de Microfibra-KING','N/A','Para descansar como rey basta con un par de almohadas rellenas de microfibra cepillada que asemeja a la sensaciÃƒÂ³n de las plumas naturales. Ã‚Â¡CrÃƒÂ©enos  sostendrÃƒÂ¡n tu cabeza como a su majestad!','Almohadas','2 Pack Almohada Essential King'),('LB1231',1,'Cama QuerÃƒÂ©taro-INDI','N/A','Cama QuerÃƒÂ©taro Individual','Cama','Cama QuerÃƒÂ©taro Individual'),('LB2231',1,'Cama Anzures-INDI','https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/cama-anzures-indi/base-anzures8b4bc3.jpg','Cama Anzures Individual','Cama','Cama Anzures Individual'),('LB3231',1,'Cama Condesa-INDI','https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/cama-condesa-indi/cama-condesa.jpg','Cama Condesa Individual','Cama','Cama Condesa Individual'),('LU1001B2',1,'Luuna ColchÃƒÂ³n Basic 2-INDI','https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/luuna-colchÃƒÂ³n-basic-2-indi/basics-2.png','ColchÃƒÂ³n Luuna Basics 2 Individual','Colchon','ColchÃƒÂ³n Luuna Basics 2 Individual'),('LU1002B2',1,'Luuna ColchÃƒÂ³n Basic 2-MATRI','https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/luuna-colchÃƒÂ³n-basic-2-matri/basics-2.png','ColchÃƒÂ³n Luuna Basics 2 Matrimonial','Colchon','ColchÃƒÂ³n Luuna Basics 2 Matrimonial'),('LU1003B2',1,'Luuna ColchÃƒÂ³n Basic 2-QUEEN','https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/luuna-colchÃƒÂ³n-basic-2-queen/basics-21fec41.png','ColchÃƒÂ³n Luuna Basics 2 Queen Size','Colchon','ColchÃƒÂ³n Luuna Basics 2 Queen Size'),('LU1004B2',1,'Luuna ColchÃƒÂ³n Basic 2-KING','https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/luuna-colchÃƒÂ³n-basic-2-king/basics-2.png','ColchÃƒÂ³n Luuna Basics 2 King Size','Colchon','ColchÃƒÂ³n Luuna Basics 2 King Size'),('MA0012',3,'Kit Cabina + Cabina Lote-CHAR','https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/kit-cabina-cabina-lote-char/mappa_bb_d2c_sets_mono_22-01.png','La maleta ideal para tus escapadas cortas ahora en set. Cabe perfectamente en la cajuela de tu auto y en la cabina del aviÃƒÂ³n  con medidas estÃƒÂ¡ndares para la mayorÃƒÂ­a de aerolÃƒÂ­neas internacionales para que no tengas necesidad de documentarla.','Kit Cabina','Set Maleta Cabina'),('MA0013',3,'Kit Cabina + Cabina Lote-NAVBL','https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/kit-cabina-cabina-lote-navbl/mappa_bb_d2c_sets_mono_22-08.png','La maleta ideal para tus escapadas cortas ahora en set. Cabe perfectamente en la cajuela de tu auto y en la cabina del aviÃƒÂ³n  con medidas estÃƒÂ¡ndares para la mayorÃƒÂ­a de aerolÃƒÂ­neas internacionales para que no tengas necesidad de documentarla.','Kit Cabina','Set Maleta Cabina'),('MA0014',3,'Kit Cabina + Cabina Lote-GREEO','https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/kit-cabina-cabina-lote-greeo/mappa_bb_d2c_sets_mono_22-22.png','La maleta ideal para tus escapadas cortas ahora en set. Cabe perfectamente en la cajuela de tu auto y en la cabina del aviÃƒÂ³n  con medidas estÃƒÂ¡ndares para la mayorÃƒÂ­a de aerolÃƒÂ­neas internacionales para que no tengas necesidad de documentarla.','Kit Cabina','Set Maleta Cabina'),('MA0015',3,'Kit Cabina + Cabina Lote-SAN','https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/kit-cabina-cabina-lote-san/mappa_bb_d2c_sets_mono_22-29.png','La maleta ideal para tus escapadas cortas ahora en set. Cabe perfectamente en la cajuela de tu auto y en la cabina del aviÃƒÂ³n  con medidas estÃƒÂ¡ndares para la mayorÃƒÂ­a de aerolÃƒÂ­neas internacionales para que no tengas necesidad de documentarla.','Kit Cabina','Set Maleta Cabina'),('MA0016',3,'Kit Cabina + Cabina Lote-ORA','https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/kit-cabina-cabina-lote-ora/mappa_bb_d2c_sets_mono_22-15.png','La maleta ideal para tus escapadas cortas ahora en set. Cabe perfectamente en la cajuela de tu auto y en la cabina del aviÃƒÂ³n  con medidas estÃƒÂ¡ndares para la mayorÃƒÂ­a de aerolÃƒÂ­neas internacionales para que no tengas necesidad de documentarla.','Kit Cabina','Set Maleta Cabina'),('MA0017',3,'Kit Cabina + Cabina Lote-NTR','https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/kit-cabina-cabina-lote-ntr/mappa_bb_d2c_sets_22-22.png','La maleta ideal para tus escapadas cortas ahora en set. Cabe perfectamente en la cajuela de tu auto y en la cabina del aviÃƒÂ³n  con medidas estÃƒÂ¡ndares para la mayorÃƒÂ­a de aerolÃƒÂ­neas internacionales para que no tengas necesidad de documentarla.','Kit Cabina','Set Maleta Cabina'),('MA0018',3,'Kit Cabina + Cabina Lote-ORI','https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/kit-cabina-cabina-lote-ori/mappa_bb_d2c_sets_22-01.png','La maleta ideal para tus escapadas cortas ahora en set. Cabe perfectamente en la cajuela de tu auto y en la cabina del aviÃƒÂ³n  con medidas estÃƒÂ¡ndares para la mayorÃƒÂ­a de aerolÃƒÂ­neas internacionales para que no tengas necesidad de documentarla.','Kit Cabina','Set Maleta Cabina'),('MA4003',3,'Master maleta Mappa Hard Shell Lote-SAN-GRA','https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/master-maleta-mappa-hard-shell-lote-san-gra/sand-s-01.jpeg','El tamaÃƒÂ±o que necesitas para lanzarte a la aventura mÃƒÂ¡s duradera. Su gran capacidad harÃƒÂ¡ que puedas viajar con todo lo necesario.','Maleta','Maleta Mappa Grande Color Arena'),('MA4012',3,'Kit Cabina + Grande-SAN Lote','https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/kit-cabina-grande-san-lote/1.-sets-monocromaticos20.png','Este set de dos piezas es ideal para que encuentres el equilibrio entre lo que necesitas tener a la mano y la capacidad ÃƒÂ³ptima para lo que documentarÃƒÂ¡s.','Kit Cabina','Set Maleta Cabina + Grande Arena'),('NP6321',2,'Protector de ColchÃƒÂ³n Essential Bamboo-INDI','https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/protector-de-colchÃƒÂ³n-essential-bamboo-indi/protector_essential.png','El Protector Essential Individual te serÃƒÂ¡ muy ÃƒÂºtil si estÃƒÂ¡s buscando algo suave  impermeable y transpirable que se asegure de que ese colchÃƒÂ³n que tanto trabajo te costÃƒÂ³ tener dure mucho mÃƒÂ¡s tiempo y de que tÃƒÂº pases una buena noche.','Blancos','Protector de ColchÃƒÂ³n Essential Individual'),('NP6323',2,'Protector de ColchÃƒÂ³n Essential Bamboo-QUEEN','https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/protector-de-colchÃƒÂ³n-essential-bamboo-queen/protector_essentialc05dcc.png','El Protector Essential Queen te serÃƒÂ¡ muy ÃƒÂºtil si estÃƒÂ¡s buscando algo suave  impermeable y transpirable que se asegure de que ese colchÃƒÂ³n que tanto trabajo te costÃƒÂ³ tener dure mucho mÃƒÂ¡s tiempo y de que tÃƒÂº pases una buena noche.','Blancos','Protector de ColchÃƒÂ³n Essential Queen'),('NP6324',2,'Protector de ColchÃƒÂ³n Essential Bamboo-KING','https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/protector-de-colchÃƒÂ³n-essential-bamboo-king/protector_essentialc05dcc.png','El Protector Essential King te serÃƒÂ¡ muy ÃƒÂºtil si estÃƒÂ¡s buscando algo suave  impermeable y transpirable que se asegure de que ese colchÃƒÂ³n que tanto trabajo te costÃƒÂ³ tener dure mucho mÃƒÂ¡s tiempo y de que tÃƒÂº pases una buena noche.','Blancos','Protector de ColchÃƒÂ³n Essential King'),('SH7003',1,'Juego de SÃƒÂ¡banas Satinadas-QUEEN-BLANCOR','N/A','Juego de SÃƒÂ¡banas Satinadas Queen Size Blanco Rayas','Blancos','Juego de SÃƒÂ¡banas Satinadas Queen Size Blanco Rayas'),('SI1003',1,'Luuna Signature -QUEEN','N/A','ColchÃƒÂ³n Luuna Signature Queen','Colchon','ColchÃƒÂ³n Luuna Signature Queen'),('SI1004',1,'Luuna Signature -KING','N/A','ColchÃƒÂ³n Luuna Signature King','Colchon','ColchÃƒÂ³n Luuna Signature King');
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reseña`
--

DROP TABLE IF EXISTS `reseña`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reseña` (
  `IDReseña` int NOT NULL AUTO_INCREMENT,
  `IDEncuesta` int DEFAULT NULL,
  `IDProducto` varchar(255) DEFAULT NULL,
  `IDCliente` int DEFAULT NULL,
  `Titulo` varchar(100) DEFAULT NULL,
  `Rating` int DEFAULT NULL,
  `Descripcion` varchar(255) DEFAULT NULL,
  `Enviada` tinyint(1) DEFAULT NULL,
  `FechaContestacion` date DEFAULT NULL,
  `Contestada` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`IDReseña`),
  KEY `IDEncuesta` (`IDEncuesta`),
  KEY `IDProducto` (`IDProducto`),
  KEY `IDCliente` (`IDCliente`),
  CONSTRAINT `reseña_ibfk_1` FOREIGN KEY (`IDEncuesta`) REFERENCES `encuesta` (`IDEncuesta`),
  CONSTRAINT `reseña_ibfk_2` FOREIGN KEY (`IDProducto`) REFERENCES `producto` (`IDProducto`),
  CONSTRAINT `reseña_ibfk_3` FOREIGN KEY (`IDCliente`) REFERENCES `cliente` (`IDCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reseña`
--

LOCK TABLES `reseña` WRITE;
/*!40000 ALTER TABLE `reseña` DISABLE KEYS */;
INSERT INTO `reseña` VALUES (1,1,'AN1133V',1,'Buen precio',5,'ReseÃ±a del colchÃ³n Luuna original',1,'2023-10-20',1),(2,6,'SH7003',2,'No me gisto',1,'Feedback de Sabanas Lunna',1,'2023-12-09',1),(3,2,'MA0012',3,'Buena maleta',5,'Â¡Queremos tu opinion sobre Kit Cabina + Cabina Lote-CHAR!',1,'2023-09-27',1),(4,4,'AN1134VCH',4,'Incomoda',3,'Â¡Queremos tu opinion sobre Almohadas Nooz Essential de Microfibra-KING!',1,'2024-04-15',1),(5,7,'SI1003',4,'Muy relajante',5,'Feedback de  Lunna Signature',1,'2023-07-31',1),(6,9,'MA4003',5,'Muy resistente',5,'Has comprado recientemente Master maleta Mappa Hard Shell Lote-SAN-GRA Â¿nos cuentas tu experiencia?',1,'2023-11-18',1),(7,10,'AN1133V',6,'Muy comoda y fresca',5,'Dinos tu opinion sobre tu almohada Luuna',1,'2024-01-25',1),(8,2,'LU1003B2',7,'Esta muy fresco',5,'Dinos tu opinion sobre tu colchon Luuna',1,'2023-05-14',1),(9,3,'SH7003',8,'Suaves ',5,'Dinos tu opinion sobre tu sabana Luuna',1,'2023-08-09',1),(10,5,'MA0014',2,'Resistentes',5,'Â¡Queremos tu opinion sobre Kit Cabina + Cabina Lote-GREEO!',1,'2023-05-14',1);
/*!40000 ALTER TABLE `reseña` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `responde`
--

DROP TABLE IF EXISTS `responde`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `responde` (
  `IDRespuesta` int NOT NULL AUTO_INCREMENT,
  `IDReseña` int NOT NULL,
  `IDPregunta` int NOT NULL,
  `Respuesta` varchar(255) DEFAULT NULL,
  `Fecha` date DEFAULT NULL,
  PRIMARY KEY (`IDRespuesta`,`IDReseña`,`IDPregunta`),
  KEY `IDReseña` (`IDReseña`),
  CONSTRAINT `responde_ibfk_1` FOREIGN KEY (`IDReseña`) REFERENCES `reseña` (`IDReseña`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `responde`
--

LOCK TABLES `responde` WRITE;
/*!40000 ALTER TABLE `responde` DISABLE KEYS */;
INSERT INTO `responde` VALUES (1,1,3,'perro','2024-12-12'),(2,2,1,'5','2024-09-12'),(3,3,2,'22','2023-12-22'),(4,8,3,'Esposa','2022-01-23'),(5,7,4,'6','2023-10-20'),(6,6,12,'Resistencia','2023-12-09'),(7,7,17,'mensual','2023-09-27'),(8,10,8,'3','2024-04-15'),(9,10,11,'1','2023-07-31'),(10,5,9,'durabilidad','2023-11-18');
/*!40000 ALTER TABLE `responde` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'dc'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-08  0:05:25
