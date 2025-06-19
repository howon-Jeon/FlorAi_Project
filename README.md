# 🌸 감성을 담은 꽃 선물, 플로라이 </br>(AI 기반 개인 맞춤형 꽃 추천 서비스)

## 👀 서비스 소개
- **서비스명**: FlorAI (모바일 웹)
- **서비스 설명**:  
  사용자 기념일, 감정 키워드, 선물 대상자 정보 등을 바탕으로  
  AI가 적절한 꽃을 추천하고, 기념일 정보 제공, 꽃말 도감까지 제공하는  
  **AI 기반 맞춤형 꽃 추천 서비스**입니다.  
  초보자도 쉽게 꽃을 고를 수 있도록 감성적인 UI/UX를 제공합니다.

---

## 📅 프로젝트 기간
2025.02.27 ~ 2025.04.15 (약 7주)

---

## ⭐ 주요 기능
- 사용자의 선물 대상자, 감정, 상황 정보를 기반으로 AI 꽃 추천
- 꽃말 의미에 기반한 감성적 큐레이션
- 모바일/웹 기반 직관적 UI/UX 설계

---
## 동작 구조
1. 프론트 → 백엔드(Spring)로 질문 키워드 전송 (JSON)
2. 백엔드 → Python FastAPI 추천 서버에 전달
3. Python 서버 → LangChain으로 문장 3개 확장(desc/emotion/meaning)
4. 각 문장을 text-embedding-3-small로 임베딩 → Qdrant에서 유사도 검색
5. Top 10 추출 → 유사 그룹화 + 랜덤 추출 → 3개 선택 → GPT로 추천 이유 생성
6. 추천 결과 (FLW_IDX, 이유) → 백엔드로 전송
7. 백엔드는 꽃 메타데이터와 매칭해서 프론트로 전달

--- 

## ⛏ 기술스택

| 구분 | 내용 |
|------|------|
| **사용언어** | ![](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white) ![](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white) ![](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white) ![](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black) |
| **라이브러리** | ![](https://img.shields.io/badge/Swiper-6332F6?style=for-the-badge&logo=Swiper&logoColor=white) ![](https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white) |
| **개발도구** | ![](https://img.shields.io/badge/VScode-007ACC?style=for-the-badge&logo=VisualStudioCode&logoColor=white) ![](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white) |
| **서버환경** | ![](https://img.shields.io/badge/SpringBoot-6DB33F?style=for-the-badge&logo=SpringBoot&logoColor=white) |
| **데이터베이스** | ![](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white) |
| **AI 및 기타** | ![](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white) ![](https://img.shields.io/badge/LangChain-000000?style=for-the-badge) ![](https://img.shields.io/badge/Qdrant-1A1A1A?style=for-the-badge) |
| **협업도구** | ![](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white) ![](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white) |

---

## ⚙ 시스템 아키텍처(구조)
![image](https://github.com/user-attachments/assets/43de95b0-198f-40ba-aff9-0973f5e87ee3)
---
## 📌 서비스 흐름도
![image](https://github.com/user-attachments/assets/dbb404b6-08bd-4216-88ad-62cf8815747a)

---
## 📌 ER다이어그램
![image](https://github.com/user-attachments/assets/74cb9c17-1bd0-423f-a08f-d99c35e416cc)
---

🖥 화면 구성
<table> <tr> <td align="center"> <img src="https://github.com/user-attachments/assets/213a9bbc-761c-444a-aa2a-b77a1d668b64" width="200"/><br/>Main </td> <td align="center"> <img src="https://github.com/user-attachments/assets/51009a12-8202-4249-a2ac-0a0ba6e6a425" width="200"/><br/>꽃말도감 </td> <td align="center"> <img src="https://github.com/user-attachments/assets/d6a42671-4d3e-414d-9be8-b0cec9e96d31" width="200"/><br/>Shop </td> </tr> <tr> <td align="center"> <img src="https://github.com/user-attachments/assets/b9076dec-9ff5-47c4-9686-9c38954989d9" width="200"/><br/>기념일 </td> <td align="center"> <img src="https://github.com/user-attachments/assets/f476a419-4d34-4609-80ce-d90b0ce8788a" width="200"/><br/>로그인 </td> <td align="center"> <img src="https://github.com/user-attachments/assets/8c724ad5-9390-423d-b4b8-db356f1eed9c" width="200"/><br/>회원가입 </td> </tr> <tr> <td align="center"> <img src="https://github.com/user-attachments/assets/b39aec6e-0db3-40ce-a13e-285646d67e28" width="200"/><br/>상품정보 </td> <td align="center"> <img src="https://github.com/user-attachments/assets/d0d2a91b-85ca-4f4f-b23b-bbd03912d1e9" width="200"/><br/>장바구니 </td> <td align="center"> <img src="https://github.com/user-attachments/assets/8a2696b7-3971-4151-af7c-b79d53937e35" width="200"/><br/>추천 설문 </td> </tr> <tr> <td align="center" colspan="3"> <img src="https://github.com/user-attachments/assets/9b4a82ef-5414-4b07-a887-f5dce0c6d8db" width="200"/><br/>추천 결과 </td> </tr> </table>

## 👨‍👩‍👦‍👦 팀원 역할

| 이름 | 역할 | GitHub |
|------|------|--------|
| 전호원 | 팀장, 기획, Front-end, DB 설계 및 구축 | [GitHub](https://github.com/howon-Jeon/FlorAi_Project) |
| 이석현 | 데이터 수집, 크롤링, AI 추천 모델링 | [GitHub](https://github.com/lsh7897/florAI) |
| 김성하 | Back-end 개발, DB 설계 및 구축 | [GitHub](https://github.com/julle0123/Florai) |

---

## 🤾‍♂️ 트러블슈팅

- **문제1: 추천 정확도 부족**  
  - 원인: 사용자의 입력값이 추상적일 경우, 의미 매칭이 부정확했음  
  - 해결: GPT 기반 LangChain으로 감성 키워드를 꽃말 벡터로 연결하는 매핑 로직 개선

- **문제2: 로그인 세션 유지 문제**  
  - 원인: React 세션 토큰이 새로고침 시 삭제됨  
  - 해결: `sessionStorage` 활용 및 Redux로 사용자 로그인 상태 전역 관리

- **문제3: Swiper.js 반응형 오류**  
  - 원인: 카테고리 배너에 `grab-cursor`가 작동하지 않음  
  - 해결: Swiper 옵션에서 `grabCursor: true` 설정 후 CSS 병행 수정

- **문제4: 벡터 DB 연동 실패**  
  - 원인: Qdrant API 접근 권한 설정 누락  
  - 해결: API 키 활성화 및 IP 화이트리스트 적용으로 정상 연동
