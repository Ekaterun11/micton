CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  group VARCHAR(50) NOT NULL,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  patronymic VARCHAR(255),
  phone VARCHAR(11),
  pass_number VARCHAR(6)
);

CREATE TABLE IF NOT EXISTS batches (
  id VARCHAR(50) PRIMARY KEY,
  status VARCHAR(50) NOT NULL,
  last_operation TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS equipment (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  status VARCHAR(50) NOT NULL,
  next_service DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS plans (
  id VARCHAR(50) PRIMARY KEY,
  type VARCHAR(50) NOT NULL,
  date DATE NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS reports (
  id VARCHAR(50) PRIMARY KEY,
  type VARCHAR(50) NOT NULL,
  date DATE NOT NULL
);