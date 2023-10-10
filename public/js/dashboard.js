document.addEventListener("DOMContentLoaded", () => {
  const takeTestBtn = document.getElementById("take-test");
  const testHistoryBtn = document.getElementById("test-results");
  const logOutButton = document.getElementById("log-out");

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
      // Display a message
      const messageDiv = document.getElementById("logout-message");
      messageDiv.innerHTML = "You are not logged in.";

      //disable buttons and links
      takeTestBtn.classList.add("disabled");
      testHistoryBtn.classList.add("disabled");
      logOutButton.classList.add("disabled");

      // Redirect to ../index.html after a short delay
      setTimeout(() => {
        window.location.href = "../index.html";
      }, 2000); // 2000 milliseconds (2 seconds) delay
    });

  logOutButton.addEventListener("click", () => {
    // Make an HTTP request to the server's /logout route
    fetch("/logout", {
      method: "GET",
    })
      .then((response) => {
        if (response.status === 200) {
          // Display a message
          const messageDiv = document.getElementById("logout-message");
          messageDiv.innerHTML = "Logout successful";

          // Redirect to ../index.html after a short delay
          setTimeout(() => {
            window.location.href = "../index.html";
          }, 2000); // 2000 milliseconds (2 seconds) delay
        }
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
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
    const testResultElement = document.getElementById("test-history");
    testResultElement.innerHTML = `
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Test Type</th>
            <th scope="col">Test Score</th>
            <th scope="col">Severity</th>
            <th scope="col">Time Taken</th>
          </tr>
        </thead>
        <tbody id="test-entries"></tbody>
      </table>
    `;
    const testEntriesElement = document.getElementById("test-entries");
    results.forEach((result) => {
      testEntriesElement.innerHTML += `
        <tr>
          <td>${result.testType}</th>
          <td>${result.testScore}</td>
          <td>${result.severity}</td>
          <td>@${result.time}</td>
        </tr>
      `;
    });
  }
});
