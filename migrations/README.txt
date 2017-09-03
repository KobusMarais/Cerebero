To start the DB from scratch (Until automated scripts are made)
-- I assume PostgresSQL is installed 

1) (incase the dependancy is missing) 
    npm install pg@6.1.0 --save

2) Open pgadmin and create a new Database called user
    - then copy in the scripts into pgadmin query tool and run
        them in numerical order from 1_... 
    - if you want to clean up exisiting db and start anew 
        run 0_dropAll.sql first