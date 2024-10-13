
// 
// Copyright (c) 2024, John Grundback
// All rights reserved.
// 

// import * as React from 'react';
import React, { useState, Fragment, Component } from 'react';

import { useColorScheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';
// import Link from '@mui/joy/Link';
// import Select from '@mui/joy/Select';
// import Option from '@mui/joy/Option';
import Switch from '@mui/joy/Switch';

import MenuIcon from '@mui/icons-material/Menu';

class Header extends Component {

	render() {

		var _this = this;

		function toggleDrawerOpen() {
			_this.props.toggleDrawerOpen();
		}

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
					<IconButton 
						// color="inherit" 
						// aria-label="open drawer" 
						// onClick={toggleDrawerOpen} 
						onClick={() => toggleDrawerOpen()} 
						// edge="start" 
						// variant="highlight" 
						color="neutral" 
						variant="plain" 
						sx={[
							{
								marginRight: 5, 
								color: 'rgb(97, 97, 97)'
							},
							// open && { display: 'none' }
						]}
					>
						<MenuIcon 
							// color="neutral" 
							// variant="plain" 
							sx={{
								color: 'rgb(97, 97, 97)'
							}}
						/>
					</IconButton>
					<Button 
						component="a" 
						href="/" 
						size="sm" 
						color="neutral" 
						variant="plain" 
						sx={{
							alignSelf: 'center', 
							fontSize: '1.25rem', 
							color: 'rgb(97, 97, 97)'
						}}
					>
						GFS
					</Button>
					<ModeToggle />
				</Stack>
			</Box>
		);
	}

}

export default Header;
