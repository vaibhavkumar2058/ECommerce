import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import useFetchGMT from "../hooks/useFetchGMT";
import useFetchOrder from "../hooks/useFetchOrder";
import useFetchProduct from "../hooks/useFetchProduct";
import Resources from "../pages/Resources";
import Product from "../pages/Product";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart,
    Area, BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';


export default function Dashboard() {
    const data = [
        {
            name: '2023-01-01T00:00:00',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: '2023-01-01T00:00:00',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: '2023-02-25T00:00:00',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: '2023-03-06T00:00:00',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: '2023-03-09T00:00:00',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: '2023-03-10T00:00:00',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: '2023-02-25T00:00:00',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];
    const [newGMT, setNewGMT] = useState({
        resourcesId: 6,
        longitude: 0,
        latitude: 0,
        description: "logged coordinates",
        recordStatusId: 1,
    });

    const [productOrders, setProductOrders] = useState([]);
    const [productSales, setProductSales] = useState([]);
    const {
        addGMT,
    } = useFetchGMT();

    const {
        productOrderList,
    } = useFetchOrder();

    const {
        productSalesList,
    } = useFetchProduct();

    useEffect(() => {
        if (productOrders.length == 0) {
            getProductOrders();
        }
    }, [productOrders]);

    console.log("info", productOrders);

    useEffect(() => {
        if (productSales.length == 0) {
            getProductSales();
        }
    }, [productSales]);

    console.log("info", productSales);

    const getProductSales = async () => {
        const response = await productSalesList();
        if (response.payload.title == "Success") {
            const dataFormatter = (rawData) => {
                const curedData = {};
                return curedData;
            }

            var arr = [];
            for (var key in response.payload) {
                if (key !== 'title')
                    arr.push(response.payload[key]);
            }

            setProductSales(arr);
        }
        else {
        }
    };

    const getProductOrders = async () => {
        const response = await productOrderList();
        if (response.payload.title == "Success") {
            const dataFormatter = (rawData) => {
                const curedData = {};
                curedData.productName = rawData?.productName;
                curedData.orders = rawData?.orders;
                curedData.orderDate = new Date(rawData.orderDate).getDate();
                return curedData;
            }

            var arr = [];
            for (var key in response.payload) {
                if (key !== 'title')
                    arr.push(dataFormatter(response.payload[key]));
            }

            setProductOrders(arr);
        }
        else {
        }
    };

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
            <div className="row">
                <div className="col-md-6">
                    <PieChart width={500} height={320}>
                        <Pie
                            data={productSales}
                            color="#000000"
                            dataKey="ordersCount"
                            nameKey="productName"
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={120}
                            fill="#8884d8"
                            label={renderCustomizedLabel}
                        >
                            {productSales.map((entry, index) => (
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
                    <LineChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis dataKey="uv" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                    {/* <LineChart width={500} height={300} data={productOrders}>
                        <CartesianGrid />
                        <XAxis dataKey="orderDate" />
                        <YAxis yAxisId="left-axis" />
                        <YAxis yAxisId="right-axis" orientation="right" />
                        <Line yAxisId="left-axis" type="monotone" dataKey="orders"
                            stroke="green" />
                        <Line yAxisId="right-axis" type="monotone" dataKey="productName"
                            stroke="red" />
                    </LineChart> */}
                    {/* <LineChart width={500} height={300} data={productOrders}>
                        <Line type="monotone" dataKey="productName" stroke="#8884d8"
                            strokeWidth={4} activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="orders" stroke="orange"
                            strokeWidth={4} activeDot={{ r: 8 }} />
                        <XAxis dataKey="orderDate" 
                        scale="time"
                        type="number"/>
                        <YAxis  />
                        <Tooltip contentStyle={{ backgroundColor: 'maroon' }} />
                        <Legend />
                    </LineChart> */}
                </div>

            </div>
            <div className="row">
                <div className="col-md-6">
                    <Product></Product>
                </div>
                <div className="col-md-6">
                    <Resources></Resources>
                </div>
            </div>
        </>
    );
};
