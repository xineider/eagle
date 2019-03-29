-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 29-Mar-2019 às 00:53
-- Versão do servidor: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eagle`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `caixa`
--

CREATE TABLE `caixa` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_plano` int(11) NOT NULL,
  `valor` double NOT NULL,
  `tipo` tinyint(1) NOT NULL COMMENT '0 - aporte, 1 - saque',
  `deletado` tinyint(4) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `caixa`
--

INSERT INTO `caixa` (`id`, `id_usuario`, `id_plano`, `valor`, `tipo`, `deletado`, `data_cadastro`) VALUES
(1, 1, 1, 800, 0, 0, '2019-03-12 19:45:25'),
(2, 1, 2, 1200, 0, 0, '2019-03-13 19:44:25'),
(3, 1, 3, 200, 0, 0, '2019-03-14 19:44:25'),
(4, 1, 4, 100, 0, 0, '2019-03-15 19:44:25'),
(5, 1, 4, 80, 1, 0, '2019-03-15 19:44:25'),
(6, 1, 2, 562, 1, 0, '2019-03-15 19:44:25');

-- --------------------------------------------------------

--
-- Estrutura da tabela `compromissos`
--

CREATE TABLE `compromissos` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_processo` int(11) NOT NULL,
  `id_recurso` int(11) DEFAULT '0',
  `id_apenso` int(11) DEFAULT '0',
  `id_advogado_setor` int(11) DEFAULT NULL,
  `id_advogado_compromisso` int(11) DEFAULT NULL,
  `tipo_compromisso` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0 - Pauta de Compromissos, 1 - Controle de Distribuição, 2 - Pauta de Julgamento',
  `tipo` int(11) NOT NULL DEFAULT '0' COMMENT '0 = acordao/setenca, 1 = desapacho/decisoes, 2 = peticoes diversas, 3 = quesitos, 4 = manif de docs, 5 = prazos processos fisicos, 6 = perito',
  `nome` varchar(150) NOT NULL,
  `data_inicial` datetime NOT NULL,
  `data_final` datetime NOT NULL,
  `local` text,
  `complemento` text,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `compromissos`
--

INSERT INTO `compromissos` (`id`, `id_usuario`, `id_processo`, `id_recurso`, `id_apenso`, `id_advogado_setor`, `id_advogado_compromisso`, `tipo_compromisso`, `tipo`, `nome`, `data_inicial`, `data_final`, `local`, `complemento`, `deletado`, `data_cadastro`) VALUES
(1, 1, 0, 0, 0, 0, 0, 1, 1, 'Reunião dos Alcoólicos Anônimos', '2018-03-22 08:00:00', '2018-03-22 16:30:00', NULL, NULL, 1, '2018-03-21 19:43:48'),
(2, 1, 0, 0, 0, 0, 0, 2, 1, 'Técnico de Informática', '2018-03-21 16:10:00', '2018-03-21 17:00:00', NULL, NULL, 1, '2018-03-21 20:04:13'),
(3, 1, 0, 0, 0, 0, 0, 0, 0, 'Reunião bruno', '2018-03-23 17:00:00', '2018-03-23 18:00:00', NULL, NULL, 1, '2018-03-21 20:21:47'),
(4, 1, 0, 0, 0, 0, 0, 0, 0, 'Reunião escolar', '2018-03-22 14:00:00', '2018-03-22 16:00:00', NULL, NULL, 1, '2018-03-22 14:08:23'),
(5, 1, 162, 0, 0, 2, 0, 1, 1, 'Dia dos Pais', '2018-02-26 09:02:00', '2018-02-27 05:02:00', 'Av Ipiranga, Porto Alegre', NULL, 0, '2018-03-22 19:05:12'),
(6, 1, 2, 0, 0, 1, 0, 2, 1, 'Juiz Averiguar', '2018-03-24 16:00:00', '2018-03-24 18:00:00', 'Foro São Leopoldo', NULL, 0, '2018-03-22 19:34:33'),
(7, 1, 2, 0, 0, 1, 0, 0, 4, 'Audiência', '2018-03-02 12:00:00', '2018-03-08 15:00:00', 'Foro Canoas', NULL, 0, '2018-03-22 20:49:19'),
(8, 1, 0, 0, 0, 0, 0, 0, 0, 'Compra de Ativos', '2018-03-14 12:00:00', '2018-03-15 12:30:00', NULL, NULL, 1, '2018-03-23 16:31:10'),
(9, 1, 0, 0, 0, 0, 0, 0, 0, 'Venda de volantes', '2018-03-23 15:00:00', '2018-03-23 19:00:00', NULL, NULL, 1, '2018-03-23 16:38:31'),
(10, 1, 0, 0, 0, 0, 0, 0, 0, 'Venda de câmbio', '2018-03-23 15:50:00', '2018-03-23 16:00:00', NULL, NULL, 1, '2018-03-23 16:40:01'),
(11, 1, 0, 0, 0, 0, 0, 0, 0, 'Teste', '2018-03-23 00:55:00', '2018-03-20 18:00:00', NULL, NULL, 1, '2018-03-23 16:46:13'),
(12, 1, 7, 0, 0, 1, 0, 0, 2, 'Pepsi-Cola', '2018-03-24 07:03:00', '2018-03-24 13:03:00', 'Promotoria de Justiça Porto Alegre', NULL, 0, '2018-03-23 16:48:42'),
(13, 1, 6, 0, 0, 1, 0, 0, 5, 'Venda de cinto de segurança', '2018-03-06 21:03:00', '2018-03-06 23:03:00', 'Young', NULL, 0, '2018-03-23 16:56:20'),
(14, 1, 5, 0, 0, 1, 0, 0, 2, 'Natal', '2019-01-01 15:01:00', '2019-01-01 22:01:00', 'Sede Porto Alegre', NULL, 0, '2018-03-23 18:30:45'),
(15, 1, 22, 0, 0, 2, 0, 0, 1, 'Venda de garagem', '2018-03-23 18:20:00', '2018-03-23 19:45:00', 'Foro Assis Brasil', NULL, 0, '2018-03-23 18:59:16'),
(16, 1, 32, 0, 0, 1, 0, 0, 3, 'Comprar Comida as 18:00', '2018-03-27 18:00:00', '2018-03-27 20:00:00', 'Foro Machado', NULL, 0, '2018-03-26 12:36:48'),
(17, 1, 42, 0, 0, 2, 0, 0, 2, 'Relatório 15:00', '2018-03-27 15:00:00', '2018-03-27 16:00:00', 'Promotoria NH', NULL, 0, '2018-03-27 12:45:10'),
(18, 1, 52, 0, 0, 1, 0, 0, 4, 'Não Mexer 12:00', '2018-03-14 12:00:00', '2018-03-15 12:00:00', 'Defensoria Pública São Leopoldo', NULL, 0, '2018-03-27 14:18:22'),
(19, 1, 0, 0, 0, 0, 0, 0, 0, 'Não me toque 19:00', '2018-03-09 19:00:00', '2018-03-09 20:00:00', NULL, NULL, 1, '2018-03-27 14:56:40'),
(20, 1, 0, 0, 0, 0, 0, 0, 0, 'Don\'t touch me 18:00', '2018-03-08 18:00:00', '2018-03-08 20:00:00', NULL, NULL, 1, '2018-03-27 14:58:55'),
(21, 1, 62, 0, 0, 2, 0, 0, 5, 'Don\'t touch me 18:00', '2018-03-08 18:00:00', '2018-03-08 20:00:00', 'CPERS Porto Alegre', NULL, 0, '2018-03-27 14:59:42'),
(22, 1, 9, 0, 0, 1, 0, 0, 6, 'NO TOCAR ME 19:20', '2018-02-27 19:02:00', '2018-02-27 20:02:00', 'CTPS Novo Hamburgo', NULL, 0, '2018-03-27 15:05:44'),
(23, 1, 8, 0, 0, 2, 0, 0, 1, 'Reunião Sexta', '2018-04-06 17:00:00', '2018-04-06 18:00:00', 'Sede CUT', NULL, 0, '2018-04-03 20:08:49'),
(24, 1, 7, 0, 0, 1, 0, 0, 2, 'Reunião de Venda de Pelúcias', '2018-07-02 15:04:00', '2018-07-02 16:04:00', 'Young', NULL, 0, '2018-04-03 20:25:07'),
(25, 1, 52, 0, 0, 2, 0, 0, 3, 'Reunião de Vendas de Pneu', '2018-07-02 17:00:00', '2018-07-02 18:00:00', 'Foro Novo Hamburgo', NULL, 0, '2018-04-03 20:40:16'),
(26, 1, 12, 0, 0, 2, 0, 0, 4, 'Agenda Tributária', '2018-04-23 13:00:00', '2018-04-23 18:00:00', 'Foro Canoas', NULL, 0, '2018-04-03 20:47:52'),
(27, 1, 1, 0, 0, 2, 0, 0, 3, 'Audiência', '2018-07-13 12:00:00', '2018-07-13 14:00:00', 'Young', NULL, 0, '2018-06-27 11:05:51'),
(28, 1, 2, 0, 0, 2, 0, 0, 0, 'Reunião', '2018-07-16 14:06:00', '2018-07-16 18:06:00', NULL, NULL, 1, '2018-06-27 11:07:01'),
(29, 1, 2, 0, 0, 2, 0, 0, 2, 'Reunião', '2018-07-20 12:00:00', '2018-07-20 18:00:00', 'Sede Porto Alegre', NULL, 0, '2018-06-27 11:08:02'),
(30, 1, 1, 0, 0, 1, 0, 0, 1, 'Coffe Break', '2018-07-04 12:00:00', '2018-07-04 13:00:00', 'Young', NULL, 0, '2018-06-27 11:19:22'),
(31, 1, 2, 0, 0, 1, 0, 0, 5, 'Audiência Cliente B', '2018-07-07 08:06:00', '2018-07-08 11:06:00', 'Defensoria Novo Hamburgo', NULL, 0, '2018-06-27 11:20:19'),
(32, 1, 7, 0, 0, 1, 0, 0, 4, 'Reunião Advogados', '2018-07-03 10:00:00', '2018-07-03 13:00:00', 'Tribunal de Justiça São Leopoldo', NULL, 0, '2018-06-27 11:21:02'),
(33, 1, 1, 0, 0, 1, 0, 0, 3, 'Reunião Final de Tarde', '2018-07-04 16:06:00', '2018-07-05 19:06:00', 'Tribunal de Justiça Novo Hamburgo', NULL, 0, '2018-06-27 11:21:42'),
(34, 1, 1, 0, 0, 1, 0, 0, 0, 'Teste', '2018-07-06 16:00:00', '2018-07-07 22:00:00', NULL, NULL, 1, '2018-07-06 19:04:18'),
(35, 1, 8, 0, 0, 1, 0, 0, 2, 'Novo teste', '2018-07-12 13:00:00', '2018-07-14 16:00:00', 'Tribunal de Justiça São Leopoldo', NULL, 0, '2018-07-06 19:25:05'),
(36, 1, 102, 0, 0, 1, 0, 0, 1, 'teste', '2018-08-06 00:30:00', '2018-08-06 00:30:00', 'Young', NULL, 0, '2018-08-06 22:00:15'),
(37, 1, 82, 0, 0, 1, 0, 0, 2, 'Reunião secreta', '2018-08-09 19:00:00', '2018-08-09 00:15:00', 'Não posso dizer ._.', NULL, 0, '2018-08-09 22:11:34'),
(38, 1, 1, 0, 0, 1, 0, 0, 3, 'Quesito', '2018-08-18 19:00:00', '2018-08-21 23:00:00', 'Av. Unisinos 20', NULL, 0, '2018-08-09 22:21:59'),
(39, 1, 1, 0, 0, 1, 0, 0, 5, 'Reunião de venda de casa de madeira', '2018-08-15 00:00:00', '2018-08-08 23:05:00', 'Rua não sei do que', NULL, 0, '2018-08-09 22:25:49'),
(40, 1, 1, 0, 0, 1, 0, 0, 0, 'Acórdão', '2018-09-12 07:00:00', '2018-09-13 09:50:00', 'Brasilia', NULL, 0, '2018-09-03 02:31:58'),
(41, 1, 1, 0, 0, 1, 0, 0, 2, 'teste', '2018-09-20 19:30:00', '2018-09-22 07:35:00', '123213', NULL, 0, '2018-09-03 02:46:06'),
(42, 1, 1, 0, 0, 1, 0, 0, 4, 'Bernardo', '2018-09-19 18:00:00', '2018-09-25 16:00:00', 'qqqqqq', NULL, 0, '2018-09-03 02:47:24'),
(43, 1, 1, 0, 0, 1, 0, 0, 3, 'Podediamante', '2018-09-20 05:00:00', '2018-09-21 08:00:00', 'Sant Seya', NULL, 0, '2018-09-03 03:09:01'),
(44, 1, 1, 0, 0, 1, 0, 0, 0, 'Teste hoje 21-11', '2018-11-21 15:00:00', '2018-11-21 00:00:00', 'Getulia vargas', NULL, 0, '2018-11-21 17:24:35'),
(45, 1, 1, 0, 0, 2, 0, 0, 0, 'teste', '2018-11-21 18:23:00', '2018-11-21 18:23:00', 'teste', 'teste', 0, '2018-11-21 20:23:35'),
(46, 1, 112, 0, 0, 2, 0, 0, 0, 'Novo Teste', '2018-11-21 18:30:00', '2018-11-21 17:30:00', 'qweqwe', NULL, 0, '2018-11-21 20:48:06'),
(47, 1, 1, 0, 0, 2, 0, 0, 1, 'cadastro_novo', '2018-11-22 18:00:00', '2018-11-22 18:55:00', 'qweqw', 'qweqwe', 0, '2018-11-22 20:55:25'),
(48, 1, 1, 0, 0, 2, 0, 0, 0, 'AAAAAAAAAAAAAAAAH', '2018-11-24 19:13:00', '2018-11-24 19:13:00', '231', '3213', 0, '2018-11-22 21:13:54'),
(49, 1, 1, 0, 25, 2, 0, 0, 3, 'Apenso', '2018-11-24 19:35:00', '2018-11-24 19:35:00', '', '', 0, '2018-11-24 21:46:14'),
(50, 1, 115, 0, 0, 1, 0, 1, 3, 'Teste de distribuição', '2019-01-09 17:54:00', '2019-01-10 17:55:00', 'Avenida atlantica', NULL, 0, '2019-01-09 19:55:14'),
(51, 1, 116, 0, 0, 1, 1, 0, 1, 'advogado compromisso', '2019-01-22 16:20:00', '2019-01-14 16:20:00', '213123', NULL, 0, '2019-01-14 18:21:04'),
(52, 1, 115, 0, 0, 1, 1, 2, 0, 'Julgamento 9', '2019-01-14 16:24:00', '2019-01-15 16:25:00', '213123', NULL, 0, '2019-01-14 18:25:11'),
(53, 1, 114, 0, 0, 2, 1, 2, 0, 'Julgamento 10', '2019-01-14 16:28:00', '2019-01-16 16:30:00', '2131231', NULL, 0, '2019-01-14 18:28:28'),
(54, 1, 125, 0, 0, 1, 1, 1, 0, 'teste', '2019-01-27 17:49:00', '2019-01-30 17:50:00', 'aaaaaa', NULL, 0, '2019-01-27 19:50:10'),
(55, 1, 126, 0, 0, 2, 2, 0, 0, 'teste', '2019-01-27 17:51:00', '2019-01-27 17:51:00', 'teste', 'teste', 0, '2019-01-27 19:51:49'),
(56, 1, 126, 0, 0, 2, 2, 0, 0, 'teste', '2019-01-27 17:51:00', '2019-01-27 17:51:00', 'teste', 'teste', 0, '2019-01-27 19:53:55'),
(57, 1, 126, 0, 0, 2, 2, 0, 0, 'teste', '2019-01-27 17:51:00', '2019-01-27 17:51:00', 'teste', 'testeaa', 0, '2019-01-27 19:54:00'),
(58, 1, 125, 0, 0, 1, 1, 1, 0, 'bbbbbbbb', '2019-01-27 20:22:00', '2019-01-27 20:22:00', '111111', NULL, 0, '2019-01-27 22:22:18'),
(59, 1, 123, 0, 0, 2, 2, 2, 0, 'qqqq', '2019-01-27 20:22:00', '2019-01-27 20:22:00', 'qqqqqqq', NULL, 0, '2019-01-27 22:23:00'),
(60, 1, 127, 0, 0, 1, 1, 0, 1, 'teste', '2019-01-27 20:56:00', '2019-01-28 20:57:00', '12312', '3123123', 0, '2019-01-27 22:57:15');

-- --------------------------------------------------------

--
-- Estrutura da tabela `funcoes`
--

CREATE TABLE `funcoes` (
  `id` int(11) NOT NULL,
  `nome` varchar(150) NOT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `funcoes`
--

INSERT INTO `funcoes` (`id`, `nome`, `deletado`, `data_cadastro`) VALUES
(1, 'Coachee', 0, '2017-11-30 18:55:28'),
(2, 'Coach', 0, '2017-11-30 18:55:41'),
(3, 'Manager', 0, '2017-11-30 18:55:49');

-- --------------------------------------------------------

--
-- Estrutura da tabela `log`
--

CREATE TABLE `log` (
  `id` int(11) NOT NULL,
  `ip` varchar(50) NOT NULL,
  `method` varchar(50) NOT NULL,
  `rota` varchar(250) NOT NULL,
  `user_agent` text NOT NULL,
  `id_usuario` int(11) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `noticias`
--

CREATE TABLE `noticias` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `titulo` varchar(150) NOT NULL,
  `descricao` text NOT NULL,
  `arquivo` varchar(150) NOT NULL,
  `deletado` tinyint(4) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `noticias`
--

INSERT INTO `noticias` (`id`, `id_usuario`, `titulo`, `descricao`, `arquivo`, `deletado`, `data_cadastro`) VALUES
(1, 1, 'Após temporal derrubar 700 árvores, empresas começam a plantar', 'A cidade do Rio de Janeiro,está em regime de atenção para temporais. Depois de um temporal derrubar mais de 700 árvores na cidade os empresários começaram a se juntar e propor como reconstruir e plantar as árvores perdidas.', '/assets/uploads/green-tree.jpg', 0, '2019-03-07 22:15:31'),
(2, 1, 'Então, como declarar o investimento CDB?', '', '/assets/uploads/cdb-declarar.png', 0, '2019-03-26 17:58:54');

-- --------------------------------------------------------

--
-- Estrutura da tabela `planos`
--

CREATE TABLE `planos` (
  `id` int(11) NOT NULL,
  `nome` varchar(150) NOT NULL,
  `deletado` tinyint(4) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `planos`
--

INSERT INTO `planos` (`id`, `nome`, `deletado`, `data_cadastro`) VALUES
(1, 'Conservador', 0, '2019-03-12 19:37:56'),
(2, 'Moderado', 0, '2019-03-12 19:37:56'),
(3, 'Arrojado', 0, '2019-03-12 19:37:56'),
(4, 'Agressivo', 0, '2019-03-12 19:37:56');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `login` varchar(150) NOT NULL,
  `senha` varchar(150) NOT NULL,
  `imagem` varchar(150) NOT NULL DEFAULT 'user-padrao.jpg',
  `nome` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `telefone` varchar(150) DEFAULT NULL,
  `hash_login` varchar(150) DEFAULT NULL COMMENT 'hash de login, para verificacao mais segura via ajax alterado a cada login',
  `nivel` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0 - Coachee, 1 - Coach, 2 - Manager, 3 -  Investidor, 4 - Coordenação, 5 - Administraçao',
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `login`, `senha`, `imagem`, `nome`, `email`, `telefone`, `hash_login`, `nivel`, `deletado`, `data_cadastro`) VALUES
(1, 'coachee', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Coachee Aluno', 'marcos@eagle.com.br', '(51) 99999-9999', '403633934701d8d4f362b28b951de1c6', 0, 0, '2017-11-30 18:49:14'),
(2, 'coach', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Coach Professor', 'renato@eagle.com.br', '(51) 99999-9999', '237a73b1c92369f439dc283991b117af', 1, 0, '2017-11-30 18:49:14'),
(3, 'manager', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Manager Gerente', 'renato@eagle.com.br', '(51) 99999-9999', 'f476e0ce532d5e931de23b93f668f61f', 2, 0, '2017-11-30 18:49:14'),
(4, 'investidor', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Investidor Aluno', 'renato@eagle.com.br', '(51) 99999-9999', 'f476e0ce532d5e931de23b93f668f61f', 3, 0, '2017-11-30 18:49:14'),
(5, 'coordenacao', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Coordenacao Manutencao', 'renato@eagle.com.br', '(51) 99999-9999', 'f476e0ce532d5e931de23b93f668f61f', 4, 0, '2017-11-30 18:49:14'),
(6, 'admin', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Admin Administrador', 'renato@eagle.com.br', '(51) 99999-9999', 'f476e0ce532d5e931de23b93f668f61f', 5, 0, '2017-11-30 18:49:14');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios_planos`
--

CREATE TABLE `usuarios_planos` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_plano` int(11) NOT NULL,
  `deletado` tinyint(4) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `caixa`
--
ALTER TABLE `caixa`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_plano` (`id_plano`);

--
-- Indexes for table `compromissos`
--
ALTER TABLE `compromissos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuarios` (`id_usuario`),
  ADD KEY `id_processo` (`id_processo`),
  ADD KEY `id_advogado` (`id_advogado_setor`),
  ADD KEY `id_recurso` (`id_recurso`),
  ADD KEY `id_apenso` (`id_apenso`),
  ADD KEY `id_advogado_compromisso` (`id_advogado_compromisso`);

--
-- Indexes for table `funcoes`
--
ALTER TABLE `funcoes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `noticias`
--
ALTER TABLE `noticias`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indexes for table `planos`
--
ALTER TABLE `planos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usuarios_planos`
--
ALTER TABLE `usuarios_planos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_plano` (`id_plano`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `caixa`
--
ALTER TABLE `caixa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `compromissos`
--
ALTER TABLE `compromissos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;
--
-- AUTO_INCREMENT for table `funcoes`
--
ALTER TABLE `funcoes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `log`
--
ALTER TABLE `log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `noticias`
--
ALTER TABLE `noticias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `planos`
--
ALTER TABLE `planos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
