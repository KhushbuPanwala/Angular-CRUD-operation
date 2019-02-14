USE [EmployeeMgntDB]
GO

CREATE TABLE [dbo].[EmployeeTbl] (
    	[EmpId]      INT   PRIMARY KEY  IDENTITY (1, 1) NOT NULL,
	[FirstName]    VARCHAR (50)    NOT NULL,
	[LastName]    VARCHAR (50)    NOT NULL,
	[Email]    VARCHAR (50)    NOT NULL,	
	[MobileNo]    VARCHAR (50)    NOT NULL,	
	[BirthDate]   datetime    NOT NULL,	
	[JoiningDate]   datetime    NOT NULL,	
	[DeptId] INT NOT NULL,
	[Address] VARCHAR (150)   NULL,	
	[Salary]  DECIMAL (10, 2) NULL,
	[Category] INT    NOT NULL,	
	[Gender]  VARCHAR (50)    NOT NULL,
	[Image]	VARBINARY (MAX)    NULL,
	[ImageName]    VARCHAR(MAX) NULL,	
	FOREIGN KEY ([DeptId]) REFERENCES [DepartmentTbl]([DeptId])
);

--drop table [EmployeeTbl]

CREATE TABLE [dbo].[DepartmentTbl] (
    [DeptId]      INT  PRIMARY KEY   IDENTITY (1, 1) NOT NULL,
    [Name] VARCHAR (50)    NOT NULL    
);
CREATE TABLE [dbo].[UserTbl] (
    [UserId]        INT     PRIMARY KEY  IDENTITY (1, 1) NOT NULL,
    [FirstName] VARCHAR (50) NOT NULL,
    [LastName]  VARCHAR (50) NOT NULL,
    [UserName]  VARCHAR (50) NOT NULL,
    [Password]  VARCHAR (50) NOT NULL
);