import BottomTabBar from '../components/BottomTabBar'; // 하단바 불러오기
import Header from '../components/Header'; // Header 불러오기
import { Link } from 'react-router-dom';
import './Record.css';

const today = new Date(); // 날짜 구하기

const formattedDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`; // 형식 수정


const Record = () => { // Record 컴포넌트 생성
    return (
        <div className="record-container">
            <Header type="record" />


            <div className="date-up">{formattedDate}</div>

            <h1 className="record-title">오늘 어떤 하루였나요?</h1>

            <h2 className="record-subtitle">오늘의 감정을 골라보세요.</h2>

            <div className='emotion-emoji'>감정</div>

            <div className="emotion-list">
                <Link
                    to="/record/1"
                    state={{ emoji: "🙂" }}
                >
                    <div className="emotion-item">🙂</div>
                </Link>

                <Link
                    to="/record/2"
                    state={{ emoji: "😔" }}
                >
                    <div className="emotion-item">😔</div>
                </Link>

                <Link
                    to="/record/3"
                    state={{ emoji: "😭" }}
                >
                    <div className="emotion-item">😭</div>
                </Link>

                <Link
                    to="/record/4"
                    state={{ emoji: "😡" }}
                >
                    <div className="emotion-item">😡</div>
                </Link>

                <Link
                    to="/record/5"
                    state={{ emoji: "😘" }}
                >
                    <div className="emotion-item">😘</div>
                </Link>

                <Link
                    to="/record/6"
                    state={{ emoji: "😑" }}
                >
                    <div className="emotion-item">😑</div>
                </Link>

                <Link
                    to="/record/7"
                    state={{ emoji: "😆" }}
                >
                    <div className="emotion-item">😆</div>
                </Link>

                <Link
                    to="/record/8"
                    state={{ emoji: "😮" }}
                >
                    <div className="emotion-item">😮</div>
                </Link>

                <Link
                    to="/record/9"
                    state={{ emoji: "😮‍💨" }}
                >
                    <div className="emotion-item">😮‍💨</div>
                </Link>

            </div>
            <BottomTabBar />
        </div>
    );
};

export default Record;
