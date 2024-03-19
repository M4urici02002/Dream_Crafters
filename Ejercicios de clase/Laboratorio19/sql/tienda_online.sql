-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: tienda_online
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
-- Table structure for table `asigna`
--

DROP TABLE IF EXISTS `asigna`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asigna` (
  `username` varchar(20) NOT NULL,
  `IDRol` int NOT NULL,
  PRIMARY KEY (`username`,`IDRol`),
  KEY `IDRol` (`IDRol`),
  CONSTRAINT `asigna_ibfk_1` FOREIGN KEY (`username`) REFERENCES `usuario` (`username`),
  CONSTRAINT `asigna_ibfk_2` FOREIGN KEY (`IDRol`) REFERENCES `rol` (`IDRol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asigna`
--

LOCK TABLES `asigna` WRITE;
/*!40000 ALTER TABLE `asigna` DISABLE KEYS */;
INSERT INTO `asigna` VALUES ('julieta',1),('Sofia',1),('raquel',2);
/*!40000 ALTER TABLE `asigna` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posee`
--

DROP TABLE IF EXISTS `posee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posee` (
  `IDRol` int NOT NULL,
  `IDPrivilegio` int NOT NULL,
  PRIMARY KEY (`IDRol`,`IDPrivilegio`),
  KEY `IDPrivilegio` (`IDPrivilegio`),
  CONSTRAINT `posee_ibfk_1` FOREIGN KEY (`IDRol`) REFERENCES `rol` (`IDRol`),
  CONSTRAINT `posee_ibfk_2` FOREIGN KEY (`IDPrivilegio`) REFERENCES `privilegio` (`IDPrivilegio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posee`
--

LOCK TABLES `posee` WRITE;
/*!40000 ALTER TABLE `posee` DISABLE KEYS */;
INSERT INTO `posee` VALUES (2,1),(1,2),(2,2),(2,3);
/*!40000 ALTER TABLE `posee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `privilegio`
--

DROP TABLE IF EXISTS `privilegio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `privilegio` (
  `IDPrivilegio` int NOT NULL AUTO_INCREMENT,
  `permiso` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`IDPrivilegio`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `privilegio`
--

LOCK TABLES `privilegio` WRITE;
/*!40000 ALTER TABLE `privilegio` DISABLE KEYS */;
INSERT INTO `privilegio` VALUES (1,'añadir_producto'),(2,'ver_catalogo'),(3,'editar_producto');
/*!40000 ALTER TABLE `privilegio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `IDProducto` int NOT NULL AUTO_INCREMENT,
  `Clase` varchar(50) DEFAULT NULL,
  `Precio` int DEFAULT NULL,
  `Imagen` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`IDProducto`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,'Camisa blanca',449,'https://i.pinimg.com/474x/6d/f6/d5/6df6d5b1e9cd4167ad37b7a8557c1693.jpg'),(2,'Pantalón de vestir azul marino',749,'https://i.pinimg.com/474x/6f/af/e1/6fafe1996efa520a77372f8e01060ef6.jpg'),(3,'Traje negro',1599,'https://i.pinimg.com/474x/8c/e5/29/8ce529af57d3bc843755873c106d6361.jpg'),(4,'Pantalón de vestir beige',699,'https://i.pinimg.com/474x/4c/6b/5a/4c6b5ad613f217475971fa2aaa70a813.jpg'),(5,'Suéter blanco',449,'https://i.pinimg.com/474x/34/52/99/34529926f70b82e8e642df369aac3138.jpg'),(6,'Anillos y collar dorados',1150,'https://i.pinimg.com/474x/2b/00/c7/2b00c73c1f63dfef89a5605304f0337d.jpg'),(7,'Pulsera dorada',299,'https://i.pinimg.com/474x/66/22/a0/6622a0ff4b63f612a432a8c7f2ff3cf1.jpg'),(8,'Conjunto anillos',399,'https://i.pinimg.com/474x/d9/09/94/d909945d79dbd1affac05cca83d099d0.jpg'),(9,'Reloj dorado clásico',5600,'https://i.pinimg.com/474x/de/00/77/de00779390c2db197bbbb32c6472f5c1.jpg'),(10,'Saco negro de rayas',599,'https://i.pinimg.com/474x/fa/4d/88/fa4d88519d17f6db9b8fe830775ea4d9.jpg'),(11,'Brazalete + anillo',399,'https://i.pinimg.com/564x/77/ab/37/77ab37012723ac8fd303eae767666b4f.jpg');
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `IDRol` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`IDRol`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'comprador'),(2,'empleado');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `username` varchar(20) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES ('Daniel','Daniel Gutiérrez Hernández','$2a$12$MaWcLnPwuhgQh8JdmVx.v.7qtCHx5Bhkjp9pWMxKPMCL1zOKk3xVy'),('juan','Juan Luna García','verde11'),('julieta','Julieta Cantú Mendoza','$2a$12$Il8Mb6r.JSf3a9GbQYoFdOvAmtGXF0gq0SQxlS99cOYp6yMdpFFZ.'),('maria','María García García','azul99'),('raquel','Raquel Cantú Mendoza','$2a$12$UbuNiIbz7llnk0Js/rPzjuzwn7brvwEKX37D2K6xgo5tkykLBk2Ie'),('Sofia','Sofia López López','$2a$12$.J6xNnSP60XHpuh1csG2eujgi52dLBwc2qbqVRfPwLN.rN/M2BBOu'),('vale','Valeria Zúñiga Mendoza','contraseña123');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-18 16:40:45
