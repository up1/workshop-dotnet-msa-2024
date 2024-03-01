\c demo;

DROP TABLE IF EXISTS Articles;

CREATE TABLE Articles
(
    Id SERIAL PRIMARY KEY,
    Title VARCHAR(255),
    Content TEXT,
    PublishedDate TIMESTAMP
);