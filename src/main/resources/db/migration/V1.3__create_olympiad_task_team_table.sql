CREATE TABLE OlympiadTaskTeam
(
    olympiad_id         bigint REFERENCES Olympiads (id),
    team_id             bigint REFERENCES Teams (id),
    task_id             bigint REFERENCES Tasks (id),
    link_to_answer_file varchar(255),
    result              integer,
    PRIMARY KEY (olympiad_id, team_id, task_id)
)