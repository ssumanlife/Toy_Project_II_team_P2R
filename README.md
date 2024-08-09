# <img src="https://github.com/user-attachments/assets/9d2778e5-2eac-4528-8b65-8fd5a9df6eb8" width="45" height="45" align='center' /> WorkCheck 자영업자를 위한 직원 관리 플랫폼
![토이2썸네일](https://github.com/user-attachments/assets/a4b38fab-d7b7-4191-8fc1-64918ba533ae)

<div align=center>

## 👋 P2R (Path to Resolution) 👋
"P2R(Path to Resolution)" 은 갈등과 문제를 해결하는 데 초점을 맞춘 팀입니다.<br/>
우리의 목표는 다양한 도전 과제를 분석하고, 협력을 통해 창의적이고 실용적인 해결책을 찾아내는 것입니다.<br/>
우리는 커뮤니케이션, 협상, 전략적 사고를 통해 긍정적인 변화를 추구합니다.
|[<img src="https://avatars.githubusercontent.com/u/107895537?v=4" width="150" height="150"/>](https://github.com/HSjjs98)|[<img src="https://avatars.githubusercontent.com/u/169154369?v=4" width="150" height="150"/>](https://github.com/ssumanlife)|[<img src="https://avatars.githubusercontent.com/u/170381378?s=88&v=4" width="150" height="150"/>](https://github.com/miniseung)|[<img src="https://avatars.githubusercontent.com/u/170402797?v=4" width="150" height="150"/>](https://github.com/dyeongg)|
|:-:|:-:|:-:|:-:|
|🐯양해석<br/>[@HSjjs98](https://github.com/HSjjs98)<br/> 역할: 홈, 로그인, DB|🐰김수민<br/>[@ssumanlife](https://github.com/ssumanlife)<br/> 역할: 직원급여내역,<br/>  DB, 와이어프레임|🐶김승민<br/>[@miniseung](https://github.com/miniseung)<br/> 역할: 일정관리페이지,<br/>  ERD, 유저플로우|🐱임효정<br/>[@dyeongg](https://github.com/dyeongg)<br/> 역할: 직원리스트, 디자인|
<br/>
</div>

![토이2pr](https://github.com/user-attachments/assets/9389b52d-63a6-4637-82eb-0c36eadf9e1b)


---
<br/>

## 목차
<img src="https://github.com/user-attachments/assets/9d2778e5-2eac-4528-8b65-8fd5a9df6eb8" width="15" height="15" align='center'/>&nbsp; Workcheck
- [❓ 프로젝트 소개  ](#-프로젝트-소개)
  - [목적](#목적)
  - [배경](#배경)
    - [1. 필요성  ](#1-필요성)
    - [2. 목표 및 기대 효과  ](#2-목표-달성-기대-효과)
- [🕖 프로젝트 타임라인 ](#-프로젝트-타임라인)
  - [기획](#기획)
    - [주요 기능](#주요-기능)
    - [ERD](#erd)
    - [와이어프레임](#와이어프레임)
  - [🧑‍💻 Tech Stack](#-tech-stack)
  - [📄 프로젝트 구조](#-프로젝트-구조)
  - [ 🙌🏻 컨벤션](#-컨벤션)
- [📷 디자인 초안](#-디자인-초안)
  - [🔎 로그인 ](#-로그인)
  - [🏠 로그인 후 홈 화면: 사장님, 직원](#-로그인-후-홈-화면-사장님-직원)
  - [🗓️ 일정관리 페이지](#-일정관리-페이지)
  - [📜 직원리스트 페이지](#-직원리스트-페이지)
  - [💰 급여 확인 및 정정페이지: 사장님, 직원](#-급여-확인-및-정정페이지-사장님-직원)
- [🛠 시작하기](#-시작하기)
  - [배포](#배포)
  - [설치](#설치)
  - [실행](#실행)
<br/>

## ❓ 프로젝트 소개


## 목적
이 프로젝트의 목적은 사장님들과 직원들 모두에게 편리하고 효율적인 급여 관리 및 스케줄 관리를 제공하는 것입니다.<br/>
직원들의 급여를 확인하고 캘린더를 통한 스케줄 관리를 할 수 있습니다.<br/>
이를 통해 사장님은 직원과 원활한 소통과 업무 관리를 경험할 수 있습니다.

## 배경

### 1. 필요성

![토이2-2](https://github.com/user-attachments/assets/76e8c2ef-2f59-45b4-a4b5-40df903d14f1)<br/>
김현수는 20년 전 치킨집을 시작했다. 처음에는 작은 가게에서 시작했지만, 열정과 성실함으로 가게를 점점 키워 현재는 지역에서 유명한 치킨집 사장이 되었다.<br/>
그는 고객 서비스와 맛의 일관성을 최우선으로 생각하며, 손님들이 언제나 만족할 수 있도록 노력하고 있다.

#### 고충과 도전:

- **시간 관리:** 가게 운영으로 인해 개인 시간과 가족과의 시간을 조율하는 것이 어렵다.
- **직원 관리:** 직원들의 교육과 복지에 신경을 쓰지만, 이로 인해 추가적인 스트레스를 받는다.
- **경쟁:** 치열한 외식업계에서 살아남기 위해 끊임없이 새로운 아이디어와 전략이 필요하다.

### 2. 목표 달성 기대 효과
김현수는 급여 및 스케줄 관리 플랫폼을 통해 직원들의 근무 일정을 효율적으로 관리하고, 급여 계산을 자동화하여 시간과 노력을 절약할 수 있다.<br/>
이 플랫폼을 통해 직원들의 출퇴근 시간을 정확히 기록하고, 근무 시간에 따른 급여를 쉽게 계산할 수 있다.<br/>
또한 직원들의 요청사항이나 스케줄 변경 사항도 쉽게 처리할 수 있다.

<br/>


## 🕖 프로젝트 타임라인


## 기획

### 주요 기능

![토이2유저플로우](https://github.com/user-attachments/assets/96072526-2c07-40e2-a40e-3bb1d11cf4ff)
1. 공통 기능
- 로그인
  - 사장님 계정 생성 시 매장 코드 부여
  - 매장 코드를 활용하여 여러 매장에 대한 서비스 제공 가능
- 캘린더를 통한 일정 관리: 등록, 수정 삭제

2. 사장님 기능
  - 직원 리스트 관리 (CRUD)
  - 직원 정보 생성, 읽기, 수정, 삭제
  - 급여 기간 등록
  - 직원 급여 관리
  - 급여 내역 (금액, 정산 내역) 등록 및 수정

3. 직원 기능
  - 급여 내역 확인
  - 급여 정정 신청
  - 캘린더를 통한 일정 관리

<br/>

### ERD

<img width="1774" alt="스크린샷 2024-08-08 오후 6 25 53" src="https://github.com/user-attachments/assets/83881c6e-be99-4e86-a886-908d5bdc9423">

<br/>

### 와이어프레임

![토이2-3](https://github.com/user-attachments/assets/8a5d7470-62bf-4ba6-a3db-3f426a1d08a3)

<br/>

<div align=center>

## 🧑‍💻 Tech Stack


![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white) <br/>
모던한 웹 애플리케이션 개발에서 효율적이고 유지보수 가능한 코드 작성을 위해 React, TypeScript, Redux를 사용

<br/>

#### 💻 Database 💻
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white) <br/>
firestore, 인증, 호스팅 등을 사용하여 빠르고 효율적인 개발을 위해 Firebase를 사용

<br/>

#### 🛠 Tools 🛠
![Emotion](https://img.shields.io/badge/Emotion-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![eslint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)
![prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)
![fullcalendar](https://img.shields.io/badge/fullcalendar-217346?style=for-the-badge&logo=microsoft-excel&logoColor=white) <br/>
모던 웹 개발에서 스타일링, 코드 품질, 일관된 코드 포맷팅을 효율적으로 관리하기 위한 eslint, prettier 설정, 
 Emotion 사용 <br/><br/>
개발 기간이 제약적인 상황에서,<br/> **FullCalendar는 다양한 기능과 높은 커스터마이징** 가능성을 제공하여<br/>복잡한 일정 관리 인터페이스를 쉽게 구현할 수 있기 때문에 선택

</div>

---
## 📄 프로젝트 구조
```
📦Toy_Project_II_team2
 ┣ 📂Public
 ┃ ┣ 📂images
 ┃ ┣ 📂icons
 ┃ ┗ 📂favicon
 ┣ 📂Server
 ┃ ┣ 📜index.js
 ┣ 📂src
 ┃ ┣ 📂API
 ┃ ┣ 📂Components
 ┃ ┣ 📂Pages
 ┃ ┣ 📂Reducers
 ┃ ┣ 📂Utils
 ┗ 📜README.md
```

## 🙌🏻 컨벤션

- 커밋 컨벤션
    - 예시) feat: 홈페이지 스타일링 (#이슈번호)
    - `feat` : 새로운 기능 추가
    - `fix` : 버그 수정
    - `docs` : 문서 수정
    - `style` : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
    - `refactor` : 코드 리펙토링
    - `test` : 테스트 코드, 리펙토링 테스트 코드 추가
    - `chore` : 빌드 업무 수정, 패키지 매니저 수정
- 브랜치 컨벤션
    - 이슈 브랜치명 예시: feat/login-signup-148
    - 이슈 브랜치에서 PR 올리면 검토 후 dev 브랜치로 병합
    - 일주일마다 dev 브랜치를 main 브랜치로 병합
    - PR, Issue template 추가하기
    - MileStone 사용해서 일정 확인 및 관리하기
- css 컨벤션
    - ESLint: [eslint-config-Airbnb-base](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base)
    - Prettier
    - !important 사용 금지
    - id 선택자로 스타일링 지양
    - 스타일링을 위해 요소에 클래스 명 지정할 때 페이지명+요소를 나타내는 ….
        - 예시: loginWrapper , navWrapper, headerWrapper
- 함수 또는 클래스 이름 컨벤션
    - 본인만 아는 이름 사용 x
    - 함수, 변수 이름: Camel Case (ex: userName, handleOnclick)
    - 클래스 컴포넌트 이름: Title Case (ex: Button)

## 📷 디자인 초안

### 🔎 [로그인]
![image](https://github.com/user-attachments/assets/358a0d73-c239-4d78-b985-e1a226e9c6d7)


<br>

### 🏠 [로그인 후 홈 화면: 사장님, 직원]
![image](https://github.com/user-attachments/assets/c7c3dd78-96eb-4068-8e3c-0c1a6bfa7fe7)

<br>

### 🗓️ [일정관리 페이지]

![image](https://github.com/user-attachments/assets/27306904-af18-4911-8300-9b260efe9a82)

<br>

### 📜 [직원리스트 페이지]

![image](https://github.com/user-attachments/assets/c93244c5-97e2-481a-a7f6-c6eb98e6afdc)

<br>

### 💰 [급여 확인 및 정정페이지: 사장님, 직원]

![image](https://github.com/user-attachments/assets/093839f5-950f-4003-b8c7-4c9b0bab90fc)



---

## 🛠 시작하기
### 배포

https://workcheck-d7768.web.app/


### 설치

Workcheck 서비스는 서버와 클라이언트 시스템으로 구성되며 react 와 vite 기반으로 구성되어있습니다.<br>
프로젝트 저장소를 다음 설명에 따라 개발자 컴퓨터에 복사하고 설치 명령을 입력하여 설치를 할 수 있습니다.



```bash
git clone https://github.com/Dev-FE-1/Toy_Project_II_team2.git

cd my-project

npm install
```

### 실행

개발자 로컬 환경에서 개발 모드로 실행하기 위해선 프로젝트 루트 디렉토리에서 다음의 명령을 실행하세요.

```bash
npm run dev 
```

