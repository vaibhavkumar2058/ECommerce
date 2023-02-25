import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import useFetchGMT from "../hooks/useFetchGMT";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart,
    Area, BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';

export default function Dashboard() {

    const [newGMT, setNewGMT] = useState({
        resourcesId: 6,
        longitude: 0,
        latitude: 0,
        description: "logged coordinates",
        recordStatusId: 1,
    });

    const pdata = [
        {
            name: 'Python',
            student: 13,
            fees: 10
        },
        {
            name: 'Javascript',
            student: 15,
            fees: 12
        },
        {
            name: 'PHP',
            student: 5,
            fees: 10
        },
        {
            name: 'Java',
            student: 10,
            fees: 5
        },
        {
            name: 'C#',
            student: 9,
            fees: 4
        }
    ];

    const pieData = [
        {
            name: "Detergent Soaps",
            value: 54
        },
        {
            name: "Detergent Liquids",
            value: 47
        },
        {
            name: "Dishwash Liquids",
            value: 16
        },
        {
            name: "Dishwash Soaps",
            value: 16
        },
        {
            name: "Adipranav Agarbathi",
            value: 10
        }
    ];

    const {
        addGMT,
    } = useFetchGMT();

    const [messageStatus, setMessageStatus] = useState({
        mode: "",
        title: "",
        status: false,
        message: "",
    });

    // setInterval(() => {
    //     navigator.geolocation.getCurrentPosition((position) => {
    //         newGMT.latitude = position.coords.latitude;
    //         newGMT.longitude = position.coords.longitude;
    //         saveHandler();
    //     });
    // }, 100000);

    const saveHandler = async () => {
        debugger;
        const response = await addGMT(newGMT);
        if (response.payload.title == "Success") {
            setMessageStatus({
                mode: 'success',
                message: 'GMT Record Saved Succefully.'
            })
            console.log(response.payload);
        }
        else {
            setMessageStatus({
                mode: 'danger',
                message: 'GMT Save Failed.'
            })
        }
    }

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };


    const COLORS = ["#8884d8", "#82ca9d", "#FFBB28", "#FF8042", "#AF19FF"];
    const CustomTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
                <div
                    className="custom-tooltip"
                    style={{
                        backgroundColor: "#ffff",
                        padding: "5px",
                        border: "1px solid #cccc"
                    }}
                >
                    <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
                </div>
            );
        }
    }

    return (
        <>
            Dashboard
            <div className="row">
                <div className="col-md-6">
                    <PieChart width={500} height={300}>
                        <Pie
                            data={pieData}
                            color="#000000"
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={120}
                            fill="#8884d8"
                            label={renderCustomizedLabel}
                        >
                            {pieData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>
                <div className="col-md-6">
                    <LineChart width={500} height={300} data={pdata}>
                        <Line type="monotone" dataKey="student" stroke="#8884d8"
                            strokeWidth={4} activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="fees" stroke="orange"
                            strokeWidth={4} activeDot={{ r: 8 }} />
                        <XAxis dataKey="name" interval={'preserveStartEnd'} tickFormatter={(value) => value} />
                        <YAxis />
                        <Tooltip contentStyle={{ backgroundColor: 'yellow' }} />
                        <Legend />
                    </LineChart>
                </div>

            </div>
        </>
    );
};
