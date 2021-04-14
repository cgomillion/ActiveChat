# ActiveChat - Front End Repo
Project 3 - Full MERN Stack App

Problem: There is always a need for new and different ways for people to communicate electronically, specifically texting, messenger, and the list goes on. 

Purpose: To create an App that allows users to choose from available discussion topics and enter that respective chat-room, or create a topic of discussion yourself and open a new chat-room. 


Likely Users: Millenials, Bloggers, Web-Development Teams

CHAT ROOMS
7 Restful Routes | HTTP | URL | DESC.
---------------- | ---- | ---- | ----- 
Index | GET | /chatroom | List of all chat-rooms
Show | GET | /chatroom/:id | Chat room user clicked on
New | GET | /chatroom/new | Shows form to enter new chat room info
Create | POST | /chatroom | Creates chat room on server
Edit | GET | /chatroom/:id/edit | Get prefilled form for user to change/edit
Update | PUT/PATCH | /chatroom/:id | Updates the data from 'edit' on server
Destroy | DELETE | /chatroom/:id | Removes Chat Room (id) from the server

"CHATS"/Messages
7 Restful Routes | HTTP | URL | DESC.
---------------- | ---- | ---- | ----- 
Index | GET | /chat | List of all messages in chat room
Show | GET | /chat/:id | The message/Chat the user is making/clicked on
New | GET | /chat/new | Shows text box to enter new chat text
Create | POST | /chat | Creates chat input on server
Edit | GET | /chat/:id/edit | Get prefilled form for user to change/edit their message
Update | PUT/PATCH | /chat/:id | Updates the data from 'edit' on server
Destroy | DELETE | /chat/:id | Removes Chat (id) from the server