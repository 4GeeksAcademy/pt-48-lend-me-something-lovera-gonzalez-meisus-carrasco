import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { useSpring, animated } from '@react-spring/web'


export const Doughnut = (props) => {

    const [data, setData] = useState(
        (props.data) ? props.data :
            [
                {
                    name: 'Santander',
                    price_usd: 3.80,
                    color: '#4fa2ff'
                },
                {
                    name: 'Apple',
                    price_usd: 185,
                    color: '#0d715d'
                },
                {
                    name: 'Iberdrola',
                    price_usd: 11.95,
                    color: '#ffd155'
                },
                {
                    name: 'Inditex',
                    price_usd: 35,
                    color: '#A200EA'
                },
                {
                    name: 'Aena',
                    price_usd: 42,
                    color: '#e216EA'
                },
                {
                    name: 'BVA',
                    price_usd: 25,
                    color: '#e216EA'
                },
                {
                    name: 'Unicaja',
                    price_usd: 18,
                    color: '#e216EA'
                },
                {
                    name: 'Google',
                    price_usd: 137,
                    color: '#e216EA'
                },
            ])
    const springs = useSpring({
        from: { opacity: 0, y: -5, scale: 0.9 },
        to: [{ opacity: 1, y: 0, scale: 1 }],
        config: {
            mass: 25,
            friction: 120,
            tension: 100,
        },
        delay: 0,
    })
    const svgDiv = useRef();

    useEffect(() => {

        const margin = { top: 20, right: 20, bottom: 50, left: 40 };
        const width = 450 - margin.right - margin.left;
        const height = 250 - margin.top - margin.bottom;
        const innerRadius = 120;
        const outterRadius = d3.min([width, height]) / 2;
        // console.log(outterRadius)

        const yScale = d3.scaleLinear([0, data.length], [height + margin.top, 0]);
        const colorScale = d3.scaleLinear().domain([d3.max(data.map(d => d.price_usd)), d3.max(data.map(d => d.price_usd)) / 2, d3.min(data.map(d => d.price_usd))]).range(["#ff0000", "#ffa500", "#ffff00", "#008000", "#4fa2ff", "#4b0082", "#ee82ee"]);
        // console.log(d3.extent(data.map(d => d.price_usd)))
        // console.log(colorScale(25))


        const radiusScale = d3.scaleLinear([0, d3.max(data.map(d => d.price_usd))], [100, 60])

        const arc = (d) => d3.arc()
            .innerRadius(d => radiusScale(d.value))
            .outerRadius(outterRadius + 30);
        const pie = d3.pie().value((d) => d.price_usd)

        const svg = d3.select(svgDiv.current)
            .attr('width', width + margin.right + margin.left)
            .attr('height', height + margin.top + margin.bottom)
            .attr('fill', 'black');
        const g = svg.select('g');
        const data_ready = pie(data)
        console.table(data_ready)

        g.selectAll('path')
            .data(data_ready)
            .join('path')
            .attr('fill', d => `${colorScale(d.value)}`)
            .transition()
            .duration(3000)
            .attrTween('d', function (d, i) {
                var interpolateStart = d3.interpolate(0, d.startAngle);
                var interpolateEnd = d3.interpolate(0, d.endAngle);
                var interpolateRadius = d3.interpolate(outterRadius, radiusScale(d.value))
                var arc = d3
                    .arc()
                    .innerRadius(radiusScale(d.value))
                    .outerRadius(outterRadius + 30)
                    .startAngle(d.startAngle)
                    .endAngle(d.startAngle)
                    .padAngle(0.01)
                    .padRadius(300);
                return function (t) {
                    arc.startAngle(interpolateStart(t));
                    arc.endAngle(interpolateEnd(t));
                    arc.innerRadius(interpolateRadius(t))
                    return arc();
                };
            })


        // div
        //     .append('text')
        //     // .attr('transform', `translate(${300 / 4},${250 / 4})` )
        //     .text(`${data.reduce((a, e) => a + e.price_usd, 0)}€`)
        //     .attr('stroke', 'white')
        //     .attr("dx", "-1.8em")
        //     .attr("dy", "0.2em")
        //     .attr('fill', 'white')
        //     .attr('style', 'font-size: 2em')

        // const names = div
        //     .append('g')
        //     .attr("transform", `translate(${300 / 2},-${250 / 2})`);
        // names
        //     .selectAll('text')
        //     .data(d3.sort(data, (a, b) => d3.ascending(a.price_usd, b.price_usd)).map(d => d.name))
        //     .enter()
        //     .append('text')
        //     .text(d => d)
        //     .attr('fill', 'white')
        //     .attr('y', d => yScale(d3.sort(data, (a, b) => d3.ascending(a.price_usd, b.price_usd)).map(d => d.name).indexOf(d)))
        //     .attr('x', '2em')
        //     .append('tspan')
        //     .text(d => `${data.filter(element => element.name == d)[0].price_usd}€`)
        //     .attr('dx', '0.5em')
        // names
        //     .selectAll('circle')
        //     .data(d3.sort(data, (a, b) => d3.ascending(a.price_usd, b.price_usd)).map(d => d.name))
        //     .enter()
        //     .append('circle')
        //     .attr('cx', '10px')
        //     .attr('cy', d => yScale(d3.sort(data, (a, b) => d3.ascending(a.price_usd, b.price_usd)).map(d => d.name).indexOf(d)) - 4)
        //     .attr('r', '8px')
        //     .data(d3.sort(data, (a, b) => d3.ascending(a.price_usd, b.price_usd)))
        //     .attr('fill', data => `${colorScale(data.price_usd)}`)
        g.select('#total-value').text(`${data.reduce((a, e) => a + e.price_usd, 0)}€`);
        g.selectAll('#value-indexes text').data(d3.sort(data, (a, b) => d3.ascending(a.price_usd, b.price_usd)).map(d => d.name)).join('text').text(d => d)
            .append('tspan').text(d => `${data.filter(element => element.name == d)[0].price_usd}€`).attr('dx', '0.5em')



    }, [data])
    return (<>
        <div>
            <h4>This week revenue:</h4>
            {/* <p>{data.reduce((a, e) => a + e.price_usd, 0)}€</p> */}
        </div>
        <animated.div
            style={{
                ...springs,
            }}
        >
            <svg ref={svgDiv}>
                <g transform="translate(150,125)">
                    <path></path>
                    <path></path>
                    <path></path>
                    <path></path>
                    <path></path>
                    <path></path>
                    <path></path>
                    <path></path>
                    <text id="total-value" stroke="white" dx="-1.8em" dy="0.2em" fill="white" style={{ fontSize: '2em' }}></text>
                    <g id="value-indexes" transform="translate(150,-125)">
                        <text fill="white" y="200" x="2em"></text>
                        <text fill="white" y="175" x="2em"></text>
                        <text fill="white" y="150" x="2em"></text>
                        <text fill="white" y="125" x="2em"></text>
                        <text fill="white" y="100" x="2em"></text>
                        <text fill="white" y="75" x="2em"></text>
                        <text fill="white" y="50" x="2em"></text>
                        <text fill="white" y="25" x="2em"></text>
                        <circle cx="10px" cy="196" r="8px" fill="rgb(238, 130, 238)"></circle>
                        <circle cx="10px" cy="171" r="8px" fill="rgb(223, 118, 228)"></circle>
                        <circle cx="10px" cy="146" r="8px" fill="rgb(212, 109, 221)"></circle>
                        <circle cx="10px" cy="121" r="8px" fill="rgb(199, 99, 212)"></circle>
                        <circle cx="10px" cy="96" r="8px" fill="rgb(181, 84, 200)"></circle>
                        <circle cx="10px" cy="71" r="8px" fill="rgb(168, 74, 191)"></circle>
                        <circle cx="10px" cy="46" r="8px" fill="rgb(77, 78, 190)"></circle>
                        <circle cx="10px" cy="21" r="8px" fill="rgb(79, 162, 255)"></circle>
                    </g>
                </g>
            </svg>

        </animated.div>
    </>)
}

