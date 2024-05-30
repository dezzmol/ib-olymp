CREATE TABLE invite_token
(
    id      BIGSERIAL PRIMARY KEY,
    token   VARCHAR(255) UNIQUE NOT NULL,
    team_id BIGINT,
    FOREIGN KEY (team_id) REFERENCES teams (id) ON DELETE CASCADE
);