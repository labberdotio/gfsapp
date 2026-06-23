
// 
// Copyright (c) 2020, 2021, 2022, 2023, 2024, John Grundback
// All rights reserved.
// 

import React, {Component} from 'react';
import { connect } from 'react-redux'

import {
	Routes, 
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useRouteMatch, 
	useParams, 
	useNavigate
} from "react-router-dom";

import { ChatBox } from '@mui/x-chat';

const BASE_URL = "http://10.88.88.180:8000";

// 
let buffer = "";
function parseStreamChunk(chunk) {

	var ret = [];

    buffer += chunk;
    // const lines = buffer.split("\n");
	const lines = buffer.split("\r\n");

    // Keep the incomplete last line in the buffer
    buffer = lines.pop(); 

    for( const line of lines ) {
		if( line.trim() === "data:" ) {
			ret.push("\r\n");
		} else if( line.startsWith("data: ") ) {
            const rawData = line.slice(6);
            
            // If the chunk says '[DONE]', terminate the stream
            if( rawData.trim() === "[DONE]" ) {
                continue;
            }

            try { 

				// 
				const parsed = rawData;
				var content = parsed;

                // Remove or replace newlines in the actual content payload
                // Use .replace(/(\r\n|\n|\r)/gm, "") to remove entirely,
                // or replace with spaces to keep words separated: .replace(/\n/g, ' ')
                // content = content.replace(/(\r\n|\n|\r)/gm, "");

                if( content ) {

					// if( !ret ) {
					// 	ret = "";
					// }

					// ret = ret + content;
					ret.push(content);
                }

            } catch(e) {
				// 
            }

        }
    }

	if( !ret ) {
		return [];
	}

	return ret;
}

// const adapter = {
//   async sendMessage({ message, signal }) {
// 	var chatId = "cb559dfa";
// 	var message = "Hello";
// 	var message2 = "Hello";
//     const res = await fetch(BASE_URL + `/chats/${chatId}`, {
//       method: 'POST',
// 	  headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ message }),
//       signal,
//     });
//     if (!res.ok) {
//       return Promise.reject({ status: res.status, data: await res.json() });
//     }
//     return res.body; // ReadableStream<ChatMessageChunk>
//   },
// };

// const adapter: ChatAdapter = {
const adapter = {
  async sendMessage({ message, signal }) {
	var chatId = "cb559dfa";
    return new ReadableStream({
      async start(controller) {
        const response = await fetch(BASE_URL + `/chats/${chatId}`, {
          method: 'POST',
		  headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: message.parts[0]?.type === 'text' ? message.parts[0].text : '',
			message: message.parts[0]?.type === 'text' ? message.parts[0].text : '',
          }),
          signal,
        });

        // const reader = response.body!.getReader();
		const reader = response.body.getReader();
        const decoder = new TextDecoder();
        const messageId = `msg-${Date.now()}`;

        controller.enqueue({ type: 'start', messageId });
        controller.enqueue({ type: 'text-start', id: 'text-1' });

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
			const data = decoder.decode(value, { stream: true });
			const lines = parseStreamChunk(data);
			if( lines ) {
				for( var textidx in lines ) {
					var text = lines[textidx];
   	        		controller.enqueue({ type: 'text-delta', id: 'text-1', delta: text });
				}
			}
          }
          controller.enqueue({ type: 'text-end', id: 'text-1' });
          controller.enqueue({ type: 'finish', messageId });
        } catch (error) {
          controller.enqueue({ type: 'text-end', id: 'text-1' });
          controller.enqueue({ type: 'abort', messageId });
        } finally {
          controller.close();
        }
      },
    })
  },
};

// class Chat extends Component {
const Chat = class extends Component {

	constructor(props) {
		super(props);
		this.state = {
			
		}

		var _this = this;

		// 

	}

	state = {
		
	};

	// 

	// componentWillUpdate(nextProps, nextState) {
	// }

	componentDidUpdate(prevProps, prevState) {

		// 

	}

	componentDidMount() {

		// 

	}

	componentWillUnmount() {

		// 

	}

	render() {

		var _this = this;

		const {
			
		} = this.props;

		return (
			<>
			<ChatBox
				adapter={adapter}
				initialConversations={[{ id: 'main', title: 'Assistant' }]}
				initialActiveConversationId="main"
				sx={{  }}
			/>
			</>
		);
	}

}

export default Chat;
