CREATE TABLE Olympiad_applications
(
    olympiad_id bigint REFERENCES Olympiads (id),
    team_id     bigint REFERENCES Teams (id),
    PRIMARY KEY (olympiad_id, team_id)
)