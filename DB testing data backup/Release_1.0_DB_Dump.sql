--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1
-- Dumped by pg_dump version 13.1

-- Started on 2021-05-17 19:52:48

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 3109 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 201 (class 1259 OID 17355)
-- Name: difficulty; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.difficulty (
    id uuid NOT NULL,
    display_name character varying(255) NOT NULL,
    level integer NOT NULL
);


ALTER TABLE public.difficulty OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 17360)
-- Name: image; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.image (
    id uuid NOT NULL,
    path character varying(255) NOT NULL,
    temp boolean NOT NULL,
    image_type character varying(255) NOT NULL
);


ALTER TABLE public.image OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 17365)
-- Name: material; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.material (
    id uuid NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.material OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 17370)
-- Name: puzzle; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.puzzle (
    id uuid NOT NULL,
    approved boolean NOT NULL,
    brand character varying(255),
    description character varying(1000) NOT NULL,
    title character varying(255) NOT NULL,
    difficulty_id uuid NOT NULL,
    type_id uuid NOT NULL,
    rejected boolean NOT NULL
);


ALTER TABLE public.puzzle OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 17378)
-- Name: puzzle_image; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.puzzle_image (
    puzzle_id uuid NOT NULL,
    image_id uuid NOT NULL
);


ALTER TABLE public.puzzle_image OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 17383)
-- Name: puzzle_material; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.puzzle_material (
    puzzle_id uuid NOT NULL,
    material_id uuid NOT NULL
);


ALTER TABLE public.puzzle_material OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 17388)
-- Name: role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role (
    id uuid NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.role OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 17393)
-- Name: solution; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.solution (
    id uuid NOT NULL,
    unlock_cost integer NOT NULL,
    puzzle_id uuid NOT NULL
);


ALTER TABLE public.solution OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 17398)
-- Name: solution_image; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.solution_image (
    solution_id uuid NOT NULL,
    image_id uuid NOT NULL
);


ALTER TABLE public.solution_image OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 17518)
-- Name: solution_steps; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.solution_steps (
    solution_id uuid NOT NULL,
    steps_id uuid NOT NULL
);


ALTER TABLE public.solution_steps OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 17403)
-- Name: status; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.status (
    id uuid NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.status OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 17523)
-- Name: steps; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.steps (
    id uuid NOT NULL,
    description character varying(1000) NOT NULL
);


ALTER TABLE public.steps OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 17408)
-- Name: type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.type (
    id uuid NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.type OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 17413)
-- Name: user_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_details (
    id uuid NOT NULL,
    activity_points integer NOT NULL,
    age_group character varying(255) NOT NULL,
    date_created timestamp without time zone NOT NULL,
    description character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    username character varying(255) NOT NULL,
    role_id uuid NOT NULL
);


ALTER TABLE public.user_details OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 17421)
-- Name: user_puzzle; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_puzzle (
    puzzle_id uuid NOT NULL,
    user_id uuid NOT NULL,
    score integer,
    status_id uuid NOT NULL,
    solution_unlocked boolean,
    deleted boolean NOT NULL
);


ALTER TABLE public.user_puzzle OWNER TO postgres;

--
-- TOC entry 3089 (class 0 OID 17355)
-- Dependencies: 201
-- Data for Name: difficulty; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.difficulty VALUES ('d2b29fea-4b30-4e54-b45e-5524dd89e5b0', 'Easy', 1);
INSERT INTO public.difficulty VALUES ('c4618d23-ca30-4907-9638-fe44efb8ec28', 'Tricky', 2);
INSERT INTO public.difficulty VALUES ('d03b5866-7fad-4c1a-a819-cde369ad01b8', 'Challenging', 3);
INSERT INTO public.difficulty VALUES ('e0e6917e-9865-4cb1-b0e6-4bae911e71dd', 'Gruelling', 4);
INSERT INTO public.difficulty VALUES ('73da3604-fc7c-4fef-86bb-6f13ae9aa6ef', 'Mind Boggling', 5);


--
-- TOC entry 3090 (class 0 OID 17360)
-- Dependencies: 202
-- Data for Name: image; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.image VALUES ('bc43e234-2291-40c6-9180-3142b0cbc3a0', '/images/PanicAttack.png', false, 'puzzle');
INSERT INTO public.image VALUES ('e4a1a613-3940-437f-8b18-50cb87de16d8', '/images/CandU.png', false, 'puzzle');
INSERT INTO public.image VALUES ('eab6d93a-afe4-4453-8758-82be59ef19e8', '/images/TheWaitersPuzzle.png', false, 'puzzle');
INSERT INTO public.image VALUES ('dbd7fb67-c929-4699-b382-3bd8dc861b23', '/images/10PenniesPuzzle.png', false, 'puzzle');
INSERT INTO public.image VALUES ('b4a7e8d1-bc2b-47c4-8026-90cfb04b6598', '/images/CastPadlock.png', false, 'puzzle');
INSERT INTO public.image VALUES ('e959803a-731e-4876-a51a-cc095c383a57', '/images/DirtyDozen.png', false, 'puzzle');
INSERT INTO public.image VALUES ('dbdfb468-e31c-4b5c-a417-b66273c74894', '/images/GolfField.png', false, 'puzzle');
INSERT INTO public.image VALUES ('73b84f3b-c791-42b1-85ad-07949289c6e5', '/images/zverys.png', false, 'puzzle');
INSERT INTO public.image VALUES ('5e9c8942-93e6-4e6b-8795-10eecef7457a', '/images/AliuminiumCross.png', false, 'puzzle');
INSERT INTO public.image VALUES ('4f8e8efa-cb85-4f5e-9519-2f0bb22d0ae8', '/images/solutionImages/CastDiamond_step1.png', false, 'solution');
INSERT INTO public.image VALUES ('08eb97fb-01e7-4aae-88fa-25387a384b48', '/images/solutionImages/CastDiamond_step3.png', false, 'solution');
INSERT INTO public.image VALUES ('8b158110-3577-49ac-b7eb-bb70fa206b7b', '/images/solutionImages/CastDiamond_step2.png', false, 'solution');
INSERT INTO public.image VALUES ('9c7525e9-fc02-4eb7-9b20-a877e1b1b933', '/images/title_a0.png', false, 'puzzle');
INSERT INTO public.image VALUES ('a26ddb8d-8466-4f2d-82cb-7b7568d157f8', '/images/title_a1.png', false, 'puzzle');
INSERT INTO public.image VALUES ('309066dd-eea1-41a6-971a-17f2cb578715', '/images/title_b0.png', false, 'puzzle');
INSERT INTO public.image VALUES ('2ebc0025-ea82-4f27-80ad-f7fdbe05af59', '/images/title_c0.png', false, 'puzzle');
INSERT INTO public.image VALUES ('2e2a5f6e-dad1-48eb-9ded-c072bab0d7a0', '/images/title_d0.png', false, 'puzzle');
INSERT INTO public.image VALUES ('66024e9d-93b5-4496-9677-c9f5e47057f0', '/images/png-clipart-frog-wearing-black-and-white-sweatsuit-illustration-pepe-the-frog-squatting-position-slavs-gopnik-meme-vertebrate-meme.png', false, 'puzzle');
INSERT INTO public.image VALUES ('48b6ec6f-e5eb-4fc0-93e4-930c6416fc26', '/images/Cast_diamond.png', false, 'puzzle');


--
-- TOC entry 3091 (class 0 OID 17365)
-- Dependencies: 203
-- Data for Name: material; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.material VALUES ('3dd789ad-17a1-48ba-a096-83f71f9e1f82', 'Metal');
INSERT INTO public.material VALUES ('b7141ca5-47eb-4c10-bbc5-a9aa51b92ac6', 'Wood');
INSERT INTO public.material VALUES ('61fbc1c2-3fe8-4873-9fe1-53e904eb6ba9', 'Glass');
INSERT INTO public.material VALUES ('7a6f5a70-14e7-42d8-a160-dcab692c53b4', 'Wire');


--
-- TOC entry 3092 (class 0 OID 17370)
-- Dependencies: 204
-- Data for Name: puzzle; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.puzzle VALUES ('bdde2053-4ae4-4c5b-a348-e49f5c0d9969', true, 'Puzzle Master', 'The Dirty Dozen puzzle is made up of 12 identical interlocking pieces. This hefty puzzle is a challenge to solve, requiring 23 moves to fully reassemble.', 'Dirty Dozen', 'd03b5866-7fad-4c1a-a819-cde369ad01b8', '2e3a0731-1680-4862-ac8e-66d0acddfb7d', false);
INSERT INTO public.puzzle VALUES ('4b4e1233-97eb-437c-a473-d8d207e0ec5f', true, '', 'description_b', 'title_b', 'c4618d23-ca30-4907-9638-fe44efb8ec28', '487293ea-3fe2-4701-a45f-0175aeb636ae', true);
INSERT INTO public.puzzle VALUES ('a7080e42-8e52-4dd4-b862-b4676ed23339', true, 'Winshare Puzzles & Games', 'In this sliding block puzzle the golfer must successfully manage a difficult path of water, trees and sand traps before they can successfully sink the golf ball.', 'Golf Field', 'c4618d23-ca30-4907-9638-fe44efb8ec28', '7d4edcbc-782a-429d-b3a8-3342239a6f15', false);
INSERT INTO public.puzzle VALUES ('e92b3c83-be1f-4e5c-a541-d96bd8733fc0', true, 'brand_a', 'description_a', 'title_a', '73da3604-fc7c-4fef-86bb-6f13ae9aa6ef', '2e3a0731-1680-4862-ac8e-66d0acddfb7d', false);
INSERT INTO public.puzzle VALUES ('c867efd5-9585-46cd-a0b9-c9722e65dce0', true, 'geras', 'Easy peasy lemon squeezy', 'Student Bachelor thesis', 'd2b29fea-4b30-4e54-b45e-5524dd89e5b0', '7d4edcbc-782a-429d-b3a8-3342239a6f15', false);
INSERT INTO public.puzzle VALUES ('f332c9c6-04cb-43a8-9231-2b2345bb5449', true, 'Hanayama', 'This diamond consists of two pieces. Taking them apart is easy, but putting them back together takes some thought. Keep this simple yet elegant puzzle with you at all times.

Designed by American designer Scott Elliott.', 'Cast Diamond', 'd2b29fea-4b30-4e54-b45e-5524dd89e5b0', 'c4b98705-4c72-41a5-908c-63fe20589b96', false);
INSERT INTO public.puzzle VALUES ('29834cfc-cc9a-4865-82a7-24504e565c45', true, 'brand_d', 'A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine.', 'title_d', 'd2b29fea-4b30-4e54-b45e-5524dd89e5b0', 'c4b98705-4c72-41a5-908c-63fe20589b96', false);
INSERT INTO public.puzzle VALUES ('605d7a32-8f0c-43b5-8b62-efd03170b43b', true, 'Demo', 'This puzzle is not like other puzzles you may have seen before... It is difficult to take apart, but even more to put together.  Even when you have seen how the pieces are constructed, it is not obvious how to reassemble it.', 'Demo', 'd2b29fea-4b30-4e54-b45e-5524dd89e5b0', '4959ae5a-e4ce-4c16-8635-684e9c8426a2', false);
INSERT INTO public.puzzle VALUES ('b8b3edc1-af08-4f27-ae17-1292da3fcce6', false, 'brand_c', 'description_c', 'title_c', 'd03b5866-7fad-4c1a-a819-cde369ad01b8', '7d4edcbc-782a-429d-b3a8-3342239a6f15', true);
INSERT INTO public.puzzle VALUES ('46e32611-f272-4128-8c52-0ed21a32215e', false, 'Jean Claude Constantin', 'A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine.', 'C and U', 'c4618d23-ca30-4907-9638-fe44efb8ec28', 'c4b98705-4c72-41a5-908c-63fe20589b96', false);
INSERT INTO public.puzzle VALUES ('c3d9e510-c84a-4297-95a0-d57737452b10', true, 'Puzzle Master', 'Manufactured in nickel plated wire, the Panic Attack won’t give your heart a rest.', 'Panic Attack', 'd03b5866-7fad-4c1a-a819-cde369ad01b8', 'c4b98705-4c72-41a5-908c-63fe20589b96', false);
INSERT INTO public.puzzle VALUES ('8da365fc-c090-4ac1-bf72-f8b8391f21c0', true, 'Recent Toys', 'The Waiter''s Tray: A bottleneck of a puzzle... Can you move the bottles in such a way, that the waiter can remove his tray underneath?', 'Constantin Puzzles: The Waiter''s Tray', 'e0e6917e-9865-4cb1-b0e6-4bae911e71dd', '7d4edcbc-782a-429d-b3a8-3342239a6f15', false);
INSERT INTO public.puzzle VALUES ('3fb39e13-95ba-48c1-987f-c7d62a46ea42', true, 'Creative Crafthouse', 'Insert 10 pennies into the large opening.  You''ll be surprised at how tricky this really is.', 'Penny Puzzle', 'd03b5866-7fad-4c1a-a819-cde369ad01b8', '7d4edcbc-782a-429d-b3a8-3342239a6f15', false);
INSERT INTO public.puzzle VALUES ('1ac88df8-b209-45b2-8af3-87f686c9d28e', true, 'Hanayama', 'The interior is comprised of two elliptical pieces, locked together tightly around the circular pieces and obstinately refusing to be released.', 'Cast Padlock', 'e0e6917e-9865-4cb1-b0e6-4bae911e71dd', '2e3a0731-1680-4862-ac8e-66d0acddfb7d', false);


--
-- TOC entry 3093 (class 0 OID 17378)
-- Dependencies: 205
-- Data for Name: puzzle_image; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.puzzle_image VALUES ('e92b3c83-be1f-4e5c-a541-d96bd8733fc0', '9c7525e9-fc02-4eb7-9b20-a877e1b1b933');
INSERT INTO public.puzzle_image VALUES ('e92b3c83-be1f-4e5c-a541-d96bd8733fc0', 'a26ddb8d-8466-4f2d-82cb-7b7568d157f8');
INSERT INTO public.puzzle_image VALUES ('4b4e1233-97eb-437c-a473-d8d207e0ec5f', '309066dd-eea1-41a6-971a-17f2cb578715');
INSERT INTO public.puzzle_image VALUES ('b8b3edc1-af08-4f27-ae17-1292da3fcce6', '2ebc0025-ea82-4f27-80ad-f7fdbe05af59');
INSERT INTO public.puzzle_image VALUES ('29834cfc-cc9a-4865-82a7-24504e565c45', '2e2a5f6e-dad1-48eb-9ded-c072bab0d7a0');
INSERT INTO public.puzzle_image VALUES ('c867efd5-9585-46cd-a0b9-c9722e65dce0', '66024e9d-93b5-4496-9677-c9f5e47057f0');
INSERT INTO public.puzzle_image VALUES ('f332c9c6-04cb-43a8-9231-2b2345bb5449', '48b6ec6f-e5eb-4fc0-93e4-930c6416fc26');
INSERT INTO public.puzzle_image VALUES ('c3d9e510-c84a-4297-95a0-d57737452b10', 'bc43e234-2291-40c6-9180-3142b0cbc3a0');
INSERT INTO public.puzzle_image VALUES ('46e32611-f272-4128-8c52-0ed21a32215e', 'e4a1a613-3940-437f-8b18-50cb87de16d8');
INSERT INTO public.puzzle_image VALUES ('8da365fc-c090-4ac1-bf72-f8b8391f21c0', 'eab6d93a-afe4-4453-8758-82be59ef19e8');
INSERT INTO public.puzzle_image VALUES ('3fb39e13-95ba-48c1-987f-c7d62a46ea42', 'dbd7fb67-c929-4699-b382-3bd8dc861b23');
INSERT INTO public.puzzle_image VALUES ('1ac88df8-b209-45b2-8af3-87f686c9d28e', 'b4a7e8d1-bc2b-47c4-8026-90cfb04b6598');
INSERT INTO public.puzzle_image VALUES ('bdde2053-4ae4-4c5b-a348-e49f5c0d9969', 'e959803a-731e-4876-a51a-cc095c383a57');
INSERT INTO public.puzzle_image VALUES ('a7080e42-8e52-4dd4-b862-b4676ed23339', 'dbdfb468-e31c-4b5c-a417-b66273c74894');
INSERT INTO public.puzzle_image VALUES ('605d7a32-8f0c-43b5-8b62-efd03170b43b', '5e9c8942-93e6-4e6b-8795-10eecef7457a');


--
-- TOC entry 3094 (class 0 OID 17383)
-- Dependencies: 206
-- Data for Name: puzzle_material; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.puzzle_material VALUES ('e92b3c83-be1f-4e5c-a541-d96bd8733fc0', '3dd789ad-17a1-48ba-a096-83f71f9e1f82');
INSERT INTO public.puzzle_material VALUES ('e92b3c83-be1f-4e5c-a541-d96bd8733fc0', '7a6f5a70-14e7-42d8-a160-dcab692c53b4');
INSERT INTO public.puzzle_material VALUES ('4b4e1233-97eb-437c-a473-d8d207e0ec5f', '61fbc1c2-3fe8-4873-9fe1-53e904eb6ba9');
INSERT INTO public.puzzle_material VALUES ('b8b3edc1-af08-4f27-ae17-1292da3fcce6', 'b7141ca5-47eb-4c10-bbc5-a9aa51b92ac6');
INSERT INTO public.puzzle_material VALUES ('29834cfc-cc9a-4865-82a7-24504e565c45', '61fbc1c2-3fe8-4873-9fe1-53e904eb6ba9');
INSERT INTO public.puzzle_material VALUES ('29834cfc-cc9a-4865-82a7-24504e565c45', '3dd789ad-17a1-48ba-a096-83f71f9e1f82');
INSERT INTO public.puzzle_material VALUES ('c867efd5-9585-46cd-a0b9-c9722e65dce0', 'b7141ca5-47eb-4c10-bbc5-a9aa51b92ac6');
INSERT INTO public.puzzle_material VALUES ('c867efd5-9585-46cd-a0b9-c9722e65dce0', '7a6f5a70-14e7-42d8-a160-dcab692c53b4');
INSERT INTO public.puzzle_material VALUES ('c867efd5-9585-46cd-a0b9-c9722e65dce0', '3dd789ad-17a1-48ba-a096-83f71f9e1f82');
INSERT INTO public.puzzle_material VALUES ('f332c9c6-04cb-43a8-9231-2b2345bb5449', '3dd789ad-17a1-48ba-a096-83f71f9e1f82');
INSERT INTO public.puzzle_material VALUES ('c3d9e510-c84a-4297-95a0-d57737452b10', '3dd789ad-17a1-48ba-a096-83f71f9e1f82');
INSERT INTO public.puzzle_material VALUES ('c3d9e510-c84a-4297-95a0-d57737452b10', '7a6f5a70-14e7-42d8-a160-dcab692c53b4');
INSERT INTO public.puzzle_material VALUES ('46e32611-f272-4128-8c52-0ed21a32215e', '3dd789ad-17a1-48ba-a096-83f71f9e1f82');
INSERT INTO public.puzzle_material VALUES ('8da365fc-c090-4ac1-bf72-f8b8391f21c0', 'b7141ca5-47eb-4c10-bbc5-a9aa51b92ac6');
INSERT INTO public.puzzle_material VALUES ('3fb39e13-95ba-48c1-987f-c7d62a46ea42', '3dd789ad-17a1-48ba-a096-83f71f9e1f82');
INSERT INTO public.puzzle_material VALUES ('3fb39e13-95ba-48c1-987f-c7d62a46ea42', 'b7141ca5-47eb-4c10-bbc5-a9aa51b92ac6');
INSERT INTO public.puzzle_material VALUES ('1ac88df8-b209-45b2-8af3-87f686c9d28e', '3dd789ad-17a1-48ba-a096-83f71f9e1f82');
INSERT INTO public.puzzle_material VALUES ('bdde2053-4ae4-4c5b-a348-e49f5c0d9969', '3dd789ad-17a1-48ba-a096-83f71f9e1f82');
INSERT INTO public.puzzle_material VALUES ('a7080e42-8e52-4dd4-b862-b4676ed23339', '3dd789ad-17a1-48ba-a096-83f71f9e1f82');
INSERT INTO public.puzzle_material VALUES ('a7080e42-8e52-4dd4-b862-b4676ed23339', 'b7141ca5-47eb-4c10-bbc5-a9aa51b92ac6');
INSERT INTO public.puzzle_material VALUES ('605d7a32-8f0c-43b5-8b62-efd03170b43b', '7a6f5a70-14e7-42d8-a160-dcab692c53b4');
INSERT INTO public.puzzle_material VALUES ('605d7a32-8f0c-43b5-8b62-efd03170b43b', '61fbc1c2-3fe8-4873-9fe1-53e904eb6ba9');


--
-- TOC entry 3095 (class 0 OID 17388)
-- Dependencies: 207
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.role VALUES ('851dc28e-8c54-4baa-974b-af93341f77d9', 'Regular');
INSERT INTO public.role VALUES ('39cd7c6f-3b5a-40c1-be3e-051efca29c5d', 'Admin');


--
-- TOC entry 3096 (class 0 OID 17393)
-- Dependencies: 208
-- Data for Name: solution; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.solution VALUES ('4c4568cd-624d-4975-976b-4038edfa55d6', 50, 'f332c9c6-04cb-43a8-9231-2b2345bb5449');


--
-- TOC entry 3097 (class 0 OID 17398)
-- Dependencies: 209
-- Data for Name: solution_image; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.solution_image VALUES ('4c4568cd-624d-4975-976b-4038edfa55d6', '08eb97fb-01e7-4aae-88fa-25387a384b48');
INSERT INTO public.solution_image VALUES ('4c4568cd-624d-4975-976b-4038edfa55d6', '4f8e8efa-cb85-4f5e-9519-2f0bb22d0ae8');
INSERT INTO public.solution_image VALUES ('4c4568cd-624d-4975-976b-4038edfa55d6', '8b158110-3577-49ac-b7eb-bb70fa206b7b');


--
-- TOC entry 3102 (class 0 OID 17518)
-- Dependencies: 214
-- Data for Name: solution_steps; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.solution_steps VALUES ('4c4568cd-624d-4975-976b-4038edfa55d6', '33d5ccd6-b630-4a33-81eb-78dd6f27c0e6');
INSERT INTO public.solution_steps VALUES ('4c4568cd-624d-4975-976b-4038edfa55d6', '85708755-e8d5-4d6d-8277-02899c30e7f4');
INSERT INTO public.solution_steps VALUES ('4c4568cd-624d-4975-976b-4038edfa55d6', '9a54f2fb-e001-46b1-b737-c394c2eb41b0');


--
-- TOC entry 3098 (class 0 OID 17403)
-- Dependencies: 210
-- Data for Name: status; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.status VALUES ('ea7065b8-8ff8-4b2b-84de-7dc279884854', 'Owned');
INSERT INTO public.status VALUES ('b2e7f26e-8d65-43b6-8c2c-9b87dd4e04b7', 'Was solving without owning');
INSERT INTO public.status VALUES ('d58d9b87-1405-407e-97fa-8b9cdca0d5c3', 'Want to buy');
INSERT INTO public.status VALUES ('e1ed5f6c-130f-4945-8036-6cd8b7f78c37', 'Owning');


--
-- TOC entry 3103 (class 0 OID 17523)
-- Dependencies: 215
-- Data for Name: steps; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.steps VALUES ('9a54f2fb-e001-46b1-b737-c394c2eb41b0', '1. Arrange the 2 pieces as indicated below.');
INSERT INTO public.steps VALUES ('85708755-e8d5-4d6d-8277-02899c30e7f4', '2. Superimpose the pieces.');
INSERT INTO public.steps VALUES ('33d5ccd6-b630-4a33-81eb-78dd6f27c0e6', '3. Rotate by using the center line as the axis.');


--
-- TOC entry 3099 (class 0 OID 17408)
-- Dependencies: 211
-- Data for Name: type; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.type VALUES ('487293ea-3fe2-4701-a45f-0175aeb636ae', 'Tangram puzzle');
INSERT INTO public.type VALUES ('c4b98705-4c72-41a5-908c-63fe20589b96', 'Take-apart puzzle');
INSERT INTO public.type VALUES ('2e3a0731-1680-4862-ac8e-66d0acddfb7d', 'Interlocking solid puzzle');
INSERT INTO public.type VALUES ('4959ae5a-e4ce-4c16-8635-684e9c8426a2', 'Disentaglement puzzle');
INSERT INTO public.type VALUES ('7d4edcbc-782a-429d-b3a8-3342239a6f15', 'Sequential movement puzzle');


--
-- TOC entry 3100 (class 0 OID 17413)
-- Dependencies: 212
-- Data for Name: user_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.user_details VALUES ('3dc749b7-d7e9-416d-9f09-6333d363dd65', 30, '26-30', '2021-03-04 00:00:00', 'Hardcore puzzles lover. My house has separate room for them', 'regular@test.com', '$2a$10$xr/32h/U22/nFo2MBp/9EOHM2BEVASjXHTlnAhEfTWqpHlb7y5ay.', 'Regular user testing', '851dc28e-8c54-4baa-974b-af93341f77d9');
INSERT INTO public.user_details VALUES ('2800231c-b788-44c5-a258-6a1f6a98ab7c', 100, '6-12', '2021-04-27 21:46:06.804455', '', 'random@aa.com', '$2a$10$HScP5v3lyEFWMH0EE1Ov9uSLPkQio8UbsdJO63uA.VKd8/SJlWbD6', 'random', '851dc28e-8c54-4baa-974b-af93341f77d9');
INSERT INTO public.user_details VALUES ('e7a07c6b-a14f-44e6-9bf5-6ef215dfef30', 100, '26-31', '2021-04-27 22:08:19.286945', '', 'krokodil@gena.com', '$2a$10$2VMls.oyS4iecaZ5rT7Y6.h7yDgS2sF4Pv/293/vzauyIPQ/TI/Pe', 'gena', '851dc28e-8c54-4baa-974b-af93341f77d9');
INSERT INTO public.user_details VALUES ('d90ad639-2c65-46f4-b165-3bc85aadd09e', 49200, '18-25', '2021-03-04 00:00:00', 'I am lovely admin of this application', 'admin@test.com', '$2a$10$HonNO98MYD.rve.YLbRigun7X.hoZTIV2J5ZNqF.Q6dEq7igvR1Ra', 'Admin testing', '39cd7c6f-3b5a-40c1-be3e-051efca29c5d');


--
-- TOC entry 3101 (class 0 OID 17421)
-- Dependencies: 213
-- Data for Name: user_puzzle; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.user_puzzle VALUES ('bdde2053-4ae4-4c5b-a348-e49f5c0d9969', 'd90ad639-2c65-46f4-b165-3bc85aadd09e', 10, 'b2e7f26e-8d65-43b6-8c2c-9b87dd4e04b7', false, false);
INSERT INTO public.user_puzzle VALUES ('a7080e42-8e52-4dd4-b862-b4676ed23339', 'd90ad639-2c65-46f4-b165-3bc85aadd09e', 7, 'd58d9b87-1405-407e-97fa-8b9cdca0d5c3', false, true);
INSERT INTO public.user_puzzle VALUES ('f332c9c6-04cb-43a8-9231-2b2345bb5449', 'd90ad639-2c65-46f4-b165-3bc85aadd09e', 8, 'e1ed5f6c-130f-4945-8036-6cd8b7f78c37', false, false);
INSERT INTO public.user_puzzle VALUES ('4b4e1233-97eb-437c-a473-d8d207e0ec5f', 'd90ad639-2c65-46f4-b165-3bc85aadd09e', 7, 'd58d9b87-1405-407e-97fa-8b9cdca0d5c3', false, true);
INSERT INTO public.user_puzzle VALUES ('b8b3edc1-af08-4f27-ae17-1292da3fcce6', 'd90ad639-2c65-46f4-b165-3bc85aadd09e', 5, 'd58d9b87-1405-407e-97fa-8b9cdca0d5c3', false, true);
INSERT INTO public.user_puzzle VALUES ('c867efd5-9585-46cd-a0b9-c9722e65dce0', 'd90ad639-2c65-46f4-b165-3bc85aadd09e', 8, 'e1ed5f6c-130f-4945-8036-6cd8b7f78c37', false, false);
INSERT INTO public.user_puzzle VALUES ('4b4e1233-97eb-437c-a473-d8d207e0ec5f', '3dc749b7-d7e9-416d-9f09-6333d363dd65', 6, 'ea7065b8-8ff8-4b2b-84de-7dc279884854', false, false);
INSERT INTO public.user_puzzle VALUES ('e92b3c83-be1f-4e5c-a541-d96bd8733fc0', 'd90ad639-2c65-46f4-b165-3bc85aadd09e', 9, 'd58d9b87-1405-407e-97fa-8b9cdca0d5c3', false, false);
INSERT INTO public.user_puzzle VALUES ('c3d9e510-c84a-4297-95a0-d57737452b10', 'd90ad639-2c65-46f4-b165-3bc85aadd09e', 8, 'e1ed5f6c-130f-4945-8036-6cd8b7f78c37', false, false);
INSERT INTO public.user_puzzle VALUES ('8da365fc-c090-4ac1-bf72-f8b8391f21c0', 'd90ad639-2c65-46f4-b165-3bc85aadd09e', 7, 'ea7065b8-8ff8-4b2b-84de-7dc279884854', false, true);
INSERT INTO public.user_puzzle VALUES ('3fb39e13-95ba-48c1-987f-c7d62a46ea42', 'd90ad639-2c65-46f4-b165-3bc85aadd09e', 8, 'e1ed5f6c-130f-4945-8036-6cd8b7f78c37', false, true);


--
-- TOC entry 2910 (class 2606 OID 17359)
-- Name: difficulty difficulty_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.difficulty
    ADD CONSTRAINT difficulty_pkey PRIMARY KEY (id);


--
-- TOC entry 2912 (class 2606 OID 17364)
-- Name: image image_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.image
    ADD CONSTRAINT image_pkey PRIMARY KEY (id);


--
-- TOC entry 2914 (class 2606 OID 17369)
-- Name: material material_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.material
    ADD CONSTRAINT material_pkey PRIMARY KEY (id);


--
-- TOC entry 2920 (class 2606 OID 17382)
-- Name: puzzle_image puzzle_image_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.puzzle_image
    ADD CONSTRAINT puzzle_image_pkey PRIMARY KEY (puzzle_id, image_id);


--
-- TOC entry 2922 (class 2606 OID 17387)
-- Name: puzzle_material puzzle_material_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.puzzle_material
    ADD CONSTRAINT puzzle_material_pkey PRIMARY KEY (puzzle_id, material_id);


--
-- TOC entry 2916 (class 2606 OID 17377)
-- Name: puzzle puzzle_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.puzzle
    ADD CONSTRAINT puzzle_pkey PRIMARY KEY (id);


--
-- TOC entry 2924 (class 2606 OID 17392)
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);


--
-- TOC entry 2928 (class 2606 OID 17402)
-- Name: solution_image solution_image_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solution_image
    ADD CONSTRAINT solution_image_pkey PRIMARY KEY (solution_id, image_id);


--
-- TOC entry 2926 (class 2606 OID 17397)
-- Name: solution solution_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solution
    ADD CONSTRAINT solution_pkey PRIMARY KEY (id);


--
-- TOC entry 2941 (class 2606 OID 17522)
-- Name: solution_steps solution_steps_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solution_steps
    ADD CONSTRAINT solution_steps_pkey PRIMARY KEY (solution_id, steps_id);


--
-- TOC entry 2930 (class 2606 OID 17407)
-- Name: status status_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status
    ADD CONSTRAINT status_pkey PRIMARY KEY (id);


--
-- TOC entry 2943 (class 2606 OID 17527)
-- Name: steps steps_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.steps
    ADD CONSTRAINT steps_pkey PRIMARY KEY (id);


--
-- TOC entry 2932 (class 2606 OID 17412)
-- Name: type type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type
    ADD CONSTRAINT type_pkey PRIMARY KEY (id);


--
-- TOC entry 2934 (class 2606 OID 17429)
-- Name: user_details uk_4d9rdl7d52k8x3etihxlaujvh; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_details
    ADD CONSTRAINT uk_4d9rdl7d52k8x3etihxlaujvh UNIQUE (email);


--
-- TOC entry 2918 (class 2606 OID 17427)
-- Name: puzzle uk_ciln9hknd6sd6f9xi8edwht59; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.puzzle
    ADD CONSTRAINT uk_ciln9hknd6sd6f9xi8edwht59 UNIQUE (title);


--
-- TOC entry 2936 (class 2606 OID 17420)
-- Name: user_details user_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_details
    ADD CONSTRAINT user_details_pkey PRIMARY KEY (id);


--
-- TOC entry 2939 (class 2606 OID 17425)
-- Name: user_puzzle user_puzzle_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_puzzle
    ADD CONSTRAINT user_puzzle_pkey PRIMARY KEY (puzzle_id, user_id);


--
-- TOC entry 2937 (class 1259 OID 17504)
-- Name: user_details_username_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX user_details_username_uindex ON public.user_details USING btree (username);


--
-- TOC entry 2956 (class 2606 OID 17490)
-- Name: user_puzzle fk26v93vdh4berp2aeso842ky1o; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_puzzle
    ADD CONSTRAINT fk26v93vdh4berp2aeso842ky1o FOREIGN KEY (user_id) REFERENCES public.user_details(id);


--
-- TOC entry 2948 (class 2606 OID 17450)
-- Name: puzzle_material fk3y7oopxg3r5i7nnq96j08n6f4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.puzzle_material
    ADD CONSTRAINT fk3y7oopxg3r5i7nnq96j08n6f4 FOREIGN KEY (material_id) REFERENCES public.material(id);


--
-- TOC entry 2945 (class 2606 OID 17435)
-- Name: puzzle fk43o33u09wuci42as2hye6tck2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.puzzle
    ADD CONSTRAINT fk43o33u09wuci42as2hye6tck2 FOREIGN KEY (type_id) REFERENCES public.type(id);


--
-- TOC entry 2946 (class 2606 OID 17440)
-- Name: puzzle_image fk7e9gt8lr5as612b4xxdj9tr3v; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.puzzle_image
    ADD CONSTRAINT fk7e9gt8lr5as612b4xxdj9tr3v FOREIGN KEY (image_id) REFERENCES public.image(id);


--
-- TOC entry 2954 (class 2606 OID 17480)
-- Name: user_puzzle fk8o0f33pxc4w5arng3v9ld02mn; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_puzzle
    ADD CONSTRAINT fk8o0f33pxc4w5arng3v9ld02mn FOREIGN KEY (puzzle_id) REFERENCES public.puzzle(id);


--
-- TOC entry 2955 (class 2606 OID 17485)
-- Name: user_puzzle fkdgoh9d2e7c93ul7e8rbhdg6w0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_puzzle
    ADD CONSTRAINT fkdgoh9d2e7c93ul7e8rbhdg6w0 FOREIGN KEY (status_id) REFERENCES public.status(id);


--
-- TOC entry 2944 (class 2606 OID 17430)
-- Name: puzzle fkf2pc103326vutfs92xaoan5pg; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.puzzle
    ADD CONSTRAINT fkf2pc103326vutfs92xaoan5pg FOREIGN KEY (difficulty_id) REFERENCES public.difficulty(id);


--
-- TOC entry 2949 (class 2606 OID 17455)
-- Name: puzzle_material fkh775u12tvjg4poeecpxgnkhn7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.puzzle_material
    ADD CONSTRAINT fkh775u12tvjg4poeecpxgnkhn7 FOREIGN KEY (puzzle_id) REFERENCES public.puzzle(id);


--
-- TOC entry 2953 (class 2606 OID 17475)
-- Name: user_details fkhywgeg8pkpsl4re0j5kyft6vu; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_details
    ADD CONSTRAINT fkhywgeg8pkpsl4re0j5kyft6vu FOREIGN KEY (role_id) REFERENCES public.role(id);


--
-- TOC entry 2951 (class 2606 OID 17465)
-- Name: solution_image fki0rp8a9eik1iktlenpdoemko6; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solution_image
    ADD CONSTRAINT fki0rp8a9eik1iktlenpdoemko6 FOREIGN KEY (image_id) REFERENCES public.image(id);


--
-- TOC entry 2947 (class 2606 OID 17445)
-- Name: puzzle_image fkkwpsa3futvn6ujkdk95xrtug2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.puzzle_image
    ADD CONSTRAINT fkkwpsa3futvn6ujkdk95xrtug2 FOREIGN KEY (puzzle_id) REFERENCES public.puzzle(id);


--
-- TOC entry 2952 (class 2606 OID 17470)
-- Name: solution_image fkl1gwgrrbk51ogebqxm9sfsgx4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solution_image
    ADD CONSTRAINT fkl1gwgrrbk51ogebqxm9sfsgx4 FOREIGN KEY (solution_id) REFERENCES public.solution(id);


--
-- TOC entry 2950 (class 2606 OID 17460)
-- Name: solution fknc0vt0m6t5gyo69i3ebc4adci; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solution
    ADD CONSTRAINT fknc0vt0m6t5gyo69i3ebc4adci FOREIGN KEY (puzzle_id) REFERENCES public.puzzle(id);


--
-- TOC entry 2957 (class 2606 OID 17528)
-- Name: solution_steps fknpa4x7q8mi46n6bp7u2hhv8x5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solution_steps
    ADD CONSTRAINT fknpa4x7q8mi46n6bp7u2hhv8x5 FOREIGN KEY (steps_id) REFERENCES public.steps(id);


--
-- TOC entry 2958 (class 2606 OID 17533)
-- Name: solution_steps fksu05py70tbj75yrks1p2xab8i; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solution_steps
    ADD CONSTRAINT fksu05py70tbj75yrks1p2xab8i FOREIGN KEY (solution_id) REFERENCES public.solution(id);


-- Completed on 2021-05-17 19:52:49

--
-- PostgreSQL database dump complete
--

