
// 
// Copyright (c) 2020, 2021, 2022, John Grundback
// All rights reserved.
// 

import React, {Component} from 'react';
import PropTypes from 'prop-types'

import _ from 'lodash';

import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import {	
	ResponsiveContainer
} from 'recharts';

import {	
	AreaChart, 
	Area
} from 'recharts';

import {
	BarChart, 
	Bar
} from 'recharts';

import {	
	PieChart, 
	Pie,
	Cell
} from 'recharts';



const TinyAreaChart = (props) => {
	const data = _.times(20, () => ({ pv: Math.random() * 100 }));
	return (
		<ResponsiveContainer width='100%' minWidth='150px' height={ 40 }>
			<AreaChart data={data}>
				<Area dataKey='pv' stroke={ props.stroke } fill={ props.fill } />
			</AreaChart>
		</ResponsiveContainer>
	)
};



const TinyBarChart = (props) => {
	const data = _.times(40, () => ({ pv: 20+Math.random() * 100 }));
	return (
		<ResponsiveContainer width='100%' height={ 80 }>
			<BarChart data={data} margin={{ top: 0, bottom: 0, right: 0, left: 0 }}>
				<Bar dataKey='pv' fill={ props.fill } />
			</BarChart>
		</ResponsiveContainer>
	)
};



const TinyDonutChart = (props) => {
	const data = [
		{name: 'Group A', value: 40+Math.random()*100},
		{name: 'Group B', value: Math.random()*100}
	];
	return (
		<PieChart width={ 80 } height={ 80 }>
			<Pie
				data={data}
				dataKey="value"
				stroke={ props.stroke }
				innerRadius={ 28 }
				outerRadius={ 35 } 
				fill={ props.fill }
			>
			<Cell fill={ props.cell_fill } />
			</Pie>
		</PieChart>
	)
};



function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

// function createData(name, memory, cpu, netio, diskio) {
function createData(name) {
	var memory = getRandomInt(100); // (int)(Math.random() * 100);
	var cpu = getRandomInt(100); // Math.random() * 100;
	var netio = getRandomInt(100); // Math.random() * 100;
	var diskio = getRandomInt(100); // Math.random() * 100;
	return { name, memory, cpu, netio, diskio };
}
	
const rows = [
	createData('MySQL'), 
	createData('Kafka'), 
	createData('Elastic Search'), 
	createData('Kibana'), 
];

const styles = theme => ({

});

class Dashboard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			
		}
	}

	state = {
		
	};

	// componentWillUpdate(nextProps, nextState) {
	// }

	componentDidUpdate(prevProps, prevState) {
	}

	componentDidMount() {
	}

	/*
	 * 
	 */

	render() {
		return (
			<>
			<Container maxWidth="lg">
			<h1 className="mt-5 mb-4">Systems Dashboard</h1>
			<Grid container spacing={3}>

				<Grid 
					item 
					xs={3}
					>
					<Card className="">
						<CardContent>
							<h6>Memory</h6>
							<TinyDonutChart 
								stroke="white" 
								fill="rgb(233, 236, 239)" 
								cell_fill="rgb(30, 183, 255)" 
							/>
							<TinyBarChart 
								fill="rgb(233, 236, 239)" 
							/>
						</CardContent>
					</Card>
				</Grid>

				<Grid 
					item 
					xs={3}
					>
					<Card className="">
						<CardContent>
							<h6>CPU</h6>
							<TinyDonutChart 
								stroke="white" 
								fill="rgb(233, 236, 239)" 
								cell_fill="rgb(202, 142, 255)" 
							/>
							<TinyBarChart 
								fill="rgb(233, 236, 239)" 
							/>
						</CardContent>
					</Card>
				</Grid>

				<Grid 
					item 
					xs={3}
					>
					<Card className="">
						<CardContent>
							<h6>Network I/O</h6>
							<TinyDonutChart 
								stroke="white" 
								fill="rgb(233, 236, 239)" 
								cell_fill="rgb(27, 185, 52)" 
							/>
							<TinyBarChart 
								fill="rgb(233, 236, 239)" 
							/>
						</CardContent>
					</Card>
				</Grid>

				<Grid 
					item 
					xs={3}
					>
					<Card className="">
						<CardContent>
							<h6>Disk I/O</h6>
							<TinyDonutChart 
								stroke="white" 
								fill="rgb(233, 236, 239)" 
								cell_fill="rgb(247, 191, 71)" 
							/>
							<TinyBarChart 
								fill="rgb(233, 236, 239)" 
							/>
						</CardContent>
						<CardActions>
							<Button size="small">
								Reset
							</Button>
						</CardActions>
					</Card>
				</Grid>

				<Grid 
					item 
					xs={12}
					>
					<h6 className="mt-5">Active services</h6>
					<p className="pb-3">	
					</p>
					<TableContainer component={Paper}>
						<Table className="" aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>Name</TableCell>
									<TableCell align="right">Memory</TableCell>
									<TableCell align="right">CPU</TableCell>
									<TableCell align="right">Traffic</TableCell>
									<TableCell align="right">Disk I/O</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.map((row) => (
								<TableRow key={row.name}>
									<TableCell component="th" scope="row">
										{row.name}
									</TableCell>
									<TableCell align="right">{row.memory} Mb 
										<TinyAreaChart 
								stroke="rgb(30, 183, 255)" 
								fill="rgba(30, 183, 255, 0.1)" 
										/>
									</TableCell>
									<TableCell align="right">{row.cpu} % 
										<TinyAreaChart 
								stroke="rgb(202, 142, 255)" 
								fill="rgba(202, 142, 255, 0.1)" 
										/>
									</TableCell>
									<TableCell align="right">{row.netio} Kb/s 
										<TinyAreaChart 
								stroke="rgb(27, 185, 52)" 
								fill="rgba(27, 185, 52, 0.1)" 
										/>
									</TableCell>
									<TableCell align="right">{row.diskio} Kb/s 
										<TinyAreaChart 
								stroke="rgb(247, 191, 71)" 
								fill="rgb(247, 191, 71, 0.1)" 
										/>
									</TableCell>
								</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>

			</Grid>
			</Container>
			</>
		);
	}

}

export default withStyles(styles)(Dashboard);
