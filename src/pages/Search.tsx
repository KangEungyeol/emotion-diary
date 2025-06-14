import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import BottomTabBar from '../components/BottomTabBar';
import Header from '../components/Header';
import './Search.css';

const Search = () => {
    const [records, setRecords] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRecords, setFilteredRecords] = useState<any[]>([]);

    // 🚀 Supabase에서 데이터 가져오기
    useEffect(() => {
        const fetchRecords = async () => {
            const { data, error } = await supabase
                .from('emotion_records')
                .select('*')
                .order('date', { ascending: false });

            if (error) {
                console.error('Supabase 가져오기 오류:', error);
            } else {
                console.log('Supabase 데이터:', data);
                setRecords(data || []);
                setFilteredRecords([]); // ✅ 처음에는 빈 결과
            }
        };

        fetchRecords();
    }, []);

    // 검색어 입력 핸들러
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (term.trim() === '') {
            // 검색어가 비어 있으면 결과도 비움
            setFilteredRecords([]);
            return;
        }

        const filtered = records.filter((record: any) =>
            (record.title && record.title.includes(term)) ||
            (record.content && record.content.includes(term)) ||
            (record.date && record.date.includes(term))
        );
        setFilteredRecords(filtered);
    };

    return (
        <div className="search-container">
            <Header type="search" />

            {/* 상단 검색바 */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="검색어를 입력하세요."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                <button className="search-cancel" onClick={() => {
                    setSearchTerm('');
                    setFilteredRecords([]); // 검색 초기화 시 결과도 비움
                }}>취소</button>
            </div>
            <div className="search-scroll-wrapper">
                {/* 검색기록 타이틀 */}
                <div className="search-section-header">
                    <div className='resulttext'>검색결과</div>
                    {/* 전체삭제 버튼 삭제됨 */}
                </div>

                {/* 검색 결과 */}
                <div className="search-results">
                    {filteredRecords.length === 0 ? (
                        <p className="search-no-result">검색 결과가 없습니다.</p>
                    ) : (
                        filteredRecords.map((record: any, index) => (
                            <div key={record.id || index} className="search-record-card">
                                <div className="search-record-date">{record.date}</div>
                                <div className="search-record-title">{record.title}</div>
                                <div className="search-record-content">
                                    {record.content && record.content.length > 20
                                        ? record.content.slice(0, 20) + '...'
                                        : record.content}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>


            <BottomTabBar />
        </div>
    );
};

export default Search;