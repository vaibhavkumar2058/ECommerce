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
                    <PieChart width={500} height={300}>
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
                    <LineChart width={500} height={300} data={productOrders}>
                        <Line type="monotone" dataKey="productName" stroke="#8884d8"
                            strokeWidth={4} activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="orders" stroke="orange"
                            strokeWidth={4} activeDot={{ r: 8 }} />
                        <XAxis dataKey="orderDate" interval={'preserveStartEnd'} tickFormatter={(value) => value} />
                        <YAxis  />
                        <Tooltip contentStyle={{ backgroundColor: 'maroon' }} />
                        <Legend />
                    </LineChart>
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
