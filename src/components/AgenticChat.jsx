'use client';
import * as React from 'react';
import { ChatBox } from '@mui/x-chat';

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
				// height: 620,
				border: '1px solid',
				borderColor: 'divider',
				borderRadius: 1,
			}}
		/>
	);
}
