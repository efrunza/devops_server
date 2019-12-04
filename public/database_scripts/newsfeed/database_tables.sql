USE [Seneca]
GO
/****** Object:  Table [dbo].[NewsFeed]    Script Date: 2019-10-15 1:51:40 PM ******/
DROP TABLE [dbo].[NewsFeed]
GO
/****** Object:  Table [dbo].[ErrorsLog]    Script Date: 2019-10-15 1:51:40 PM ******/
DROP TABLE [dbo].[ErrorsLog]
GO
/****** Object:  Table [dbo].[ErrorsLog]    Script Date: 2019-10-15 1:51:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ErrorsLog](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ErrorMessage] [nvarchar](max) NULL,
	[ErrorStack] [nvarchar](max) NULL,
	[LastUpdatedDate] [datetime] NULL,
	[LastUpdatedBy] [nvarchar](255) NULL,
 CONSTRAINT [PK_ErrorsLog] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NewsFeed]    Script Date: 2019-10-15 1:51:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NewsFeed](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[title] [nvarchar](255) NULL,
	[content] [nvarchar](255) NULL,
	[author] [nvarchar](255) NULL,
	[lastUpdatedDate] [datetime] NULL,
	[isPublished] [bit] NULL,
 CONSTRAINT [PK_NewsFeed] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
