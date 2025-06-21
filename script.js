// 이미지 파일들의 목록 (파일명에 '로이' 또는 '로라'가 포함되어야 함)
const imageList = [
    "images/로이1.jpg",
    "images/로이2.jpg",
    "images/로라1.jpg",
    "images/로라2.jpg"
    // 필요에 따라 더 많은 이미지 파일 경로 추가 가능
  ];
  
  // 게임 상태 변수
  let currentIndex = 0;     // 현재 문제(이미지) 인덱스
  let score = 0;            // 맞힌 개수 (점수)
  
  // 주요 DOM 요소 가져오기
  const startScreen = document.getElementById("start-screen");
  const gameScreen = document.getElementById("game-screen");
  const endScreen = document.getElementById("end-screen");
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  const nextButton = document.getElementById("next-button");
  const royButton = document.getElementById("btn-roy");
  const lauraButton = document.getElementById("btn-laura");
  const imageElement = document.getElementById("current-image");
  const feedbackElem = document.getElementById("feedback");
  const scoreBoard = document.getElementById("scoreboard");
  const finalScoreElem = document.getElementById("final-score");
  
  /** 배열을 무작위로 섞는 함수 (Fisher-Yates shuffle 알고리즘) */
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));  // 0부터 i 사이의 랜덤 인덱스
      // i번째 요소와 j번째 요소를 교환 (swap)
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  /** 게임을 시작할 때 호출되는 함수 */
  function startGame() {
    // 점수 및 인덱스 초기화
    score = 0;
    currentIndex = 0;
    scoreBoard.textContent = `점수: ${score}`;
    feedbackElem.textContent = "";               // 이전 게임의 피드백 문구 지우기
    feedbackElem.className = "";                 // 피드백 색상 초기화
    
    // 이미지 목록 셔플 (무작위 섞기)
    shuffleArray(imageList);
    
    // 첫 번째 문제 이미지 표시
    imageElement.src = imageList[currentIndex];
    
    // 화면 전환: 시작 화면 숨기고 게임 화면 보이기
    startScreen.style.display = "none";
    endScreen.style.display = "none";
    gameScreen.style.display = "block";
    
    // "다음 문제" 버튼 숨기기 (첫 문제 시작이므로)
    nextButton.style.display = "none";
  }
  
  /** 현재 이미지가 로이인지 로라인지 정답 확인 */
  function checkAnswer(userAnswer) {
    const currentImagePath = imageList[currentIndex];
    // 파일명에서 '로이' 또는 '로라' 포함 여부로 정답 추출
    // toLowerCase()는 영어 대비용 (여기선 한글명이므로 필요없지만 안전 차원)
    const fileName = currentImagePath.split("/").pop().toLowerCase();
    let correctAnswer;
    if (fileName.includes("로이")) {
      correctAnswer = "로이";
    } else if (fileName.includes("로라")) {
      correctAnswer = "로라";
    } else {
      correctAnswer = "";  // (혹시 해당 문자열이 없으면 빈 문자열)
    }
    
    // 사용자의 선택과 정답 비교
    if (userAnswer === correctAnswer) {
      // 정답일 경우
      score++;
      feedbackElem.textContent = "정답입니다!";
      feedbackElem.className = "correct";   // 글자색 초록 (CSS .correct 클래스)
    } else {
      // 오답일 경우
      feedbackElem.textContent = "틀렸어요!";
      feedbackElem.className = "wrong";     // 글자색 빨강 (CSS .wrong 클래스)
    }
    
    // 현재 점수를 갱신하여 표시
    scoreBoard.textContent = `점수: ${score}`;
    
    // 다음 문제 버튼 노출 (누르면 다음 이미지 로드)
    nextButton.style.display = "inline-block";
    
    // 정답 확인 후에는 정답 버튼들을 잠시 비활성화하여 중복 답변 방지
    royButton.disabled = true;
    lauraButton.disabled = true;
  }
  
  /** 다음 문제를 표시하는 함수 */
  function showNextQuestion() {
    currentIndex++;
    if (currentIndex < imageList.length) {
      // 다음 이미지가 있을 경우 해당 이미지를 표시
      imageElement.src = imageList[currentIndex];
      // 피드백 및 다음 버튼 초기화/숨김
      feedbackElem.textContent = "";
      feedbackElem.className = "";
      nextButton.style.display = "none";
      // 정답 버튼들 다시 활성화
      royButton.disabled = false;
      lauraButton.disabled = false;
    } else {
      // 더 이상 문제가 없으면 게임 종료 처리
      endGame();
    }
  }
  
  /** 게임 종료 시 호출되는 함수 */
  function endGame() {
    // 최종 점수 메시지 설정
    finalScoreElem.textContent = `총 ${imageList.length}문제 중 ${score}문제를 맞혔습니다!`;
    // 화면 전환: 퀴즈 화면 숨기고 종료 화면 표시
    gameScreen.style.display = "none";
    endScreen.style.display = "block";
  }
  
  /** 초기 이벤트 리스너 설정 */
  // "게임 시작" 버튼 클릭 -> 게임 시작
  startButton.addEventListener("click", startGame);
  // "로이" 정답 버튼 클릭 -> 로이 선택으로 체크
  royButton.addEventListener("click", () => {
    checkAnswer("로이");
  });
  // "로라" 정답 버튼 클릭 -> 로라 선택으로 체크
  lauraButton.addEventListener("click", () => {
    checkAnswer("로라");
  });
  // "다음 문제" 버튼 클릭 -> 다음 이미지로 이동
  nextButton.addEventListener("click", showNextQuestion);
  // "다시 시작" 버튼 클릭 -> 게임 재시작 (startGame 재호출 및 화면 전환)
  restartButton.addEventListener("click", () => {
    // 종료 화면 숨기고 게임 시작 화면을 다시 보여준 뒤, startGame 호출 or 바로 startGame
    // 여기서는 바로 게임을 다시 시작하도록 함
    startGame();
  });
  