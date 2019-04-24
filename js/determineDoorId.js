function determineDoorId(room, door) {
 	if(room == room1) {
 		if(door.x == 0 && door.y == 256) {
 			door.id = 1;
 			door.rooms = [room1, room2]
 		}
 		if(door.x == 0 && door.y == 384) {
 			door.id = 2;
 			door.rooms = [room1, room3]
 		}
 		if(door.x == 928 && door.y == 256) {
 			door.id = 3;
 			door.rooms = [room1, room4]
 		}
 		if(door.x == 928 && door.y == 384) {
 			door.id = 4;
 			door.rooms = [room1, room5]
 		}
 	}
 	if (room == room2) {
 		if(door.x == 0 && door.y == 224) {
 			door.id = 5;
 		}
 		if(door.x == 608 && door.y == 224) {
 			door.id = 1;
 			door.rooms = [room1, room2]
 		}
 	}

 	if (room == room3) {
 		if(door.x == 0 && door.y == 224) {
 			door.id = 6;
 		}
 		if(door.x == 608 && door.y == 224) {
 			door.id = 2;
 			door.rooms = [room1, room3]
 		}
 	}

 	if (room == room4) {
 		if(door.x == 0 && door.y == 224) {
 			door.id = 3;
 			door.rooms = [room1, room4]
 		}
 		if(door.x == 608 && door.y == 224) {
 			door.id = 7;
 		}
 	}

 	if (room == room5) {
 		if(door.x == 0 && door.y == 224) {
 			door.id = 4;
 			door.rooms = [room1, room5]
 		}
 		if(door.x == 608 && door.y == 224) {
 			door.id = 8;
 			
 		}
 	}

 	return 0;
 }