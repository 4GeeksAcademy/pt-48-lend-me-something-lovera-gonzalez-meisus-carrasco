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
        price: 80,
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
    {
        label: 'Aena',
        price: 42,
        color: '#e216EA'
    },
    {
        label: 'BVA',
        price: 25,
        color: '#e216EA'
    },
    {
        label: 'Unicaja',
        price: 18,
        color: '#e216EA'
    },
    {
        label: 'Google',
        price: 125,
        color: '#e216EA'
    },
]

export const Doughnut = () => {
    const svgDiv = useRef();

    useEffect(() => {

        const margin = { top: 20, right: 20, bottom: 50, left: 40 };
        const width = 450 - margin.right - margin.left;
        const height = 250 - margin.top - margin.bottom;
        const innerRadius = 120;
        const outterRadius = d3.min([width, height]) / 2;
        // console.log(outterRadius)

        const yScale = d3.scaleLinear([0, data.length], [height + margin.top, 0]);
        const colorScale = d3.scaleLinear().domain([d3.max(data.map(d => d.price)), d3.max(data.map(d => d.price)) / 2, d3.min(data.map(d => d.price))]).range(["#ff0000", "#ffa500", "#ffff00", "#008000", "#4fa2ff", "#4b0082", "#ee82ee"]);
        console.log(d3.extent(data.map(d => d.price)))
        console.log(colorScale(25))

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
                .padAngle(0.02))
            .attr('stroke', 'black')
            .attr('stroke-width', '1px')
            .style('opacity', 0.7)

        const fill = d3.select('svg')
            .selectAll('path')
            .data(data.map(d => d.price))
            .attr('fill', data => `${colorScale(data)}`)

        div
            .append('text')
            // .attr('transform', `translate(${300 / 4},${250 / 4})` )
            .text(`${data.reduce((a, e) => a + e.price, 0)}€`)
            .attr('stroke', 'white')
            .attr("dx", "-1.8em")
            .attr("dy", "0.2em")
            .attr('fill', 'white')
            .attr('style', 'font-size: 2em')

        const labels = div
            .append('g')
            .attr("transform", `translate(${300 / 2},-${250 / 2})`);
        labels
            .selectAll('text')
            .data(d3.sort(data, (a, b) => d3.ascending(a.price, b.price)).map(d => d.label))
            .enter()
            .append('text')
            .text(d => d)
            .attr('fill', 'white')
            .attr('y', d => yScale(d3.sort(data, (a, b) => d3.ascending(a.price, b.price)).map(d => d.label).indexOf(d)))
            .attr('x', '2em')
            .append('tspan')
            .text(d => `${data.filter(element => element.label == d)[0].price}€`)
            .attr('dx', '0.5em')
        labels
            .selectAll('circle')
            .data(d3.sort(data, (a, b) => d3.ascending(a.price, b.price)).map(d => d.label))
            .enter()
            .append('circle')
            .attr('cx', '10px')
            .attr('cy', d => yScale(d3.sort(data, (a, b) => d3.ascending(a.price, b.price)).map(d => d.label).indexOf(d)) - 4)
            .attr('r', '8px')

        labels
            .selectAll('circle')
            .data(d3.sort(data, (a, b) => d3.ascending(a.price, b.price)))
            .attr('fill', data => `${colorScale(data.price)}`)

    }, [data])
    return (<>
        <div>
            <h4>This week revenue:</h4>
            {/* <p>{data.reduce((a, e) => a + e.price, 0)}€</p> */}
        </div>
        <div ref={svgDiv}>
        </div>
    </>)
}

