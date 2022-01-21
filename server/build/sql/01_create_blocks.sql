CREATE TABLE IF NOT EXISTS blocks (
    id             UUID  NOT NULL  PRIMARY KEY,
    index          INT NOT NULL,
    text       TEXT NOT NULL
);