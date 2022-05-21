import React, { useEffect, useState } from 'react'
import {  useSelector } from 'react-redux'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

import { toyService } from '../services/toy.service'

import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

ChartJS.register(ArcElement, Tooltip, Legend)

export const MyChart = () => {
 
    const history = useHistory()
    const [dataCharts, setdataCharts] = useState([])
    const { user } = useSelector(storeState => storeState.userModule)
    useEffect(() => {
        loadCharts()
    }, [])

    const loadCharts = async () => {
        const charts = await toyService.getDataForCharts()
        setdataCharts(charts)
    }
   

    return <section className="dash-board">
        <div className="charts-container">
            {dataCharts.map((chart) =>

                <div key={chart.title} className="chart">
                    <h1>{chart.title}</h1>
                    <Doughnut className='chart' data={chart} />
                </div>
            )}
        </div>


    </section>
}