import React, { Component } from 'react';
import { PieChart, Pie, Sector, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
// const { PieChart, Pie, Sector, Cell } = Recharts;

const COLORS = ['#fff835', '#f43838', '#84ff00'];

const RADIAN = Math.PI / 180;

export default class SimplePieChart extends Component {

  onPieEnter = (e) => {
    // debugger
  }


	render () {
  	return (
    <ResponsiveContainer width={700} height="80%">

    	<PieChart width={800} height={400} onMouseEnter={(e) => {this.onPieEnter(e)}}>
        <Pie
          data={this.props.data}
          cx={220}
          cy={200}
          innerRadius={120}
          outerRadius={160}
          fill="#8884d8"
          paddingAngle={5}
        >
        	{
          	this.props.data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          }
        </Pie>
      </PieChart>
    </ResponsiveContainer>
    );
  }
}
