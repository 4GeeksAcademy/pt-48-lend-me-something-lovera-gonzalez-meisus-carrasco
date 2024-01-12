import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { useSpring, animated } from '@react-spring/web'

const data = [
    {
        label: 'Santander',
        price: 3.80,
        color: '#4fa2ff'
    },
    {
        label: 'Apple',
        price: 185,
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
        price: 137,
        color: '#e216EA'
    },
]

export const Doughnut = () => {

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
        const colorScale = d3.scaleLinear().domain([d3.max(data.map(d => d.price)), d3.max(data.map(d => d.price)) / 2, d3.min(data.map(d => d.price))]).range(["#ff0000", "#ffa500", "#ffff00", "#008000", "#4fa2ff", "#4b0082", "#ee82ee"]);
        console.log(d3.extent(data.map(d => d.price)))
        console.log(colorScale(25))


        const radiusScale = d3.scaleLinear([0, d3.max(data.map(d => d.price))], [100, 60])

        const arc = (d) => d3.arc()
            .innerRadius(d => radiusScale(d.value))
            .outerRadius(outterRadius + 30);

        const div = d3.select(svgDiv.current)
            .append('svg')
            .attr('width', width + margin.right + margin.left)
            .attr('height', height + margin.top + margin.bottom)
            .attr('fill', 'black')
            .append('g')
            .attr("transform", `translate(${300 / 2},${250 / 2})`);

        const pie = d3.pie().value((d) => d.price)

        const data_ready = pie(data)
        console.table(data_ready)

        div
            .selectAll()
            .data(data_ready)

            .join('path')
                .attr('fill', d => `${colorScale(d.value)}`)
            .transition()
            .duration(3000)
            .attrTween('d', function (d, i) {
                var interpolateStart = d3.interpolate(0, d.startAngle);
                var interpolateEnd = d3.interpolate(0, d.endAngle);
                var interpolateRadius = d3.interpolate(outterRadius, radiusScale(d.value) )
                var arc = d3
                    .arc()
                    .innerRadius(radiusScale(d.value))
                    .outerRadius(outterRadius+30)
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
            .data(d3.sort(data, (a, b) => d3.ascending(a.price, b.price)))
            .attr('fill', data => `${colorScale(data.price)}`)


    }, [data])
    return (<>
        <div>
            <h4>This week revenue:</h4>
            {/* <p>{data.reduce((a, e) => a + e.price, 0)}€</p> */}
        </div>
        <animated.div
            style={{
                ...springs,
            }}
        >
            <div ref={svgDiv}>
            </div >
        </animated.div>
    </>)
}

