import React from 'react'

const Work = () => {
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
                        I am going to ask you about the time you spend doing different types of physical activity in a typical week.
                    </li>
                    <li>
                        Please answer these questions even if you do not consider yourself to be a physically active person.
                    </li>
                    <li>Think first about the time you spend doing work.</li>
                    <li>Think of work as the things that you have to do such as</li>
                    <ul>
                        <li>paid or unpaid work, </li>
                        <li>study/training,</li>
                        <li>household chores, </li>
                        <li>harvesting food/crops, fishing or hunting for food, seeking employment, office work.</li>
                    </ul>
                    <li>In answering the following questions</li>
                    <ul>
                        <li>'vigorous-intensity activities' are activities that require hard physical effort and cause large increases in breathing or heart rate, </li>
                        <li>'moderate-intensity activities' are activities that require moderate physical effort and cause small increases in breathing or heart rate. </li>
                    </ul>
                </ul>
            </div>
        </div>
    )
}

export default Work