# ![정치 발자국](https://raw.githubusercontent.com/oxopolitics-internship-for-elice/footprints/main/client/src/assets/MainLogo.gif)

> A community that graphs politician evaluations and issues

## 기술 스택

<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white" /><img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white" /><img src="https://img.shields.io/badge/styled-components-DB7093?style=flat-square&logo=styled-components&logoColor=white" /><img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=Vite&logoColor=white" />
<br />
<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white" /><img src="https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=NestJS&logoColor=white" /><img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=MongoDB&logoColor=white" />
<br />
<img src="https://img.shields.io/badge/Amazon_EC2-FF9900?style=flat-square&logo=Amazon_EC2&logoColor=white" /><img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=Docker&logoColor=white" /><img src="https://img.shields.io/badge/NGINX-009639?style=flat-square&logo=NGINX&logoColor=white" />

## 1. 기획 의도

### 목표
정치인의 과거부터 현재까지의 이슈들을 돌이켜보며 정치인의 스토리, 잠재력, 가치를 깊게 이해할 수 있는 프로덕트를 제공하고자 합니다.

- 정치인 일대기 시각화: 논란, 이슈였던 정치인을 둘러싼 사건들을 시간 순 그래프로 살펴볼 수 있습니다.
- 유저의 평가: 각 사건마다 사용자들이 직접 긍정적, 부정적 평가를 추가할 수 있습니다. 정치인의 인생 여정에서 여론의 평가를 확인할 수 있고, 사용자들 또한 여론을 살펴볼 수 있습니다.

<br>

### 문제 인식

> 🧐 정치계는 매일 새로운 이슈와 함께 빠르게 변화하고 있습니다. 정치인을 둘러싼 여론은 시시각각 변화하며, 과거의 사건에 대한 재평가 또한 종종 이루어집니다. 
정치발자국은 우리가 정치인을 제대로 평가하고 있을까라는 문제 의식에서 시작했습니다. 

<br>

### 페르소나

- 정치인들의 역사를 확인하여 그들을 이해하고자 하는 사용자
- 정치인을 이해하고 싶지만, 뉴스, 위키 등 긴 텍스트에 피로를 느끼는 사용자
- 나와 다른 의견, 여론이 궁금한 사용자

<br><br><br>

## 2. 서비스 기능

### ⚛ 로그인
<p align="center"><img src="https://user-images.githubusercontent.com/70076564/188615305-42480ede-b397-4fe6-86b4-990ed7f8bb12.gif" height="400"/></p>

- 사용자의 편의성을 고려하여 소셜 로그인으로 회원가입과 동시에 로그인이 됩니다.
- 쿠키로 access-token을 보관해 브라우저를 닫은 뒤에도 로그인이 되어있도록 했습니다.
- 토큰으로 백엔드에서 db와 비교해 중복투표 방지를 구현했습니다.

<br>

### ⚛ 메인 페이지
<p align="center"><img src="https://user-images.githubusercontent.com/70076564/188617253-a918007d-a2e3-4f2b-be14-ccc1f19bcb04.gif" height="400"/></p>

- 정치인의 전체 이슈를 가져와 인생 전체에 대한 그래프를 볼 수 있습니다.

<br>

### ⚛ 대기 중 이슈
<p align="center"><img src="https://user-images.githubusercontent.com/70076564/188618160-903d2bc3-61b2-4232-b63e-937e1c1175eb.gif" height="400"/></p>

- 모달을 통해 날짜와 이슈 내용을 입력하고 대기 중 이슈로 등록 가능합니다.
- 무한스크롤으로 대기 중 이슈를 가져오도록 구현했습니다.
- 마감이 임박한 top3 이슈가 상위에 고정되어 보여집니다.

<br>

### ⚛ 정치인 그래프
<p align="center"><img src="https://user-images.githubusercontent.com/70076564/188618182-a7059880-fbab-45a0-84e3-1e9d7b83a7c9.gif" height="400"/></p>

- 페이지네이션으로 등록된 이슈를 가져와 날짜를 x축에 여론 투표 결과를 Y축에 나타내 선 그래프로 나타내었습니다.
- 부족 별 그래프를 체크박스로 선택할 수 있어 나타내 같은 이슈, 정치인이더라도 부족 간 반응의 차이를 확인 할 수 있습니다.
- 포인트에 마우스를 올리면 O△X 값과 이슈 제목을 나타내는 툴팁을 보여줍니다.
- 포인트 클릭 시 해당 이슈에 투표를 할 수 있는 모달을 띄워 이슈에 대한 평가를 수집합니다.

<br><br><br>


## 3. 프로젝트 구성도

### 1. [와이어프레임](https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FhxRdK7tAlhO9maj57ZVcTf%2F%25EC%2599%2580%25EC%259D%25B4%25EC%2596%25B4%25ED%2594%2584%25EB%25A0%2588%25EC%259E%2584%3Fnode-id%3D33%253A9)
    
### 2. [API 문서](https://documenter.getpostman.com/view/20906923/VUqrMwaw)
    
### 3. 아키텍쳐
<p align="center"><img height="400" alt="project architecture" src="https://user-images.githubusercontent.com/102276240/199756858-646fe620-461a-4cb7-8949-efa814787abe.png"></p>


### 4. 백엔드 데이터처리 구조
 <p align="center"><img width="3000" alt="backend data process" src="https://user-images.githubusercontent.com/73901433/188047964-8f069faa-7c2a-4e71-8f1d-27fc12ed72d3.png"></p>

<br><br><br>
    
## 4. 팀원 소개 및 역할 

| 이름 | 역할 | 담당 부분 |
| --- | --- | --- |
| 배장한 | BE | 1. Issue API 설계 및 작성 <br> 2. 이슈, 정치인 조회 로직 구현 - pagination, aggregate |
| 장소영 | BE | 1. Issue API 설계 및 작성 <br> 2. 이슈 부족별 투표 로직 구현 <br> 3. 이슈 등록 투표 로직 구현 <br> 4. 정치인 목록 로직 구현 |
| 권필주 | BE | 1. 카카오 소셜로그인 및 토큰 인증 로직 구현 <br> 2. 로그인한 유저의 이슈에 대한 투표 결과 반영 로직 구현 <br> 3. 유저의 투표 중복 방지 로직 구현 <br> 4. aws 배포 및 github action 활용한 CI&CD 구현 |
| 황채림 | FE | 1. chartjs를 통한 메인페이지 정치인목록 그래프 작성 <br> 2. Recoil을 통한 전역 상태관리 및 정치인 페이지 이슈 구현 <br> 3. 3. emotion을 이용한 전체 css 및 디자인 |
| 홍주완 | FE | 1.chartjs를 통한 정치인 상세페이지 구현 <br> 2.chartjs tooltip 직접 구현 <br> 3.chartjs로 페이지네이션 적용 <br> 4.모달 팝업 구현 |
| 김하영 | FE | 1. vite와 prettier, tsconfig 등 프론트엔드 개발환경 셋팅 <br> 2. 메인페이지 및 헤더 등 레이아웃 구현 <br> 3. 로그인 구현 <br> 4. 이슈 등록 구현 |

