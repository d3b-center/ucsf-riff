-- Up Migration
CREATE TABLE IF NOT EXISTS riff (
    id SERIAL NOT NULL,
    alias VARCHAR(255),
    content json,
    creation_date TIMESTAMP WITHOUT TIME ZONE,
    shared_publicly BOOLEAN NOT NULL,
    uid VARCHAR(255),
    updated_date TIMESTAMP WITHOUT TIME ZONE
);
ALTER TABLE riff ADD PRIMARY KEY (id);

-- Down Migration
DROP TABLE riff;