ALTER TABLE categories
    ADD COLUMN mark INTEGER NOT NULL DEFAULT 0;

UPDATE categories
SET mark = 0;