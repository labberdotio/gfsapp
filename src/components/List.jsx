
// 
// Copyright (c) 2020, 2021, 2022, 2023, 2024, John Grundback
// All rights reserved.
// 

import React, {Component} from 'react';
import PropNamespaces from 'prop-types'
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

import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Badge from '@mui/joy/Badge';
import Chip from '@mui/joy/Chip';

import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { ListItemButtonProps } from '@mui/joy/ListItemButton';
import ListDivider from '@mui/joy/ListDivider';

import moment from 'moment';

class ListView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			
		}

		var _this = this;

	}

	state = {
		
	};

	// componentWillUpdate(nextProps, nextState) {
	// }

	// componentDidUpdate(prevProps, prevState) {
	// }

	// componentDidMount() {
	// }

	render() {

		var _this = this;

		const {
			namespace, 
			selected, 
			graph
		} = this.props;	

		var vertices = [];
		if( graph && graph["@value"]["vertices"] ) {
			vertices = graph["@value"]["vertices"];
		}

		var edges = [];
		if( graph && graph["@value"]["edges"] ) {
			edges = graph["@value"]["edges"];
		}

		return (
			<>
			<Sheet
				sx={{
					borderRight: '1px solid',
					borderColor: 'divider',
					width: '100%', 
					// height: { sm: 'calc(100dvh - var(--Header-height))', md: '100dvh' },
					height: 'calc(100dvh - 64px)',
					overflowY: 'auto',
				}}
			>
				<List
					sx={{
						py: 0,
						'--ListItem-paddingY': '0.75rem',
						'--ListItem-paddingX': '1rem',
					}}
				>
					{Object.keys(vertices).map((key, index) => ( 
						<>
						<ListItem>
						<ListItemButton
							// onClick={() => {
							// }}
							component={Link} 
							to={"/namespaces/" + namespace + "/" + vertices[key]["@value"]["_label"] + "/" + vertices[key]["@value"]["_id"]} 
							selected={selected} 
							color="neutral" 
							sx={{ flexDirection: 'column', alignItems: 'initial', gap: 1 }}
						>
							<Stack direction="row" spacing={1.5}>
							<Box sx={{ flex: 1 }}>
								{/* <Typography level="title-sm">{ "" + vertices[key]["@value"]["properties"]["_name"] }</Typography> */}
								{/* <Typography level="body-sm">{ "" + vertices[key]["@value"]["properties"]["_name"] }</Typography> */}
								<Chip color="primary"><Typography level="body-sm">{ "" + vertices[key]["@value"]["_label"] }</Typography></Chip>
							</Box>
							<Box sx={{ lineHeight: 1.5, textAlign: 'right' }}>
								<Typography
									level="body-xs"
									noWrap
									sx={{ display: { xs: 'none', md: 'block' } }}
								>
									{/* { "" + vertices[key]["@value"]["_id"] } */}
									{/* { "" + vertices[key]["@value"]["properties"]["_modified"] } */}
									<span title={
										moment(
											Date(
												Number(vertices[key]["@value"]["properties"]["_modified"])
											)
										).format() // .format('MMMM Do YYYY, h:mm:ss a')
									}>
										{/* {
											moment(
												Date(
													Number(vertices[key]["@value"]["properties"]["_modified"])
												)
											).calendar() // 'MMMM Do YYYY, h:mm:ss a')
										} ( */}
										{
											moment(
												Number(vertices[key]["@value"]["properties"]["_modified"])
											).fromNow()
										}
										{/* ) */}
									</span>
								</Typography>
							</Box>
							</Stack>
							<Typography
								level="body-sm"
								sx={{
									display: '-webkit-box',
									WebkitLineClamp: '2',
									WebkitBoxOrient: 'vertical',
									overflow: 'hidden',
									textOverflow: 'ellipsis',
								}}
							>
								{/* { "" + vertices[key]["@value"]["_label"] } */}
								{ "" + vertices[key]["@value"]["properties"]["_name"] }
							</Typography>
						</ListItemButton>
						</ListItem>
						<ListDivider sx={{ margin: 0 }} />
						</>
					))}
				</List>
			</Sheet>	
			</>
		);
	}

}

List.propNamespaces = {
	dispatch: PropNamespaces.func.isRequired
}

function mapDispatchToProps(dispatch) {
	return {
	}
}

function mapStateToProps(state, ownProps) {

	const {
		api, 
		// namespace, 
		// selected, 
		// graph
	} = state;

	var namespace = undefined;
	var selected = undefined;
	var graph = undefined;

	// if( ownProps && ownProps.params ) {
	if( ownProps ) {
		namespace = ownProps.namespace;
		selected = ownProps.selected;
		graph = ownProps.graph;
	}

	return {
		api, 
		namespace, 
		selected, 
		graph
	}

}

/*
 * https://github.com/remix-run/react-router/issues/8146
 */

function withNavigation(Component) {
	return props => <Component {...props} navigate={useNavigate()} />;
}

function withParams(Component) {
	return params => <Component {...params} params={useParams()} />;
}

// function withSearchParams(Component) {
// 	return searchParams => <Component {...searchParams} searchParams={useSearchParams()} />;
// }

// export default withNavigation(withParams(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ListView))));
export default withNavigation(withParams(connect(mapStateToProps, mapDispatchToProps)(ListView)));
