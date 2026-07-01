import { ChatBox } from '@mui/x-chat';
// import type { ChatAdapter } from '@mui/x-chat/headless';
// import { ChatAdapter } from '@mui/x-chat/headless';

// const adapter: ChatAdapter = {
const adapter = {
  async sendMessage({ message, signal }) {
    const textContent = message.parts
      .filter((part) => part.type === 'text')
      .map((part) => part.text)
      .join('');
    const response = await fetch('http://10.88.88.180:5011/llm/api/chat/stream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': "Bearer " + localStorage.getItem("jwt-token")
      },
      body: JSON.stringify({
        "message": textContent, 
        "prompt": textContent
      }),
      signal,
    });

    if (!response.body) throw new Error('No response body');

    // Interpret the text/event-stream from Java backend
    const reader = response.body.getReader();
    const decoder = new TextDecoder(); 

    return new ReadableStream({
      async start(controller) {

        var uniqid = Date.now();
        var messageId = "msg-" + uniqid;
        var textId = "msg-" + uniqid + "-text-1";
        // controller.enqueue({
        //   type: 'start', 
        //   messageId
        // });
        // controller.enqueue({
        //   type: 'text-start', 
        //   id: textId
        // });

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value, { stream: true });
          // Parse Server-Sent Events (SSE) from Spring Boot
          const lines = chunk.split('\n');
          for (const line of lines) {
            if (line.startsWith('data:')) {
              const jsonStr = line.replace('data:', '').trim();
              if (jsonStr) {
                const parsed = JSON.parse(jsonStr);
                // controller.enqueue({
                //   type: 'content',
                //   content: parsed.delta,
                // });
                controller.enqueue({
                  type: parsed.type, // 'text-delta', 
                  id: textId, 
                  delta: parsed.delta // parsed.content
                });
              }
            }
          }
        }
        // controller.enqueue({
        //   type: 'text-end', 
        //   id: textId
        // });
        // controller.enqueue({
        //   type: 'finish', 
        //   messageId
        // });
        controller.close();
      },
    });
  },
};

export default function App() {
  return <ChatBox 
    adapter={adapter} 
    sx={{ /* height: 500 */ }} 
  />;
}
