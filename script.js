const images = [
    "images/roi1.jpeg",
    "images/roi2.jpeg",
    "images/roi3.jpeg",
    "images/lora4.jpeg",
    "images/lora5.jpeg",
    "images/lora1.jpeg",
    "images/lora2.jpeg",
    "images/lora3.jpeg"
  ];
  
  let currentImage = "";
  
  function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  }
  
  function showImage() {
    currentImage = getRandomImage();
    document.getElementById("photo").src = currentImage;
    document.getElementById("resultText").innerText = "";
  }
  
  function checkAnswer(choice) {
    const correct = currentImage.includes("roi") ? "로이" : "로라";
    const result = choice === correct ? "🎉 정답입니다!" : `❌ 오답! 정답은 ${correct}입니다.`;
    document.getElementById("resultText").innerText = result;
  }
  
  function nextImage() {
    showImage();
  }
  
  // 시작 시 이미지 표시
  window.onload = showImage;
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
  