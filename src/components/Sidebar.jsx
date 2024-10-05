
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
					</List>
				</Box>	
			</>
		);
	}

}

export default Sidebar;
