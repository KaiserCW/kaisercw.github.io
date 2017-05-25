// https://sandbox-4bd39.firebaseio.com/

/*$.post('https://sandbox-4bd39.firebaseio.com/messages.json',
	JSON.stringify({
		message: 'hello world',
		timestamp: +(new Date),
		user: 'Dmytro'
	}),
	function(data) {
	 console.log(data);
	}
);*/

;'use strict';

function initChat() {
	var
			DB_HOST = 'https://sandbox-4bd39.firebaseio.com',
			DB_MESSAGES = DB_HOST + '/messages.json',
			$messagesContainer = $('.messages'),
			$userInput = $('.user'),
			$msgInput = $('.text'),
			$btnSend = $('.send');
	
	function sendMsg() {
		
		var
				user = $userInput.val(),
				text = $msgInput.val();
		
		if (!user || !text) {
			return false;
		}
		
		var message = JSON.stringify({
				timestamp: +(new Date),
				text: text,
				user: user
			});
		
		$.post( 
			DB_MESSAGES,
			message,
			function(data) {
			 console.log(data);
			}
		);// post
		
		return false;
	}// sendMsg
	
	function getMsgs() {
		$.get(DB_MESSAGES, {}, function(messages) {
			
			var
					msgKeys = Object.keys(messages),
					msgHTML = '',
					msg;
			
			for(let i = 0; i < msgKeys.length; i++) {
				msg = messages[ msgKeys[i] ];
				msgHTML += '' msg.user + ': ' + msg.text + '<br/>';
			}
			
			$messagesContainer.html(msgHTML);
			
		});// get
	}// getMsgs
	
	$btnSend.on('click', sendMsg);
	
	setInterval(getMsgs, 3000);
		
};// initChat

initChat();