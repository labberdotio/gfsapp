
// 
// Copyright (c) 2024, John Grundback
// All rights reserved.
// 

// import * as React from 'react';
import React, { useState, Fragment, Component } from 'react';

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

import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
// import ListItemIcon from '@mui/joy/ListItemIcon';
// import ListItemText from '@mui/joy/ListItemText';
import Typography from '@mui/joy/Typography';

import AppsIcon from '@mui/icons-material/Apps';
import HomeIcon from '@mui/icons-material/Home';
import ExtensionIcon from '@mui/icons-material/Extension';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
// import HomeIcon from '@mui/icons-material/Home';
import ComputerIcon from '@mui/icons-material/Computer';
import NotificationsIcon from '@mui/icons-material/Notifications';

class Sidebar extends Component {

	// constructor(props) {
	// 	super(props);
	// }

	constructor(props) {
		super(props);
		this.state = {
			// 
		}

		var _this = this;

		

	}

	state = {
		// 
	};

	// componentWillUpdate(nextProps, nextState) {
	// }

	// componentDidUpdate(prevProps, prevState) {
	// }

	// componentDidMount() {
	// }

	render() {

		const {
			api, 
			namespace, 
			types
		} = this.props;

		// const namespace = this.props.namespace;

		const apiHostname = api.api.host; // this.props.api.api.host;
		const apiPort = api.api.port; // this.props.api.api.port;
		const wsHostname = api.ws.host; // this.props.api.ws.host;
		const wsPort = api.ws.port; // this.props.api.ws.port;

		/*
		* host:port
		*/
		const apiHostnamePort = String(apiHostname) + ":" + String(apiPort);
		const wsHostnamePort = String(wsHostname) + ":" + String(wsPort);

		// const snamespaces = useSelector(state => state.namespaces);
		const snamespaces = [];

		var namespaces = undefined;

		if( snamespaces && snamespaces[apiHostname] && snamespaces[apiHostname]["namespaces"] ) {
			namespaces = snamespaces[apiHostname]["namespaces"];
		}

		var loginurl = "/login";
		if( namespace ) {
			loginurl = "/login?" + namespace;
		}

		var logouturl = "/logout";
		if( namespace ) {
			logouturl = "/logout?" + namespace;
		}

		return (
			<>
				{/* <Box 
					// variant="solid"
					sx={{ display: 'flex', gap: 1, alignItems: 'center' }}
				>
					<IconButton
							variant="solid"
							sx={{

							}}
						>
							<MenuIcon />
					</IconButton>	
				</Box> */}
				<Box
					// variant="solid"
					sx={{
						minHeight: 0,
						overflow: 'hidden auto',
						flexGrow: 1,
						display: 'flex',
						flexDirection: 'column',
						[`& .${listItemButtonClasses.root}`]: {
							gap: 1.5,
						},
					}}
				>
					<List
						size="sm"
						variant="solid"
						sx={{
							gap: 1,
							'--List-nestedInsetStart': '30px',
							'--ListItem-radius': (theme) => theme.vars.radius.sm,
						}}
					>
						<ListItem>
							<ListItemButton 
								title="Namespaces" 
								variant="solid" 
								component={Link} 
								to="/namespaces"
							>
								<AppsIcon 
									sx={{
										height: '24px', 
										minWidth: '56px'
									}}
								/>
								<ListItemContent>
									<Typography 
										level="title-md" 
										// color="primary" 
										variant="solid" 
									>
										Namespaces
									</Typography>
								</ListItemContent>
							</ListItemButton>
						</ListItem>
						{ namespace && (
							<ListItem>
								<ListItemButton 
									title="Home" 
									variant="solid" 
									component={Link} 
									to={"/namespaces/" + namespace} 
									selected 
								>
									<HomeIcon 
										sx={{
											height: '24px', 
											minWidth: '56px'
										}}
									/>
									<ListItemContent>
										<Typography 
											level="title-md" 
											color="primary" 
											variant="solid"
										>
											{namespace}
										</Typography>
									</ListItemContent>
								</ListItemButton>
							</ListItem>
						)}
						{ types && types['entities'] && types['entities']['data'] && (
							<>
							{types['entities']['data'].map(function(type, idx) {
								return (
									<>
									<ListItem>
										<ListItemButton 
											title={type.name} 
											variant="solid" 
											component={Link} 
											// to={"/namespaces/" + namespace} 
											to={"/namespaces/" + namespace + "/" + type["_label"] + "/" + type["_id"]} 
											// selected 
										>
											<ExtensionIcon 
												sx={{
													height: '24px', 
													minWidth: '56px'
												}}
											/>
											<ListItemContent>
												<Typography 
													level="title-md" 
													// color="primary" 
													variant="solid"
												>
													{type.name}
												</Typography>
											</ListItemContent>
										</ListItemButton>
									</ListItem>
									</>
								)
							})}
							</>
						)}

						<ListItem>
							<ListItemButton 
								title="API" 
								variant="solid" 
								component={Link} 
								to={apiHostnamePort} 
							>
								<ComputerIcon 
									sx={{
										height: '24px', 
										minWidth: '56px'
									}}
								/>
								<ListItemContent>
									<Typography 
										level="title-md" 
										// color="primary" 
										variant="solid"
									>
										{apiHostnamePort}
									</Typography>
								</ListItemContent>
							</ListItemButton>
						</ListItem>
						<ListItem>
							<ListItemButton 
								title="WS API" 
								variant="solid" 
								component={Link} 
								to={wsHostnamePort} 
							>
								<NotificationsIcon 
									sx={{
										height: '24px', 
										minWidth: '56px'
									}}
								/>
								<ListItemContent>
									<Typography 
										level="title-md" 
										// color="primary" 
										variant="solid"
									>
										{wsHostnamePort}
									</Typography>
								</ListItemContent>
							</ListItemButton>
						</ListItem>
						<ListItem>
							<ListItemButton 
								title="Home" 
								variant="solid" 
								component={Link} 
								to={"/namespaces/" + namespace} 
							>
								<HomeIcon 
									sx={{
										height: '24px', 
										minWidth: '56px'
									}}
								/>
								<ListItemContent>
									<Typography 
										level="title-md" 
										// color="primary" 
										variant="solid"
									>
										{namespace}
									</Typography>
								</ListItemContent>
							</ListItemButton>
						</ListItem>
						<ListItem>
							<ListItemButton 
								title="Login" 
								variant="solid" 
								component={Link} 
								to={loginurl} 
							>
								<LoginIcon 
									sx={{
										height: '24px', 
										minWidth: '56px'
									}}
								/>
								<ListItemContent>
									<Typography 
										level="title-md" 
										// color="primary" 
										variant="solid"
									>
										Login
									</Typography>
								</ListItemContent>
							</ListItemButton>
						</ListItem>
						<ListItem>
							<ListItemButton 
								title="Logout" 
								variant="solid" 
								component={Link} 
								to={logouturl} 
							>
								<LogoutIcon 
									sx={{
										height: '24px', 
										minWidth: '56px'
									}}
								/>
								<ListItemContent>
									<Typography 
										level="title-md" 
										// color="primary" 
										variant="solid"
									>
										Logout
									</Typography>
								</ListItemContent>
							</ListItemButton>
						</ListItem>

					</List>
				</Box>	
			</>
		);
	}

}

export default Sidebar;
