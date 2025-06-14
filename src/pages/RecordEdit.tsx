import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './RecordDetail.css'; // 기존 스타일 재사용 가능

const RecordEdit = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [record, setRecord] = useState<any>(null);
    const [sliderValue, setSliderValue] = useState(5);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // 기록 불러오기
    useEffect(() => {
        const fetchRecord = async () => {
            const { data, error } = await supabase
                .from('emotion_records')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Supabase fetch 오류:', error);
            } else {
                setRecord(data);
                setSliderValue(Math.abs(data.value)); // 부호 제거 후 값 표시
                setTitle(data.title);
                setContent(data.content);
            }
        };

        fetchRecord();
    }, [id]);

    const handleSave = async () => {
        if (!record) return;

        const negativeEmotions = ['😔', '😭', '😡', '😑', '😮‍💨'];
        const emotionValue = negativeEmotions.includes(record.emoji) ? -sliderValue : sliderValue;

        const { error } = await supabase
            .from('emotion_records')
            .update({
                value: emotionValue,
                title,
                content,
            })
            .eq('id', id);

        if (error) {
            console.error('Supabase 업데이트 오류:', error);
            alert('수정 실패!');
        } else {
            alert('수정 완료!');
            navigate(`/record-detail/${id}`); // 수정 후 다시 상세보기로
        }
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    if (!record) return <p>로딩 중...</p>;

    return (
        <div className="record-detail-container">
            <div className="record-detail-header">
                <button className="back-button" onClick={handleBackClick}>
                    {'⇦'}
                </button>
            </div>

            <div className="record-detail-content">
                <div className="emoji" style={{ fontSize: '64px' }}>{record.emoji}</div>
                <div className="date">{record.date}</div>

                <div className="slider-container">
                    <span className="slider-label">0</span>
                    <input
                        type="range"
                        min="0"
                        max="10"
                        value={sliderValue}
                        onChange={(e) => setSliderValue(Number(e.target.value))}
                        className="slider"
                    />
                    <span className="slider-label">10</span>
                </div>

                <input
                    type="text"
                    className="title-input"
                    placeholder="제목 입력하기"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    className="content-input"
                    placeholder="오늘 하루 기록하기"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <div className="record-detail-footer">
                    <button className="save-button" onClick={handleSave}>✔️ 저장</button>
                </div>
            </div>
        </div>
    );
};

export default RecordEdit;
