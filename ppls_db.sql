-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-05-2019 a las 18:15:30
-- Versión del servidor: 10.1.30-MariaDB
-- Versión de PHP: 7.2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ppls_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `branc`
--

CREATE TABLE `branc` (
  `id` int(11) NOT NULL,
  `name` int(11) NOT NULL,
  `address` int(11) NOT NULL,
  `visitDay` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `itbr`
--

CREATE TABLE `itbr` (
  `id` int(10) NOT NULL,
  `itemid` int(10) NOT NULL,
  `branchid` int(10) NOT NULL,
  `aviable` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `itbr`
--

INSERT INTO `itbr` (`id`, `itemid`, `branchid`, `aviable`) VALUES
(1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `item`
--

CREATE TABLE `item` (
  `id` int(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `providerid` int(10) NOT NULL,
  `categoriy` varchar(50) NOT NULL,
  `price` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `item`
--

INSERT INTO `item` (`id`, `name`, `providerid`, `categoriy`, `price`) VALUES
(1, 'Lapíz', 1, 'Lapices', 3),
(2, 'Pluma', 2, 'Plumas', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `itor`
--

CREATE TABLE `itor` (
  `id` int(10) NOT NULL,
  `itemid` int(10) NOT NULL,
  `orderid` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `id` int(10) NOT NULL,
  `totalPrice` int(10) NOT NULL,
  `payed` int(10) NOT NULL,
  `userid` int(10) NOT NULL,
  `paidOut` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `provider`
--

CREATE TABLE `provider` (
  `id` int(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `categories` varchar(50) NOT NULL,
  `deliveryDay` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `provider`
--

INSERT INTO `provider` (`id`, `name`, `email`, `categories`, `deliveryDay`) VALUES
(1, 'Murbles Troncozo', 'MueblesTroncozo@contacto.com', 'Lapices', 'Lunes'),
(2, 'Big', 'Big@contacto.com', 'Plumas', 'Martes'),
(3, 'Blanca Nieves', 'BlancaNieves@contacto.com', 'Lapices', 'Jueves'),
(4, 'Xiaomi', 'Xiaomi@contacto.com', 'Lapices', 'Viernes');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(10) NOT NULL,
  `username` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(50) NOT NULL,
  `validatedAcc` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `name`, `email`, `password`, `validatedAcc`) VALUES
(1, 'T.Mac', 'César', 'halo_1217@hotmail.com', 'Soft11', 1),
(2, 'p', 'p', 'p', 'p', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `branc`
--
ALTER TABLE `branc`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `itbr`
--
ALTER TABLE `itbr`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `itor`
--
ALTER TABLE `itor`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `provider`
--
ALTER TABLE `provider`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `branc`
--
ALTER TABLE `branc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `itbr`
--
ALTER TABLE `itbr`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `item`
--
ALTER TABLE `item`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `itor`
--
ALTER TABLE `itor`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `provider`
--
ALTER TABLE `provider`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
