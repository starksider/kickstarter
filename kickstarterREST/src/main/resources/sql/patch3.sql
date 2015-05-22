CREATE TABLE faq (
    id bigint NOT NULL,
    project_id bigint NOT NULL,
    question text,
    answer text
);

CREATE SEQUENCE faq_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE faq_id_seq OWNER TO postgres;

ALTER SEQUENCE faq_id_seq OWNED BY faq.id;

ALTER TABLE ONLY faq ALTER COLUMN id SET DEFAULT nextval('faq_id_seq'::regclass);

ALTER TABLE ONLY faq
    ADD CONSTRAINT faq_pkey PRIMARY KEY (id);

ALTER TABLE ONLY faq
    ADD CONSTRAINT faq_project_id_fkey FOREIGN KEY (project_id) REFERENCES projects(id);
