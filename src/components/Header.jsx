
// 
// Copyright (c) 2024, John Grundback
// All rights reserved.
// 

// import * as React from 'react';
import React, { useState, Fragment, Component } from 'react';

import { useColorScheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';
import Switch from '@mui/joy/Switch';

import Typography from '@mui/joy/Typography';
// import InputBase from '@mui/material/InputBase';
import MuiLink from '@mui/material/Link';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import ComputerIcon from '@mui/icons-material/Computer';
import NotificationsIcon from '@mui/icons-material/Notifications';

class Header extends Component {

	render() {

		var _this = this;

		// function toggleDrawerOpen() {
		// 	_this.props.toggleDrawerOpen();
		// }

		function ModeToggle() {
			const { mode, setMode } = useColorScheme();
			const [mounted, setMounted] = React.useState(false);

			// necessary for server-side rendering
			// because mode is undefined on the server
			React.useEffect(() => {
				setMounted(true);
			}, []);
			if (!mounted) {
				return <Button variant="soft">Change mode</Button>;
			}

			function setChecked(checked) {
				if( checked ) {
					setMode("light");
				} else {
					setMode("dark");
				}
			}

			var checked = false;
			if( mode == "light" ) {
				checked = true;
			}

			return (
				// <Select
				// 	variant="soft"
				// 	value={mode}
				// 	onChange={(event, newMode) => {
				// 		setMode(newMode);
				// 	}}
				// 	sx={{ width: 'max-content' }}
				// >
				// 	<Option value="system">System</Option>
				// 	<Option value="light">Light</Option>
				// 	<Option value="dark">Dark</Option>
				// </Select>
				<Switch
					checked={checked}
					onChange={(event) => setChecked(event.target.checked)}
				/>
			);
		}

		const namespace = this.props.namespace;

		const apiHostname = this.props.api.api.host;
		const apiPort = this.props.api.api.port;
		const wsHostname = this.props.api.ws.host;
		const wsPort = this.props.api.ws.port;

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

		var logouturl = "/logout";
		if( namespace ) {
			logouturl = "/logout?" + namespace;
		}

		return (
			<Box 
				// variant="highlight" 
				sx={{
					display: 'flex', 
					flexGrow: 1, 
					justifyContent: 'space-between'
				}}
			>
				<Stack 
					direction="row" 
					spacing={1} 
					// variant="highlight" 
					sx={{
						justifyContent: 'center', 
						alignItems: 'center', 
						// display: { xs: 'none', sm: 'flex' } 
						color: 'rgb(126, 68, 168)'
					}}
				>
					<>
						{this.props.children} 
					</>

					{/* <div  */}
					<Stack 
						alignItems="center" 
						direction="row" 
						gap={1} 
						style={{
							width: "254px"
						}}
						// </Stack>className={classes.search} 
					>
						<ComputerIcon color="primary" variant="solid"/>
						{/* <InputBase */}
						<Typography
							placeholder="API"
							value={apiHostnamePort}
							// classes={{
							// 	root: classes.inputRoot,
							// 	input: classes.inputInput,
							// }}
							inputProps={{ 'aria-label': 'search' }}
							variant="h6"
						>
							{apiHostnamePort}
						</Typography>
					</Stack>

					{/* <div  */}
					<Stack 
						alignItems="center" 
						direction="row" 
						gap={1} 
						style={{
							width: "254px"
						}}
						// className={classes.search} 
					>
						<NotificationsIcon color="primary" variant="solid"/>
						{/* <InputBase */}
						<Typography
							placeholder="WS"
							value={wsHostnamePort}
							// classes={{
							// 	root: classes.inputRoot,
							// 	input: classes.inputInput,
							// }}
							inputProps={{ 'aria-label': 'search' }} 
							variant="h6"
						>
							{wsHostnamePort}
						</Typography>
					</Stack>

					{/* <div className={classes.search}>
						<div className={classes.searchIcon}>
							<CodeIcon/>
						</div>
						<InputBase
							placeholder="Namespace"
							value={namespace}
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							inputProps={{ 'aria-label': 'search' }}
						/>
					</div> */}

					{/* <div className={classes.search}>
						{namespaces && namespaces.data &&
							<>
							<FormControl variant="filled" className={classes.formControl}>
								<InputLabel htmlFor="filled-namespace-native-simple" className={classes.formControlLabel}>
									Namespace
								</InputLabel>
								<Select
									native
									value={namespace}
									// onClick={() => selectNamespace(namespace)}
									onChange={(event) => selectNamespace(event.target.value)}
									inputProps={{
										
									}} 
									InputLabelProps={{
										className: classes.floatingLabelFocusStyle,
									}} 
									className={classes.formSelect} >
									<option aria-label="None" value=""/>
									<>
									{namespaces.data.map(function(namespace, idx) {
										return (
											<option value={namespace}>{namespace}</option>	
										)
									})}
									</>
								</Select>
							</FormControl>
							</>
						}
					</div> */}

					<Stack 
						alignItems="center" 
						direction="row" 
						gap={1} 
						style={{
							width: "180px"
						}}
					>
						<HomeIcon 
							color="primary" 
							variant="solid" 
						/>
						<MuiLink color="inherit" href={"/namespaces/" + namespace}>
						<Typography
							variant="h6"
						>
							{namespace}
						</Typography>
						</MuiLink>
					</Stack>

					<Stack 
						alignItems="center" 
						direction="row" 
						gap={1} 
						style={{
							width: "180px"
						}}
					>
						<LogoutIcon 
							color="primary" 
							variant="solid" 
						/>
						<MuiLink color="inherit" href={logouturl}>
						<Typography
							variant="h6"
						>
							Logout
						</Typography>
						</MuiLink>
					</Stack>

					<ModeToggle />

				</Stack>
			</Box>
		);
	}

}

export default Header;
