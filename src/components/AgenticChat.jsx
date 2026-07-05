'use client';
import * as React from 'react';
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
				controller.enqueue({
					type: 'start', 
					messageId
				});
				controller.enqueue({
					type: 'text-start', 
					id: textId
				});

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
								//	 type: 'content',
								//	 content: parsed.delta,
								// });
								controller.enqueue({
									type: 'text-delta', 
									id: textId, 
									delta: parsed.content
								});
							}
						}
					}
				}
				controller.enqueue({
					type: 'text-end', 
					id: textId
				});
				controller.enqueue({
					type: 'finish', 
					messageId
				});
				controller.close();
			},
		});
	},
};

export default function AgenticChat() {
	const setThreadsRef = React.useRef(null);

	// The adapter is created once (stable reference) and reads state via ref.
	const adapter = React.useMemo(
		() => ({
			async sendMessage() {
				return createChunkStream(createAgenticChunks(randomId()), { delayMs: 120 });
			},
			async addToolApprovalResponse({ id, approved }) {
				setThreadsRef.current?.((prev) => {
					const next = {};
					for (const convId of Object.keys(prev)) {
						next[convId] = prev[convId].map((msg) => ({
							...msg,
							parts: msg.parts.map((part) => {
								if (
									part.type === 'dynamic-tool' &&
									part.toolInvocation.toolCallId === id
								) {
									return {
										...part,
										toolInvocation: approved
											? {
													...part.toolInvocation,
													state: 'output-available',
													output: {
														done: true,
														message: 'Artifacts deleted successfully.',
													},
													approval: { approved: true },
												}
											: {
													...part.toolInvocation,
													state: 'output-denied',
													approval: {
														approved: false,
														reason: 'User denied the operation.',
													},
												},
									};
								}
								return part;
							}),
						}));
					}
					return next;
				});
			},
		}),
		[],
	);

	const [activeId, setActiveId] = React.useState(() => initialConversations[0].id);
	const [conversations, setConversations] = React.useState(() =>
		initialConversations.map((c) => ({ ...c })),
	);
	const [threads, setThreads] = React.useState(() =>
		Object.fromEntries(
			Object.entries(initialThreads).map(([id, msgs]) => [
				id,
				msgs.map((m) => ({ ...m })),
			]),
		),
	);

	// Keep the ref pointing to the latest setter on every render.
	setThreadsRef.current = setThreads;

	const messages = threads[activeId] ?? [];

	return (
		<ChatBox
			adapter={adapter}
			initialActiveConversationId={minimalConversation.id}
			initialConversations={[minimalConversation]}
			initialMessages={minimalMessages}
			activeConversationId={activeId}
			conversations={conversations}
			messages={messages}
			onActiveConversationChange={(nextId) => {
				if (nextId) {
					setActiveId(nextId);
				}
			}}
			onMessagesChange={(nextMessages) => {
				setThreads((prev) => ({ ...prev, [activeId]: nextMessages }));
				setConversations((prev) =>
					syncConversationPreview(prev, activeId, nextMessages),
				);
			}}
			sx={{
				// height: 500,
				border: '1px solid',
				borderColor: 'divider',
				borderRadius: 1,
			}}
		/>
	);
}
