// Global counters for notifications
let activeNotifCount = 0;
let historyNotifCount = 0;

function updateBottomNavNotif() {
  const bottomNotif = document.getElementById("interactions-notification");
  if (activeNotifCount > 0 || historyNotifCount > 0) {
    bottomNotif.style.display = "block";
    bottomNotif.classList.add("pulse");
  } else {
    bottomNotif.style.display = "none";
    bottomNotif.classList.remove("pulse");
  }
}

// Main view switching elements
const socialsLink = document.getElementById("socials-link");
const returnIcon = document.getElementById("return-icon");
const defaultView = document.getElementById("default-view");
const socialsView = document.getElementById("socials-view");
const interactionsView = document.getElementById("interactions-view");
const invitationsView = document.getElementById("invitations-view");
const notificationsView = document.getElementById("notifications-view");
const topBarTitle = document.getElementById("top-bar-title");
const profileHeader = document.getElementById("profile-header");
const navInteractions = document.getElementById("nav-interactions");
const navInvitations = document.getElementById("nav-invitations");
const navProfile = document.getElementById("nav-profile");
const navNotifications = document.getElementById("nav-notifications");

function setActiveNav(activeEl) {
  navInteractions.classList.remove("active");
  navInvitations.classList.remove("active");
  navProfile.classList.remove("active");
  navNotifications.classList.remove("active");
  activeEl.classList.add("active");
}

socialsLink.addEventListener("click", function() {
  defaultView.classList.add("hidden");
  socialsView.classList.remove("hidden");
  socialsView.classList.add("visible");
  topBarTitle.textContent = "Socials";
  profileHeader.style.display = "block";
  returnIcon.style.display = "block";
  setActiveNav(navProfile);
});

returnIcon.addEventListener("click", function() {
  socialsView.classList.remove("visible");
  socialsView.classList.add("hidden");
  interactionsView.classList.remove("visible");
  interactionsView.classList.add("hidden");
  defaultView.classList.remove("hidden");
  defaultView.classList.add("visible");
  topBarTitle.textContent = "My Profile";
  profileHeader.style.display = "block";
  returnIcon.style.display = "none";
  setActiveNav(navProfile);
});

navInvitations.addEventListener("click", function() {
  closeAllViews();
  defaultView.classList.add("hidden");
  socialsView.classList.add("hidden");
  interactionsView.classList.add("hidden");
  invitationsView.classList.remove("hidden");
  invitationsView.classList.add("visible");
  topBarTitle.textContent = "Invitations";
  profileHeader.style.display = "none";
  returnIcon.style.display = "none";
  setActiveNav(navInvitations);
});

navProfile.addEventListener("click", function() {
  closeAllViews();
  socialsView.classList.add("hidden");
  invitationsView.classList.add("hidden");
  interactionsView.classList.add("hidden");
  defaultView.classList.remove("hidden");
  defaultView.classList.add("visible");
  topBarTitle.textContent = "My Profile";
  profileHeader.style.display = "block";
  returnIcon.style.display = "none";
  setActiveNav(navProfile);
});

navInteractions.addEventListener("click", function() {
  closeAllViews();
  defaultView.classList.add("hidden");
  socialsView.classList.add("hidden");
  invitationsView.classList.add("hidden");
  interactionsView.classList.remove("hidden");
  interactionsView.classList.add("visible");
  topBarTitle.textContent = "Interactions";
  profileHeader.style.display = "none";
  returnIcon.style.display = "none";
  setActiveNav(navInteractions);
  // When clicking the interactions icon, clear both active and history notifications
  activeNotifCount = 0;
  historyNotifCount = 0;
  document.getElementById("active-notification").style.display = "none";
  document.getElementById("history-notification").style.display = "none";
  updateBottomNavNotif();
});

navNotifications.addEventListener("click", function() {
  closeAllViews();
  defaultView.classList.add("hidden");
  socialsView.classList.add("hidden");
  interactionsView.classList.add("hidden");
  invitationsView.classList.add("hidden");
  notificationsView.classList.remove("hidden");
  notificationsView.classList.add("visible");
  topBarTitle.textContent = "Notifications";
  profileHeader.style.display = "none";
  returnIcon.style.display = "none";
  setActiveNav(this);
  
  // Clear notifications count
  notificationsCount = 0;
  document.getElementById("notifications-count").style.display = "none";
});

// Interactions Tabs Logic
const interactionsActiveTab = document.getElementById("interactions-active-tab");
const interactionsHistoryTab = document.getElementById("interactions-history-tab");
const interactionsActiveContent = document.getElementById("interactions-active-content");
const interactionsHistoryContent = document.getElementById("interactions-history-content");

interactionsActiveTab.addEventListener("click", function() {
  interactionsActiveTab.classList.add("active");
  interactionsHistoryTab.classList.remove("active");
  interactionsActiveContent.classList.add("visible");
  interactionsHistoryContent.classList.remove("visible");
  activeNotifCount = 0;
  document.getElementById("interactions-active-notification").style.display = "none";
  updateBottomNavNotif();
});

interactionsHistoryTab.addEventListener("click", function() {
  interactionsHistoryTab.classList.add("active");
  interactionsActiveTab.classList.remove("active");
  interactionsHistoryContent.classList.add("visible");
  interactionsActiveContent.classList.remove("visible");
  historyNotifCount = 0;
  document.getElementById("history-notification").style.display = "none";
  updateBottomNavNotif();
});

// Invitations Tabs Logic
const invitationsInviteTab = document.getElementById("invitations-invite-tab");
const invitationsRequestTab = document.getElementById("invitations-request-tab");
const invitationsInviteContent = document.getElementById("invitations-invite-content");
const invitationsRequestContent = document.getElementById("invitations-request-content");

invitationsInviteTab.addEventListener("click", function() {
  invitationsInviteTab.classList.add("active");
  invitationsRequestTab.classList.remove("active");
  invitationsInviteContent.classList.add("visible");
  invitationsRequestContent.classList.remove("visible");
});

invitationsRequestTab.addEventListener("click", function() {
  invitationsRequestTab.classList.add("active");
  invitationsInviteTab.classList.remove("active");
  invitationsRequestContent.classList.add("visible");
  invitationsInviteContent.classList.remove("visible");
});

// Invitations - Generate/Submit Code Logic
const generateCodeBtn = document.getElementById("generate-code-btn");
const submitCodeBtn = document.getElementById("submit-code-btn");
const requestCodeInput = document.getElementById("request-code-input");
const generatedCodeInput = document.getElementById("generated-code-input");
const pendingEvaluationContainer = document.getElementById("pending-evaluation-container");

// Global variable to track the pending element currently under evaluation.
let currentPendingElement = null;

// Create a new pending evaluation element with a loader first
function createPendingEvaluation() {
  const pendingEl = document.createElement("div");
  pendingEl.className = "pending-evaluation";
  pendingEl.innerHTML = `
    <div class="loader"></div>
    <span>Simulating...</span>
  `;
  pendingEvaluationContainer.appendChild(pendingEl);
  
  setTimeout(function() {
    const user = generateUsername();
    const isVerified = Math.random() > 0.3; // 70% chance of being verified
    const badgeHTML = isVerified ? 
      `<img src="media/verify.svg" alt="Verified" class="verify-icon-main" style="width:16px;height:16px;">` : 
      '';
    
    pendingEl.innerHTML = `
      <div class="profile-placeholder">
        <img src="${getRandomProfilePic(user.isFemale)}" alt="Profile">
      </div>
      <span>${user.name}</span>
      ${badgeHTML}
      <img src="media/eye.svg" alt="View" class="action-icon" style="position: absolute; right: 20px; top: 50%; transform: translateY(-50%); width: 24px; height: 24px; opacity: 0.7; cursor: pointer;">
    `;

    // Add hover effect for eye icon
    const eyeIcon = pendingEl.querySelector('.action-icon');
    eyeIcon.addEventListener('mouseenter', () => eyeIcon.style.opacity = '1');
    eyeIcon.addEventListener('mouseleave', () => eyeIcon.style.opacity = '0.7');

    // Generate random reviews for the evaluation section
    const numReviews = Math.floor(Math.random() * 4) + 1; // 1-4 reviews
    const reviews = [];
    for(let i = 0; i < numReviews; i++) {
      const reviewer = generateUsername();
      reviews.push({
        username: reviewer.name,
        isVerified: Math.random() > 0.3, // 70% chance of being verified
        review: generateRandomReview(),
        profilePic: getRandomProfilePic(reviewer.isFemale)
      });
    }

    pendingEl.addEventListener("click", function() {
      currentPendingElement = pendingEl;
      openEvaluationSection(user.name, isVerified, reviews);
    });
  }, 2000);
}

generateCodeBtn.addEventListener("click", function() {
  let code = "INV-" + Math.floor(100000 + Math.random() * 900000);
  generatedCodeInput.value = code;
  navigator.clipboard.writeText(code);
  createPendingEvaluation();
});

submitCodeBtn.addEventListener("click", createPendingEvaluation);

// Evaluation Section Logic (instead of Modal)
const evaluationSection = document.getElementById("evaluation-section");
const evaluationReturnArrow = document.getElementById("evaluation-return-arrow");
const evaluationUsernameSpan = document.getElementById("evaluation-username");
const createInteractionBtn = document.getElementById("create-interaction-btn");
const deleteInteractionBtn = document.getElementById("delete-interaction-btn");

function generateUserStats() {
  return {
    total: Math.floor(Math.random() * 15),
    repeated: Math.floor(Math.random() * 3),
    crossInvite: Math.floor(Math.random() * 4),
    reports: Math.floor(Math.random() * 2)
  };
}

function openEvaluationSection(username, isVerified, reviews) {
  evaluationUsernameSpan.textContent = username;
  
  // Update verification badge in evaluation section
  const verifyBadge = evaluationSection.querySelector(".verify-icon-main");
  if (verifyBadge) {
    verifyBadge.style.display = isVerified ? "inline-block" : "none";
  }

  // Generate and update user stats
  const stats = generateUserStats();
  const statElements = evaluationSection.querySelectorAll('.interaction-box .stat-number');
  statElements[0].textContent = stats.total;
  statElements[1].textContent = stats.repeated;
  statElements[2].textContent = stats.crossInvite;
  statElements[3].textContent = stats.reports;

  // Update reviews list
  const reviewsList = evaluationSection.querySelector(".reviews-list");
  reviewsList.innerHTML = reviews.map(review => `
    <div class="review-card">
      <div class="review-pic">
        <img src="${review.profilePic}" alt="Profile">
      </div>
      <div class="review-details">
        <div class="review-username">
          ${review.username}
          ${review.isVerified ? `<img src="media/verify.svg" alt="Verified" style="width:14px;height:14px;" />` : ''}
        </div>
        <div class="star-container">
          ${Array(5).fill(0).map((_, i) => `
            <img src="media/star.svg" alt="Star" class="star-icon" 
                 style="opacity: ${i < review.review.rating ? '1' : '0.3'};" />
          `).join('')}
        </div>
        <p class="review-text">${review.review.text}</p>
      </div>
    </div>
  `).join('');

  invitationsView.classList.add("hidden");
  evaluationSection.classList.remove("hidden");
  evaluationSection.classList.add("visible");
}

function closeEvaluationSection() {
  evaluationSection.classList.remove("visible");
  evaluationSection.classList.add("hidden");
  invitationsView.classList.remove("hidden");
  invitationsView.classList.add("visible");
}

evaluationReturnArrow.addEventListener("click", function() {
  closeEvaluationSection();
});

// When "Create Interaction" is clicked, move pending evaluation to active interactions list.
let currentActiveInteraction = null;
createInteractionBtn.addEventListener("click", function() {
  closeEvaluationSection();
  const activeInteractionsList = document.getElementById("active-interactions-list");
  const noActivePara = activeInteractionsList.querySelector("p");
  if(noActivePara) {
    activeInteractionsList.removeChild(noActivePara);
  }
  const newInteraction = createActiveInteraction(evaluationUsernameSpan.textContent);
  activeInteractionsList.appendChild(newInteraction);
  if (currentPendingElement) {
    pendingEvaluationContainer.removeChild(currentPendingElement);
    currentPendingElement = null;
  }
  // Increment active notification counter and update
  activeNotifCount++;
  document.getElementById("interactions-active-notification").style.display = "block";
  document.getElementById("interactions-active-notification").classList.add("pulse");
  setTimeout(() => {
    document.getElementById("interactions-active-notification").classList.remove("pulse");
  }, 3000);
  updateBottomNavNotif();
  showToast("Interaction created successfully", "success");
});

// When "Delete" is clicked in evaluation section, simply remove the pending element.
deleteInteractionBtn.addEventListener("click", function() {
  closeEvaluationSection();
  if (currentPendingElement) {
    pendingEvaluationContainer.removeChild(currentPendingElement);
    currentPendingElement = null;
  }
});

setActiveNav(navProfile);

// -------------------------------
// Active Interaction Action Modal
// -------------------------------
function openInteractionActionModal() {
  const username = currentActiveInteraction.querySelector("span").textContent;
  document.getElementById("interaction-username").textContent = username;
  document.getElementById("interactions-view").classList.add("hidden");
  document.getElementById("interaction-action-view").classList.remove("hidden");
}

function closeAllViews() {
  defaultView.classList.add("hidden");
  socialsView.classList.add("hidden");
  interactionsView.classList.add("hidden");
  invitationsView.classList.add("hidden");
  notificationsView.classList.add("hidden");
  document.getElementById("interaction-action-view").classList.add("hidden");
  document.getElementById("review-view").classList.add("hidden");
  document.getElementById("evaluation-section").classList.add("hidden");
}

function updateActiveInteraction(status) {
  if (!currentActiveInteraction) return;
  
  // Only count completed interactions
  if (status === "Completed") {
    totalInteractions++;
    document.querySelector('[data-tooltip="Total Interactions"]').textContent = totalInteractions;
  }
  
  let statusLabel = document.createElement("span");
  statusLabel.className = "interaction-status";
  statusLabel.textContent = status;
  currentActiveInteraction.appendChild(statusLabel);
  currentActiveInteraction.classList.add("history-interaction");
  const activeList = document.getElementById("active-interactions-list");
  activeList.removeChild(currentActiveInteraction);
  const historyContent = document.getElementById("interactions-history-content");
  const noHistoryPara = historyContent.querySelector("p");
  if (noHistoryPara) {
    historyContent.removeChild(noHistoryPara);
  }
  historyContent.appendChild(currentActiveInteraction);
  // Increment history notification counter and update
  historyNotifCount++;
  document.getElementById("history-notification").style.display = "block";
  document.getElementById("history-notification").classList.add("pulse");
  setTimeout(() => {
    document.getElementById("history-notification").classList.remove("pulse");
  }, 3000);
  currentActiveInteraction = null;
  updateBottomNavNotif();
}

document.getElementById("complete-btn")?.removeEventListener("click", null);
document.getElementById("cancel-btn")?.removeEventListener("click", null);
document.getElementById("report-btn")?.removeEventListener("click", null);

document.getElementById("action-complete-btn").addEventListener("click", function() {
  openReviewView();
  showToast("Interaction completed", "success");
});

document.getElementById("action-cancel-btn").addEventListener("click", function() {
  updateActiveInteraction("Canceled");
  showToast("Interaction cancelled", "info");
});

document.getElementById("action-report-btn").addEventListener("click", function() {
  const username = document.getElementById("interaction-username").textContent;
  document.getElementById("report-username").textContent = username;
  document.getElementById("interaction-action-view").classList.add("hidden");
  document.getElementById("report-view").classList.remove("hidden");
});

// Add report modal handlers
document.getElementById("cancel-report").addEventListener("click", function() {
  document.getElementById("report-view").classList.add("hidden");
  document.getElementById("interaction-action-view").classList.remove("hidden");
});

document.getElementById("confirm-report").addEventListener("click", function() {
  updateActiveInteraction("Reported");
  document.getElementById("report-view").classList.add("hidden");
  document.getElementById("interactions-view").classList.remove("hidden");
  
  const username = document.getElementById("interaction-username").textContent;
  addNotification(
    "⚠️ Dispute Resolution Created",
    `A report has been filed for interaction with ${username}`,
    username,
    null,
    'report'
  );
  showToast("Report submitted", "warning");
});

// Add new functions for handling the action view
document.getElementById("interaction-return-arrow").addEventListener("click", function() {
  document.getElementById("interaction-action-view").classList.add("hidden");
  document.getElementById("interactions-view").classList.remove("hidden");
});

// Update the action buttons
document.getElementById("action-complete-btn").addEventListener("click", function() {
  const username = document.getElementById("interaction-username").textContent;
  document.getElementById("review-username").textContent = username;
  document.getElementById("interaction-action-view").classList.add("hidden");
  document.getElementById("review-view").classList.remove("hidden");
  
  // Reset review form
  document.querySelectorAll(".star-select").forEach(star => star.classList.remove("active"));
  document.getElementById("review-text").value = "";
});

document.getElementById("action-cancel-btn").addEventListener("click", function() {
  updateActiveInteraction("Canceled");
  document.getElementById("interaction-action-view").classList.add("hidden");
  document.getElementById("interactions-view").classList.remove("hidden");
});

document.getElementById("action-report-btn").addEventListener("click", function() {
  const username = document.getElementById("interaction-username").textContent;
  document.getElementById("report-username").textContent = username;
  document.getElementById("interaction-action-view").classList.add("hidden");
  document.getElementById("report-view").classList.remove("hidden");
});

// Add review view functionality
function openReviewView() {
  const username = document.getElementById("interaction-username").textContent;
  document.getElementById("review-username").textContent = username;
  document.getElementById("interaction-action-view").classList.add("hidden");
  document.getElementById("review-view").classList.remove("hidden");
  
  // Reset review form
  document.querySelectorAll(".star-select").forEach(star => star.classList.remove("active"));
  document.getElementById("review-text").value = "";
}

// Star rating functionality
document.querySelectorAll(".star-select").forEach(star => {
  star.addEventListener("click", function() {
    const rating = this.dataset.rating;
    document.querySelectorAll(".star-select").forEach(s => {
      s.classList.remove("active");
      if (s.dataset.rating <= rating) {
        s.classList.add("active");
      }
    });
  });
});

// Handle review submission
document.getElementById("submit-review-btn").addEventListener("click", function() {
  const stars = document.querySelectorAll(".star-select.active").length;
  
  if (stars === 0) {
    alert("Please select a rating");
    return;
  }
  
  // Remove text requirement validation
  updateActiveInteraction("Completed");
  document.getElementById("review-view").classList.add("hidden");
  document.getElementById("interactions-view").classList.remove("hidden");
  
  const username = document.getElementById("review-username").textContent;
  const randomReview = generateRandomReview();
  
  addNotification(
    "New Review Received",
    `${username} has reviewed your interaction`,
    username,
    randomReview
  );
});

document.getElementById("review-return-arrow").addEventListener("click", function() {
  document.getElementById("review-view").classList.add("hidden");
  document.getElementById("interaction-action-view").classList.remove("hidden");
});

// Add notifications handling
const notificationsData = [];
let notificationsCount = 0;

function addNotification(title, text, username, review, type = 'review') {
  const notification = {
    id: Date.now(),
    title,
    text,
    time: new Date(),
    username,
    review,
    type // Add type to differentiate between review and report notifications
  };
  
  notificationsData.unshift(notification);
  notificationsCount++;
  updateNotificationsCount();
  renderNotifications();
}

function updateNotificationsCount() {
  const badge = document.getElementById("notifications-count");
  badge.style.display = notificationsCount > 0 ? "block" : "none";
  if (notificationsCount > 0) {
    badge.classList.add("pulse");
  }
}

function renderNotifications() {
  const list = document.querySelector('.notifications-list');
  
  if (notificationsData.length === 0) {
    list.innerHTML = `
      <div class="empty-notifications">
        <img src="media/notification.svg" alt="No notifications">
        <p>No notifications yet</p>
      </div>
    `;
    return;
  }
  
  list.innerHTML = notificationsData.map(notif => `
    <div class="notification-item" data-id="${notif.id}">
      <div class="profile-placeholder">
        <img src="${getRandomProfilePic()}" alt="Profile">
      </div>
      <div class="notification-content">
        <div class="notification-title">
          ${notif.type === 'report' ? notif.title : `✅ ${notif.title}`}
        </div>
        <div class="notification-text">${notif.text}</div>
        <div class="notification-time">${formatTime(notif.time)}</div>
      </div>
    </div>
  `).join('');

  // Update click handlers - only add click for review notifications
  list.querySelectorAll(".notification-item").forEach(item => {
    const notifId = parseInt(item.dataset.id);
    const notifData = notificationsData.find(n => n.id === notifId);
    if (notifData && notifData.type === 'review' && notifData.review) {
      item.addEventListener("click", function() {
        showUserReview(notifData.username, notifData.review);
      });
      item.style.cursor = "pointer";
    } else {
      item.style.cursor = "default";
    }
  });
}

function formatTime(date) {
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);
  
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return date.toLocaleDateString();
}

// Function to show user review with highlight
function showUserReview(username, reviewData) {
  // Switch to profile view
  closeAllViews();
  defaultView.classList.remove("hidden");
  defaultView.classList.add("visible");
  topBarTitle.textContent = "My Profile";
  profileHeader.style.display = "block";
  setActiveNav(navProfile);

  // Add new review if provided
  if (reviewData) {
    const reviewsList = document.querySelector(".reviews-list");
    const newReview = document.createElement("div");
    newReview.className = "review-card highlight";
    newReview.innerHTML = `
      <div class="review-pic">
        <img src="${getRandomProfilePic()}" alt="Profile">
      </div>
      <div class="review-details">
        <div class="review-username">
          ${username}
          <img src="media/verify.svg" alt="Verified" style="width:14px;height:14px;" />
        </div>
        <div class="star-container">
          ${Array(5).fill(0).map((_, i) => `
            <img src="media/star.svg" alt="Star" class="star-icon" 
                 style="opacity: ${i < reviewData.rating ? '1' : '0.3'};" />
          `).join('')}
        </div>
        <p class="review-text">${reviewData.text}</p>
      </div>
    `;
    
    reviewsList.insertBefore(newReview, reviewsList.firstChild);
    newReview.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => newReview.classList.remove("highlight"), 1500);
  }
}

// Add random review templates
const reviewTemplates = [
  { text: "Great interaction! Very professional.", rating: 5 },
  { text: "Quick and efficient, would recommend.", rating: 4 },
  { text: "Smooth experience, thank you!", rating: 5 },
  { text: "Good communication throughout.", rating: 4 },
  { text: "Very reliable and trustworthy.", rating: 5 },
  { text: "Pleasant experience overall.", rating: 4 }
];

// Generate random review
function generateRandomReview() {
  return reviewTemplates[Math.floor(Math.random() * reviewTemplates.length)];
}

// Update profile picture generation logic
function getRandomProfilePic(isFemaleName) {
  const malePics = ['media/man1.svg', 'media/man2.svg'];
  const femalePics = ['media/woman1.svg', 'media/woman2.svg'];
  const pics = isFemaleName ? femalePics : malePics;
  return pics[Math.floor(Math.random() * pics.length)];
}

// Add these at the beginning of your script
let totalInteractions = 5;
let repeatedInteractions = 0;
let crossInviteInteractions = 0;
let totalReports = 0;

// Update username generation to include gender info
function generateUsername() {
  const isFemale = Math.random() > 0.6; // 40% chance of being female (changed from 0.7)
  const names = isFemale ? arabicFemaleNames : arabicMaleNames;
  const name = names[Math.floor(Math.random() * names.length)];
  return {
    name,
    isFemale
  };
}

// Update the createPendingEvaluation function to use gender-aware logic
function createPendingEvaluation() {
  const pendingEl = document.createElement("div");
  pendingEl.className = "pending-evaluation";
  pendingEl.innerHTML = `
    <div class="loader"></div>
    <span>Simulating...</span>
  `;
  pendingEvaluationContainer.appendChild(pendingEl);
  
  setTimeout(function() {
    const user = generateUsername();
    const isVerified = Math.random() > 0.3; // 70% chance of being verified
    const badgeHTML = isVerified ? 
      `<img src="media/verify.svg" alt="Verified" class="verify-icon-main" style="width:16px;height:16px;">` : 
      '';
    
    pendingEl.innerHTML = `
      <div class="profile-placeholder">
        <img src="${getRandomProfilePic(user.isFemale)}" alt="Profile">
      </div>
      <span>${user.name}</span>
      ${badgeHTML}
      <img src="media/eye.svg" alt="View" class="action-icon" style="position: absolute; right: 20px; top: 50%; transform: translateY(-50%); width: 24px; height: 24px; opacity: 0.7; cursor: pointer;">
    `;

    // Add hover effect for eye icon
    const eyeIcon = pendingEl.querySelector('.action-icon');
    eyeIcon.addEventListener('mouseenter', () => eyeIcon.style.opacity = '1');
    eyeIcon.addEventListener('mouseleave', () => eyeIcon.style.opacity = '0.7');

    // Generate random reviews with gender-appropriate names and pictures
    const numReviews = Math.floor(Math.random() * 4) + 1; // 1-4 reviews
    const reviews = [];
    for(let i = 0; i < numReviews; i++) {
      const reviewer = generateUsername();
      reviews.push({
        username: reviewer.name,
        isVerified: Math.random() > 0.3, // 70% chance of being verified
        review: generateRandomReview(),
        profilePic: getRandomProfilePic(reviewer.isFemale)
      });
    }

    pendingEl.addEventListener("click", function() {
      currentPendingElement = pendingEl;
      openEvaluationSection(user.name, isVerified, reviews);
    });
  }, 2000); // Changed from original delay
}

// Update the newInteraction click handler to clear notification
function createActiveInteraction(username) {
  const isFemale = arabicFemaleNames.includes(username);
  const newInteraction = document.createElement("div");
  newInteraction.className = "pending-evaluation";
  newInteraction.innerHTML = `
    <div class="profile-placeholder">
      <img src="${getRandomProfilePic(isFemale)}" alt="Profile">
    </div>
    <span>${username}</span>
    <img src="media/verify.svg" alt="Verified" class="verify-icon-main" style="width:16px;height:16px;">
    <div class="active-indicator"></div>
  `;
  newInteraction.addEventListener("click", function() {
    currentActiveInteraction = newInteraction;
    // Clear notification when clicking the card
    activeNotifCount--;
    document.getElementById("interactions-active-notification").style.display = "none";
    updateBottomNavNotif();
    openInteractionActionModal();
  });
  return newInteraction;
}

// Add these at the top of your script
const arabicMaleNames = [
  "Ahmed", "Mohammed", "Omar", "Karim", "Ziad", 
  "Malik", "Hassan", "Said", "Reda", "Amine"
];

const arabicFemaleNames = [
  "Sofia", "Fatima", "Leila", "Yasmine", "Nour",
  "Rania", "Amira", "Dina", "Mariam", "Samira"
];

const reviewPhrases = [
  "شكراً جزيلاً، تفاعل سريع",           // Thank you very much, fast interaction
  "أنصح بالتعامل معه، موثوق",          // I recommend dealing with them, trustworthy
  "ممتاز، تعامل سريع وسلس",            // Excellent, quick and smooth interaction
  "تعامل محترم وسريع",                  // Respectful and quick interaction
  "شكراً على التعامل السريع",           // Thanks for the quick interaction
  "تعامل راقي ومحترم",                  // Sophisticated and respectful interaction
  "سرعة في الرد والتواصل",              // Quick in response and communication
  "موثوق جداً، أنصح بالتعامل معه",      // Very trustworthy, I recommend dealing with them
  "تعامل ممتاز وسريع جداً",             // Excellent interaction and very fast
  "بارك الله فيك، تعامل سريع",          // God bless you, fast interaction
  "تعامل راقي، أنصح به",                // Sophisticated interaction, I recommend
  "سريع في التواصل والرد",              // Fast in communication and response
  "Très rapide et professionnel",        // Very fast and professional
  "Interaction parfaite, merci",         // Perfect interaction
  "تعامل راقي، شكراً جزيلاً",           // Sophisticated interaction
  "Merci pour la rapidité"               // Thanks for speed
];

// Function to generate random reviews
function generateRandomReview() {
  const rating = Math.floor(Math.random() * 2) + 4; // Random rating between 4-5
  return {
    text: reviewPhrases[Math.floor(Math.random() * reviewPhrases.length)],
    rating: rating
  };
}

// Function to generate a random Arabic name
function generateUsername() {
  const isFemale = Math.random() > 0.6; // 40% chance of being female (changed from 0.7)
  const names = isFemale ? arabicFemaleNames : arabicMaleNames;
  const name = names[Math.floor(Math.random() * names.length)];
  return {
    name,
    isFemale
  };
}

// Modify createPendingEvaluation function
function createPendingEvaluation() {
  const pendingEl = document.createElement("div");
  pendingEl.className = "pending-evaluation";
  pendingEl.innerHTML = `
    <div class="loader"></div>
    <span>Simulating...</span>
  `;
  pendingEvaluationContainer.appendChild(pendingEl);
  
  setTimeout(function() {
    const user = generateUsername();
    const isVerified = Math.random() > 0.3; // 70% chance of being verified
    const badgeHTML = isVerified ? 
      `<img src="media/verify.svg" alt="Verified" class="verify-icon-main" style="width:16px;height:16px;">` : 
      '';
    
    pendingEl.innerHTML = `
      <div class="profile-placeholder">
        <img src="${getRandomProfilePic(user.isFemale)}" alt="Profile">
      </div>
      <span>${user.name}</span>
      ${badgeHTML}
      <img src="media/eye.svg" alt="View" class="action-icon" style="position: absolute; right: 20px; top: 50%; transform: translateY(-50%); width: 24px; height: 24px; opacity: 0.7; cursor: pointer;">
    `;

    // Add hover effect for eye icon
    const eyeIcon = pendingEl.querySelector('.action-icon');
    eyeIcon.addEventListener('mouseenter', () => eyeIcon.style.opacity = '1');
    eyeIcon.addEventListener('mouseleave', () => eyeIcon.style.opacity = '0.7');

    // Generate random reviews with gender-appropriate names and pictures
    const numReviews = Math.floor(Math.random() * 4) + 1; // 1-4 reviews
    const reviews = [];
    for(let i = 0; i < numReviews; i++) {
      const reviewer = generateUsername();
      reviews.push({
        username: reviewer.name,
        isVerified: Math.random() > 0.3, // 70% chance of being verified
        review: generateRandomReview(),
        profilePic: getRandomProfilePic(reviewer.isFemale)
      });
    }

    pendingEl.addEventListener("click", function() {
      currentPendingElement = pendingEl;
      openEvaluationSection(user.name, isVerified, reviews);
    });
  }, 2000); // Changed from original delay
}

// Modify openEvaluationSection function to include reviews
function openEvaluationSection(username, isVerified, reviews) {
  evaluationUsernameSpan.textContent = username;
  
  // Update verification badge
  const verifyBadge = evaluationSection.querySelector(".verify-icon-main");
  if (verifyBadge) {
    verifyBadge.style.display = isVerified ? "inline-block" : "none";
  }

  // Generate and update user stats
  const stats = generateUserStats();
  const statElements = evaluationSection.querySelectorAll('.interaction-box .stat-number');
  statElements[0].textContent = stats.total;
  statElements[1].textContent = stats.repeated;
  statElements[2].textContent = stats.crossInvite;
  statElements[3].textContent = stats.reports;

  // Update reviews list
  const reviewsList = evaluationSection.querySelector(".reviews-list");
  reviewsList.innerHTML = reviews.map(review => `
    <div class="review-card">
      <div class="review-pic">
        <img src="${review.profilePic}" alt="Profile">
      </div>
      <div class="review-details">
        <div class="review-username">
          ${review.username}
          ${review.isVerified ? `<img src="media/verify.svg" alt="Verified" style="width:14px;height:14px;" />` : ''}
        </div>
        <div class="star-container">
          ${Array(5).fill(0).map((_, i) => `
            <img src="media/star.svg" alt="Star" class="star-icon" 
                 style="opacity: ${i < review.review.rating ? '1' : '0.3'};" />
          `).join('')}
        </div>
        <p class="review-text">${review.review.text}</p>
      </div>
    </div>
  `).join('');

  invitationsView.classList.add("hidden");
  evaluationSection.classList.remove("hidden");
  evaluationSection.classList.add("visible");
}

function showToast(message, type = 'info') {
  const icons = {
    'success': '✅',
    'error': '⚠️',
    'info': 'ℹ️',
    'warning': '⚠️'
  };
  
  // Remove any existing notification banner
  const existingBanner = document.querySelector('.notification-banner');
  if (existingBanner) {
    existingBanner.remove();
  }
  
  const banner = document.createElement('div');
  banner.className = 'notification-banner';
  banner.innerHTML = `
    <span class="notification-banner-icon">${icons[type]}</span>
    <span class="notification-banner-message">${message}</span>
  `;
  
  document.querySelector('.app-frame').appendChild(banner);
  
  setTimeout(() => {
    banner.remove();
  }, 3000);
}
