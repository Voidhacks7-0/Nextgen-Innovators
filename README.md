# Nextgen-Innovators
Project Overview
The SVVV Student Portal is a comprehensive, single-page web application designed to bridge the gap between academic management and career preparation. It serves as a centralized hub for students to track their college performance while actively preparing for placement interviews using AI-driven tools.

Main Features
Placement Intelligence Hub:

Company Explorer: A curated list of top recruiters (Google, TCS, Amazon) with detailed breakdowns of their selection processes and eligibility criteria.

AI Mock Tests: A configurable testing engine where students can take timed assessments tailored to specific domains (DSA, Aptitude, Verbal) and difficulty levels.

Predictive Analysis: Post-test analytics that calculate a "Selection Probability" score and visualize skill gaps using Radar Charts.

Smart Academics:

Syllabus Tracker: Visual progress bars for tracking course completion.

AI Career Roadmap:

Integrated Generative AI (Gemini) feature that builds personalized, step-by-step study plans based on the student's target company and role.

Faculty Collaboration:

A dedicated module for viewing assigned mentors, tracking faculty-assigned remedial tasks, and receiving automated performance status reports.

User Workflow
Dashboard: The student logs in to view a snapshot of their Attendance, CGPA, and Placement Score.

Target Selection: The student navigates to Placement, explores company requirements, and selects a target (e.g., Google).

Assessment: They configure a test (e.g., DSA Focus), take the timed quiz, and submit it.

Review: The system instantly grades the test, provides a probability of selection, and highlights weak areas (e.g., "Weak in Dynamic Programming").

Improvement: The student uses the AI Roadmap to generate a study plan or checks the Collaboration tab for faculty-assigned tasks to improve those specific skills.

Workflow
│
├── /frontend          
│   ├── login.html              
│   ├── student_portal.html  |   
                                                  ├── placement_page.ht   
│   ├── teacher_portal.html     
│   ├── admin_portal.html       
│   └── /assets                 (Images, icons, css if separated)
│
├── /backend           <-- The Node.js logic
│   ├── server.js               (Main Entry Point)
│   ├── /models                 (Database Schemas)
│   │   ├── User.js
│   │   ├── Test.js
│   │   └── Submission.js
│   └── /routes                 (API Paths)
│       ├── auth.js
│       ├── student.js
│       └── teacher.js
├── package.json
└── .env                        (Database passwords, API keys)
