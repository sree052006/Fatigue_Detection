# Fatigue_Detection
Based on the provided source code for **FatigueGuard**, here is the documentation covering the project's README, problem statement, working principles, functions, and solutions.



**Project Name:** FatigueGuard **Tagline:** Protect Your Mind & Focus **Description:** FatigueGuard is an AI-powered wellness application designed to detect cognitive fatigue through smart behavioral analysis. It helps users identify when they are approaching burnout by monitoring typing patterns, reaction times, and sleep data.

---

### **2. Problem Statement**

In modern work environments, individuals often push through mental exhaustion without realizing their cognitive performance has significantly dropped. This "emotional fatigue" leads to:

* 
**Burnout:** Prolonged stress and lack of recovery.


* 
**Reduced Productivity:** Slower reaction times and decreased focus.


* 
**Health Issues:** Lack of adequate sleep and constant screen time.
Traditional fatigue tracking is often manual or reactive; FatigueGuard aims to provide a proactive, data-driven assessment.



---

### **3. Working Principles**

The application operates by collecting three primary data points to calculate a **Fatigue Score**:

1. 
**Behavioral Analysis:** Measures "Typing Duration" (how long a user spends on a specific typing task).


2. 
**Cognitive Performance:** Uses a "Reaction Challenge" where the user must click a box when it changes color, measuring response speed in milliseconds.


3. 
**Self-Reported Data:** Users input their "Sleep Hours" from the previous night.



The system then aggregates these metrics to categorize the user into **Low**, **Moderate**, or **High Risk** fatigue levels.

---

### **4. Key Functions**

The application is built as a Single Page Application (SPA) with the following core functions:

* 
**`showPage(pageId)`**: Manages navigation by toggling the `active` class on different sections of the HTML.


* 
**`calculateScore()`**: The core logic that processes typing speed, reaction time, and sleep hours to generate a final fatigue percentage and risk assessment.


* 
**`initMemoryGame()` / `initColorGame()**`: Functions that initialize cognitive exercises used as both assessments and "mental breaks".


* 
**`signup()` / `login()**`: Handles user authentication using the Firebase SDK.


* 
**`toggleMobileMenu()`**: Ensures the interface is responsive for mobile users.



---

### **5. Solutions & Features**

FatigueGuard provides several "solutions" (interventions) based on the detected fatigue level:

* 
**Personalized Suggestions:** * **Low Risk (Green):** Encourages maintaining current habits with tips like staying hydrated.


* 
**Moderate Risk (Yellow):** Advises stepping away from screens and taking a short walk.


* 
**High Risk (Red):** Urges immediate rest and quality sleep.




* 
**Cognitive Challenges:** Provides games like **Memory Match** (to test recall) and the **Stroop-style Color Game** (to test mental focus).


* 
**Wellness Tools:** Includes a **Guided Breathing** module with "Inhale/Exhale" animations to help lower immediate stress levels.


* 
**Data Visualization:** Uses `Chart.js` to display a "Focus Breakdown" donut chart, visually representing the user's cognitive state.

  specific link : https://sree052006.github.io/Fatigue_Detection/
  
