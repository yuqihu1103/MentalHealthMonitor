document.addEventListener("DOMContentLoaded", () => {
  //get username of current logged-in user
  fetch("/get-username", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch username");
      }
      return response.json();
    })
    .then((data) => {
      //console.log(data.username);
      const usernameElement = document.getElementById("welcome-message");
      if (usernameElement) {
        usernameElement.innerHTML = `Welcome to your dashboard, ${data.username}`;
      }
    })
    .catch((error) => {
      console.error("Error fetching username:", error);
    });

  const testResultsBtn = document.getElementById("test-results");

  testResultsBtn.addEventListener("click", async () => {
    fetch("/get-history")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const historyData = data.history_data;
        //console.log("Historical Data:", historyData);
        displayTestResults(historyData);
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
      });
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
