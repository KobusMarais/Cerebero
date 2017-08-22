-- User: "testUser"
-- DROP USER "testUser";

CREATE USER "testUser" WITH
  LOGIN
  SUPERUSER
  INHERIT
  CREATEDB
  CREATEROLE
  REPLICATION;

COMMENT ON ROLE "testUser" IS 'for testing the postgres server';