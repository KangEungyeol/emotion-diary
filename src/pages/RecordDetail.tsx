import moreIcon from '../assets/More.svg';
import deleteIcon from '../assets/delete.svg';
import saveIcon from '../assets/save.svg';
import backIcon from '../assets/back.svg';
import { supabase } from '../supabaseClient'; // supabaseClient import 추가
import React, { useState } from 'react'; // React 및 useState 사용용
import { useNavigate } from 'react-router-dom';
// import { useParams } from 'react-router-dom'; // URL 파라미터(주소에서 값을 가져옴.) ex. /record/3 => id = "3"
import { useLocation } from 'react-router-dom';
import './RecordDetail.css';

const RecordDetail = () => { // RecordDetail 컴포넌트 생성 
    // const params = useParams<{ id: string }>(); // 주소에 있는 id 값을 가져옴.(어떤 기록인지 구분 가능함.)
    // const id = params.id;
    const [sliderValue, setSliderValue] = useState(5); // 슬라이더(0~10) 상태 : 기본값 5
    const [title, setTitle] = useState(''); // 제목 입력란 추가

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSliderValue(Number(e.target.value));
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value); // 제목 입력 시 상태 변경 -> 입력 내용 저장
    };

    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/record'); // '/record' 경로로 이동!
    };

    // 상태 추가
    const [content, setContent] = useState(''); // 내용 입력 상태

    // 핸들러 추가
    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const location = useLocation();
    const state = location.state as { emoji?: string };
    const emoji = state?.emoji || "😊";

    const today = new Date(); // 날짜 구하기

    const formattedDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`; // 형식 수정

    const handleSave = async () => {
        const negativeEmotions = ['😔', '😭', '😡', '😑', '😮‍💨'];
        const emotionValue = negativeEmotions.includes(emoji) ? -sliderValue : sliderValue;

        const recordData = {
            date: formattedDate,
            emoji: emoji,
            value: emotionValue,
            title: title,
            content: content,
        };

        console.log('저장할 데이터:', recordData);

        // 👉 Supabase에 데이터 저장!
        const { data, error } = await supabase
            .from('emotion_records') // 테이블명 정확하게!
            .insert([recordData]);

        if (error) {
            console.error('Supabase 저장 오류:', error);
            alert('저장 실패!');
        } else {
            console.log('Supabase 저장 성공:', data);
            navigate('/analysis');
        }
    };


    return (
        <div className='container'>
            <div className="record-detail-container">
                <div className="record-detail-header">
                    <button className="back-button" onClick={handleBackClick}>
                        <img src={backIcon} alt="뒤로가기" className="icon" />
                    </button>
                    <div className="more-button">
                        <img src={moreIcon} alt="더보기 아이콘" className="icon" />
                    </div>
                </div>

                {/* 선택한 감정 아이콘 표시 */}
                <div className="record-detail-content">
                    <div className="emoji">{emoji}</div>
                    <div className="date">{formattedDate}</div>

                    {/* 수치 조절 기능 */}
                    <div className="slider-container">
                        <span className="slider-label">0</span>
                        <input
                            type="range"
                            min="0"
                            max="10"
                            value={sliderValue}
                            onChange={handleSliderChange}
                            className="slider"
                        />
                        <span className="slider-label">10</span>
                    </div>

                    {/* <div>현재 값: {sliderValue}</div> */}

                    {/* 제목 입력창 */}
                    <input
                        type="text"
                        className="title-input"
                        placeholder="제목 입력하기"
                        value={title}
                        onChange={handleTitleChange}
                    />

                    {/* 내용 입력창 */}
                    <textarea
                        className="content-input"
                        placeholder="오늘 하루 기록하기"
                        value={content}
                        onChange={handleContentChange}
                    />

                    {/* 하단 저장/삭제 버튼 */}
                    <div className="record-detail-footer">
                        <button className="delete-button">
                            <img src={deleteIcon} alt="삭제" className="icon" />
                        </button>
                        <button className="save-button" onClick={handleSave}>
                            <img src={saveIcon} alt="저장" className="icon" />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RecordDetail;