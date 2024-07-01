ALTER TABLE answers
    ADD COLUMN creativity_rate NUMERIC (2, 1) DEFAULT 0.0;

ALTER TABLE tasks
    ADD COLUMN extra_points_for_creative_solution INTEGER DEFAULT 0;