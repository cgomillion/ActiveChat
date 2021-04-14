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

User Stories: 

-- When the user enters localhost3000/(App LINK) they will see the home page with a brief introduction along with a link to each of the chat rooms on file and, a create new chat room button. 

--(stretch) User will be able to create a profile , and edit only his/hers/their posts

-- When the user clicks the create new chat room button the will be redirected to where there will be a form available to populate with their information for the new Chat Room. Along with a back button/link to go back to the home screen 

-- When the user clicks the link under the corresponding chat room, they will be directed to the Index page where it lists all the message in that chat room on server. 

-- When the user clicks onto a specific chat/message, they will be directed to the chat/message (id) Show page

-- On the Chat Show Page the user will have the option to create new chat, edit the current message, go back to the chat room, or go back to the home screen.

-- When the user clicks on the edit link the will directed to the edit page where they will be able to change a prefilled form (similiar to new chat form) about the message/chat after clicking the submit changes button

-- The user will be able to navigate back from any given screen, with the home screen 

MODELS:
const topicSchema = new Schema({
    name: {type: String, required: true },
    description: { type: String, required: true },
    img: String,
});

MODELS:
const chatSchema = new Schema({
    text: {type: String, required: true },
});