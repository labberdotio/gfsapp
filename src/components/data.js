// import {
//   ChatAdapter,
//   ChatConversation,
//   ChatMessage,
//   ChatMessageChunk,
// } from '@mui/x-chat/headless';

export const users = {
  me: {
    id: 'you',
    displayName: 'You',
    role: 'user',
  },
  assistant: {
    id: 'assistant',
    displayName: 'MUI Assistant',
    role: 'assistant',
    avatarUrl: 'https://mui.com/static/logo.png',
  }
};

export const conversations = [
  {
    id: 'review',
    title: 'review',
    subtitle: 'Review',
    participants: [users.me, users.assistant],
    readState: 'read',
    unreadCount: 0,
    lastMessageAt: '2026-05-01T11:15:00.000Z',
  },
];

export const initialThreads = {
  
};

let randomIdCounter = 0;
export function randomId(prefix) {
  randomIdCounter += 1;
  return `${prefix}-${randomIdCounter.toString(36)}`;
}

function splitText(text, size = 18) {
  const chunks = [];
  for (let index = 0; index < text.length; index += size) {
    chunks.push(text.slice(index, index + size));
  }
  return chunks;
}

function createStream(messageId, text) {
  const chunks = [
    { type: 'start', messageId, author: users.assistant },
    { type: 'text-start', id: `${messageId}-text` },
    ...splitText(text).map((delta) => ({
      type: 'text-delta',
      id: `${messageId}-text`,
      delta,
    })),
    { type: 'text-end', id: `${messageId}-text` },
    { type: 'finish', messageId, finishReason: 'stop' },
  ];

  const timers = [];
  let cancelled = false;

  return new ReadableStream({
    start(controller) {
      chunks.forEach((chunk, index) => {
        timers.push(
          setTimeout(
            () => {
              // The consumer can cancel mid-stream (unmount, or a new prompt
              // before this echo finishes); don't enqueue on a closed controller.
              if (cancelled) {
                return;
              }
              controller.enqueue(chunk);
              if (index === chunks.length - 1) {
                controller.close();
              }
            },
            90 * (index + 1),
          ),
        );
      });
    },
    cancel() {
      cancelled = true;
      timers.forEach((timer) => clearTimeout(timer));
    },
  });
}

// export function makeAdapter(threadMap) {
//   return {
//     async listMessages({ conversationId }) {
//       return {
//         messages: threadMap[conversationId] ?? [],
//         hasMore: false,
//       };
//     },
//     async sendMessage({ message }) {
//       const input = message.parts
//         .map((part) => (part.type === 'text' ? part.text : ''))
//         .join(' ')
//         .trim();

//       return createStream(
//         randomId('reply'),
//         input.length === 0
//           ? 'Try typing something — this demo just echoes your prompt back.'
//           : `You said: "${input}". The defaults adjust automatically when you flip the theme controls above.`,
//       );
//     },
//   };
// }

export const sampleSuggestions = [
  '',
];
