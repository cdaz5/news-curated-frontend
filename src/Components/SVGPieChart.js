import React from 'react';
import PieChart from 'react-minimal-pie-chart';





const SVGPieChart = ({data}) => {

  return (
    <div>
      <PieChart
        data={data}
        lineWidth={25}
        rounded={true}
        animate={true}
        animationDuration={1000}
        animationEasing='ease-out'
        radius={35}
      />
      <div className='pieLabelContainer'>
      {data.map((label) => (
        <div className='pieLabels'>| {label.key}: {label.value} | </div>
      ))}
    </div>
    </div>
  )
}

  export default SVGPieChart
