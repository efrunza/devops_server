USE [Seneca]
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateNewsFeed]    Script Date: 2019-10-15 1:52:46 PM ******/
DROP PROCEDURE [dbo].[sp_UpdateNewsFeed]
GO
/****** Object:  StoredProcedure [dbo].[sp_SaveNewsFeedList]    Script Date: 2019-10-15 1:52:46 PM ******/
DROP PROCEDURE [dbo].[sp_SaveNewsFeedList]
GO
/****** Object:  StoredProcedure [dbo].[sp_LogErrors]    Script Date: 2019-10-15 1:52:46 PM ******/
DROP PROCEDURE [dbo].[sp_LogErrors]
GO
/****** Object:  StoredProcedure [dbo].[sp_InsertNewsFeed]    Script Date: 2019-10-15 1:52:46 PM ******/
DROP PROCEDURE [dbo].[sp_InsertNewsFeed]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetNewsFeedById]    Script Date: 2019-10-15 1:52:46 PM ******/
DROP PROCEDURE [dbo].[sp_GetNewsFeedById]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetAllNewsFeeds]    Script Date: 2019-10-15 1:52:46 PM ******/
DROP PROCEDURE [dbo].[sp_GetAllNewsFeeds]
GO
/****** Object:  StoredProcedure [dbo].[sp_DeleteNewsFeed]    Script Date: 2019-10-15 1:52:46 PM ******/
DROP PROCEDURE [dbo].[sp_DeleteNewsFeed]
GO
/****** Object:  StoredProcedure [dbo].[sp_DeleteNewsFeed]    Script Date: 2019-10-15 1:52:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_DeleteNewsFeed]
@id int
AS
BEGIN
	DELETE dbo.NewsFeed WHERE id = @id
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetAllNewsFeeds]    Script Date: 2019-10-15 1:52:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[sp_GetAllNewsFeeds]
AS
BEGIN
	SELECT id, title, content, author, lastUpdatedDate, isPublished
	FROM dbo.NewsFeed 
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetNewsFeedById]    Script Date: 2019-10-15 1:52:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetNewsFeedById]
@id int
AS
BEGIN
	SELECT id, title, content, author, lastUpdatedDate, isPublished
	FROM dbo.NewsFeed where id = @id
END
GO
/****** Object:  StoredProcedure [dbo].[sp_InsertNewsFeed]    Script Date: 2019-10-15 1:52:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_InsertNewsFeed]
	@title nvarchar(255),
	@content nvarchar(255),
	@author nvarchar(255),
	@lastUpdatedDate DateTime,
	@isPublished BIT
AS
BEGIN

	DECLARE @newId int
	INSERT INTO dbo.NewsFeed values(@title, @content, @author, @lastUpdatedDate, @isPublished)

	SET @newId = @@IDENTITY

	SELECT @newId, title, content, author, lastUpdatedDate, isPublished
	FROM dbo.NewsFeed where id = @newId

END
GO
/****** Object:  StoredProcedure [dbo].[sp_LogErrors]    Script Date: 2019-10-15 1:52:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_LogErrors]
@errorMessage nvarchar(max),
@errorStack nvarchar(max)
AS
BEGIN

	INSERT INTO dbo.ErrorsLog values (@errorMessage, @errorStack, GetDate(), user);

END
GO
/****** Object:  StoredProcedure [dbo].[sp_SaveNewsFeedList]    Script Date: 2019-10-15 1:52:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_SaveNewsFeedList]
@input XML, @outputValue varchar(50) OUT
AS
BEGIN

/*
<?xml version='1.0'?>
  <newsFeedArray>    
	<newsfeed>        
		<title>Me and Bears 1</title>        
		<content>I am near polar bears 1</content>        
		<author>EF</author>       
		<lastUpdatedDate>01-01-2019</lastUpdatedDate>   
		<isPublished>0</isPublished>    
	</newsfeed>    
	<newsfeed>        
		<title>Me and Bears 2</title>        
		<content>I am near polar bears 2</content>        
		<author>EF2</author>       
		<lastUpdatedDate>02-02-2019</lastUpdatedDate>   
		<isPublished>1</isPublished>    
	</newsfeed>
  </newsFeedArray>
  */

  INSERT INTO dbo.NewsFeed (title, content, author, lastUpdatedDate, isPublished)
	SELECT DISTINCT
         
		c.value('title[1]','nvarchar(255)'),         
		c.value('content[1]','nvarchar(255)'),         
		c.value('author[1]','nvarchar(255)'),   
		CONVERT(datetime, c.value('lastUpdatedDate[1]','nvarchar(255)'), 110), 
		c.value('isPublished[1]','BIT')
		FROM  @input.nodes('//newsfeed') T(c);

	SET @outputValue = 'execution was a success.'

END
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateNewsFeed]    Script Date: 2019-10-15 1:52:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_UpdateNewsFeed]
	@id INT,
	@title nvarchar(255),
	@content nvarchar(255),
	@author nvarchar(255),
	@lastUpdatedDate DateTime,
	@isPublished BIT
AS
BEGIN

	UPDATE dbo.NewsFeed 
	SET 
		title = @title, 
		content = @content, 
		author = @author, 
		lastUpdatedDate = @lastUpdatedDate, 
		isPublished = @isPublished
	WHERE id = @id

	SELECT id, title, content, author, lastUpdatedDate, isPublished
	FROM dbo.NewsFeed where id = @id

END
GO
