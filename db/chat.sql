create table user(
	id integer primary key autoincrement,
	name varchar(20),
	password varchar(25) not null
);
go;

create table chatroom (
	id integer primary key autoincrement,
	name varchar(50),
	owner_id integer not null,
	foreign key(owner_id) references user(id)
);
go;

create table room_user (
	id integer primary key autoincrement,
	chat_room_id integer not null,
	user_id integer not null,
	foreign key(chat_room_id) references chatroom(id),
	foreign key(user_id) references user(id)
);
go;

create table message (
	id integer primary key autoincrement,
	msg varchar(1500) not null,
	sent_by integer not null,
	chat_room_id integer not null,
	foreign key(sent_by) references user(id)
	foreign key(chat_room_id) references chatroom(id)
);
go;