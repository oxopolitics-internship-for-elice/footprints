# 규칙 및 컨벤션

---

## 미팅 시간

1. 코어타임은 1-5시
2. 데일리 스크럼은 1시 시작할 때 간단하게

---

## 커밋 컨벤션

- [feat] 새로운 기능에 대한 커밋
- [fix] 버그 수정에 대한 커밋
- [docs] 문서 수정에 대한 커밋
- [build] 빌드 관련 파일 수정에 대한 커밋
- [chore] 그 외 자잘한 수정에 대한 커밋
- [style] 코드 스타일 혹은 포맷 등에 관한 커밋
- [refactor] 코드 리팩토링에 대한 커밋
- [test] 테스트 코드에 대한 커밋

---

## 브랜치 컨벤션

- 브랜치 이름
  - 프론트는 F/기능명, 백은 B/기능명
- 브랜치 관리
  1. develop에서 feature 브랜치를 따고
  2. 오류가 모두 제거된 완전한 dev를 master에 merge
  3. develop 브랜치를 따서 1부터 반복
- 레포는 하나에서 폴더만 client/server로 나눠서 구성

---

## 코드 컨벤션

- 변수, 함수 : camelCase
- 컴포넌트, 파일 : PascalCase
- 상수 : UPPERCASE_SNAKE_CASE
- 폴더 : kebab-case
- 클래스, 인터페이스 : PascalCase
