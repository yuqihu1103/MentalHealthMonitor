document.addEventListener("DOMContentLoaded", () => {
  const testResultsBtn = document.getElementById("test-results");

  testResultsBtn.addEventListener("click", async () => {
    try {
      const response = await fetch("/api/test-results");
      const data = await response.json();

      displayTestResults(data);
    } catch (error) {
      console.error("Error fetching test results:", error);
    }
  });

  function displayTestResults(results) {
    const resultsContainer = document.createElement("div");
    resultsContainer.className = "results-container";

    results.forEach((result) => {
      const resultElement = document.createElement("div");
      resultElement.className = "result-item";
      resultElement.innerHTML = `
                <p><strong>User:</strong> ${result.user}</p>
                <p><strong>Test Type:</strong> ${result.testType}</p>
                <p><strong>Test Score:</strong> ${result.testScore}</p>
                <p><strong>Severity:</strong> ${result.severity}</p>
                <p><strong>Time:</strong> ${result.time}</p>
            `;
      resultsContainer.appendChild(resultElement);
    });

    const dashboardContainer = document.querySelector(".dashboard-container");
    dashboardContainer.appendChild(resultsContainer);
  }
});
