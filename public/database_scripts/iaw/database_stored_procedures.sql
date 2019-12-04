
/****** Object:  StoredProcedure [dbo].[sp_UpdateNewsFeed]    Script Date: 2019-10-29 2:19:37 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_StoreApplicantBioData]
GO
/****** Object:  StoredProcedure [dbo].[sp_LogErrors]    Script Date: 2019-10-29 2:19:37 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_LogErrors]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetAvailablePrograms]    Script Date: 2019-10-29 2:19:37 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_GetAvailablePrograms]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetApplicationInfoAgent]    Script Date: 2019-10-29 2:19:37 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_GetApplicationInfoAgent]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetApplicationInfo]    Script Date: 2019-10-29 2:19:37 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_GetApplicationInfo]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetApplicantBioData]    Script Date: 2019-10-29 2:19:37 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_GetApplicantBioData]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetApplicantBioData]    Script Date: 2019-10-29 2:19:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetApplicantBioData]
@appId VARCHAR(11),
@iwaId VARCHAR(50)
AS
BEGIN

	select * from IAP.IWA_Personal_Info_VIEW 
    WHERE(Application_Id=@appId AND IWA_ID=@iwaId);

END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetApplicationInfo]    Script Date: 2019-10-29 2:19:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetApplicationInfo]
@appId VARCHAR(11)
AS
BEGIN

	  SELECT Application_Status as status, Application_Id as appId, Step_Progression as lastStep, English_Option as EliOption, Visa_Country as countryOA
	  FROM IAP.IWA_Applicant_Info_VIEW WHERE Application_Id = @appId

END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetApplicationInfoAgent]    Script Date: 2019-10-29 2:19:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetApplicationInfoAgent]
@appId VARCHAR(11)
AS
BEGIN

	select Application_Id from IAP.IWA_Application WHERE Application_Id = @appId;

END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetAvailablePrograms]    Script Date: 2019-10-29 2:19:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[sp_GetAvailablePrograms]
@code varchar(3),
@strm varchar(4)
as
begin

	select ACAD_PROG as programCode, PROG_DESCR as programDesc, CAMPUS as campus , ACAD_PLAN as acadPlan, ACAD_CAREER as acadCareer
	from IAP.IWA_Program_Availability 
	WHERE PROG_AVAILABILITY = 'OP' AND STRM = @strm AND ACAD_PROG NOT IN 
	(SELECT ACAD_PROG FROM iap.iwa_visa_restrictions where COUNTRY_CODE = @code and STRM = @strm)
end
GO
/****** Object:  StoredProcedure [dbo].[sp_LogErrors]    Script Date: 2019-10-29 2:19:37 PM ******/
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
/****** Object:  StoredProcedure [dbo].[sp_UpdateNewsFeed]    Script Date: 2019-10-29 2:19:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_StoreApplicantBioData]
	@appId varchar(11),
	@iwaId VARCHAR(50),
	@Title varchar(30),
	@Last_Name varchar(30), 
	@First_Name varchar(30),
	@Other_Names varchar(30),
	@Gender varchar(1),
	@Birth_Country varchar(3),
	@Citizenship varchar(3),
	@Visa_Country varchar(3),
	@Current_Address_Same_as_Permanent varchar(1),
	@Email varchar(70),
	@Birthdate date,
	@Primary_Language varchar(3)
as
begin

	UPDATE IAP.IWA_Application
	SET Last_Update_Date = GetDate()
	WHERE Application_Id = @appId

	MERGE IAP.IWA_Personal_Info WITH (SERIALIZABLE) AS T
	USING (VALUES (@appId, @iwaId, @Title, @First_Name, @Last_Name, @Other_Names, @Gender, @Citizenship, 
	@Birth_Country, @Visa_Country, @Current_Address_Same_as_Permanent, @Email, @Birthdate, @Primary_Language))
	AS U (Application_Id, IWA_ID, Title, First_Name, Last_Name, Other_Names, Gender, Citizenship, 
	Birth_Country, Visa_Country, Current_Address_Same_as_Permanent, Email, Birthdate, Primary_Language)
	ON (U.Application_Id = T.Application_Id AND U.IWA_ID = T.IWA_ID)
	WHEN MATCHED THEN UPDATE SET
	T.Title = U.Title, T.First_Name = U.First_Name, T.Last_Name = U.Last_Name, T.Other_Names = U.Other_Names,  T.Gender = U.Gender, T.Citizenship = U.Citizenship, 
	T.Birth_Country = U.Birth_Country, T.Visa_Country = U.Visa_Country, T.Current_Address_Same_as_Permanent = U.Current_Address_Same_as_Permanent, 
	T.Email = U.Email, T.Birthdate = U.Birthdate, T.Primary_Language = U.Primary_Language
	WHEN NOT MATCHED THEN INSERT (Application_Id, IWA_ID, Title, First_Name, Last_Name, Other_Names, Gender, Citizenship, 
	Birth_Country, Visa_Country, Current_Address_Same_as_Permanent, Email, Birthdate, Primary_Language)
	VALUES
	(@appId, @iwaId, @Title, @First_Name, @Last_Name, @Other_Names, @Gender, @Citizenship, 
	@Birth_Country, @Visa_Country, @Current_Address_Same_as_Permanent, @Email, @Birthdate, @Primary_Language);

	select * from IAP.IWA_Personal_Info_VIEW 
    WHERE(Application_Id=@appId AND IWA_ID=@iwaId);
	
end

GO