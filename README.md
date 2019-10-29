# File Sharing Platform

## Backstory
This project was for a Senior Design project for my Computer Science degree. We were assigned to a local construction company to help with their inefficnet way of sharing large files. 

We planned this project for 3 months and executed and developed it for another 3 months.

Lina Brihoum was the Project Manager, Diego De La Torre was the Lead Frontend Developer, Zachary Luebke was the Lead Backend Developer and Chaseon Taranto was a Front and Backend Developer.

## Introduction
The objective of this project is to design and develop an application that will offer all clients and subcontractors improvements to their model sharing workflow. 

The standard was using sharing files in a project was to manually upload individual files to an FTP site, then a VDC team member will download and compile the individual models and upload the compiled model for the rest of the team to download. This would typically occur on a weekly cadence for the duration of the project. This workflow results in miscommunication and “bottlenecking” with the person responsible for compiling and redistributing models. 

Our sponsor entrusted our group to handle their situation and make a new program to be more efficient and a secure way of sharing files with one another. They are providing the database and are giving us an endless amount of space therefore the file size is not an issue.

# Planning
We first began our project by laying it out and tackling it in small pieces.
Our first piece was to make a *functional decomposition diagram*. 

## Functional Decomposition Diagram
To have a better comprehension about our application, a Functional Decomposition Diagram (FDD) is made.

### First Level
 In the first level, it shows the five major processes identified in our application. The processes consist of Model Repository process, User Interface process, File Sync process, Account Management process, and Data Management process. 
 ### Second Level
In the second level, each process is subdivided into subprocesses:
- The model repository process is designed to store the model projects along with their history of changes, similar to that of version control.
- The user interface process is designed to provide a straightforward interaction and precise control between the user and the system.
- The file sync process is designed to ensure each end-user has the latest project files and that their revisions are integrated to the model repository.
- The account management process is constructed to have a hierarchy and provide the correct authentication to each user.
- The data management process is designed to send data to the website & database, and where the plugin will be accessed.

## Designs of Algorithms
The objective of this project is to design and develop an application that will offer all of our sponsor clients and subcontractors improvements to their model sharing workflow. The primary processes for the system include User Interface, Account Management, Data Management, File Sync, and the Model Repository. Each of the primary processes has their designated sub-processes. All of the interactions between the systems processes and sub-processes have been specified. 

A file sharing platform system should be able to have an account management, a login page, and the ability to upload and fetch files. In order to empower the file-sharing platform system with the ability to effectively and efficiently upload and download files, the following algorithms are designed to work best with our sponsor and their company.

- Login Algorithm
- Fetching Files Algorithm
- Uploading Files Algorithm
- The Account Management Algorithm

## Design of User Interface
All good applications require an easy to user User Interface as well as a responsive one. We planned and laid out our interface accordingly and keeping in mind the construction workers who will be using it.

## Frontend
Our front end was built with react.js and bootstrap for styling. React.js gives us flexibility and reusability while enabling our application to run efficiently on older hardware and slower network connections. Reacts component-based approach to application design allows our team to divide the work evenly among the development team and work towards continuously delivering new features. This works perfectly with our agile approach to designing and building the File sharing platform as our industry contact decides what the business needs for this software are.

Utilizing bootstrap for the styling allows for efficient production of web components that feel natural and engaging for users. Bootstrap also gives the client the ability to dynamically adjust to many different screen sizes and ensures usability at various resolutions. 

### Login Page
Our login page is the first interaction a user will have with our application, we followed as much of the design from our sponsors login pages as possible. This helps keep our new app familiar to users that are familiar with other company systems. The login page currently provides some basic validation for both username and password, this saves the server some processing as extremely wrong entries don’t even make it to the server.

### Dashboard
Our login page is the first interaction a user will have with our application, we followed as much of the design from our sponsors login pages as possible. This helps keep our new app familiar to users that are familiar with other company systems. The login page currently provides some basic validation for both username and password, this saves the server some processing as extremely wrong entries don’t even make it to the server.

## Backend
Our back end was built using javascript as this is the best and most efficient option. Javascript is incredibly easy to implement and easy to test as this product can be offline while we run it. Javascript allows us to create a highly responsive interface that improves the user experience as this is what our sponsor really wanted. 

Since many confidential projects and document will be published on our product, encryption and privacy is a huge factor when thinking about the back-end and our server-side code.

### Authentication & Authorization
The front-end login is managed by the back-end. Our sponsor is supplying our database where all the users and admin rights will be entered. Our back-end is working hand in hand with their database to ensure everyone who is logging into our website is authorized by our sponsor. Each user who logs in will receive a token.

### Encryption using TLS
For our encryption, we are using Transport Layer Security (TLS). TLS is a protocol that provides privacy and data integrity between our client and server. TLS is incredibly essential for websites that require data to be securely exchanged over a network, such as file transfers. The client connects to the servers through TLS which ensures their authentication and encrypts their token. TLS also encrypts the projects and files the client uploads to our website to ensure all confidentiality. 

### Requests
We are using socket.io as the primary form of communication between the frontend and backend. Before the server will respond to any socket communication it must be validated, this ensures that all server-client communication is secure and malicious users are unable to access what could be confidential information.

## Seperate Stand alone Plugin
The plugin will work hand in hand with our main website application. The plugin will be used mainly for end-user services and will not move any files or directories. It will be primarily focused on letting users quickly add and updates files to the directory. The Plugin is mimicking the software Naviswork and Electron.

## Conclusion
Our sponsor entrusted our group to handle their inefficient file sharing method and make a new program to be more proficient and a secure way of sharing files with one another. With our team working on multiple technical areas such as website application development and program development, we were able to create a file sharing platform that promotes encryption, version control, uploading and deleting of files with a solid file tree infrastructure that is able to be its own stand alone platform. 


## Final Development Report URL
https://docs.google.com/document/d/1j2UIsR_iw0HqvH2DewBHQ-QUMHK4tPOSK2rfoo6hUVk/edit?usp=sharing

## Final Planning Report URL
https://docs.google.com/document/d/19mCnAtr8d4VXsOd8OiZWfPX8PRX7eD26GWVggMHAzI8/edit?usp=sharing
