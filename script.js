const images = [
    "images/roi1.jpeg",
    "images/roi2.jpeg",
    "images/roi3.jpeg",
    "images/roi4.jpeg",
    "images/roi5.jpeg",
    "images/lora1.jpeg",
    "images/lora2.jpeg",
    "images/lora3.jpeg"
  ];
  
  let quizImages = [];
  let currentImage = "";
  let currentIndex = 0;
  let correctCount = 0;
  
  function shuffleArray(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }
  
  function startGame() {
    quizImages = shuffleArray(images.slice()); // 복사 후 셔플
    currentIndex = 0;
    correctCount = 0;
    showImage();
    document.getElementById("restartBtn").style.display = "none";
  }
  
  function showImage() {
    currentImage = quizImages[currentIndex];
    document.getElementById("photo").src = currentImage;
    document.getElementById("resultText").innerText = "";
    document.getElementById("nextBtn").style.display = "none";
  }
  
  function checkAnswer(choice) {
    const correct = currentImage.includes("roi") ? "로이" : "로라";
    const isCorrect = choice === correct;
  
    if (isCorrect) {
      correctCount++;
      document.getElementById("resultText").innerText = "✅ 정답!";
    } else {
      document.getElementById("resultText").innerText = `❌ 오답! 정답은 ${correct}입니다.`;
    }
  
    document.getElementById("nextBtn").style.display = "inline-block";
  
    // 마지막 문제일 경우 결과로 전환
    if (currentIndex === quizImages.length - 1) {
      document.getElementById("nextBtn").innerText = "결과 보기";
    }
  }
  
  function nextImage() {
    currentIndex++;
    if (currentIndex < quizImages.length) {
      showImage();
    } else {
      showResult();
    }
  }
  
  function showResult() {
    const resultText = correctCount === quizImages.length
      ? "🎉 당신은 우리의 가족이네요!"
      : `총 ${quizImages.length}문제 중 ${correctCount}개 맞췄습니다.`;
  
    document.getElementById("photo").style.display = "none";
    document.querySelector(".buttons").style.display = "none";
    document.getElementById("resultText").innerText = resultText;
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("restartBtn").style.display = "inline-block";
  }
  
  function restartGame() {
    document.getElementById("photo").style.display = "block";
    document.querySelector(".buttons").style.display = "block";
    document.getElementById("nextBtn").innerText = "다음";
    startGame();
  }
  
  // 시작 시 실행
  window.onload = startGame;

  function showResult() {
    const resultText = correctCount === quizImages.length
      ? "🎉 당신은 우리의 가족이네요!"
      : "😭 모두 맞추지 못한 당신은 나의 가족이 아니예요 ㅠ";
  
    document.getElementById("photo").style.display = "none";
    document.querySelector(".buttons").style.display = "none";
    document.getElementById("resultText").innerText = resultText;
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("restartBtn").style.display = "inline-block";
  }
  