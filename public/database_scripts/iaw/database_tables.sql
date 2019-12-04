
/****** Object:  Schema [IAP]    Script Date: 2019-10-29 2:15:39 PM ******/
CREATE SCHEMA [IAP]
GO


/****** Object:  Table [IAP].[IWA_Address]    Script Date: 2019-10-29 2:13:19 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IAP].[IWA_Address](
	[Application_Id] [varchar](11) NOT NULL,
	[IWA_ID] [varchar](50) NOT NULL,
	[Address_Type] [varchar](50) NOT NULL,
	[Street_1] [varchar](55) NULL,
	[Street_2] [varchar](55) NULL,
	[City] [varchar](30) NULL,
	[Province] [varchar](6) NULL,
	[Postal_Code] [varchar](12) NULL,
	[Country] [varchar](3) NULL,
 CONSTRAINT [PK_IWA_Address] PRIMARY KEY CLUSTERED 
(
	[Application_Id] ASC,
	[IWA_ID] ASC,
	[Address_Type] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [IAP].[IWA_Application]    Script Date: 2019-10-29 2:13:19 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IAP].[IWA_Application](
	[Application_Id] [varchar](11) NOT NULL,
	[IWA_ID] [varchar](50) NULL,
	[Application_Status] [varchar](50) NULL,
	[Date_Created] [datetime] NULL,
	[Last_Update_Date] [datetime] NULL,
	[Step_Progression] [int] NULL,
	[Agent_ID] [varchar](30) NULL,
	[Authorize_Info_Release] [varchar](10) NULL,
	[SENECA_ID] [varchar](11) NULL,
	[ADM_APPL_NBR] [varchar](8) NULL,
	[ADM_APPL_NBR_ELI] [varchar](8) NULL,
	[PS_SCC_TEMP_ID] [numeric](16, 0) NULL,
	[PS_SCC_TEMP_ID_ELI] [numeric](16, 0) NULL,
 CONSTRAINT [PK_IWA_Application] PRIMARY KEY CLUSTERED 
(
	[Application_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [IAP].[IWA_English_Prof]    Script Date: 2019-10-29 2:13:19 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IAP].[IWA_English_Prof](
	[Application_Id] [varchar](11) NOT NULL,
	[IWA_ID] [varchar](50) NOT NULL,
	[English_Option] [varchar](1) NULL,
 CONSTRAINT [PK_IWA_English_Prof] PRIMARY KEY CLUSTERED 
(
	[Application_Id] ASC,
	[IWA_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [IAP].[IWA_Personal_Info]    Script Date: 2019-10-29 2:13:19 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IAP].[IWA_Personal_Info](
	[Application_Id] [varchar](11) NOT NULL,
	[IWA_ID] [varchar](50) NOT NULL,
	[Title] [varchar](30) NULL,
	[First_Name] [varchar](30) NULL,
	[Last_Name] [varchar](30) NULL,
	[Other_Names] [varchar](30) NULL,
	[Gender] [varchar](1) NULL,
	[Citizenship] [varchar](3) NULL,
	[Birth_Country] [varchar](3) NULL,
	[Visa_Country] [varchar](3) NULL,
	[Current_Address_Same_as_Permanent] [varchar](1) NULL,
	[Email] [varchar](70) NULL,
	[Birthdate] [date] NULL,
	[Primary_Language] [varchar](3) NULL,
 CONSTRAINT [PK_IWA_Personal_Info] PRIMARY KEY CLUSTERED 
(
	[Application_Id] ASC,
	[IWA_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [IAP].[IWA_Phone]    Script Date: 2019-10-29 2:13:19 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IAP].[IWA_Phone](
	[Application_Id] [varchar](11) NOT NULL,
	[IWA_ID] [varchar](50) NOT NULL,
	[Contact_Type] [varchar](10) NOT NULL,
	[Phone_Type] [varchar](10) NOT NULL,
	[Phone_Number] [varchar](24) NULL,
	[Country_Code] [varchar](3) NULL,
 CONSTRAINT [PK_IWA_Phone] PRIMARY KEY CLUSTERED 
(
	[Application_Id] ASC,
	[IWA_ID] ASC,
	[Contact_Type] ASC,
	[Phone_Type] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [IAP].[IWA_Program_Availability]    Script Date: 2019-10-29 2:13:19 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IAP].[IWA_Program_Availability](
	[ACAD_CAREER] [varchar](4) NULL,
	[ACAD_PROG] [varchar](5) NULL,
	[SSR_YR_OF_PROG] [varchar](4) NULL,
	[CAMPUS] [varchar](5) NULL,
	[STRM] [varchar](4) NULL,
	[PROG_AVAILABILITY] [varchar](3) NULL,
	[PROG_DESCR] [varchar](100) NULL,
	[ELI_CONDITIONAL] [char](1) NULL,
	[DEGREE] [varchar](8) NULL,
	[DEGREE_DESCR] [varchar](30) NULL,
	[CAMPUS_DESC] [varchar](30) NULL,
	[PROG_LEN] [numeric](2, 0) NULL,
	[OPERATOR_ID] [varchar](30) NULL,
	[MODIFICATION_DATE] [datetime] NULL,
	[UNIT_OF_MEAS] [char](2) NULL,
	[ACAD_PLAN] [varchar](10) NULL
) ON [PRIMARY]
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

/****** Object:  Table [IAP].[IWA_Visa_Restrictions]    Script Date: 2019-10-29 3:10:25 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [IAP].[IWA_Visa_Restrictions](
	[COUNTRY_CODE] [varchar](3) NULL,
	[ACAD_PROG] [varchar](5) NULL,
	[STRM] [varchar](4) NULL
) ON [PRIMARY]
GO


/****** Object:  View [IAP].[IWA_Applicant_Info_VIEW]    Script Date: 2019-10-29 3:06:45 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW [IAP].[IWA_Applicant_Info_VIEW] as 
select

	applicantInfo.IWA_ID, applicantInfo.Application_Id, applicantInfo.Application_Status, applicantInfo.Step_Progression, applicantInfo.Agent_ID, applicantInfo.Date_Created,
	
	personalInfo.Visa_Country, eliOptions.English_Option

    FROM IWA_Application applicantInfo

     left outer join IWA_Personal_Info personalInfo on personalInfo.Application_Id = applicantInfo.Application_Id

	left outer join IWA_English_Prof eliOptions on eliOptions.Application_Id = applicantInfo.Application_Id

GO


CREATE VIEW [IAP].[IWA_Personal_Info_VIEW] as 
select

	personalInfo.Application_Id, personalInfo.IWA_ID,

    personalInfo.Title, personalInfo.First_Name,  personalInfo.Last_Name,  personalInfo.Other_Names,
    personalInfo.Gender,  personalInfo.Citizenship, personalInfo.Birth_Country, personalInfo.Visa_Country,  personalInfo.Current_Address_Same_as_Permanent,

	personalInfo.Email,  personalInfo.Birthdate,   personalInfo.Primary_Language , applicantInfo.Seneca_ID, 

    homeAddress.Street_1 as Home_Street_1, homeAddress.Street_2 as Home_Street_2, homeAddress.City as Home_City, homeAddress.Province as Home_Province,
    homeAddress.Postal_Code as Home_Postal_Code,  homeAddress.Country as Home_Country,

    homePhone.Country_Code as Home_Phone_Country_Code, homePhone.Phone_Number as Home_Phone_Number,
    homeCell.Country_Code as Home_Cell_Country_Code, homeCell.Phone_Number as Home_Cell_Phone_Number,

    mailAddress.Street_1 as Mail_Street_1, mailAddress.Street_2 as Mail_Street_2, mailAddress.City as Mail_City, mailAddress.Province as Mail_Province,
    mailAddress.Postal_Code as Mail_Postal_Code,  mailAddress.Country as Mail_Country

    FROM IWA_Personal_Info personalInfo

	 left outer join IWA_Application applicantInfo on personalInfo.Application_Id = applicantInfo.Application_Id

     left outer join IWA_Address homeAddress on personalInfo.Application_Id = homeAddress.Application_Id and homeAddress.Address_Type = 'HOME'

     left outer join IWA_Phone homePhone on personalInfo.Application_Id = homePhone.Application_Id and homePhone.Phone_Type = 'PHONE' and homePhone.Contact_Type = 'HOME'

     left outer join IWA_Phone homeCell on personalInfo.Application_Id = homeCell.Application_Id and homeCell.Phone_Type = 'CELL' and homeCell.Contact_Type = 'HOME'

     left outer join IWA_Address mailAddress on personalInfo.Application_Id = mailAddress.Application_Id and mailAddress.Address_Type = 'MAIL'

GO




