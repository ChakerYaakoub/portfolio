import React from 'react'
import "./NotFound404.css"

import { Link  } from "react-router-dom";

const NotFound404 = () => {
    return (
        <div>

            <div id="notfoundMy">
                <div className="notfoundMy">
                    <div className="notfound-404My">
                        <h1>OOPS!</h1>
                        <h2>404 - THE PAGE CAN'T BE FOUND</h2>
                    </div>

                    <Link to={"/"}>  GO TO HOMEPAGE</Link>
                   
                </div>
            </div>
        </div>
    )
}

export default NotFound404