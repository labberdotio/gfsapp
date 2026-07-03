// import * as React from 'react';
// import { ChatBox } from '@mui/x-chat';

// import {
//   conversations,
//   initialThreads,
//   makeAdapter,
//   sampleSuggestions,
//   users,
// } from './data';

// const DEFAULTS = {
//   variant: 'default',
//   density: 'standard',
//   layoutMode: 'standard',
//   conversationList: true,
//   conversationHeader: true,
//   attachments: true,
//   suggestions: true,
//   scrollToBottom: true,
//   helperText: true,
//   autoScroll: true,
//   suggestionsAutoSubmit: false,
// };

// export default function ChatBoxPlayground(props = {}) {
//   const { hideHeader, defaults: defaultsOverride, defaultControlsCollapsed } = props;
//   const defaults = React.useMemo(
//     () => ({ ...DEFAULTS, ...defaultsOverride }),
//     [defaultsOverride],
//   );
//   const [conversationList, setConversationList] = React.useState(
//     defaults.conversationList,
//   );
//   const [conversationHeader, setConversationHeader] = React.useState(
//     defaults.conversationHeader,
//   );
//   const [attachments, setAttachments] = React.useState(defaults.attachments);
//   const [suggestions, setSuggestions] = React.useState(defaults.suggestions);
//   const [scrollToBottom, setScrollToBottom] = React.useState(
//     defaults.scrollToBottom,
//   );
//   const [helperText, setHelperText] = React.useState(defaults.helperText);
//   const [autoScroll, setAutoScroll] = React.useState(defaults.autoScroll);
// //   const [suggestionsAutoSubmit, setSuggestionsAutoSubmit] = React.useState(
// //     defaults.suggestionsAutoSubmit,
// //   );
//   const [activeConversationId, setActiveConversationId] = React.useState(
//     conversations[0].id,
//   );
//   const threadMapRef = React.useRef(initialThreads);
//   const adapter = React.useMemo(() => makeAdapter(threadMapRef.current), []);

//   return (    
//         <ChatBox
//           adapter={adapter}
//           currentUser={users.me}
//           members={[users.me, users.assistant, users.alice]}
//           initialConversations={conversations}
//           activeConversationId={activeConversationId}
//           onActiveConversationChange={setActiveConversationId}
//           suggestions={sampleSuggestions}
//         //   suggestionsAutoSubmit={suggestionsAutoSubmit}
//           features={{
//             conversationList: conversationList,
//             conversationHeader: conversationHeader,
//             scrollToBottom,
//             attachments,
//             helperText,
//             autoScroll,
//             suggestions,
//           }}
//         />
//   );
// }
