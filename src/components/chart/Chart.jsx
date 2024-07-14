import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from 'react';
import axios from 'axios';

const Chart = ({ aspect, title }) => {
  const [data, setData] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchMonthlyIncome = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/transactions/monthly-income?year=${year}`);
        const transformedData = transformData(response.data);
        setData(transformedData);
      } catch (error) {
        console.error('Error fetching monthly income:', error);
      }
    };

    fetchMonthlyIncome();
  }, [year]);

  const transformData = (data) => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return data.map(item => ({
      name: months[item.month - 1], // Convert month number to month name
      Total: item.totalIncome
    }));
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  return (
    <div className="chart">
      <div className="title">
        {title}
        <select value={year} onChange={handleYearChange}>
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i} value={new Date().getFullYear() - i}>
              {new Date().getFullYear() - i}
            </option>
          ))}
        </select>
      </div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;