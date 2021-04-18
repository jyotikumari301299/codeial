class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
// io functionality is given by socket.io
        this.socket = io.connect('http://localhost:5000');
// connectionHandler will be called only when this.userEmail exists
        if(this.userEmail){
            this.connectionHandler();
        }
    }
// this connectionHandler will have the to and fro interaction btw thw subscriber and the observer
    connectionHandler(){
        let self = this;
        this.socket.on('connect',function(){
            console.log("connection established using sockets...!");
        // emiiting the request to join the chatroom called codeial which will be received by the server
        // in chat_sockets.js file
            self.socket.emit('join_room',{
                user_email: self.userEmail,
                chatroom: 'codeial'
            });

            self.socket.on('user_joined',function(data){
                console.log("a user joined",data);           
             });

            });

             $('#send-message').click(function(){
                let msg = $('#chat-message-input').val();

                if(msg != '')
                {
                    self.socket.emit('send_message',{
                        message: msg,
                        user_email: self.userEmail,
                        chatroom: 'codeial'
                    });
                }
             });

             self.socket.on('receive_message',function(data){
                 console.log('message received',data.message);

        let newMessage = $('<li>');

        let messageType = 'other-message';

        if(data.user_email == self.userEmail){
            messageType = 'self-message';
        }

        newMessage.append($('<span>', {
            'html' : data.message
         }));
         newMessage.append($('<sub>', {
             'html': data.user_email
         }));

         newMessage.addClass(messageType);

         $('#chat-messages-List').append(newMessage);


        });
    }
}

