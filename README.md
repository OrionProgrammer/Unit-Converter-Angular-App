# Features

1. Angular 10
2. SignalR to send back results instantly
3. Connects to .Net Core API 3.1
4. User registration and login
5. Audit Log saved for each request
6. Has Docker support. I've not had a chance to test this.

# How to run the project

Before executing the following steps. Make sure you have the Database and .Net Core API running. API and database can be found here > https://github.com/OrionProgrammer/Unit-Converter-.Net-Core-API-3.1

1. Clone te project to your local machine
2. Open the project in Visual Studio Code
3. Open a new Terminal
4. Type 'ng serve'
5. After the project has compiled, open your browser and browse http://localhost:4200/

Note: Your API must be running on the following Url: http://localhost:4000. To Change your API Url, update the apiUrl in environments/environments.ts 


