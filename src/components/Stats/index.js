import React from "react";
import CountUp from "react-countup";
import "./index.css"



const Stats = () => {
    return (
        <div className="stats">
            <div>
                <h3><CountUp end={300} duration={2}/>+</h3>
                <h4>Generated Images</h4>
            </div>

            <div>
                <h3><CountUp end={100} duration={2}/>+</h3>
                <h4>Active Users</h4>
            </div>

            <div>
                <h3><CountUp end={500} duration={2}/>+</h3>
                <h4>Daily Free Downloads</h4>
            </div>

        </div>
    )
}

export default Stats;