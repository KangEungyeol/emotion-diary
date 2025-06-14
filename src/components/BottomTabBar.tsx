import React from 'react'; // React 사용
import searchIcon from '../assets/search.svg';
import analysisIcon from '../assets/analysis.svg';
import { Link, useLocation } from 'react-router-dom'; // {페이지 이동 태그, 현재 페이지 경로 확인 기능능}
import './BottomTabBar.css'; // css 파일 import

const BottomTabBar: React.FC = () => { // BottomTabBar 이름의 리액트 컴포넌트(React.FC:함수형 컴포넌트)
    const location = useLocation(); // useLocation()를 실행해 현재 페이지 경로 저장("현재 어떤 탭이 활성화되어 있는지" 확인 가능)

    return (
        <nav className="tab-bar">
            <Link // 검색 버튼(선택 시 검색 화면으로 이동)
                to="/search"
                className={location.pathname === '/search' ? 'active-tab' : 'inactive-tab'}
            >
                <img src={searchIcon} alt="검색 아이콘" className="search-icon" />
            </Link>

            <Link to="/record" className="plus-button">
                + {/* 나중에 <img src="..." /> 로 바꿀 수 있음 */}
            </Link>

            <Link // 분석 버튼(선택 시 분석 화면으로 이동동)
                to="/analysis"
                className={location.pathname === '/analysis' ? 'active-tab' : 'inactive-tab'}
            >
                <img src={analysisIcon} alt="분석 아이콘" className="analysis-icon" />

            </Link>
        </nav>
    );
};

export default BottomTabBar;

/* 
1. <Link> 대신 <a>를 사용 가능한가?
 - react-router-dom에서는 주로 <Link> 사용함.
2. <nav> 대신 <div> 사용 가능한가?
 - nav가 더 의미에 맞음.(보통 "하단 탭바"처럼 "탐색 영역"에는 nav 사용)
*/