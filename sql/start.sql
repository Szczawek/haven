CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `login` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);
CREATE TABLE IF NOT EXISTS `shop` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `price` decimal(10,2) NOT NULL,
    `amount` int NOT NULL,
    `ownerID` int NOT NULL,
    PRIMARY KEY (`id`),
    KEY `fk_owner` (`ownerID`),
    CONSTRAINT `fk_owner` FOREIGN KEY (`ownerID`) REFERENCES `users` (`id`) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS `posts` (
      `id` int NOT NULL AUTO_INCREMENT,
      `userID` int NOT NULL,
      `content` text NOT NULL,
      PRIMARY KEY (`id`),
      KEY `posts_ibfk_1` (`userID`),
      CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`id`) ON DELETE CASCADE
);

