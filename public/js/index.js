document.addEventListener("DOMContentLoaded", loadHomepage);
const homeLink = document.getElementById("home-link");
const learnMoreLink = document.getElementById("learn-more-link");
homeLink.addEventListener("click", loadHomepage);
learnMoreLink.addEventListener("click", loadLearnMore);

function loadHomepage() {
  const mainContent = document.getElementById("main-content");
  const contactInfo = document.getElementById("contact-info");

  mainContent.innerHTML = `
        <h1 class="text-center">Welcome to the Mental Health Monitor</h1>
        <div class="container">
            <div class="row justify-content-center">
            <div class="col-lg-6 col-md-12">
                <img
                src="./assets/homepage_main_photo.jpg"
                alt="Artwork illustrating positive mental health"
                class="img-fluid"
                />
            </div>
            <div class="col-lg-6 col-md-12">
                <p>
                The Mental Health Monitor is your trusted companion on your
                journey to emotional well-being. Our mission is to provide you
                with valuable insights into your mental health and help you take
                control of your emotional wellness.
                </p>
                <p>
                Whether you're looking to track your progress, gain
                self-awareness, or simply explore your mental health, we're here
                to support you every step of the way. Register today to get
                started on your path to a healthier mind and a brighter future.
                </p>
            </div>
            </div>
        </div>
    `;

  contactInfo.innerHTML = `
        <h3>Contact the Authors</h3>
        <p>email: hu.yuqi@northeastern.edu</p>
        <p>email: zhang.zhiqi@northeastern.edu</p>
    `;
}

function loadLearnMore() {
  const mainContent = document.getElementById("main-content");
  const contactInfo = document.getElementById("contact-info");

  mainContent.innerHTML = `
        <h1>More About the Mental Health Monitor</h1>
        <div class="row">
            <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="card" style="width: 18rem">
                <img
                src="./assets/learn_more_details.jpg"
                class="card-img-top"
                alt="Image illustration of unlocking one's mind"
                height="180"
                />
                <div class="card-body">
                <h5 class="card-title">How Does It Work?</h5>
                <p class="card-text">
                    After registering and loginning in with your cresentials, you
                    can measure your anxiety and depression level with profession
                    psychometric instruments. You can view the history of your test
                    results and apply filters to gain insight if you would like.
                </p>
                <p class="card-text">
                    Do so while enjoying our responsive and interactive UI as well
                    as secure storage of sensitive data and indormation!
                </p>
                </div>
            </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="card" style="width: 18rem">
                <img
                src="./assets/learn_more_anxiety.webp"
                class="card-img-top"
                alt="Image illustration of one having anxiety"
                height="180"
                />
                <div class="card-body">
                <h5 class="card-title">Your Anxiety Level</h5>
                <p class="card-text">
                    We provide the Generalized Anxiety Disorder 7 (GAD-7), which is
                    a self-reported questionnaire for screening and severity
                    measuring of anxiety.
                </p>
                <p class="card-text">
                    You can get a valid and reliable measurement of your anxiety
                    level within a minute and make informed decisions based on that.
                </p>
                <p class="card-text">
                    Please seek professional support if your test results indicate
                    high levels of anxiety.
                </p>
                </div>
            </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="card" style="width: 18rem">
                <img
                src="./assets/learn_more_depression.jpg"
                class="card-img-top"
                alt="Image illustration of one having depression"
                height="180"
                />
                <div class="card-body">
                <h5 class="card-title">Your Depression Level</h5>
                <p class="card-text">
                    We provide the nine-item Patient Health Questionnaire (PHQ-9), a
                    depressive symptom scale and diagnostic tool. It has been used
                    by primary care providers to screen for possible depression.
                </p>
                <p class="card-text">
                    Enjoy the convenience of this short scale and rest assured with
                    its excellent validity and reliability.
                </p>
                <p class="card-text">
                    Please seek professional support if your test results indicate
                    high levels of depression.
                </p>
                </div>
            </div>
            </div>
        </div>
    `;

  contactInfo.innerHTML = "";
}
