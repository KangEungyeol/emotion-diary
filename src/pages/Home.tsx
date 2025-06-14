import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import BottomTabBar from '../components/BottomTabBar';
import Header from '../components/Header';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  const [value, setValue] = useState<Date>(new Date());
  const [writtenDates, setWrittenDates] = useState<string[]>([]);
  const navigate = useNavigate();

  // 작성한 날짜 리스트 가져오기
  useEffect(() => {
    const fetchWrittenDates = async () => {
      const { data, error } = await supabase
        .from('emotion_records')
        .select('date');

      if (error) {
        console.error('Supabase fetch 오류:', error);
      } else {
        const dates = data.map((record: any) => record.date);
        setWrittenDates(dates);
      }
    };

    fetchWrittenDates();
  }, []);


  //  날짜 클릭 시 기록 확인 후 페이지 이동
  const handleDateChange = async (date: Date | null) => {
    const selectedDate = date ?? new Date();
    setValue(selectedDate);

    const formattedDate = selectedDate.toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('emotion_records')
      .select('*')
      .eq('date', formattedDate)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      console.log('해당 날짜에 작성한 일기가 없습니다.');
      alert('해당 날짜에 작성한 일기가 없습니다.');
    } else {
      console.log(' 이동할 기록 id:', data.id);
      //  record-detail/:id 페이지로 이동
      navigate(`/record-detail/${data.id}`);

    }
  };

  // 현재 월
  const today = new Date();
  const currentMonth = today.getMonth() + 1;

  return (
    <div className="home-container">
      <Header type="home" />

      <h1 className="home-title">{currentMonth}월</h1>

      <div className="calendar-wrapper">
        <Calendar
          onChange={handleDateChange as any}
          value={value}
          locale="ko-KR"
          calendarType="gregory"
          tileContent={({ date, view }) => {
            // month view에서만 dot 표시
            if (view === 'month') {
              const dateStr = date.toISOString().split('T')[0];
              if (writtenDates.includes(dateStr)) {
                return (
                  <div
                    style={{
                      marginTop: '2px',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#4CAF50',
                      margin: '0 auto',
                    }}
                  />
                );
              }
            }
            return null;
          }}
        />
      </div>

      <BottomTabBar />
    </div>
  );
};

export default Home;
