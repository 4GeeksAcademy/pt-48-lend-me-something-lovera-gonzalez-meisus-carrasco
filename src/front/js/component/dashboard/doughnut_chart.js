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
        (props.data) ? props.data:
        [
            {
                "adj_price": 159.0,
                "adj_high": 161.73,
                "adj_low": 158.49,
                "adj_open": 160.7,
                "adj_volume": 42286026.0,
                "price": 159.0,
                "date": "2024-01-30T00:00:00+0000",
                "dividend": 0.0,
                "exchange": "XNAS",
                "high": 161.73,
                "low": 158.49,
                "open": 160.7,
                "split_factor": 1.0,
                "name": "AMZN",
                "volume": 45160729.0
            },
            {
                "adj_price": 89.94,
                "adj_high": null,
                "adj_low": null,
                "adj_open": null,
                "adj_volume": null,
                "price": 89.94,
                "date": "2024-01-30T00:00:00+0000",
                "dividend": 0.0,
                "exchange": "XFRA",
                "high": 90.0,
                "low": 89.0,
                "open": 89.89,
                "split_factor": 1.0,
                "name": "WDP.XFRA",
                "volume": 880.0
            },
            {
                "adj_price": 188.04,
                "adj_high": 191.8,
                "adj_low": 187.47,
                "adj_open": 190.94,
                "adj_volume": 55270086.0,
                "price": 188.04,
                "date": "2024-01-30T00:00:00+0000",
                "dividend": 0.0,
                "exchange": "XNAS",
                "high": 191.8,
                "low": 187.47,
                "open": 190.94,
                "split_factor": 1.0,
                "name": "AAPL",
                "volume": 55842593.0
            },
            {
                "adj_price": 169.49,
                "adj_high": null,
                "adj_low": null,
                "adj_open": null,
                "adj_volume": null,
                "price": 169.49,
                "date": "2022-06-27T00:00:00+0000",
                "dividend": 0.0,
                "exchange": "XNAS",
                "high": 171.75,
                "low": 168.01,
                "open": 171.32,
                "split_factor": 1.0,
                "name": "FB",
                "volume": 28991704.0
            },
            {
                "adj_price": 165.59,
                "adj_high": 165.805,
                "adj_low": 163.62,
                "adj_open": 164.7,
                "adj_volume": 4848312.0,
                "price": 165.59,
                "date": "2024-01-30T00:00:00+0000",
                "dividend": 0.0,
                "exchange": "XNYS",
                "high": 165.805,
                "low": 163.62,
                "open": 164.7,
                "split_factor": 1.0,
                "name": "WMT",
                "volume": 3743315.0
            },
            {
                "adj_price": 191.59,
                "adj_high": 196.3593,
                "adj_low": 190.61,
                "adj_open": 195.33,
                "adj_volume": 105537551.0,
                "price": 191.59,
                "date": "2024-01-30T00:00:00+0000",
                "dividend": 0.0,
                "exchange": "XNAS",
                "high": 196.3593,
                "low": 190.61,
                "open": 195.33,
                "split_factor": 1.0,
                "name": "TSLA",
                "volume": 109610268.0
            },
            {
                "adj_price": 72.32,
                "adj_high": 73.065,
                "adj_low": 72.085,
                "adj_open": 72.46,
                "adj_volume": 16854744.0,
                "price": 72.32,
                "date": "2024-01-30T00:00:00+0000",
                "dividend": 0.0,
                "exchange": "XNYS",
                "high": 73.065,
                "low": 72.085,
                "open": 72.46,
                "split_factor": 1.0,
                "name": "BABA",
                "volume": 17086117.0
            },
            {
                "adj_price": 63.71,
                "adj_high": 64.5,
                "adj_low": 62.07,
                "adj_open": 62.9,
                "adj_volume": 18573671.0,
                "price": 63.71,
                "date": "2024-01-30T00:00:00+0000",
                "dividend": 0.0,
                "exchange": "XNAS",
                "high": 64.47,
                "low": 62.08,
                "open": 63.0,
                "split_factor": 1.0,
                "name": "PYPL",
                "volume": 17430000.0
            },
            {
                "adj_price": 59.9,
                "adj_high": 60.02,
                "adj_low": 59.445,
                "adj_open": 59.85,
                "adj_volume": 21861363.0,
                "price": 59.9,
                "date": "2024-01-30T00:00:00+0000",
                "dividend": 0.0,
                "exchange": "XNYS",
                "high": 60.02,
                "low": 59.445,
                "open": 59.85,
                "split_factor": 1.0,
                "name": "KO",
                "volume": 22061536.0
            },
            {
                "adj_price": 104.18,
                "adj_high": 104.31,
                "adj_low": 103.13,
                "adj_open": 103.34,
                "adj_volume": 7311147.0,
                "price": 104.18,
                "date": "2024-01-30T00:00:00+0000",
                "dividend": 0.0,
                "exchange": "XNYS",
                "high": 104.31,
                "low": 103.13,
                "open": 103.34,
                "split_factor": 1.0,
                "name": "NKE",
                "volume": 7542204.0
            }
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
        // console.dir(svgDiv.current)
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
        const g = svg.select('g')
            .attr("transform", `translate(${innerWidth > 900 ? -25: 25},${50})`);

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
            // console.log('opearting on text and circles')
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
            <svg ref={svgDiv} height="45vh" width="75vh" viewBox="0 0 100 100" preserveAspectRatio="xMaxYMax meet">
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
                        {data.map((elem, index) => <circle r="2" key={index}></circle>)}
                    </g>}
                </g>
            </svg>

        </animated.div>
    </>)
}

