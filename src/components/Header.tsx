import moreIcon from '../assets/More.svg';
import backIcon from '../assets/back.svg';
import homeIcon from '../assets/home.svg';
import React from 'react'; // React 사용
import { useNavigate } from 'react-router-dom'; // useNavigate : 화면을 이동할 때 사용하는 함수
import './Header.css';

interface HeaderProps {
  type: 'home' | 'search' | 'analysis' | 'record'; // Header 컴포넌트가 받을 props(속성)*의 종류를 정해놓음.
  title?: string; // title은 문자열만 가능함.(analysis만 사용할 예정)
}

const Header: React.FC<HeaderProps> = ({ type, title }) => { // props로 type과 title 값을 받음
  const navigate = useNavigate(); // 페이지를를 이동할 수 있는 navigate 함수 준비

  const handleHomeClick = () => { // 홈 버튼 선택 시 홈 화면으로 이동함.
    navigate('/'); // 현재 화면
  };

  const handleBackClick = () => { // 뒤로 가기 버튼 선택 시 이전 화면으로 이동함.
    navigate('/'); // 홈화면으로 이동
  };

  return (
    <header className="header">
      {type === 'record' ? ( // 기록 화면일 때,
        <>
          <button className="header-left" onClick={handleBackClick}>
            <img src={backIcon} alt="뒤로가기" className="icon" />
          </button>
          <div className="header-right">
            <img src={moreIcon} alt="더보기 아이콘" className="icon" />
          </div>
        </> // 뒤로 가기 버튼과 ... 버튼 표시

      ) : type === 'search' ? ( // 검색 화면일 때, 
        <>
          <button className="header-left" onClick={handleHomeClick}>
            <img src={homeIcon} alt="홈 아이콘" className="home-icon" />
          </button>
          {/* <div className="header-search-bar">
            <input type="text" placeholder="검색어를 입력하세요" />
            <button className="header-cancel">취소</button>
          </div> */}
        </> // 상단에 홈 버튼, 그 밑에 검색창과 취소 버튼 표시

      ) : ( // 나머지(홈, 분석 화면)일 때, 
        <>
          <button className="header-left" onClick={handleHomeClick}>
            <img src={homeIcon} alt="홈 아이콘" className="home-icon" />
          </button>
          {type === 'analysis' && (
            <div className="header-title">{title}</div>
          )}
        </> // 홈 버튼 표시
      )}
    </header>
  );
};

export default Header;
/*
'record' → 뒤로 가기 + ...
'search' → 홈 + 검색창 + 취소
'analysis' → 홈 + 제목
'home' → 홈
*/