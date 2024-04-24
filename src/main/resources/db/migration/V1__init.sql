CREATE TABLE Users (
    id BIGSERIAL PRIMARY KEY,
    name varchar(255) NOT NULL,
    surname varchar(255) NOT NULL,
    patronymic varchar(255),
    email varchar(255) UNIQUE NOT NULL,
    password varchar(255) NOT NULL,
    needToChange boolean NOT NULL,
    type varchar(50) NOT NULL
);

CREATE TABLE Olympiads (
    id BIGSERIAL PRIMARY KEY,
    name varchar(255) NOT NULL,
    description text NOT NULL,
    university varchar(255),
    start_date timestamp NOT NULL,
    end_date timestamp NOT NULL
);

CREATE TABLE Teams (
    id BIGSERIAL PRIMARY KEY,
    name varchar(255) NOT NULL,
    students JSONB
);

CREATE TABLE Students (
    id BIGSERIAL PRIMARY KEY,
    team_id bigint REFERENCES Teams(id),
    user_id bigint UNIQUE REFERENCES Users(id),
    age int NOT NULL,
    phone_number varchar(20) NOT NULL,
    university varchar(255),
    is_captain boolean,
    other_contacts_data text
);

CREATE TABLE Categories (
    id BIGSERIAL PRIMARY KEY,
    name varchar(50) NOT NULL,
    description text NOT NULL
);

CREATE TABLE Tasks (
    id BIGSERIAL PRIMARY KEY,
    title varchar(100) NOT NULL,
    description text NOT NULL,
    category_id bigint REFERENCES Categories(id) NOT NULL,
    is_open boolean default false
);

CREATE TABLE Attachments_for_tasks (
    id BIGSERIAL PRIMARY KEY,
    name varchar(50) NOT NULL,
    path_to_file varchar(255) NOT NULL,
    task_id bigint REFERENCES Tasks(id) NOT NULL
);

CREATE TABLE Results (
    id BIGSERIAL PRIMARY KEY,
    team_id bigint REFERENCES Teams(id) NOT NULL,
    olympiad_id bigint REFERENCES Olympiads(id) NOT NULL,
    result_score NUMERIC(10, 2)
);

CREATE TABLE Olympiad_Tasks (
    olympiad_id bigint REFERENCES Olympiads(id),
    task_id bigint REFERENCES Tasks(id),
    PRIMARY KEY (olympiad_id, task_id)
);

CREATE TABLE Answers (
    id BIGSERIAL PRIMARY KEY,
    team_id bigint REFERENCES Teams(id) NOT NULL,
    olympiad_id bigint,
    task_id bigint,
    FOREIGN KEY (olympiad_id, task_id) REFERENCES Olympiad_Tasks(olympiad_id, task_id)
);

CREATE TABLE Olympiad_Teams (
    olympiad_id bigint REFERENCES Olympiads(id),
    team_id bigint REFERENCES Teams(id),
    PRIMARY KEY (olympiad_id, team_id)
);

CREATE TABLE Tokens (
    id BIGSERIAL PRIMARY KEY,
    token VARCHAR(255) NOT NULL,
    user_id bigint REFERENCES Users(id) NOT NULL
);