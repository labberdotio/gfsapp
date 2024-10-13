
// 
// Copyright (c) 2024, John Grundback
// All rights reserved.
// 

import * as React from 'react';
import Box, { BoxProps } from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
// import GlobalStyles from '@mui/joy/GlobalStyles';
// import IconButton from '@mui/joy/IconButton';
// import MenuButton from '@mui/joy/MenuButton';
// import MenuIcon from '@mui/icons-material/Menu';

// function Root(props: BoxProps) {
function Root(props) {
	return (
		<>
		<Box 
			{...props} 
			sx={[
				{
					display: 'grid', 
					gridTemplateColumns: {
						xs: '73px minmax(300px, 500px) minmax(500px, 1fr)', 
						sm: '73px minmax(300px, 500px) minmax(500px, 1fr)', 
						md: '240px minmax(300px, 500px) minmax(500px, 1fr)'
					}, 
					gridTemplateRows: '64px 1fr', 
					minHeight: '100vh'
				},
				...(Array.isArray(props.sx) ? props.sx : [props.sx])
			]}
		>
			{props.children} 
		</Box>
		</>
	);
}

// function Header(props: BoxProps) {
function Header(props) {
	return (
		<>
		<Box 
			component="header" 
			className="Header" 
			// variant="solid" 
			// {...props} 
			sx={[
				{
					p: 2, 
					gap: 2, 
					bgcolor: 'background.level3', 
					color: '#616161', 
					// display: 'flex', 
					display: {
						xs: 'none',  
						md: 'flex'
					},
					flexDirection: 'row', 
					justifyContent: 'space-between', 
					alignItems: 'center', 
					// gridColumn: '1', 
					gridColumn: {
						xs: '0',  
						md: '1'
					},
					borderBottom: '1px solid', 
					borderColor: 'divider', 
					position: 'sticky', 
					// transform: {
					// 	xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))', 
					// 	md: 'none', 
					// }, 
					transition: 'transform 0.4s, width 0.4s', 
					zIndex: 1100
				}, 
				...(Array.isArray(props.sx) ? props.sx : [props.sx])
			]}
		>
			{/* <IconButton 
				variant="solid"
				sx={{

				}}
			>
				<MenuIcon />
			</IconButton> */}
		</Box>
		<Box 
			component="header" 
			className="Header" 
			variant="solid" 
			{...props} 
			sx={[
				{
					p: 2,
					gap: 2,
					bgcolor: 'background.level1',
					color: '#616161',
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					// gridColumn: '2 / span 2',
					gridColumn: {
						xs: '1 / span 3',  
						md: '2 / span 2'
					},
					borderBottom: '1px solid',
					borderColor: 'divider',
					position: 'sticky',
					// transform: {
					// 	xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
					// 	md: 'none',
					// },
					transition: 'transform 0.4s, width 0.4s',
					zIndex: 1100,
				},
				...(Array.isArray(props.sx) ? props.sx : [props.sx]),
			]}
		>
			{props.children} 
		</Box>
		</>
	);
}

// function Sidebar(props: BoxProps) {
// 	return (
// 		<>
// 		<Sheet 
// 			// component="nav" 
// 			className="Sidebar" 
// 			// {...props} 
// 			variant="solid" 
// 			sx={{
// 				// position: { xs: 'fixed', md: 'sticky' }, 
// 				// position: 'fixed', 
// 				position: 'relative', 
// 				transform: {
// 					xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))', 
// 					md: 'none', 
// 				},
// 				transition: 'transform 0.4s, width 0.4s', 
// 				zIndex: 1099, 
// 				height: '100dvh', 
// 				// height: 'calc(100dvh - 64px)', 
// 				width: 'var(--Sidebar-width)', 
// 				top: 0, 
// 				// top: '64px', 
// 				p: 2, 
// 				flexShrink: 0, 
// 				display: 'flex', 
// 				flexDirection: 'column', 
// 				gap: 2, 
// 				borderRight: '1px solid', 
// 				borderColor: 'divider', 
// 				// marginTop: '64px', 
// 				// bgcolor: '#333', 
// 				// bgcolor: 'var(--joy-palette-neutral-700, #32383E)', 
// 				// bgcolor: 'background.level3', 
// 				color: 'white'
// 			}}
// 		>
// 			<GlobalStyles 
// 				styles={(theme) => ({
// 					':root': {
// 						'--Sidebar-width': '220px', 
// 						[theme.breakpoints.up('lg')]: {
// 							'--Sidebar-width': '240px', 
// 						}, 
// 					}, 
// 				})}
// 			/>
// 			{props.children}
// 		</Sheet>
// 		</>
// 	);
// }

// function Sidebar(props: BoxProps) {
function Sidebar(props) {
	return (
		<>
		<Box 
			component="nav" 
			className="Sidebar" 
			{...props} 
			// sx={[{ p: 2 }, ...(Array.isArray(props.sx) ? props.sx : [props.sx])]}
			sx={{
				// position: 'relative', 
				// marginTop: '64px', 
				display: 'flex', 
				flexDirection: 'column', 
				height: 'calc(100dvh - 64px)', 
			}}
		>
			{props.children} 
		</Box>
		</>
	);
}

// function Breadcrumb(props: BoxProps) {
function Breadcrumb(props) {
	return (
		<>
		<Box 
			component="breadcrumb" 
			className="Breadcrumb" 
			{...props}
			sx={{
				
			}}
		>
			{props.children} 
		</Box>
		</>
	);
}

// function Main(props: BoxProps) {
function Main(props) {
	return (
		<>
		<Box 
			component="main" 
			className="Main" 
			{...props}
			// sx={[{ p: 2 }, ...(Array.isArray(props.sx) ? props.sx : [props.sx])]}
			sx={{
				// position: 'relative', 
				// marginTop: '64px'
			}}
		>
			{props.children} 
		</Box>
		</>
	);
}

// function Side(props: BoxProps) {
function Side(props) {
	return (
		<>
		<Sheet 
			sx={{
				display: { xs: 'none', sm: 'initial' }, 
				borderLeft: '1px solid', 
				borderColor: 'divider', 
				// position: 'relative',  
				// marginTop: '64px'
			}}
		>
			{props.children} 
		</Sheet>
		</>
	);
}

export default {
	Root, 
	Header, 
	Sidebar, 
	Breadcrumb, 
	Main, 
	Side
};
