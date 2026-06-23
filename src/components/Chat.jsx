
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

import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Chatbot from './Chatbot';
import { ChatBox } from '@mui/x-chat';
import { ChatAdapter, ChatMessageChunk, ChatStreamEnvelope } from '@mui/x-chat/headless';
import { EventSourceParserStream } from 'eventsource-parser/stream';

import APIClient from '../clients/APIClient';

import {
	loadNamespacesIntoState
} from '../actions/Namespace'

import {
	loadEntitiesIntoState, 
	invalidateEntitiesInState
} from '../actions/Entity'

import {
	getNamespacesFromState
} from '../stores/Namespace'

import {
	getEntitiesFromState
} from '../stores/Entity'

import Layout from './Layout';
import Sidebar from './Sidebar';
import Header from './Header';
import { ChartsItemTooltipContent } from '@mui/x-charts';
// import { isProxy } from 'node:util/types';
// import List from './List';

export const BackNavButton = () => {
    let navigate = useNavigate();
    return (
        <>
			<Button
				size="small" 
				variant="text" 
				color="secondary" 
				startIcon={<ArrowBackIcon />} 
				onClick={() => navigate(-1)}
			>
				Back
			</Button>
        </>
    );
};

export const ForwardNavButton = () => {
    let navigate = useNavigate();
    return (
		<>
			<Button
				size="small" 
				variant="text" 
				color="secondary" 
				endIcon={<ArrowForwardIcon />} 
				onClick={() => navigate(+1)}
			>
				Forward
			</Button>
        </>
    );
};

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
			drawerOpen: false, 
			// intendedcenter: undefined, 
			// actualcenter: undefined, 
			grfloading: false, 
			grfloaded: false, 
			grffailed: false, 
			graph: undefined, 
			pgraph: undefined, 
			// mainWidth: 0, 
			// mainHeight: 0,
			// resize: false,
			snackbarMessage: undefined,
			snackbarOpen: false
		}

		var _this = this;

		// 

	}

	state = {
		drawerOpen: false, 
		// intendedcenter: undefined, 
		// actualcenter: undefined, 
		grfloading: false, 
		grfloaded: false, 
		grffailed: false, 
		graph: undefined, 
		pgraph: undefined, 
		// mainWidth: 0, 
		// mainHeight: 0,
		// resize: false,
		snackbarMessage: undefined,
		snackbarOpen: false
	};

	// 

	// componentWillUpdate(nextProps, nextState) {
	// }

	componentDidUpdate(prevProps, prevState) {

		var _this = this;

		const {
			api, 
			account, 
			namespace
		} = this.props;

		// 	

		if( (!this.props.namespaces["loading"]) && 
			(!this.props.namespaces["loaded"]) && 
			(!this.props.namespaces["failed"]) ) {
			if( api && account ) {
				this.props.loadNamespaces(api, account);
			}
		}

		if( (!this.props.types["loading"]) && 
			(!this.props.types["loaded"]) && 
			(!this.props.types["failed"]) ) {
			if( api && account && namespace ) {
				this.props.loadTypes(api, account, namespace);
			}
		}

		// if( this.props.tsfailed ) {
		// 	if( (this.notificationRef) && (this.notificationRef.current) ) {
		// 		this.notificationRef.current.showInSnackbar(
		// 			"Failed to load data from API"
		// 		);
		// 	}
		// }

		/*
		 * Have to go back to commit cc6304f for this.
		 * Sun Jul 26 20:54:32 2020 -0700
		 * Sun Mar 29 16:20:36 2020 -0500
		 */
		// if( (!this.props.type["loading"]) && 
		// 	(this.props.type["loaded"]) && 
		// 	(!this.props.type["failed"]) ) {
			if( (!this.state.grfloading) && 
				(!this.state.grfloaded) && 
				(!this.state.grffailed) ) {
				// 
			}
		// }

	}

	componentDidMount() {

		var _this = this;

		const {
			api, 
			account, 
			namespace, 
			typename, 
			type, 
			schema
		} = this.props;

		// 

		if( (!this.props.namespaces["loading"]) && 
			(!this.props.namespaces["loaded"]) && 
			(!this.props.namespaces["failed"]) ) {
			if( api && account ) {
				this.props.loadNamespaces(api, account);
			}
		}

		if( (!this.props.types["loading"]) && 
			(!this.props.types["loaded"]) && 
			(!this.props.types["failed"]) ) {
			if( api && account && namespace ) {
				this.props.loadTypes(api, account, namespace);
			}
		}

		// if( this.props.tsfailed ) {
		// 	if( (this.notificationRef) && (this.notificationRef.current) ) {
		// 		this.notificationRef.current.showInSnackbar(
		// 			"Failed to load data from API"
		// 		);
		// 	}
		// }

		/*
		 * Have to go back to commit cc6304f for this.
		 * Sun Jul 26 20:54:32 2020 -0700
		 * Sun Mar 29 16:20:36 2020 -0500
		 */
		// if( (!this.props.type["loading"]) && 
		// 	(this.props.type["loaded"]) && 
		// 	(!this.props.type["failed"]) ) {
			if( (!this.state.grfloading) && 
				(!this.state.grfloaded) && 
				(!this.state.grffailed) ) {
				// 
			}
		// }

		// 

	}

	componentWillUnmount() {

		// 

	}

	

	showInSnackbar(message) {
		var _this = this;
		if( !_this.state.snackbarOpen ) {
			_this.setState({
				snackbarMessage: message,
				snackbarOpen: true
			});
		} else {
		}
	}

	onCloseSnackbar() {
		this.setState({
			snackbarMessage: undefined,
			snackbarOpen: false
		});
	}

	render() {

		var _this = this;

		const {
			api, 
			account, 
			namespace, 
			namespaces, 
			types, 
			typename, 
			type, 
			schema
		} = this.props;

		const drawerOpen = this.state.drawerOpen;

		function setDrawerOpen(setting) {
			_this.setState({
				drawerOpen: setting
			});
		}

		function toggleDrawerOpen() {
			_this.setState({
				drawerOpen: !_this.state.drawerOpen
			});
		}

		var backdropOpen = false;

		// 	


const handleOrderMenuClick = (event) => {
    // setOrderMenuAnchor(event.currentTarget);
  };
  const handleOrderMenuClose = () => {
    // setOrderMenuAnchor(null);
  };

  const handleAnalyticsMenuClick = (event) => {
    // setAnalyticsMenuAnchor(event.currentTarget);
  };
  const handleAnalyticsMenuClose = () => {
    // setAnalyticsMenuAnchor(null);
  };
		return (
			<>
			<Layout.Root
				drawerOpen={drawerOpen} 
				sx={[
					drawerOpen && {
						height: '100vh',
						overflow: 'hidden',
					}
				]}
				>
				<Layout.Header
					drawerOpen={drawerOpen} 
					toggleDrawerOpen={toggleDrawerOpen} 
				>
					<Header 
						drawerOpen={drawerOpen} 
						toggleDrawerOpen={toggleDrawerOpen} 
						api={api} 
						namespace={namespace} 
						types={types} 
					>
						{!drawerOpen &&
							<IconButton 
								onClick={() => toggleDrawerOpen()} 
								// color="neutral" 
								// variant="plain" 
								sx={{
									marginRight: '10px !important', 
									color: 'rgb(97, 97, 97)',
									'&:focus': {
										outline: 'none !important',
									}
								}}
							>
								<MenuIcon 
									sx={{
										color: 'rgb(97, 97, 97)'
									}}
								/>
							</IconButton>
						}
						{/* <Button 
							component="a" 
							href="/" 
							size="sm" 
							// color="neutral" 
							// variant="plain" 
							sx={{
								alignSelf: 'center', 
								fontSize: '1.25rem', 
								color: 'rgb(97, 97, 97)'
							}}
						>
							{namespace}
						</Button> */}
						<Button
							size="small" 
							variant="text" 
							color="secondary" 
						>
							{namespace}
						</Button>
					</Header>
				</Layout.Header>
				<Layout.Sidebar>
					<Sidebar 
						api={api} 
						account={account} 
						namespace={namespace} 
						types={types} 
					/>
				</Layout.Sidebar>
				
				<Layout.Full>

                        {/* <Chatbot /> */}

<ChatBox
      adapter={adapter}
      initialConversations={[{ id: 'main', title: 'Assistant' }]}
      initialActiveConversationId="main"
      sx={{ height: 500 }}
    />

				</Layout.Full>
				
			</Layout.Root>
			</>
		);
	}

}

function mapDispatchToProps(dispatch) {
	return {

		loadNamespaces: (api, account) => dispatch(loadNamespacesIntoState(api, account)),

		// loadTypes: (api, account, namespace) => dispatch(loadEntitiesIntoState(api, account, namespace, 'type')),
		loadTypes: (api, account, namespace) => dispatch(loadEntitiesIntoState(api, account, namespace, 'type')),

		invalidateEntities: (api, resource) => dispatch(invalidateEntitiesInState(api, resource)),

	}
}

function mapStateToProps(state, ownProps) {

	const {
		api, 
		// account, 
		// namespace
	} = state;

	var account = undefined;
	if( ownProps && ownProps.params ) {
		account = ownProps.params.account;
	}

	var namespace = undefined;
	if( ownProps && ownProps.params ) {
		namespace = ownProps.params.namespace;
	}

	const namespaces = getNamespacesFromState(state, api, account);
	const types = getEntitiesFromState(state, api, account, namespace, 'type');

	return {
		api, 
		account: account, 
		namespace: namespace, 
		namespaces: namespaces, 
		types: types, 
	}

}

/*
 * https://github.com/remix-run/react-router/issues/8146
 */

function withNavigation(Component) {
	return props => <Component {...props} navigate={useNavigate()} />;
}

function withParams(Component) {
	return props => <Component {...props} params={useParams()} />;
}

// export default withNavigation(withParams(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Chat))));
export default withNavigation(withParams(connect(mapStateToProps, mapDispatchToProps)(Chat)));
