import React from "react";
import "./Graphs.css";

import {
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";

function DisplayGraph(props) {
  return (
    <div className="graphs-page">
      <div style={{ textAlign: "center" }}>
        {props.children}

        <div>
          <BarChart
            width={600}
            height={300}
            data={props.data}
            margin={{
              top: 5,
              right: 10,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={props.datakey0} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={props.datakey1} fill="#8884d8" />
            <Bar dataKey={props.datakey2} fill="#82ca9d" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}

export default DisplayGraph;
