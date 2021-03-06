USE [master]
GO
/****** Object:  Database [pasteleria]    Script Date: 14/11/2018 23:48:35 ******/
CREATE DATABASE [pasteleria]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'pasteleria', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\pasteleria.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'pasteleria_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\pasteleria_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [pasteleria] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [pasteleria].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [pasteleria] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [pasteleria] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [pasteleria] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [pasteleria] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [pasteleria] SET ARITHABORT OFF 
GO
ALTER DATABASE [pasteleria] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [pasteleria] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [pasteleria] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [pasteleria] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [pasteleria] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [pasteleria] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [pasteleria] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [pasteleria] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [pasteleria] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [pasteleria] SET  DISABLE_BROKER 
GO
ALTER DATABASE [pasteleria] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [pasteleria] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [pasteleria] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [pasteleria] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [pasteleria] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [pasteleria] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [pasteleria] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [pasteleria] SET RECOVERY FULL 
GO
ALTER DATABASE [pasteleria] SET  MULTI_USER 
GO
ALTER DATABASE [pasteleria] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [pasteleria] SET DB_CHAINING OFF 
GO
ALTER DATABASE [pasteleria] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [pasteleria] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [pasteleria] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'pasteleria', N'ON'
GO
ALTER DATABASE [pasteleria] SET QUERY_STORE = OFF
GO
USE [pasteleria]
GO
/****** Object:  User [usuario1]    Script Date: 14/11/2018 23:48:36 ******/
CREATE USER [usuario1] FOR LOGIN [usuario1] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [Erick]    Script Date: 14/11/2018 23:48:36 ******/
CREATE USER [Erick] FOR LOGIN [Erick] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_datareader] ADD MEMBER [usuario1]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [usuario1]
GO
/****** Object:  Table [dbo].[Boleta]    Script Date: 14/11/2018 23:48:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Boleta](
	[idBoleta] [int] IDENTITY(1,1) NOT NULL,
	[idCliente] [int] NULL,
	[idProducto] [int] NULL,
	[idCategoria] [int] NULL,
	[precio] [int] NULL,
	[fechaCreacion] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[idBoleta] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Categoria]    Script Date: 14/11/2018 23:48:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Categoria](
	[idCategoria] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](100) NULL,
	[vigente] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[idCategoria] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Perfil]    Script Date: 14/11/2018 23:48:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Perfil](
	[idPerfil] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](100) NULL,
	[vigente] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[idPerfil] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Producto]    Script Date: 14/11/2018 23:48:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Producto](
	[idProducto] [int] IDENTITY(1,1) NOT NULL,
	[idCategoria] [int] NULL,
	[nombre] [varchar](50) NULL,
	[precion] [int] NULL,
	[descripcion] [varchar](200) NULL,
	[vigente] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[idProducto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 14/11/2018 23:48:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuario](
	[idUsuario] [int] IDENTITY(1,1) NOT NULL,
	[idPerfil] [int] NULL,
	[nombre] [varchar](50) NULL,
	[apellido] [varchar](50) NULL,
	[email] [varchar](100) NULL,
	[pass] [varchar](50) NULL,
	[vigente] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[idUsuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  StoredProcedure [dbo].[pa_Login]    Script Date: 14/11/2018 23:48:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Erick Aguila
-- Create date: 07-11-2018
-- Description:	Procedimiento para validar el login
-- =============================================
CREATE PROCEDURE [dbo].[pa_Login]
--exec dbo.pa_login 'erick.aguila55@gmail.com','d123'
@email varchar(50),
@pass varchar(50)
AS
BEGIN

declare @res table(codError int, mensaje varchar(100))

if exists(select * from Usuario where email = @email and pass = @pass) begin

	insert into @res(codError,mensaje)
	values(0,'Existe usuario')

end else begin

	insert into @res(codError,mensaje)
	values('501','No existe usuario')

end

select CodError,mensaje from @res


END
GO
/****** Object:  StoredProcedure [dbo].[pa_RegistrarUsuario]    Script Date: 14/11/2018 23:48:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Erick Aguila
-- Create date: 11-11-2018	
-- Description:	Procedimiento que registra a los nuevos clientes en el sistema
-- =============================================
CREATE PROCEDURE [dbo].[pa_RegistrarUsuario]
@idUsuario int,
@nombre varchar(50)	,
@apellido varchar(50),
@email varchar(100),
@pass varchar(50),
@idPerfil int
AS
BEGIN
	
	if exists(select * from usuario where idUsuario = @idUsuario) begin
		update Usuario set
		nombre = @nombre,
		apellido = @apellido,
		pass = @pass,
		idPerfil = @idPerfil
		where idUsuario = @idUsuario

	end else begin
		insert into Usuario(idPerfil,nombre,apellido,email,pass,vigente)
		values(@idPerfil,@nombre,@apellido,@email,@pass,1)

	end

END
GO
USE [master]
GO
ALTER DATABASE [pasteleria] SET  READ_WRITE 
GO
