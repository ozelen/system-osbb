drop schema if exists osbb_park_tower cascade;
create schema osbb_park_tower
    create table users (
        id uuid not null primary key,
        phone varchar(128) not null unique,
        email varchar(128) unique,
        first_name varchar(128),
        last_name varchar(128),
        pat_name varchar(128),
        created_at timestamp not null constraint "user_created_at" default (now()),
        created_by uuid null,
        status varchar(64) default 'new',
        info jsonb,
        role varchar(64) default 'candidate',
        constraint "user_status" check (status in ('new', 'active', 'suspended', 'deleted')),
        constraint "user_role" check (role is null or role in ('superadmin', 'admin', 'member', 'candidate')),
        foreign key (created_by) references users (id)
    )
    create table properties (
        id uuid not null primary key,
        address_number int,
        section int,
        floor int,
        project_num int,
        type varchar(64) not null,
        confirm_document text null,
        document_link text null,
        total_space float not null,
        living_space float null,
        constraint "prop_total_space" check (total_space >=1),
        constraint "prop_type" check (type in ('apartment', 'pantry', 'parking')),
        constraint "prop_section" check (section between 1 and 2),
        constraint "prop_project_num" check (section between -1 and 16)
    )
    create table users_props (
        user_id uuid not null,
        property_id uuid not null,
        relation_type varchar(64),
        primary key(user_id, property_id),
        constraint "prop_relation_type" check (relation_type in ('owner', 'relative', 'spouse', 'representative', 'alias', 'tenant')),
        foreign key (property_id) references properties (id),
        foreign key (user_id) references users (id)
    )
-- comment on schema osbb_park_tower is 'Contains objects related to users and properties';
