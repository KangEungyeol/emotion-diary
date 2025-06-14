import BottomTabBar from '../components/BottomTabBar';
import Header from '../components/Header';
import './Analysis.css';

import { Line, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement, // 추가됨 (Pie 차트용)
    Title as ChartTitle,
    Tooltip,
    Legend,
} from 'chart.js';

import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement, // 추가됨
    ChartTitle,
    Tooltip,
    Legend
);

const Analysis = () => {
    const [records, setRecords] = useState<any[]>([]); // 🚀 상태 추가

    // 🚀 Supabase 데이터 가져오기
    useEffect(() => {
        const fetchRecords = async () => {
            const { data, error } = await supabase
                .from('emotion_records')
                .select('*')
                .order('date', { ascending: true });

            if (error) {
                console.error('Supabase fetch 오류:', error);
            } else {
                console.log('Supabase에서 가져온 데이터:', data);
                setRecords(data || []);
            }
        };

        fetchRecords();
    }, []);

    // 🚀 꺾은선 그래프 데이터 준비
    const lineData = {
        labels: records.map(record => record.date),
        datasets: [
            {
                label: '감정 변화',
                data: records.map(record => record.value),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.3,
            },
        ],
    };

    const lineOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top' as const,
            },
            title: {
                display: true,
                text: '월간 감정 변화',
            },
        },
        scales: {
            y: {
                min: -10,
                max: 10,
            },
        },
    };

    // 🚀 원그래프(Pie 차트) 데이터 준비
    // 감정별 count 계산 예시
    // 감정별 count 계산
    const emotionCount: { [key: string]: number } = {};

    records.forEach(record => {
        const emoji = record.emoji;
        if (emoji) {
            if (emotionCount[emoji]) {
                emotionCount[emoji]++;
            } else {
                emotionCount[emoji] = 1;
            }
        }
    });

    const pieData = {
        labels: Object.keys(emotionCount),
        datasets: [
            {
                label: '감정 비율',
                data: Object.values(emotionCount),
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#9CCC65', '#BA68C8', '#FF9F40', '#4BC0C0',
                    '#FF6F91', '#845EC2', '#F9F871', // 여유 색상 추가 가능
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="analysis-container">
            <Header type="analysis" />
            <div className="analysis-subtitle">
                <span>월간</span>
            </div>


            {/* 감정 변화 */}
            <div className="chart-card line-chart">
                <h2 className="chart-title">감정 변화</h2>
                <Line data={lineData} options={lineOptions} />
            </div>

            {/* 감정 흐름 */}
            <div className="chart-card">
                <h2 className="chart-title">감정 흐름</h2>
                <div className="pie-chart-container">
                    <Pie data={pieData} />
                </div>
            </div>

            <BottomTabBar />
        </div>

    );
};

export default Analysis;