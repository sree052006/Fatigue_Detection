let reactionStartTime;
let reactionTime = 0;
let testReady = false;
let emotionalHistory = JSON.parse(localStorage.getItem("emotionData")) || [];
let keyTimes = [];
let startTime = Date.now();
let activeTime = 0;
let lastActive = Date.now();

/* ══════════════════════════════════════════════════════════════ */
/* 📱 MOBILE MENU FUNCTIONALITY                                   */
/* ══════════════════════════════════════════════════════════════ */
function toggleMobileMenu() {
  const navMenu = document.getElementById('navMenu');
  navMenu.classList.toggle('open');
  
  // Prevent body scroll when menu is open
  if (navMenu.classList.contains('open')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
}

function closeMobileMenu() {
  const navMenu = document.getElementById('navMenu');
  navMenu.classList.remove('open');
  document.body.style.overflow = 'auto';
}

// Close menu when clicking outside of it
document.addEventListener('click', function(event) {
  const navMenu = document.getElementById('navMenu');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  
  if (navMenu && hamburgerBtn && !navMenu.contains(event.target) && !hamburgerBtn.contains(event.target)) {
    closeMobileMenu();
  }
});

/* ══════════════════════════════════════════════════════════════ */

function showPage(pageId) {
  // 1. Hide every element with the class 'page'
  const pages = document.querySelectorAll('.page');
  pages.forEach(p => {
    p.style.display = 'none'; 
    p.classList.remove('active');
  });

  // 2. Show only the target page
  const activePage = document.getElementById(pageId);
  if (activePage) {
    activePage.style.display = 'block';
    activePage.classList.add('active');
  }

  // 3. Special case: If navigating away from home, ensure Auth is hidden
  // If your authSection doesn't have the 'page' class, add it in HTML
  if (pageId !== 'authSection') {
     document.getElementById('authSection').style.display = 'none';
  }
}
function calculateTypingSpeed() {
    if (keyTimes.length < 2) return 0;
    let duration = (keyTimes[keyTimes.length - 1] - keyTimes[0]) / 60000;
    return Math.round(keyTimes.length / duration);
}

function goToDashboard() {
    activeTime += Date.now() - lastActive;
    let speed = calculateTypingSpeed();
    document.getElementById("typingSpeed").innerText = speed + " words/min";
    document.getElementById("screenTime").innerText = Math.round(activeTime / 60000);
    showPage("dashboard");
}

function calculateScore() {
    let sleep = parseFloat(document.getElementById("sleepInput").value);
    let speed = calculateTypingSpeed();
    let screenMinutes = activeTime / 60000;

    let score = 0;

    if (sleep < 6) score += 25;
    if (screenMinutes > 120) score += 20;
    if (speed < 20) score += 20;

    document.getElementById("score").innerText = score;

    let risk = "Low";
    let suggestion = "You're doing well!";

    if (score > 60) {
        risk = "High";
        suggestion = "Stop screen usage. Try breathing exercise.";
    } else if (score > 30) {
        risk = "Medium";
        suggestion = "Take a short break and stretch.";
    }

    document.getElementById("risk").innerText = risk;
    document.getElementById("suggestion").innerText = suggestion;
     
    // Emotional Score Calculation
let emotionalScore = 100 - score;
emotionalHistory.push(emotionalScore);

// Keep only last 7 days
if (emotionalHistory.length > 7) {
    emotionalHistory.shift();
}

localStorage.setItem("emotionData", JSON.stringify(emotionalHistory));

// Drift Detection
if (emotionalHistory.length >= 3) {
    let len = emotionalHistory.length;
    if (
        emotionalHistory[len - 1] < emotionalHistory[len - 2] &&
        emotionalHistory[len - 2] < emotionalHistory[len - 3]
    ) {
        alert("⚠ Emotional decline detected over last 3 sessions.");
    }
}
    showPage("cognitive");

    if (score > 30) {
        alert("⚠ Fatigue Risk Detected!");
    }
    saveToFirebase({
    typingSpeed: typingSpeed,
    screenTime: screenTime,
    sleepHours: sleepHours,
    reactionTime: reactionTime,
    fatigueScore: fatigueScore,
    timestamp: new Date()
});
}

function startTest() {
    document.getElementById("reactionResult").innerText = "";
    document.getElementById("reactionBox").style.backgroundColor = "red";
    document.getElementById("reactionText").innerText = "Wait for GREEN...";
    testReady = false;

    setTimeout(() => {
        document.getElementById("reactionBox").style.backgroundColor = "green";
        reactionStartTime = Date.now();
        testReady = true;
    }, Math.random() * 3000 + 2000);
}
document.getElementById("reactionBox").addEventListener("click", function () {
    if (!testReady) {
        document.getElementById("reactionResult").innerText = "Too early! Try again.";
        return;
    }

    reactionTime = Date.now() - reactionStartTime;
    document.getElementById("reactionResult").innerText =
        "Reaction Time: " + reactionTime + " ms";
});

function finishTest() {
    if (reactionTime > 600) {
        alert("⚠ Slow reaction detected. Cognitive fatigue risk increased.");
    }
    showPage("result");
}

async function saveToFirebase(data) {
    try {
        const user = window.auth.currentUser;

        if (!user) {
            alert("Please login first");
            return;
        }
        await addDoc(collection(window.db, "fatigue_records"), data);
        console.log("Data saved successfully!");
        alert("Data stored in cloud successfully 🚀");
    } catch (error) {
        console.error("Error saving data: ", error);
    }
}
async function signup() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        await window.createUserWithEmailAndPassword(window.auth, email, password);
        alert("Signup successful 🎉");
    } catch (error) {
        alert(error.message);
    }
}

async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        await window.signInWithEmailAndPassword(window.auth, email, password);
        alert("Login successful ✅");
    } catch (error) {
        alert(error.message);
    }
}

async function logout() {
    await signOut(window.auth);
    alert("Logged out 👋");
}