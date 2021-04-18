// class ChatEngine{
//     constructor(chatBoxId, userEmail){
//         this.chatBox = $(`#${chatBoxId}`);
//         this.userEmail = userEmail;
// // io functionality is given by socket.io
//         this.socket = io.connect('http://localhost:5000');
// // connectionHandler will be called only when this.userEmail exists
//         if(this.userEmail){
//             this.connectionHandler();
//         }
//     }
// // this connectionHandler will have the to and fro interaction btw thw subscriber and the observer
//     connectionHandler(){
//         console.log('********************');
//         this.socket.on('connect',function(){
//             console.log("connection established using sockets...!");
//         })
//     }
// }








class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://localhost:5000');

        if (this.userEmail){
            this.connectionHandler();
        }

    }


    connectionHandler(){
        // let self = this;

        this.socket.on('connect', function(){
            console.log('connection established using sockets...!');


            // self.socket.emit('join_room', {
            //     user_email: self.userEmail,
            //     chatroom: 'codeial'
            // });

            // self.socket.on('user_joined', function(data){
            //     console.log('a user joined!', data);
            // })


        });
    }
}
