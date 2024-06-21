ALTER TABLE Tasks
    ADD COLUMN is_detailed_answer boolean DEFAULT false;

UPDATE Tasks
SET is_detailed_answer = false;