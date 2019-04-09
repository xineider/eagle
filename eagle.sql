-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 09-Abr-2019 às 14:24
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
-- Estrutura da tabela `agenda`
--

CREATE TABLE `agenda` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_coachee` int(11) DEFAULT NULL,
  `tipo` int(11) NOT NULL DEFAULT '0' COMMENT '0 - Coachee , 1 - Outro',
  `data_inicial` datetime NOT NULL,
  `data_final` datetime NOT NULL,
  `local` text,
  `observacoes` text,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `agenda`
--

INSERT INTO `agenda` (`id`, `id_usuario`, `id_coachee`, `tipo`, `data_inicial`, `data_final`, `local`, `observacoes`, `deletado`, `data_cadastro`) VALUES
(1, 2, 1, 0, '2019-04-07 08:20:00', '2019-04-08 10:00:00', 'Alberto Bins', NULL, 1, '2019-04-07 06:40:12'),
(2, 2, 1, 0, '2019-04-07 06:00:00', '2019-04-07 11:59:00', '213123', '', 1, '2019-04-07 07:28:14'),
(3, 2, NULL, 1, '2019-04-07 08:30:00', '2019-04-07 05:00:00', 'Outro', '123123', 1, '2019-04-07 07:36:32'),
(4, 2, 1, 0, '2019-04-07 07:00:00', '2019-04-07 08:30:00', '123123', '12321', 0, '2019-04-07 07:47:08'),
(5, 2, 23, 0, '2019-04-07 18:10:00', '2019-04-18 18:00:00', '12312', '', 1, '2019-04-07 08:13:57'),
(6, 2, 7, 0, '2019-04-07 14:00:00', '2019-04-07 16:00:00', '10:40 as 11:00 em algum lugar', '', 0, '2019-04-07 08:53:16'),
(7, 2, 22, 0, '2019-04-07 10:00:00', '2019-04-07 11:00:00', 'ABC', '', 0, '2019-04-07 09:05:11');

-- --------------------------------------------------------

--
-- Estrutura da tabela `avisos`
--

CREATE TABLE `avisos` (
  `id` int(11) NOT NULL,
  `id_nivel` int(4) NOT NULL DEFAULT '99',
  `aviso` text NOT NULL,
  `descricao` text,
  `deletado` tinyint(4) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `avisos`
--

INSERT INTO `avisos` (`id`, `id_nivel`, `aviso`, `descricao`, `deletado`, `data_cadastro`) VALUES
(1, 99, 'Somente dia 01/12 para sacar!', 'texto longo do aviso para avisar que tá sem aviso', 0, '2019-04-06 05:31:09'),
(2, 99, 'Novo aviso importante', '', 0, '2019-04-06 05:31:10'),
(3, 1, 'Pagamento Coach 25/09', '						\r\n					\r\n					\r\n					', 0, '2019-04-06 07:23:00'),
(4, 99, 'new', '213123123', 0, '2019-04-07 03:52:05'),
(5, 99, 'Comprar bitcoin', '																		\r\n					\r\n					\r\n					', 0, '2019-04-07 03:52:23');

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
(6, 1, 2, 562, 1, 0, '2019-03-15 19:44:25'),
(7, 7, 3, 1500, 0, 0, '2019-03-15 19:44:25'),
(8, 8, 1, 5000, 0, 0, '2019-03-15 19:44:25'),
(9, 10, 1, 780, 0, 0, '2019-03-15 19:44:25');

-- --------------------------------------------------------

--
-- Estrutura da tabela `coaching`
--

CREATE TABLE `coaching` (
  `id` int(11) NOT NULL,
  `titulo` varchar(150) NOT NULL,
  `descricao` text NOT NULL,
  `deletado` tinyint(4) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `coaching`
--

INSERT INTO `coaching` (`id`, `titulo`, `descricao`, `deletado`, `data_cadastro`) VALUES
(1, 'Como Ganhar Mais++', '																								1° Sessão de como ganhar mais\r\n					\r\n					\r\n					\r\n					', 0, '2019-04-01 18:10:07'),
(2, 'IBOVESPA, IMDB ou ISODEC', '2° Sessão IBOVESPA, IMDB ou ISODEC', 0, '2019-04-01 18:10:07'),
(3, 'Mudando seu Ritmo Financeiro', '3° Sessão sobre mudando o seu ritmo financeiro', 0, '2019-04-01 18:10:07'),
(4, 'Aplicando melhor o seu dinheiro', '4 Sessão de aplicar melhor o seu dinheiro', 0, '2019-04-01 18:10:07'),
(5, 'Investir em Tesouro Direto', '5° Sessão Investir em Tesouro Direto', 0, '2019-04-01 18:10:07'),
(6, 'Última Sessão', '6° e última Sessão sobre como arrecadar dinheiro sem sair de casa', 0, '2019-04-01 18:10:07'),
(7, 'Teste', 'teste', 1, '2019-04-04 18:53:06'),
(8, 'teste', 'ajax-submit', 1, '2019-04-04 22:43:34'),
(9, 'O que fazer agora?', 'Fiz tudo e agora?\r\n					', 0, '2019-04-04 22:46:30');

-- --------------------------------------------------------

--
-- Estrutura da tabela `coaching_usuario`
--

CREATE TABLE `coaching_usuario` (
  `id` int(11) NOT NULL,
  `id_coaching` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `deletado` int(11) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `coaching_usuario`
--

INSERT INTO `coaching_usuario` (`id`, `id_coaching`, `id_usuario`, `deletado`, `data_cadastro`) VALUES
(1, 1, 1, 0, '2019-04-01 18:22:44'),
(2, 2, 1, 0, '2019-04-01 18:22:44'),
(3, 1, 7, 0, '2019-04-08 00:47:11'),
(4, 2, 7, 0, '2019-04-08 02:02:21'),
(5, 3, 7, 0, '2019-04-08 02:02:30');

-- --------------------------------------------------------

--
-- Estrutura da tabela `eventos`
--

CREATE TABLE `eventos` (
  `id` int(11) NOT NULL,
  `titulo` varchar(150) NOT NULL,
  `descricao` text NOT NULL,
  `imagem` varchar(150) DEFAULT NULL,
  `preco` double DEFAULT NULL,
  `data` date NOT NULL,
  `hora` time DEFAULT NULL,
  `local` text NOT NULL,
  `autor` varchar(150) DEFAULT NULL,
  `deletado` int(11) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `eventos`
--

INSERT INTO `eventos` (`id`, `titulo`, `descricao`, `imagem`, `preco`, `data`, `hora`, `local`, `autor`, `deletado`, `data_cadastro`) VALUES
(1, 'Coaching Quântico', 'No coaching quantico você aprenderá como ser um usuário quântico', '', 15, '2019-04-17', '08:00:00', 'Hospital verusalem', 'Renatinho Augusto', 0, '2019-04-05 14:07:56');

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
-- Estrutura da tabela `ganhos_mensal`
--

CREATE TABLE `ganhos_mensal` (
  `id` int(11) NOT NULL,
  `id_plano` int(11) NOT NULL,
  `porcentagem` double NOT NULL,
  `mes` tinyint(2) NOT NULL,
  `deletado` tinyint(4) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `ganhos_mensal`
--

INSERT INTO `ganhos_mensal` (`id`, `id_plano`, `porcentagem`, `mes`, `deletado`, `data_cadastro`) VALUES
(1, 1, 1.8, 1, 0, '2019-04-09 02:34:34'),
(2, 2, 2.4, 1, 0, '2019-04-09 02:34:34'),
(3, 3, 4.4, 1, 0, '2019-04-09 02:34:34'),
(4, 4, 7.4, 1, 0, '2019-04-09 02:34:34'),
(5, 1, 1.7, 2, 0, '2019-04-09 02:34:34'),
(6, 2, 2.3, 2, 0, '2019-04-09 02:34:34'),
(7, 3, 4.5, 2, 0, '2019-04-09 02:34:34'),
(8, 4, 7.5, 2, 0, '2019-04-09 02:34:34'),
(9, 1, 1.8, 3, 0, '2019-04-09 02:34:34'),
(10, 2, 2.6, 3, 0, '2019-04-09 02:34:34'),
(11, 3, 4.2, 3, 0, '2019-04-09 02:34:34'),
(12, 4, 7.1, 3, 0, '2019-04-09 02:34:34');

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
  `arquivo` varchar(150) DEFAULT NULL,
  `club` int(11) NOT NULL DEFAULT '0' COMMENT '0 - normal, 1 - eagle club',
  `deletado` tinyint(4) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `noticias`
--

INSERT INTO `noticias` (`id`, `id_usuario`, `titulo`, `descricao`, `arquivo`, `club`, `deletado`, `data_cadastro`) VALUES
(1, 1, 'Após temporal derrubar 700 árvores, empresas começam a plantar', '																																																						A cidade do Rio de Janeiro,está em regime de atenção para temporais. Depois de um temporal derrubar mais de 700 árvores na cidade os empresários começaram a se juntar e propor como reconstruir e plantar as árvores perdidas.\r\n					\r\n					\r\n					\r\n					\r\n					\r\n					\r\n					\r\n					\r\n					', '/assets/uploads/green-tree.jpg', 0, 0, '2019-03-07 22:15:31'),
(2, 1, 'Então, como declarar o investimento CDB?', 'Gostaria de saber como declarar o investimento CDB?\r\nPois contaremos logo abaixo	', '/assets/uploads/cdb-declarar.png', 0, 0, '2019-03-26 17:58:54'),
(3, 6, 'noticia legal d+', '																																																												noticia muito topzeira				\r\n						\r\n					\r\n					\r\n					\r\n					\r\n					\r\n					\r\n					\r\n					\r\n					\r\n					', NULL, 1, 0, '2019-04-04 01:39:47'),
(4, 6, 'Mercado Financeiro Aquecido', 'O mercado financeiro está mais aquecido que nunca, por causa da alta de bitcoin agora é mais fácil de trabalhar com criptoativos e criptomoedas ajudando e auxiliando todos aqueles que tem problema em entender.\r\n					', '/assets/uploads/bitcoin-subindo.jpg', 0, 0, '2019-04-04 22:56:11');

-- --------------------------------------------------------

--
-- Estrutura da tabela `pedido_saque`
--

CREATE TABLE `pedido_saque` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_plano` int(11) NOT NULL,
  `valor` double NOT NULL,
  `confirmado` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0 - Não Confirmado , 1 - Confirmado',
  `deletado` tinyint(4) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `pedido_saque`
--

INSERT INTO `pedido_saque` (`id`, `id_usuario`, `id_plano`, `valor`, `confirmado`, `deletado`, `data_cadastro`) VALUES
(1, 1, 1, 500, 0, 0, '2019-04-08 02:46:53'),
(2, 1, 4, 12, 0, 0, '2019-04-08 19:00:27'),
(3, 1, 1, 500, 0, 0, '2019-04-08 19:50:05');

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
-- Estrutura da tabela `porcentagem_comissao`
--

CREATE TABLE `porcentagem_comissao` (
  `id` int(11) NOT NULL,
  `id_tipo` int(11) NOT NULL,
  `porcentagem` double NOT NULL,
  `deletado` tinyint(4) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `porcentagem_comissao`
--

INSERT INTO `porcentagem_comissao` (`id`, `id_tipo`, `porcentagem`, `deletado`, `data_cadastro`) VALUES
(1, 1, 5, 0, '2019-04-09 02:05:31'),
(2, 2, 10, 0, '2019-04-09 02:05:55');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `id_coach` int(11) NOT NULL,
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

INSERT INTO `usuarios` (`id`, `id_coach`, `login`, `senha`, `imagem`, `nome`, `email`, `telefone`, `hash_login`, `nivel`, `deletado`, `data_cadastro`) VALUES
(1, 2, 'coachee', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Arnaldo Lima', 'marcos@eagle.com.br', '(51) 99999-9999', '5406904d7747fe81947557b603a50c61', 0, 0, '2017-11-30 18:49:14'),
(2, 0, 'coach', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Coach Professor', 'renato@eagle.com.br', '(51) 99999-9999', '0ea409ccb60e7dc0cc6af9ecb0154a7a', 1, 0, '2017-11-30 18:49:14'),
(3, 0, 'manager', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Manager Gerente', 'renato@eagle.com.br', '(51) 99999-9999', 'f476e0ce532d5e931de23b93f668f61f', 2, 0, '2017-11-30 18:49:14'),
(4, 0, 'investidor', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Investidor Aluno', 'renato@eagle.com.br', '(51) 99999-9999', 'f476e0ce532d5e931de23b93f668f61f', 3, 0, '2017-11-30 18:49:14'),
(5, 0, 'coordenacao', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Coordenacao Manutencao', 'renato@eagle.com.br', '(51) 99999-9999', '8962b0df9f7c1d09a65ec0268104e4da', 4, 0, '2017-11-30 18:49:14'),
(6, 0, 'admin', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Admin Administrador2', 'renato@eagle.com.br2', '(51) 99999-9999', '9d76b282a8b64a0596a6d8917b0248f3', 5, 0, '2017-11-30 18:49:14'),
(7, 2, 'sandra', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Sandra Pimentel', 'sandra@eagle.com.br', '(51) 99999-9999', '3fb438d36f0252da3edde7df54bab91f', 0, 0, '2017-11-30 18:49:14'),
(8, 2, 'mauricio', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Mauricio da Silva', 'mauricio@eagle.com.br', '(51) 99999-9999', '56bcc1ef68210a808f697c291e67d5e6', 0, 0, '2017-11-30 18:49:14'),
(9, 0, 'coach2', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Coach Professor2', 'renato@eagle.com.br', '(51) 99999-9999', 'f5f417d53edcff4454c29019bf6d1151', 1, 0, '2017-11-30 18:49:14'),
(10, 9, 'zureide', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Zureide Lima', 'zureide@eagle.com.br', '(51) 99999-9999', '403633934701d8d4f362b28b951de1c6', 0, 0, '2017-11-30 18:49:14'),
(22, 2, 'bernardo', '1bdf247a90cad6bd2cadf7cfbe64d660', 'user-padrao.jpg', 'Bernardo Brachiosauros', 'bernardo@eagle.com.br', '(51) 99999-9999', NULL, 0, 0, '2019-03-30 06:21:37'),
(23, 2, 'larissa', '9553eea9a308658b1bf4ace0e0ed527d', 'user-padrao.jpg', 'Larissa Júnio', 'larissa@gmail.com', '(51) 99999-9999', NULL, 0, 0, '2019-03-30 06:22:31'),
(24, 2, 'bruno', 'd062710c21452ed451bc763b31d58729', 'user-padrao.jpg', 'Bruno Simão', 'bruno@gmail.com', '(51) 99999-9999', NULL, 0, 0, '2019-03-30 06:25:01'),
(25, 2, 'julia', 'e5a3e9cacea3fe19c035e429a50e664d', 'user-padrao.jpg', 'Julia Romã', 'julia90@gmail.com', '(51) 99999-9999', NULL, 0, 0, '2019-03-30 06:25:56'),
(26, 0, 'brumadinho', '745536f0652656dae49565e5fa26152b', 'user-padrao.jpg', 'brumadinho', 'brumadinho@gmail.com', '(51) 99999-9999', NULL, 0, 0, '2019-04-04 18:09:45'),
(27, 0, 'brumadinha', '6b5923d7d7450f2b13585d749d72bd77', 'user-padrao.jpg', 'brumadinha', 'brumadinha@gmail.com', '(51) 99999-9999', NULL, 0, 1, '2019-04-04 18:11:34');

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
-- Indexes for table `agenda`
--
ALTER TABLE `agenda`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuarios` (`id_usuario`),
  ADD KEY `id_coachee` (`id_coachee`);

--
-- Indexes for table `avisos`
--
ALTER TABLE `avisos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `caixa`
--
ALTER TABLE `caixa`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_plano` (`id_plano`);

--
-- Indexes for table `coaching`
--
ALTER TABLE `coaching`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coaching_usuario`
--
ALTER TABLE `coaching_usuario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_coaching` (`id_coaching`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indexes for table `eventos`
--
ALTER TABLE `eventos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `funcoes`
--
ALTER TABLE `funcoes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ganhos_mensal`
--
ALTER TABLE `ganhos_mensal`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_plano` (`id_plano`);

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
-- Indexes for table `pedido_saque`
--
ALTER TABLE `pedido_saque`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_plano` (`id_plano`);

--
-- Indexes for table `planos`
--
ALTER TABLE `planos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `porcentagem_comissao`
--
ALTER TABLE `porcentagem_comissao`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_tipo` (`id_tipo`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_coach`);

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
-- AUTO_INCREMENT for table `agenda`
--
ALTER TABLE `agenda`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `avisos`
--
ALTER TABLE `avisos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `caixa`
--
ALTER TABLE `caixa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `coaching`
--
ALTER TABLE `coaching`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `coaching_usuario`
--
ALTER TABLE `coaching_usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `eventos`
--
ALTER TABLE `eventos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `funcoes`
--
ALTER TABLE `funcoes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `ganhos_mensal`
--
ALTER TABLE `ganhos_mensal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `log`
--
ALTER TABLE `log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `noticias`
--
ALTER TABLE `noticias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `pedido_saque`
--
ALTER TABLE `pedido_saque`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `planos`
--
ALTER TABLE `planos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `porcentagem_comissao`
--
ALTER TABLE `porcentagem_comissao`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
--
-- AUTO_INCREMENT for table `usuarios_planos`
--
ALTER TABLE `usuarios_planos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
