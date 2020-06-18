# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: renewals-db.elsevier.internal (MySQL 5.6.44-log)
# Database: renewals
# Generation Time: 2020-01-23 10:19:28 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table customers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `customers`;

CREATE TABLE `customers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `address1` varchar(255) NOT NULL DEFAULT '',
  `address2` varchar(255) NOT NULL DEFAULT '',
  `address3` varchar(255) NOT NULL DEFAULT '',
  `address4` varchar(255) NOT NULL DEFAULT '',
  `address5` varchar(255) NOT NULL DEFAULT '',
  `townCity` varchar(255) NOT NULL DEFAULT '',
  `state` varchar(255) NOT NULL DEFAULT '',
  `postcodeZip` varchar(255) NOT NULL DEFAULT '',
  `country` varchar(255) NOT NULL DEFAULT '',
  `email` varchar(255) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL DEFAULT '',
  `source` tinyint(3) unsigned NOT NULL,
  `sourceId` int(255) NOT NULL,
  `fullName` varchar(255) DEFAULT '',
  `firstName` varchar(255) DEFAULT '',
  `lastName` varchar(255) DEFAULT '',
  `companyName` varchar(255) NOT NULL DEFAULT '',
  `imprintCode` varchar(20) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `customers_sourceId_source_imprintCode_pk` (`sourceId`,`source`,`imprintCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;

INSERT INTO `customers` (`id`, `address1`, `address2`, `address3`, `address4`, `address5`, `townCity`, `state`, `postcodeZip`, `country`, `email`, `name`, `source`, `sourceId`, `fullName`, `firstName`, `lastName`, `companyName`, `imprintCode`)
VALUES
	(1,'N RIVER ST','STE 201','','','','PLAINS','PA','18705','US','test.elsevier.io+mc+renewals@gmail.com','Renewals Automation Testing',2,411352,'Renewals Automation','Ren','Autom','NE PA CARDIOLOGY ASSOC LLC','HealthScience'),
	(208,'N RIVER ST','STE 201','','','','PLAINS','PA','18705','US','test.elsevier.io+android+renewals@gmail.com','Renewals Automation Testing',2,411353,'Renewals Automation','Ren','Autom','NE PA CARDIOLOGY ASSOC LLC','HealthScience'),
	(27814,'ACQUISITIONS/SERIALS','NEWCOMB RD PO BOX','CHARLOTTESVILLE VA 22904-4105','UNITED STATES OF AMERICA','22904-4105','VA    540','VA','22904-4105','US','test.elsevier.io+iosipd+renewals@gmail.com','Renewals Automation Testing',2,411354,'Renewals Automation','Ren','Autom','',''),
	(146329,'SERVICE ABONNEMENTS','62 AVENUE DE SUFFREN','75015 PARIS','FRANCE','','PARIS','PA','75015','FR','test.elsevier.io+w10ie+renewals@gmail.com','Renewals Automation Testing',2,411355,'Renewals Automation','Ren','Autom','',''),
	(146330,'TECHNICAL SERVICES','HALE LIBRARY','MANHATTAN KS 66506-8010','UNITED STATES OF AMERICA','66506-8010','KS','KS','66506-8010','US','test.elsevier.io+iosiph+renewals@gmail.com','Renewals Automation Testing',2,411356,'Renewals Automation','Ren','Autom','',''),
	(148037,'LIBRARY,SERIALS DEPARTMENT','HALE LIB,MID-CAMPUS DRIVE','MANHATTAN KS 66506-1200','UNITED STATES OF AMERICA','66506-1200','KS','KS','66506-1200','US','test.elsevier.io+w7c+renewals@gmail.com','Renewals Automation Testing',2,411357,'Renewals Automation','Ren','Autom','',''),
	(158318,'BSB-ZEITSCHRIFTEN','ZEITSCHRIFTENSAAL 816.29.0','LUDWIGSTR.','80539 M?NCHEN','GERMANY','M?NCHEN','M?','80539','DE','test.elsevier.io+w10e+renewals@gmail.com','Renewals Automation Testing',2,411358,'Renewals Automation','Ren','Autom','',''),
	(159596,'BSB ZEITSCHRIFTEN','ZEITSCHRIFTENSAAL','LUDWIGSTR','80539 M?NCHEN','GERMANY','M?NCHEN','M?','80539','DE','test.elsevier.io+w8f+renewals@gmail.com','Renewals Automation Testing',2,411359,'Renewals Automation','Ren','Autom','',''),
	(165431,'N RIVER ST','STE 201','','','','PLAINS','PA','18705','US','test.elsevier.io+mc+renewals@gmail.com','Renewals Automation Testing',1,611355,'Renewals Automation','Ren','Autom','NE PA CARDIOLOGY ASSOC LLC',''),
	(165432,'N RIVER ST','STE 201','','','','PLAINS','PA','18705','US','test.elsevier.io+android+renewals@gmail.com','Renewals Automation Testing',1,611356,'Renewals Automation','Ren','Autom','NE PA CARDIOLOGY ASSOC LLC','HealthScience'),
	(165433,'ACQUISITIONS/SERIALS','NEWCOMB RD PO BOX','CHARLOTTESVILLE VA 22904-4105','UNITED STATES OF AMERICA','22904-4105','VA    540','VA','22904-4105','US','test.elsevier.io+iosipd+renewals@gmail.com','Renewals Automation Testing',1,611357,'Renewals Automation','Ren','Autom','',''),
	(165434,'SERVICE ABONNEMENTS','62 AVENUE DE SUFFREN','75015 PARIS','FRANCE','','PARIS','PA','75015','FR','test.elsevier.io+w10ie+renewals@gmail.com','Renewals Automation Testing',1,611358,'Renewals Automation','Ren','Autom','',''),
	(165435,'TECHNICAL SERVICES','HALE LIBRARY','MANHATTAN KS 66506-8010','UNITED STATES OF AMERICA','66506-8010','KS','KS','66506-8010','US','test.elsevier.io+iosiph+renewals@gmail.com','Renewals Automation Testing',1,611359,'Renewals Automation','Ren','Autom','',''),
	(165436,'LIBRARY,SERIALS DEPARTMENT','HALE LIB,MID-CAMPUS DRIVE','MANHATTAN KS 66506-1200','UNITED STATES OF AMERICA','66506-1200','KS','KS','66506-1200','US','test.elsevier.io+w7c+renewals@gmail.com','Renewals Automation Testing',1,611360,'Renewals Automation','Ren','Autom','',''),
	(165437,'BSB-ZEITSCHRIFTEN','ZEITSCHRIFTENSAAL 816.29.0','LUDWIGSTR.','80539 M?NCHEN','GERMANY','M?NCHEN','M?','80539','DE','test.elsevier.io+w10e+renewals@gmail.com','Renewals Automation Testing',1,611361,'Renewals Automation','Ren','Autom','',''),
	(165438,'BSB ZEITSCHRIFTEN','ZEITSCHRIFTENSAAL','LUDWIGSTR','80539 M?NCHEN','GERMANY','M?NCHEN','M?','80539','DE','test.elsevier.io+w8f+renewals@gmail.com','Renewals Automation Testing',1,611362,'Renewals Automation','Ren','Autom','',''),
	(165439,'656 HUNT LN','','','','','MANHASSET','NY','110302756','','','',3,1700041137,'BOB RHOSKINS','BOB','HOSKINS','',''),
	(165440,'656 HUNT LN','','','','','MANHASSET','NY','110302756','','dr.HOSKINS@hotmail.com','',3,1750037422,'BOB RHOSKINS','BOB','HOSKINS','',''),
	(165441,'BLACKENSVAGEN 104','','','','','ALVSJO','','S 125 32','SE','','',3,1700042838,'BONJORNO BINGO','BONJORNO','BINGO','',''),
	(165442,'BLACKENSVAGEN 104','','','','','ALVSJO','','S 125 32','SE','g.BINGO@gmail.com','',3,1750038055,'BONJORNO BINGO','BONJORNO','BINGO','',''),
	(165443,'A Street in Belgium','','','','','EEKLO','','B 9900','BE','','',3,1700042941,'Renewal Test 1','Renewal','Test 1','','HealthScience'),
	(165444,'Street in EEKLO','','','','','EEKLO','','B 9900','BE','f.garrett@elsevier.com','',3,1750038094,'Renewal Test 1','Renewal','Test 1','','HealthScience'),
	(165445,'Street in St. Louis','STE 100','','','','SAINT LOUIS','MO','631223356','US','','',3,1700181203,'Renewal test 8','Renewal','Test 8','','HealthScience'),
	(165446,'Street in St.Louis','STE 100','','','','SAINT LOUIS','MO','631223356','US','f.garrett@elsevier.com','',3,1750303004,'Renewal test 8','Renewal','Test 8','','HealthScience'),
	(165447,'Street in Yelverton','','','','','YELVERTON DEVON','','PL206BW','GB','','',3,1700342056,'Renewal test 6','Renewal','Test 6','','HealthScience'),
	(165448,'','Street in Leverton','','','','YELVERTON DEVON','','PL206BW','GB','f.garrett@elsevier.com','',3,1750079204,'Renewal Test 6','Renewal','Test 6','','HealthScience'),
	(165449,'Street in Calgary','','','','','CALGARY','AB','T2M 4A8','CA','','',3,1700263024,'Renewal Test 2','Renewal','Test 2','','HealthScience'),
	(165450,'Street in Calgary','','','','','CALGARY','AB','T2M 4A8','CA','f.garrett@elsevier.com','',3,1750149321,'Renewal Test 2','Renewal','Test 2','','HealthScience'),
	(165451,'6-11 OMATI','','','','','FUKUSHIMA','','','JP','','',3,1700254181,'Renewal Test 4','Renewal','Test 4','OHARA HOSPITAL','HealthScience'),
	(165452,'6-11 OMATI','','','','','FUKUSHIMA','','','JP','f.garrett@elsevier.com','',3,1750061634,'Renewal test 4','Renewal','Test 4','OHARA HOSPITAL','HealthScience'),
	(165453,'12, RUE LOUIS COURTOIS DE','VICOSE, PORTES SUD - BAT 3','','','','TOULOUSE','','31100','FR','','',3,1700099123,'Renewal Test 13','Renewal','Test 13','PHYSIOL FRANCE','HealthScience'),
	(165454,'12, RUE LOUIS COURTOIS DE','VICOSE, PORTES SUD - BAT 3','','','','TOULOUSE','','31100','FR','f.garrett@elsevier.com','',3,1750226594,'Renewal Test 13','Renewal','Test 13','PHYSIOL FRANCE','HealthScience'),
	(165455,'Street in Clearwater','','','','','CLEARWATER','FL','337563804','US','','',3,1700258519,'Renewal Tset 8','Renewal','Test 9','','HealthScience'),
	(165456,'Street in Clearwater','','','','','CLEARWATER','FL','337563804','US','f.garrett@elsevier.com','',3,1750051301,'Renewal Test 9','Renewal','Test 9','','HealthScience'),
	(165457,'25-2-1, ASAKURA-NISHI-MACHI','KOCHI NAIONAL HOSPITAL','','','','KOCHI','','780-8077','JP','','',3,1700082478,'Renewal Test 5','Renewal','Test 5','','HealthScience'),
	(165458,'25-2-1, ASAKURA-NISHI-MACHI','KOCHI NAIONAL HOSPITAL','','','','KOCHI','','780-8077','JP','f.garrett@elsevier.com','',3,1750244761,'Renewal Test 5','Renewal','Test 5','','HealthScience'),
	(165459,'Street in Glace Bay','','','','','GLACE BAY','NS','B1A 3B9','CA','','',3,1700294381,'Renewal test 3','Renewal','Test 3','','HealthScience'),
	(165460,'Street in Glace bay','','','','','GLACE BAY','NS','B1A 3B9','CA','f.garrett@elsevier.com','',3,1750142094,'Renewal Test 3','Renewal','Test 3','','HealthScience'),
	(165461,'Street in Tacoma','','','','','TACOMA','WA','984074516','US','','',3,1700106237,'Renewal Test 10','Renewal','Test 10','','HealthScience'),
	(165462,'PO BOX 5299 MS 311-W3-SUR','311 SOUTH L','','','','TACOMA','WA','984150299','US','f.garrett@elsevier.com','',3,1750203071,'Renewal Test 10','Renewal','Test 10','INDIANA UNIV RILEY HOSP','HealthScience'),
	(165463,'25,JUCHGASSE','','','','','VIENNA','','6020','AT','','',3,1700231205,'Renewal Test 12','Renewal','Test 12','KRANKENANSTALT RUDOLFSTIFTUNG','HealthScience'),
	(165464,'25,JUCHGASSE','','','','','VIENNA','','6020','AT','f.garrett@elsevier.com','',3,1750079854,'Renewal Test 12','Renewal','Test 12','KRANKENANSTALT RUDOLFSTIFTUNG','HealthScience'),
	(165465,'Street in Sale','','','','','SALE CHESHIRE','','M33 6QB','GB','','',3,1700111501,'Renewal test 7','Renewal','Test 7','','HealthScience'),
	(165466,'Street in Sale','','','','','SALE CHESHIRE','','M33 6QB','GB','f.garrett@elsevier.com','',3,1750230854,'Renewal Test 7','Renewal','Test 7','','HealthScience'),
	(165467,'Street in Sao Paulo','','','','','SAO PAULO , SAO PAUL','','1333021','BR','','',3,1700343239,'Renewal Test 11','Renewal','Test 11','','HealthScience'),
	(165468,'Street in Sao Paulo','','','','','SAO PAULO , SAO PAUL','','1333021','BR','f.garrett@elsevier.com','',3,1750255961,'Renewal test 11','Renewal','Test 11','','HealthScience');

/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table renewalItems
# ------------------------------------------------------------

DROP TABLE IF EXISTS `renewalItems`;

CREATE TABLE `renewalItems` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `renewalId` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `billingCustomerId` int(10) unsigned NOT NULL,
  `deliveryCustomerId` int(10) unsigned NOT NULL,
  `endUserId` int(10) unsigned DEFAULT NULL,
  `docDate` date NOT NULL,
  `quantity` int(10) unsigned NOT NULL,
  `ISSN` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `title` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `startIssue` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `startMonth` date NOT NULL,
  `endIssue` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `endMonth` date DEFAULT NULL,
  `currency` varchar(3) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `processed` tinyint(1) NOT NULL DEFAULT '0',
  `processed_date` datetime DEFAULT NULL,
  `pubCode` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `importBatchId` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `renewalId_ISSN` (`renewalId`,`ISSN`),
  KEY `billingCustomerId_idx` (`billingCustomerId`),
  KEY `deliveryCustomerId_idx` (`deliveryCustomerId`),
  KEY `endUserId_idx` (`endUserId`),
  CONSTRAINT `fk_billingCustomerId` FOREIGN KEY (`billingCustomerId`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_deliveryCustomerId` FOREIGN KEY (`deliveryCustomerId`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_endUserId` FOREIGN KEY (`endUserId`) REFERENCES `customers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `renewalItems` WRITE;
/*!40000 ALTER TABLE `renewalItems` DISABLE KEYS */;

INSERT INTO `renewalItems` (`id`, `renewalId`, `billingCustomerId`, `deliveryCustomerId`, `endUserId`, `docDate`, `quantity`, `ISSN`, `title`, `startIssue`, `startMonth`, `endIssue`, `endMonth`, `currency`, `processed`, `processed_date`, `pubCode`, `active`, `importBatchId`)
VALUES
	(104,'411355-4',27814,27814,NULL,'2016-09-07',1,'0002-8703','AMERICAN HEART JOURNAL','','2016-07-28','',NULL,'USD',0,NULL,'J004',1,'1504187675923'),
	(843,'5877194X',165433,165433,NULL,'2015-09-02',1,'0021-7824','JNL DE MATH PURES ET APPLI','00105/0001','2018-01-01','00106/0006','2018-12-31','USD',0,NULL,'',1,''),
	(1412,'5877192X',165431,165431,NULL,'2015-09-02',1,'0007-4497','BULLETIN DES SCIENCES MATHEMATIQUES','00140/0001','2016-01-01','00140/0008','2016-12-31','USD',0,NULL,'',1,''),
	(4839,'5877197X',165436,165436,NULL,'2015-09-02',1,'1164-5563','EUROPEAN JOURNAL OF SOIL BIOLOGY','00072/0001','2016-01-01','00077/0001','2016-12-31','EUR',0,NULL,'',1,''),
	(5265,'5877195X',165434,165434,NULL,'2015-10-19',1,'FS00-9098','MICROBES & INFECT + RES IN MIC','','2016-01-01','','2016-12-31','EUR',0,NULL,'',1,''),
	(5266,'5877198X',165437,165437,NULL,'2015-09-02',1,'1146-609X','ACTA OECOLOGICA','00070/0001','2016-01-01','00077/0001','2016-12-31','EUR',0,NULL,'',1,''),
	(5267,'5877196X',165435,165435,NULL,'2015-09-02',1,'0223-5234','EUROPEAN JNL OF MED CHEM','00107/0001','2016-01-01','00124/0001','2016-12-31','EUR',0,NULL,'',1,''),
	(5268,'5877199X',165438,165438,NULL,'2015-09-02',1,'0981-9428','PLANT PHYSIOLOGY AND BIOCHEMISTRY','00098/0001','2016-01-01','00109/0001','2016-12-31','EUR',0,NULL,'',1,''),
	(13907,'5877193X',165432,165432,NULL,'2015-09-02',1,'0981-9427','PLANT PHYSIOLOGY AND BIOCHEMISTRY','00098/0001','2016-01-01','00109/0001','2016-12-31','USD',0,NULL,'',1,''),
	(13910,'411355-5',146329,146329,NULL,'2016-09-07',1,'0002-8703','AMERICAN HEART JOURNAL','','2016-07-28','',NULL,'USD',0,NULL,'J004',1,'1504187675923'),
	(13911,'411355-6',146330,146330,NULL,'2016-09-07',1,'0002-8703','AMERICAN HEART JOURNAL','','2016-07-28','',NULL,'USD',0,NULL,'J004',1,'1504187675923'),
	(13912,'411355-7',148037,148037,NULL,'2016-09-07',1,'0002-8703','AMERICAN HEART JOURNAL','','2016-07-28','',NULL,'USD',0,NULL,'J004',1,'1504187675923'),
	(13913,'411355-8',158318,158318,NULL,'2016-09-07',1,'0002-8703','AMERICAN HEART JOURNAL','','2016-07-28','',NULL,'USD',0,NULL,'J004',1,'1504187675923'),
	(13914,'411355-9',159596,159596,NULL,'2016-09-07',1,'0002-8703','AMERICAN HEART JOURNAL','','2016-07-28','',NULL,'USD',0,NULL,'J004',1,'1504187675923'),
	(13915,'411355-3',208,208,NULL,'2016-09-07',1,'0002-8703','AMERICAN HEART JOURNAL','','2016-07-28','',NULL,'USD',0,NULL,'J004',1,'1504187675923'),
	(13916,'411355-2',1,1,NULL,'2016-09-07',1,'0002-8703','AMERICAN HEART JOURNAL','','2016-07-28','',NULL,'USD',0,NULL,'J004',1,'1504187675923'),
	(13917,'001750037422 - 19',165439,165440,NULL,'2019-10-17',1,'0161--642','OPHTHALMOLOGY: JRNL OF THE AMER ACADEMY OF OPHTHALMOLOGY','','2019-10-29','',NULL,'USD',0,NULL,'AAOY',0,'1578664351249'),
	(13918,'001750038055 - 20',165441,165442,NULL,'2019-11-29',1,'0161--642','Ophthalmology (Print) Subscription','','2019-11-29','',NULL,'USD',0,NULL,'AAOY',0,'1578664441383'),
	(13919,'001750038094',165443,165444,NULL,'2020-01-09',1,'0161-6420','Ophthalmology','','2020-02-28','',NULL,'USD',1,'2020-01-15 11:02:51','AAOY',1,'1579105306137'),
	(13920,'001750303004',165445,165446,NULL,'2020-01-09',1,'0749-0712','Hand Clinics','','2020-02-28','',NULL,'USD',1,'2020-01-17 15:50:21','CHAN',1,'1579105306137'),
	(13921,'001750079204',165447,165448,NULL,'2020-01-09',1,'1052-5149','Neuroimaging Clinics of North America','','2020-02-28','',NULL,'USD',1,'2020-01-15 11:13:29','CNIM',1,'1579105306137'),
	(13922,'001750149321',165449,165450,NULL,'2020-01-09',1,'0094-1298','Clinics in Plastic Surgery','','2020-01-28','',NULL,'USD',1,'2020-01-17 16:27:07','CPLA',1,'1579105306137'),
	(13923,'001750061634',165451,165452,NULL,'2020-01-09',1,'0002-9378','American Journal of Obstetrics & Gynecology','','2020-04-01','',NULL,'USD',1,'2020-01-15 11:28:27','J006',1,'1579105306137'),
	(13924,'001750226594',165453,165454,NULL,'2020-01-09',1,'0886-3350','Journal of Cataract & Refractive Surgery','','2020-01-28','',NULL,'USD',1,'2020-01-15 11:46:24','JCRS',1,'1579105306137'),
	(13925,'001750051301',165455,165456,NULL,'2020-01-09',1,'1092-9134','Annals of Diagnostic Pathology','','2020-02-28','',NULL,'USD',1,'2020-01-17 16:39:40','ADPA',1,'1579105306137'),
	(13926,'001750244761',165457,165458,NULL,'2020-01-09',1,'1547-4127','Thoracic Surgery Clinics','','2020-02-28','',NULL,'USD',1,'2020-01-15 12:02:50','CCHS',1,'1579105306137'),
	(13927,'001750142094',165459,165460,NULL,'2020-01-09',1,'1043-1489','Seminars in Colon and Rectal Surgery','','2020-03-28','',NULL,'USD',1,'2020-01-17 16:56:21','SCRS',1,'1579105306137'),
	(13928,'001750203071',165461,165462,NULL,'2020-01-09',1,'1055-8586','Seminars in Pediatric Surgery','','2020-02-28','',NULL,'USD',1,'2020-01-17 17:01:29','SPSU',1,'1579105306137'),
	(13929,'001750079854',165463,165464,NULL,'2020-01-09',1,'1042-3680','Neurosurgery Clinics of North America','','2020-01-28','',NULL,'USD',1,'2020-01-15 12:17:01','CNSU',1,'1579105306137'),
	(13930,'001750230854',165465,165466,NULL,'2020-01-09',1,'0892-1997','Journal of Voice','','2020-03-01','',NULL,'USD',1,'2020-01-15 12:20:07','J082',1,'1579105306137'),
	(13931,'001750255961',165467,165468,NULL,'2020-01-09',1,'0735-1097','Journal of the American College of Cardiology','','2020-01-16','',NULL,'USD',1,'2020-01-15 12:26:16','JACC',1,'1579105306137');

/*!40000 ALTER TABLE `renewalItems` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table renewalPrices
# ------------------------------------------------------------

DROP TABLE IF EXISTS `renewalPrices`;

CREATE TABLE `renewalPrices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `unitPrice` decimal(10,2) unsigned NOT NULL DEFAULT '0.00',
  `netAmount` decimal(10,2) unsigned NOT NULL DEFAULT '0.00',
  `taxAmount` decimal(10,2) unsigned DEFAULT NULL,
  `discount` decimal(10,2) unsigned NOT NULL DEFAULT '0.00',
  `priceCode` varchar(3) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `renewalId` int(10) unsigned NOT NULL,
  `term` varchar(2) CHARACTER SET utf8 NOT NULL DEFAULT '0',
  `promoCode` int(10) unsigned NOT NULL DEFAULT '0',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `importBatchId` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `renewalPrices_id_uindex` (`id`),
  UNIQUE KEY `renewalPrices_renewalId_term_promoCode_uindex` (`renewalId`,`term`,`promoCode`),
  KEY `renewalPrices_renewalItems_id_fk` (`renewalId`),
  CONSTRAINT `renewalPrices_renewalItems_id_fk` FOREIGN KEY (`renewalId`) REFERENCES `renewalItems` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `renewalPrices` WRITE;
/*!40000 ALTER TABLE `renewalPrices` DISABLE KEYS */;

INSERT INTO `renewalPrices` (`id`, `unitPrice`, `netAmount`, `taxAmount`, `discount`, `priceCode`, `renewalId`, `term`, `promoCode`, `active`, `importBatchId`)
VALUES
	(310,401.00,380.95,0.00,20.05,'I',104,'S1',756304,1,''),
	(311,802.00,721.80,0.00,80.20,'I',104,'S2',756304,1,''),
	(312,1203.00,1022.55,0.00,180.45,'I',104,'S3',756304,1,''),
	(320,401.00,380.95,0.00,20.05,'I',13916,'S1',756304,1,''),
	(321,802.00,721.80,0.00,80.20,'I',13916,'S2',756304,1,''),
	(322,1203.00,1022.55,0.00,180.45,'I',13916,'S3',756304,1,''),
	(330,401.00,380.95,0.00,20.05,'I',13915,'S1',756304,1,''),
	(331,802.00,721.80,0.00,80.20,'I',13915,'S2',756304,1,''),
	(332,1203.00,1022.55,0.00,180.45,'I',13915,'S3',756304,1,''),
	(340,401.00,380.95,0.00,20.05,'I',13910,'S1',756304,1,''),
	(341,802.00,721.80,0.00,80.20,'I',13910,'S2',756304,1,''),
	(342,1203.00,1022.55,0.00,180.45,'I',13910,'S3',756304,1,''),
	(350,401.00,380.95,0.00,20.05,'I',13911,'S1',756304,1,''),
	(351,802.00,721.80,0.00,80.20,'I',13911,'S2',756304,1,''),
	(352,1203.00,1022.55,0.00,180.45,'I',13911,'S3',756304,1,''),
	(360,401.00,380.95,0.00,20.05,'I',13912,'S1',756304,1,''),
	(361,802.00,721.80,0.00,80.20,'I',13912,'S2',756304,1,''),
	(362,1203.00,1022.55,0.00,180.45,'I',13912,'S3',756304,1,''),
	(370,401.00,380.95,0.00,20.05,'I',13913,'S1',756304,1,''),
	(371,802.00,721.80,0.00,80.20,'I',13913,'S2',756304,1,''),
	(372,1203.00,1022.55,0.00,180.45,'I',13913,'S3',756304,1,''),
	(380,401.00,380.95,0.00,20.05,'I',13914,'S1',756304,1,''),
	(381,802.00,721.80,0.00,80.20,'I',13914,'S2',756304,1,''),
	(382,1203.00,1022.55,0.00,180.45,'I',13914,'S3',756304,1,''),
	(1963,1267.00,1203.65,105.32,0.00,'F',843,'0',0,1,''),
	(2532,809.00,768.55,0.00,0.00,'F',1412,'0',0,1,''),
	(5959,549.00,521.55,0.00,0.00,'F',4839,'0',0,1,''),
	(6385,2676.00,2542.20,0.00,0.00,'F',5265,'0',0,1,''),
	(6386,778.00,739.10,0.00,0.00,'F',5266,'0',0,1,''),
	(6387,1895.00,1800.25,0.00,0.00,'F',5267,'0',0,1,''),
	(6388,1381.00,1311.95,0.00,0.00,'F',5268,'0',0,1,''),
	(15027,389.00,311.40,0.00,0.00,'I',13907,'0',0,1,''),
	(15028,100.00,100.00,NULL,0.00,'',13917,'S1',4,0,'1578664351249'),
	(15029,180.00,180.00,NULL,0.00,'',13917,'S2',4,0,'1578664351249'),
	(15030,260.00,260.00,NULL,0.00,'',13917,'S3',4,0,'1578664351249'),
	(15031,726.00,726.00,NULL,0.00,'',13918,'S1',0,0,'1578664441383'),
	(15032,1452.00,1452.00,NULL,0.00,'',13918,'S2',0,0,'1578664441383'),
	(15033,2178.00,2178.00,NULL,0.00,'',13918,'S3',0,0,'1578664441383'),
	(15034,726.00,726.00,NULL,0.00,'',13919,'S1',0,1,'1579105306137'),
	(15035,1452.00,1452.00,NULL,0.00,'',13919,'S2',0,1,'1579105306137'),
	(15036,2178.00,2178.00,NULL,0.00,'',13919,'S3',0,1,'1579105306137'),
	(15037,546.00,546.00,NULL,0.00,'',13920,'S1',0,1,'1579105306137'),
	(15038,1092.00,982.80,NULL,109.20,'',13920,'S2',0,1,'1579105306137'),
	(15039,1638.00,1392.30,NULL,245.70,'',13920,'S3',0,1,'1579105306137'),
	(15040,525.00,525.00,NULL,0.00,'',13921,'S1',0,1,'1579105306137'),
	(15041,1050.00,945.00,NULL,105.00,'',13921,'S2',0,1,'1579105306137'),
	(15042,1575.00,1338.75,NULL,236.25,'',13921,'S3',0,1,'1579105306137'),
	(15043,649.00,584.10,NULL,64.90,'',13922,'S1',0,1,'1579105306137'),
	(15044,1298.00,1103.30,NULL,194.70,'',13922,'S2',0,1,'1579105306137'),
	(15045,1947.00,1557.60,NULL,389.40,'',13922,'S3',0,1,'1579105306137'),
	(15046,595.00,595.00,NULL,0.00,'',13923,'S1',0,1,'1579105306137'),
	(15047,1190.00,1190.00,NULL,0.00,'',13923,'S2',0,1,'1579105306137'),
	(15048,1785.00,1785.00,NULL,0.00,'',13923,'S3',0,1,'1579105306137'),
	(15049,590.00,590.00,NULL,0.00,'',13924,'S1',0,1,'1579105306137'),
	(15050,1180.00,1180.00,NULL,0.00,'',13924,'S2',0,1,'1579105306137'),
	(15051,1770.00,1770.00,NULL,0.00,'',13924,'S3',0,1,'1579105306137'),
	(15052,439.00,439.00,NULL,0.00,'',13925,'S1',0,1,'1579105306137'),
	(15053,878.00,878.00,NULL,0.00,'',13925,'S2',0,1,'1579105306137'),
	(15054,1317.00,1317.00,NULL,0.00,'',13925,'S3',0,1,'1579105306137'),
	(15055,475.00,475.00,NULL,0.00,'',13926,'S1',0,1,'1579105306137'),
	(15056,950.00,855.00,NULL,95.00,'',13926,'S2',0,1,'1579105306137'),
	(15057,1425.00,1211.25,NULL,213.75,'',13926,'S3',0,1,'1579105306137'),
	(15058,421.00,421.00,NULL,0.00,'',13927,'S1',0,1,'1579105306137'),
	(15059,842.00,842.00,NULL,0.00,'',13927,'S2',0,1,'1579105306137'),
	(15060,1263.00,1263.00,NULL,0.00,'',13927,'S3',0,1,'1579105306137'),
	(15061,511.00,511.00,NULL,0.00,'',13928,'S1',0,1,'1579105306137'),
	(15062,1022.00,1022.00,NULL,0.00,'',13928,'S2',0,1,'1579105306137'),
	(15063,1533.00,1533.00,NULL,0.00,'',13928,'S3',0,1,'1579105306137'),
	(15064,513.00,461.70,NULL,51.30,'',13929,'S1',0,1,'1579105306137'),
	(15065,1026.00,872.10,NULL,153.90,'',13929,'S2',0,1,'1579105306137'),
	(15066,1539.00,1231.20,NULL,307.80,'',13929,'S3',0,1,'1579105306137'),
	(15067,392.00,392.00,NULL,0.00,'',13930,'S1',0,1,'1579105306137'),
	(15068,784.00,784.00,NULL,0.00,'',13930,'S2',0,1,'1579105306137'),
	(15069,1176.00,1176.00,NULL,0.00,'',13930,'S3',0,1,'1579105306137'),
	(15070,1012.00,961.40,NULL,50.60,'',13931,'S1',0,1,'1579105306137'),
	(15071,2024.00,1821.60,NULL,202.40,'',13931,'S2',0,1,'1579105306137'),
	(15072,3036.00,2580.60,NULL,455.40,'',13931,'S3',0,1,'1579105306137');

/*!40000 ALTER TABLE `renewalPrices` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
