
// 
// Copyright (c) 2024, John Grundback
// All rights reserved.
// 

import * as React from 'react';
import Box, { BoxProps } from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
// import GlobalStyles from '@mui/joy/GlobalStyles';
import IconButton from '@mui/joy/IconButton';
import MenuButton from '@mui/joy/MenuButton';
import MenuIcon from '@mui/icons-material/Menu';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// function Root(props: BoxProps) {
function Root(props) {
	var drawerOpen = false;
	if( props && props.drawerOpen ) {
		drawerOpen = true;
	}
	return (
		<>
		<Box 
			{...props} 
			sx={[
				{
					display: 'grid', 
					minHeight: '100vh'
				},
				!drawerOpen && {
					gridTemplateColumns: {
						xs: '1px 1px 1fr', 
						sm: '73px minmax(240px, 300px) minmax(300px, 1fr)', 
						md: '73px minmax(240px, 300px) minmax(300px, 1fr)', 
						lg: '73px minmax(240px, 300px) minmax(300px, 1fr) 300px'
					}, 
					gridTemplateRows: {
						xs: '64px 1fr', 
						sm: '64px 1fr', 
						md: '64px 1fr', 
						lg: '64px 1fr', 
					},
				},
				drawerOpen && {
					gridTemplateColumns: {
						xs: '240px 1px 1fr', 
						sm: '240px minmax(240px, 300px) minmax(300px, 1fr)', 
						md: '240px minmax(240px, 300px) minmax(300px, 1fr)', 
						lg: '240px minmax(240px, 300px) minmax(300px, 1fr) 300px'
					}, 
					gridTemplateRows: {
						xs: '64px 1fr', 
						sm: '64px 1fr', 
						md: '64px 1fr', 
						lg: '64px 1fr', 
					},
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
	var drawerOpen = false;
	if( props && props.drawerOpen ) {
		drawerOpen = true;
	}
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
					// display: {
					// 	xs: 'flex', 
					// 	sm: 'flex', 
					// 	md: 'flex', 
					// 	lg: 'flex'
					// },
					flexDirection: 'row', 
					// justifyContent: 'space-between', 
					justifyContent: 'flex-end', 
					alignItems: 'center',  
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
				!drawerOpen && {
					display: {
						xs: 'none', 
						sm: 'none', 
						md: 'none', 
						lg: 'none'
					},
					gridColumn: {
						xs: '0', 
						sm: '0', 
						md: '0', 
						lg: '0', 
					},
					gridRow: {
						xs: '1', 
						sm: '1', 
						md: '1',  
						lg: '1'
					},
				}, 
				drawerOpen && {
					display: {
						xs: 'flex', 
						sm: 'flex', 
						md: 'flex', 
						lg: 'flex'
					},
					gridColumn: {
						xs: '0', 
						sm: '0', 
						md: '0', 
						lg: '0', 
					},
					gridRow: {
						xs: '1', 
						sm: '1', 
						md: '1',  
						lg: '1'
					},
				}, 
				...(Array.isArray(props.sx) ? props.sx : [props.sx])
			]}
		>
			<IconButton 
				onClick={() => props.toggleDrawerOpen()} 
				variant="solid"
				sx={{

				}}
			>
				<ChevronLeftIcon />
			</IconButton>
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
				!drawerOpen && {
					gridColumn: {
						xs: '1 / span 3', 
						sm: '1 / span 3', 
						md: '1 / span 3', 
						lg: '1 / span 4', 
					},
					gridRow: {
						xs: '1', 
						sm: '1', 
						md: '1',  
						lg: '1'
					},
				}, 
				drawerOpen && {
					gridColumn: {
						xs: '2 / span 2', 
						sm: '2 / span 2', 
						md: '2 / span 2', 
						lg: '2 / span 3', 
					},
					gridRow: {
						xs: '1', 
						sm: '1', 
						md: '1',  
						lg: '1'
					},
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
				display: {
					xs: 'flex', // 'none', 
					sm: 'flex', 
					md: 'flex',  
					lg: 'flex'
				},
				flexDirection: 'column', 
				height: 'calc(100dvh - 64px)', 
				gridColumn: {
					xs: '1', 
					sm: '1', 
					md: '1',  
					lg: '1'
				},
				gridRow: {
					xs: '2 / span 2', 
					sm: '2 / span 2', 
					md: '2 / span 2', 
					lg: '2 / span 2'
				}
			}}
		>
			{props.children} 
		</Box>
		</>
	);
}

// function SideDrawer(props: BoxProps & { onClose: React.MouseEventHandler<HTMLDivElement> },) {
function SideDrawer(props) {
	const { onClose, ...other } = props;
	return (
	  <Box
		{...other}
		sx={[
		  { position: 'fixed', zIndex: 1200, width: '100%', height: '100%' },
		  ...(Array.isArray(other.sx) ? other.sx : [other.sx]),
		]}
	  >
		<Box
		  role="button"
		  onClick={onClose}
		  sx={(theme) => ({
			position: 'absolute',
			inset: 0,
			bgcolor: `rgba(${theme.vars.palette.neutral.darkChannel} / 0.8)`,
		  })}
		/>
		<Sheet
		  sx={{
			minWidth: 256,
			width: 'max-content',
			height: '100%',
			p: 2,
			boxShadow: 'lg',
			bgcolor: 'background.surface',
		  }}
		>
		  {props.children}
		</Sheet>
	  </Box>
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
				gridColumn: {
					xs: '3 / span 2', // '1', 
					sm: '3 / span 2', 
					md: '3 / span 2', 
					lg: '3 / span 2', 
				},
				gridRow: {
					xs: '2', 
					sm: '2', 
					md: '2', 
					lg: '2'
				}
			}}
		>
			{props.children} 
		</Box>
		</>
	);
}

// function List(props: BoxProps) {
function List(props) {
	return (
		<>
		<Box 
			component="list" 
			className="List" 
			{...props}
			sx={{
				display: {
					xs: 'none', 
					sm: 'flex', 
					md: 'flex',  
					lg: 'flex'
				},
				gridColumn: {
					xs: '-1', 
					sm: '2', 
					md: '2', 
					lg: '2'
				},
				gridRow: {
					xs: '2 / span 2', 
					sm: '2 / span 2', 
					md: '2 / span 2', 
					lg: '2 / span 2'
				}
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
			sx={{
				gridColumn: {
					xs: '3', 
					sm: '3', 
					md: '3', 
					lg: '3'
				},
				gridRow: {
					xs: '3', 
					sm: '3', 
					md: '3', 
					lg: '3'
				}
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
				display: {
					xs: 'none', 
					sm: 'none', 
					md: 'none', 
					lg: 'initial'
				}, 
				borderLeft: '1px solid', 
				borderColor: 'divider', 
				// position: 'relative',  
				// marginTop: '64px',
				gridColumn: {
					xs: '4', 
					sm: '4', 
					md: '4', 
					lg: '4'
				},
				gridRow: {
					xs: '3', 
					sm: '3', 
					md: '3', 
					lg: '3'
				}
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
	SideDrawer, 
	Breadcrumb, 
	List, 
	Main, 
	Side
};
