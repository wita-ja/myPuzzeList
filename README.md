# <b> myPuzzleList IS setting up </b>

1. Clone repository to you computer
2. Setting up Database 
    1. Download and install 13.0 version postgresSQL DBVS and pgAdmin tool(Comes with same installer) from https://www.postgresql.org/download/.
    2. Start new local database server instance using pgAdmin tool on port 5432 and user with credentials - username: postgres, password: root. Everything is configurable in application.yml file in case if it is needed.
    3. Import database set dump DB testing data dump folder
3. Setting up Backend
    1. Open repository using intellij or other IDE
    2. Map project structure and set IDE to use Java 11.0 SDK (Download if needed)
    3. Run myPuzzleListApplication which is in ../Backend/src/main/java/com/Vitalij/myPuzzleList/MyPuzzleListApplication.java directory
4. Setting up Frontend
    1. Install 14.15.0 version Node.js 
    2. Open any terminal(cmd, powershell etc)
    3. Change directory to ../myPuzzeList/Frontend/my-app in cloned repo
    4. Run npm install command
    5. Run npm start command and wait while development server is started (Note by default it should start on 3000 port and BE allows only requests from 3000 port origin due to configuration)

Application should be fully running after these steps above

- Admin user credentials: username: 'Admin testing' password: 'testingAdmin'.
- Regular user credentials: username: 'Regular user testing' password: 'testingRegular' (Also it is possible to create regular users  with sign up)
