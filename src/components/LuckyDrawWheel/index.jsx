import React, { useState, useRef } from "react";
import { LuckyWheel } from '@lucky-canvas/react'

const LuckyDrawWheel = ({ onHandleResult, prizes }) => {
    
    const luckyTicket = localStorage.getItem('luckyTicket');

    const [blocks] = useState([
        { padding: '10px', background: '#869cfa' }
      ])

    const [buttons] = useState([
    { radius: '40%', background: '#617df2' },
    { radius: '35%', background: '#afc8ff' },
    {
        radius: '30%', background: '#869cfa',
        pointer: true,
        fonts: [{ text: `Click Here`, top: '-10px' }]
    }
    ])

    const myLucky = useRef();

    const handleStartWheel = () => {
        if(parseInt(luckyTicket) === 0) {
            return;
        }

        myLucky.current.play()
        setTimeout(() => {
        const index = Math.random() * 6 >> 0
        myLucky.current.stop(index)
        }, 2500)
    }

    
    return(
        <>
            <LuckyWheel
                ref={myLucky}
                className="lucky-wheel"
                width="500px"
                height="500px"
                blocks={blocks}
                prizes={prizes}
                buttons={buttons}
                onStart={() => {  handleStartWheel() }}
                onEnd={prize => { onHandleResult(prize) }}
            />
        </>
    )
}
 
export default LuckyDrawWheel;