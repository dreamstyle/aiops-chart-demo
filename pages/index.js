import { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Pie, Doughnut, Bar, Line, Bubble } from 'react-chartjs-2'
import styled from 'styled-components'
import { Table } from 'antd'
import 'antd/dist/reset.css'
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
} from 'chart.js'
import { data as raw } from '../data/sample'
import { pieChartData, lineChartData, groupBarChartData, bubbleChartData } from '../data/chart'

ChartJS.register(
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale
)

const tableData = raw.map((el) => ({ ...el, key: el.insertId }))
const columns = [
  // { title : 'Log name', dataIndex: 'logName', key: 'logName' },
  { title: 'Resource type', dataIndex: 'resourceType', key: 'resourceType' },
  { title: 'Service name', dataIndex: 'serviceName', key: 'serviceName' },
  { title: 'Method name', dataIndex: 'methodName', key: 'methodName' },
  // { title : 'Principal email', dataIndex: 'principalEmail', key: 'principalEmail' },
  { title: 'Project', dataIndex: 'projectId', key: 'projectId' },
  // { title : 'Resource name', dataIndex: 'resourceName', key: 'resourceName' },
  // { title : 'Device name', dataIndex: 'deviceName', key: 'deviceName' },
  // { title : 'Disk size gb', dataIndex: 'diskSizeGb', key: 'diskSizeGb' },
  // { title : 'Disk type', dataIndex: 'diskType', key: 'diskType' },
  // { title : 'Source image', dataIndex: 'sourceImage', key: 'sourceImage' },
  // { title : 'Machine type', dataIndex: 'machineType', key: 'machineType' },
  // { title : 'Message', dataIndex: 'message', key: 'message' },
  { title: 'Timestamp', dataIndex: 'timestamp', key: 'timestamp' },
  { title: 'Severity', dataIndex: 'severity', key: 'severity' },
  // { title : 'Caller ip', dataIndex: 'callerIp', key: 'callerIp' },
  {
    title: 'Caller supplied user agent',
    dataIndex: 'callerSuppliedUserAgent',
    key: 'callerSuppliedUserAgent',
  },
  { title: 'Insert', dataIndex: 'insertId', key: 'insertId' },
  // { title : 'Current timestamp', dataIndex: 'currentTimestamp', key: 'currentTimestamp' },
]

export default function Home() {
  const [area, setArea] = useState('-')

  const pieOptions = {
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Predicted world population (millions) in 2050',
      },
    },
    onClick: onClickChart,
  }

  const barOptions = {
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Predicted world population (millions) in 2050',
      },
    },
    onClick: onClickChart,
  }

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  }

  const bubbleChartOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Predicted world population (millions) in 2050',
      },
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: 'Happiness',
            },
          },
        ],
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: 'GDP (PPP)',
            },
          },
        ],
      },
    },
  }

  function onClickChart(e) {
    const { tooltip } = e.chart
    const title = tooltip.title[0]
    setArea(title)
    console.log(tooltip)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>AIOps Chart Demo</title>
        <meta name='description' content='For demo purpose' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <SectionTitle>Pie Chart</SectionTitle>
        <div>Selected category: {area}</div>
        <Pie
          data={pieChartData}
          options={pieOptions}
          className={`${styles.chart} ${styles.pie}`}
        />

        <SectionTitle>Doughnut Chart</SectionTitle>
        <div>Selected category: {area}</div>
        <Doughnut
          data={pieChartData}
          options={pieOptions}
          className={`${styles.chart} ${styles.pie}`}
        />

        <SectionTitle>Bar Chart</SectionTitle>
        <div>Selected category: {area}</div>
        <Bar data={pieChartData} options={barOptions} className={styles.chart} />

        <SectionTitle>Groped Bar Chart</SectionTitle>
        <Bar
          data={groupBarChartData}
          options={barOptions}
          className={styles.chart}
        />

        <SectionTitle>Line Chart</SectionTitle>
        <Line
          data={lineChartData}
          options={lineOptions}
          className={styles.chart}
        />

        <SectionTitle>Bubble Chart</SectionTitle>
        <Bubble
          data={bubbleChartData}
          options={bubbleChartOptions}
          className={styles.chart}
        />

        <SectionTitle>Data Display</SectionTitle>
        <div className={styles.table}>
          <Table
            dataSource={tableData}
            columns={columns}
            scroll={{ x: 1500, y: 600 }}
            size='small'
          />
        </div>
      </main>
    </div>
  )
}

const SectionTitle = styled.h1``
