ALTER TABLE Users
  RENAME COLUMN type TO role;

ALTER TABLE Users
  ADD username VARCHAR(50) UNIQUE;

ALTER TABLE Users
  RENAME COLUMN needToChange to active;