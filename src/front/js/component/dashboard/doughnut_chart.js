import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { useSpring, animated } from '@react-spring/web'
import '../../../styles/shared.sass'

export const Doughnut = (props) => {

    const [innerWidth, setWith] = useState(window.innerWidth);

    const [title, setTitle] = useState(
        (props.title) ? props.title : "Generic title"
    )

    const [data, setData] = useState(
        (props.data) ? props.data :
            [
                {
                    name: 'Santander',
                    price: 3.80,
                    color: '#4fa2ff'
                },
                {
                    name: 'Dia',
                    price: 3.10,
                    color: '#4fa2ff'
                },
                {
                    name: 'Netflix',
                    price: 50.80,
                    color: '#4fa2ff'
                },
                {
                    name: 'Apple',
                    price: 185,
                    color: '#0d715d'
                },
                {
                    name: 'Iberdrola',
                    price: 11.95,
                    color: '#ffd155'
                },
                {
                    name: 'Inditex',
                    price: 35,
                    color: '#A200EA'
                },
                {
                    name: 'Aena',
                    price: 42,
                    color: '#e216EA'
                },
                {
                    name: 'BVA',
                    price: 25,
                    color: '#e216EA'
                },
                {
                    name: 'Unicaja',
                    price: 18,
                    color: '#e216EA'
                },
                {
                    name: 'Google',
                    price: 137,
                    color: '#e216EA'
                },
            ]);

    const [colors, setColors] = useState(
        (props.colors) ? props.colors : ["#ff0000", "#ffa500", "#ffff00", "#008000", "#4fa2ff", "#4b0082", "#ee82ee"]
    )
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
        console.dir(svgDiv.current)
        // console.log(svgDiv.current.height.baseVal.value)

        const width = svgDiv.current.width.baseVal.value;
        const height = svgDiv.current.height.baseVal.value;
        const margin = { top: height / 50, right: width / 50, bottom: height / 50, left: width / 50 };
        const outterRadius = 40;
        // console.log(outterRadius)

        const yScale = d3.scaleLinear([0, data.length - 1], [35, -35]);
        const colorScale = d3.scaleLinear().domain([d3.max(data.map(d => d.price)), d3.max(data.map(d => d.price)) / 2, d3.min(data.map(d => d.price))]).range(colors);
        // console.log(d3.extent(data.map(d => d.price_usd)))
        // console.log(colorScale(25))


        const radiusScale = d3.scaleLinear([0, d3.max(data.map(d => d.price))], [35, 15]);

        const arc = (d) => d3.arc()
            .innerRadius(d => radiusScale(d.value))
            .outerRadius(outterRadius);
        const pie = d3.pie().value((d) => d.price)

        const svg = d3.select(svgDiv.current)
            .attr('width', width + margin.right + margin.left)
            .attr('height', height + margin.top + margin.bottom)
        // .attr('fill', 'black');
        const g = svg.select('g')
            .attr("transform", `translate(${innerWidth > 900 ? 0: 50},${50})`);

        const data_ready = pie(data)
        // console.table(data_ready)

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
                    .outerRadius(outterRadius)
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
        //     .attr("dy", "0.3em")
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
        //     .attr('r', '2')
        //     .data(d3.sort(data, (a, b) => d3.ascending(a.price_usd, b.price_usd)))
        //     .attr('fill', data => `${colorScale(data.price_usd)}`)
        // g.select('#total-value').text(`${data.reduce((a, e) => a + e.price_usd, 0)}€`);
        // g.selectAll('#value-indexes text').attr("transform", `translate(${width *0.96 },${height *0.92})`)
        if (innerWidth > 900) {
            console.log('opearting on text and circles')
            g.selectAll('#value-indexes text').data(d3.sort(data, (a, b) => d3.ascending(a.price, b.price)).map(d => d.name)).join('text')
                .text(d => d)
                .attr('y', d => yScale(d3.sort(data, (a, b) => d3.ascending(a.price, b.price)).map(d => d.name).indexOf(d)) + 1)
                .append('tspan').text(d => `${data.filter(element => element.name == d)[0].price.toFixed(2)}€`).attr('dx', '0.5em')
                .attr('y', d => yScale(d3.sort(data, (a, b) => d3.ascending(a.price, b.price)).map(d => d.name).indexOf(d)) + 1)
                .attr('x', '40')
                .attr('text-anchor', 'start');
            // console.log(d3.sort(data, (a, b) => d3.ascending(a.price, b.price)).map(d => d.name.indexOf(d.name)))
            g.selectAll('#value-indexes circle')
                .data(d3.sort(data, (a, b) => d3.ascending(a.price, b.price)))
                .attr('fill', d => `${colorScale(d.price)}`)
                .attr('cx', 2)
                .attr('cy', d => yScale(d3.sort(data, (a, b) => d3.ascending(a.price, b.price)).map(d => d.name).indexOf(d.name)))
        }


    }, [innerWidth])
    return (<>
        {/* <div>
            <h4>This week revenue:</h4>
            {/* <p>{data.reduce((a, e) => a + e.price_usd, 0)}€</p> 
        </div> */}
        <animated.div
            style={{
                ...springs,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <svg ref={svgDiv} height="20vh" width="25vw" viewBox="0 0 100 100" preserveAspectRatio="xMaxYMax meet">
                <text x={innerWidth > 900 ? -40 : 0} fill="white" fontSize="0.4em" y="5" strokeWidth="0.1px" stroke="white">{title}</text>
                <g >
                    <path></path>
                    <path></path>
                    <path></path>
                    <path></path>
                    <path></path>
                    <path></path>
                    <path></path>
                    <path></path>
                    <path></path>
                    <path></path>
                    {/* <text id="total-value" stroke="white" dx="-1.8em" dy="0.3em" fill="white" style={{ fontSize: '2em' }}></text> */}
                    {innerWidth > 900 && <g id="value-indexes" transform="translate(60,0)">
                        <text className="graphic-text" fill="white" x="10" fontSize="0.3em"></text>
                        <text className="graphic-text" fill="white" x="10" fontSize="0.3em"></text>
                        <text className="graphic-text" fill="white" x="10" fontSize="0.3em"></text>
                        <text className="graphic-text" fill="white" x="10" fontSize="0.3em"></text>
                        <text className="graphic-text" fill="white" x="10" fontSize="0.3em"></text>
                        <text className="graphic-text" fill="white" x="10" fontSize="0.3em"></text>
                        <text className="graphic-text" fill="white" x="10" fontSize="0.3em"></text>
                        <text className="graphic-text" fill="white" x="10" fontSize="0.3em"></text>
                        <text className="graphic-text" fill="white" x="10" fontSize="0.3em"></text>
                        <text className="graphic-text" fill="white" x="10" fontSize="0.3em"></text>
                        <circle r="2" fill="rgb(238, 130, 238)"></circle>
                        <circle r="2" fill="rgb(223, 118, 228)"></circle>
                        <circle r="2" fill="rgb(212, 109, 221)"></circle>
                        <circle r="2" fill="rgb(199, 99, 212)"></circle>
                        <circle r="2" fill="rgb(181, 84, 200)"></circle>
                        <circle r="2" fill="rgb(168, 74, 191)"></circle>
                        <circle r="2" fill="rgb(77, 78, 190)"></circle>
                        <circle r="2" fill="rgb(79, 162, 255)"></circle>
                        <circle r="2" fill="rgb(79, 162, 255)"></circle>
                        <circle r="2" fill="rgb(79, 162, 255)"></circle>
                    </g>}
                </g>
            </svg>

        </animated.div>
    </>)
}

