import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const data = [
    {
        label: 'Santander',
        price: 3.80,
        color: '#4fa2ff'
    },
    {
        label: 'Apple',
        price: 55,
        color: '#0d715d'
    },
    {
        label: 'Iberdrola',
        price: 11.95,
        color: '#ffd155'
    },
    {
        label: 'Inditex',
        price: 35,
        color: '#A200EA'
    },
]

export const Doughnut = () => {
    const svgDiv = useRef();

    useEffect(() => {

        const margin = { top: 20, right: 20, bottom: 50, left: 40 };
        const width = 300 - margin.right - margin.left;
        const height = 250 - margin.top - margin.bottom;
        const innerRadius = width / 2;
        const outterRadius = d3.min([width, height]) / 2;
        // console.log(outterRadius)

        const div = d3.select(svgDiv.current)
            .append('svg')
            .attr('width', width + margin.right + margin.left)
            .attr('height', height + margin.top + margin.bottom)
            .attr('fill', 'black')
            .append('g')
            .attr("transform", `translate(${300 / 2},${250 / 2})`);
        // .append('rect')
        // .attr('width', width)
        // .attr('height', height)
        // .attr('fill', 'green');

        const pie = d3.pie().value((d) => d.price)

        const data_ready = pie(data)
        // console.table(data_ready)

        div
            .selectAll('path')
            .data(data_ready)
            .enter()
            .append('path')
            .attr('d', d3.arc()
                .innerRadius(innerRadius)
                .outerRadius(outterRadius)
                .padAngle(0.01))
            .attr('stroke', 'black')
            .attr('stroke-width', '1px')
            .style('opacity', 0.7)

        const fill = d3.select('svg')
            .selectAll('path')
            .data(data)
            .attr('fill', data => `${data.color}`)

    }, [data])
    return (<>
        <div ref={svgDiv}>
        </div>
    </>)
}

