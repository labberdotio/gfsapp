
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

// import Typography from '@mui/material/Typography';
// import Breadcrumbs from '@mui/material/Breadcrumbs';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';

import Grid from '@mui/material/Grid';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
// import Divider from '@mui/material/Divider';

// import Chip from '@mui/material/Chip';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';

// material-ui
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Button from '@mui/material/Button';
// import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';

// project imports
import MainCard from './MainCard';
import AnalyticEcommerce from './AnalyticEcommerce';
import MonthlyBarChart from './MonthlyBarChart';
import ReportAreaChart from './ReportAreaChart';
import UniqueVisitorCard from './UniqueVisitorCard';
import SaleReportCard from './SaleReportCard';
import OrdersTable from './OrdersTable';

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

// class Dashboard extends Component {
const Dashboard = class extends Component {

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

<Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid sx={{ mb: -2.25 }} size={12}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <AnalyticEcommerce title="Total Page Views" count="4,42,236" percentage={59.3} extra="35,000" />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <AnalyticEcommerce title="Total Users" count="78,250" percentage={70.5} extra="8,900" />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <AnalyticEcommerce title="Total Order" count="18,800" percentage={27.4} isLoss color="warning" extra="1,943" />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <AnalyticEcommerce title="Total Sales" count="35,078" percentage={27.4} isLoss color="warning" extra="20,395" />
      </Grid>
      <Grid sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} size={{ md: 8 }} />
      {/* row 2 */}
      <Grid size={{ xs: 12, md: 7, lg: 8 }}>
        <UniqueVisitorCard />
      </Grid>
      <Grid size={{ xs: 12, md: 5, lg: 4 }}>
        <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Grid>
            <Typography variant="h5">Income Overview</Typography>
          </Grid>
          <Grid />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Stack sx={{ gap: 2 }}>
              <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                This Week Statistics
              </Typography>
              <Typography variant="h3">$7,650</Typography>
            </Stack>
          </Box>
          <MonthlyBarChart />
        </MainCard>
      </Grid>
      {/* row 3 */}
      <Grid size={{ xs: 12, md: 7, lg: 8 }}>
        <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Grid>
            <Typography variant="h5">Recent Orders</Typography>
          </Grid>
          <Grid>
            <IconButton onClick={handleOrderMenuClick}>
              {/* <EllipsisOutlined style={{ fontSize: '1.25rem' }} /> */}
            </IconButton>
            <Menu
              id="fade-menu"
              slotProps={{ list: { 'aria-labelledby': 'fade-button' } }}
            //   anchorEl={orderMenuAnchor}
            //   onClose={handleOrderMenuClose}
            //   open={Boolean(orderMenuAnchor)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={handleOrderMenuClose}>Export as CSV</MenuItem>
              <MenuItem onClick={handleOrderMenuClose}>Export as Excel</MenuItem>
              <MenuItem onClick={handleOrderMenuClose}>Print Table</MenuItem>
            </Menu>
          </Grid>
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <OrdersTable />
        </MainCard>
      </Grid>
      <Grid size={{ xs: 12, md: 5, lg: 4 }}>
        <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Grid>
            <Typography variant="h5">Analytics Report</Typography>
          </Grid>
          <Grid>
            <IconButton onClick={handleAnalyticsMenuClick}>
              {/* <EllipsisOutlined style={{ fontSize: '1.25rem' }} /> */}
            </IconButton>
            <Menu
              id="fade-menu"
              slotProps={{ list: { 'aria-labelledby': 'fade-button' } }}
            //   anchorEl={analyticsMenuAnchor}
            //   open={Boolean(analyticsMenuAnchor)}
            //   onClose={handleAnalyticsMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={handleAnalyticsMenuClose}>Weekly</MenuItem>
              <MenuItem onClick={handleAnalyticsMenuClose}>Monthly</MenuItem>
              <MenuItem onClick={handleAnalyticsMenuClose}>Yearly</MenuItem>
            </Menu>
          </Grid>
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
            <ListItemButton divider>
              <ListItemText primary="Company Finance Growth" />
              <Typography variant="h5">+45.14%</Typography>
            </ListItemButton>
            <ListItemButton divider>
              <ListItemText primary="Company Expenses Ratio" />
              <Typography variant="h5">0.58%</Typography>
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Business Risk Cases" />
              <Typography variant="h5">Low</Typography>
            </ListItemButton>
          </List>
          <ReportAreaChart />
        </MainCard>
      </Grid>
      {/* row 4 */}
      <Grid size={{ xs: 12, md: 7, lg: 8 }}>
        <SaleReportCard />
      </Grid>
      <Grid size={{ xs: 12, md: 5, lg: 4 }}>
        <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Grid>
            <Typography variant="h5">Transaction History</Typography>
          </Grid>
          <Grid />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <List
            component="nav"
            sx={{
              px: 0,
              py: 0,
              '& .MuiListItemButton-root': {
                py: 1.5,
                px: 2,
                // '& .MuiAvatar-root': avatarSX,
                // '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
              }
            }}
          >
            <ListItem
              component={ListItemButton}
              divider
              secondaryAction={
                <Stack sx={{ alignItems: 'flex-end' }}>
                  <Typography variant="subtitle1" noWrap>
                    + $1,430
                  </Typography>
                  <Typography variant="h6" sx={{ color: 'secondary.main' }} noWrap>
                    78%
                  </Typography>
                </Stack>
              }
            >
              <ListItemAvatar>
                <Avatar sx={{ color: 'success.main', bgcolor: 'success.lighter' }}>
                  {/* <GiftOutlined /> */}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">Order #002434</Typography>} secondary="Today, 2:00 AM" />
            </ListItem>
            <ListItem
              component={ListItemButton}
              divider
              secondaryAction={
                <Stack sx={{ alignItems: 'flex-end' }}>
                  <Typography variant="subtitle1" noWrap>
                    + $302
                  </Typography>
                  <Typography variant="h6" sx={{ color: 'secondary.main' }} noWrap>
                    8%
                  </Typography>
                </Stack>
              }
            >
              <ListItemAvatar>
                <Avatar sx={{ color: 'primary.main', bgcolor: 'primary.lighter' }}>
                  {/* <MessageOutlined /> */}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">Order #984947</Typography>} secondary="5 August, 1:45 PM" />
            </ListItem>
            <ListItem
              component={ListItemButton}
              secondaryAction={
                <Stack sx={{ alignItems: 'flex-end' }}>
                  <Typography variant="subtitle1" noWrap>
                    + $682
                  </Typography>
                  <Typography variant="h6" sx={{ color: 'secondary.main' }} noWrap>
                    16%
                  </Typography>
                </Stack>
              }
            >
              <ListItemAvatar>
                <Avatar sx={{ color: 'error.main', bgcolor: 'error.lighter' }}>
                  {/* <SettingOutlined /> */}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">Order #988784</Typography>} secondary="7 hours ago" />
            </ListItem>
          </List>
        </MainCard>
        <MainCard sx={{ mt: 2 }}>
          <Stack sx={{ gap: 3 }}>
            <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <Grid>
                <Stack>
                  <Typography variant="h5" noWrap>
                    Help & Support Chat
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'secondary.main' }} noWrap>
                    Typical replay within 5 min
                  </Typography>
                </Stack>
              </Grid>
              <Grid>
                <AvatarGroup sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
                  {/* <Avatar alt="Remy Sharp" src={avatar1} /> */}
                  {/* <Avatar alt="Travis Howard" src={avatar2} /> */}
                  {/* <Avatar alt="Cindy Baker" src={avatar3} /> */}
                  {/* <Avatar alt="Agnes Walker" src={avatar4} /> */}
                </AvatarGroup>
              </Grid>
            </Grid>
            <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }}>
              Need Help?
            </Button>
          </Stack>
        </MainCard>
      </Grid>
    </Grid>

					{/* <Card>
						<CardHeader>
						</CardHeader>
						<CardContent>
							<Stack sx={{ gap: 0.5 }}>
								<Typography variant="h6" sx={{ color: 'text.secondary' }}>
									TITEL
								</Typography>
								<Stack direction="row" sx={{ alignItems: 'center' }}>
									<Typography variant="h4" sx={{ color: 'inherit' }}>
										200
									</Typography>
									<Chip
										variant="combined"
										color="green"
										// icon=
										label="LABEL"
										sx={{ ml: 1.25, pl: 1 }}
										size="small"
									/>
      							</Stack>
							</Stack>
							<Box sx={{ pt: 2.25 }}>
								<Typography variant="caption" sx={{ color: 'text.secondary' }}>
									You made an extra{' '}
									<Typography variant="caption" sx={{ color: 'primary.main' }}>
										EXTRA
									</Typography>{' '}
									this year
								</Typography>
							</Box>
						</CardContent>
					</Card> */}

					{/* <Card>
						<CardHeader>
						</CardHeader>
						<CardContent>
							<Stack sx={{ gap: 0.5 }}>
								<Typography variant="h6" sx={{ color: 'text.secondary' }}>
									TITEL
								</Typography>
								<Stack direction="row" sx={{ alignItems: 'center' }}>
									<Typography variant="h4" sx={{ color: 'inherit' }}>
										200
									</Typography>
									<Chip
										variant="combined"
										color="green"
										// icon=
										label="LABEL"
										sx={{ ml: 1.25, pl: 1 }}
										size="small"
									/>
      							</Stack>
							</Stack>
							<Box sx={{ pt: 2.25 }}>
								<Typography variant="caption" sx={{ color: 'text.secondary' }}>
									You made an extra{' '}
									<Typography variant="caption" sx={{ color: 'primary.main' }}>
										EXTRA
									</Typography>{' '}
									this year
								</Typography>
							</Box>
						</CardContent>
					</Card> */}
					
					{/* <Snackbar 
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'center',
						}}
						open={this.state.snackbarOpen}
						autoHideDuration={3000}
						message={this.state.snackbarMessage}
						variant="solid"
						onClose={() => this.onCloseSnackbar()}
					>
						{this.state.snackbarMessage}
					</Snackbar> */}

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

// export default withNavigation(withParams(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dashboard))));
export default withNavigation(withParams(connect(mapStateToProps, mapDispatchToProps)(Dashboard)));
