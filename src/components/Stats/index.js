import React from "react";
import CountUp from "react-countup";
import "./index.css"


const Stats = ({images}) => {

    return (
        <div className="stats">
            <div>
                <h3><CountUp end={images.length} duration={2}/></h3>
                <h4>Over generated Images</h4>
            </div>

            <div>
                <h3><CountUp end={10} duration={2}/>+</h3>
                <h4>Daily Generation</h4>
            </div>

            <div>
                <h3><CountUp end={200} duration={2}/>+</h3>
                <h4>Daily Free Downloads</h4>
            </div>

        </div>
    )
}

export default Stats;