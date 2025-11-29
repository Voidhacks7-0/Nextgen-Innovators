// Replace the existing startTest() function in SVVV_Placement_Page.html with this:

async function startTest() {
    // 1. Get User Selection
    const company = document.querySelector('select').value; // e.g., Google
    const typeSelect = document.getElementById('test-type');
    const typeValue = typeSelect ? typeSelect.value : 'dsa';
    
    // Map dropdown values to prompt context
    let round = "Technical Coding";
    if (typeValue === 'aptitude') round = "Aptitude and Logical Reasoning";
    if (typeValue === 'dsa') round = "Data Structures and Algorithms";
    if (typeValue === 'mixed') round = "Mixed Assessment (Aptitude + Technical)";

    // 2. Show Loading State
    document.getElementById('app-content').innerHTML = `
        <div class="flex flex-col items-center justify-center h-full fade-in">
            <div class="loader mb-6"></div>
            <h3 class="text-xl font-bold text-slate-800">AI is Constructing Your Test...</h3>
            <p class="text-slate-500 mt-2">Fetching latest interview patterns for <span class="font-bold text-[#fbbf24]">${company}</span></p>
            <div class="mt-4 text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                Generating 5 unique questions for ${round}
            </div>
        </div>`;

    try {
        // 3. Call Backend API
        const response = await fetch('http://localhost:5000/api/generate-test', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                company: company,
                role: "SDE-1",       // You can make this dynamic too
                round: round,
                difficulty: "Medium" // You can make this dynamic too
            })
        });

        const data = await response.json();

        if (data.success) {
            // 4. Update State with AI Questions
            state.activeQuestionBank = data.questions;
            state.userAnswers = {};
            state.currentQIndex = 0;
            state.timer = 1800; // 30 mins

            // 5. Render Test View
            renderTest(); // This calls your existing render function
        } else {
            alert("Failed to generate test. Please try again.");
            switchView('config');
        }

    } catch (error) {
        console.error("API Error:", error);
        alert("Server connection failed. Ensure Node.js server is running.");
        switchView('config');
    }
}