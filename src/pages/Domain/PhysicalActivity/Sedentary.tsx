import React from 'react'

const Sedentary = () => {
    return (
        <div style={{
            maxHeight: "75vh",
            overflowY: "auto",
            paddingBottom: "1rem",
        }}
        >
            <div>
                <ul>
                    <li>
                        The following question is about sitting or reclining at
                    </li>
                    <ul>
                        <li>work,</li>
                        <li>home,</li>
                        <li>getting to and from places, or</li>
                        <li>with friends including time spent sitting at a desk, sitting with friends, traveling in car, bus, train, reading, playing cards or watching television.</li>
                    </ul>
                    <li>
                        Note
                    </li>
                    <ul>
                        <li>but do not include time spent sleeping.</li>
                    </ul>
                </ul>
            </div>
        </div>
    )
}

export default Sedentary