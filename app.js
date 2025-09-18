// Global State Management
let currentUser = null;
let currentLanguage = 'en';
let currentComplaint = {
    category: '',
    photo: null,
    location: '',
    title: '',
    description: '',
    urgency: 'medium',
    allowContact: true
};
let currentStep = 1;
let complaints = [
    {
        id: 'CC2025001',
        title: 'Pothole near PCMC building',
        category: 'pothole',
        status: 'progress',
        date: '2025-09-15',
        location: 'Pimpri-Chinchwad Municipal Corporation',
        urgency: 'high',
        lat: 44, lng: 48
    },
    {
        id: 'CC2025002',
        title: 'Broken Street Light at Thergaon',
        category: 'streetlight',
        status: 'resolved',
        date: '2025-09-12',
        location: 'Dange Chowk, Thergaon',
        urgency: 'medium',
        lat: 78, lng: 32
    },
    {
        id: 'CC2025003',
        title: 'Garbage overflow at Wakad',
        category: 'garbage',
        status: 'pending',
        date: '2025-09-17',
        location: 'Near Bhumkar Chowk, Wakad',
        urgency: 'high',
        lat: 88, lng: 20
    },
    {
        id: 'CC2025004',
        title: 'Low water pressure at Nigdi',
        category: 'water',
        status: 'progress',
        date: '2025-09-16',
        location: 'Sector 25, Nigdi',
        urgency: 'medium',
        lat: 25, lng: 18
    },
    {
        id: 'CC2025005',
        title: 'Minor pipeline leak Akurdi',
        category: 'drainage',
        status: 'resolved',
        date: '2025-09-10',
        location: 'Akurdi Railway Station Road',
        urgency: 'low',
        lat: 38, lng: 35
    },
    {
        id: 'CC2025006',
        title: 'Illegal dumping near Spine Road',
        category: 'garbage',
        status: 'pending',
        date: '2025-09-19',
        location: 'Near Spine Road, Indrayani Nagar',
        urgency: 'high',
        lat: 22, lng: 55
    },
    {
        id: 'CC2025007',
        title: 'Damaged footpath in Pimple Saudagar',
        category: 'pothole',
        status: 'pending',
        date: '2025-09-19',
        location: 'Near Kokane Chowk, Pimple Saudagar',
        urgency: 'medium',
        lat: 68, lng: 55
    },
    {
        id: 'CC2025008',
        title: 'Blocked drainage at Chinchwadgaon',
        category: 'drainage',
        status: 'progress',
        date: '2025-09-18',
        location: 'Near Chinchwadgaon Police Station',
        urgency: 'high',
        lat: 55, lng: 40
    }
];
let currentRating = 0;
let cameraStream = null;

// Language translations
const translations = {
    en: {
        // Login messages
        'login_successful': 'Login successful!',
        'invalid_credentials': 'Invalid credentials. Please try again.',
        'admin_login_successful': 'Admin login successful!',
        'invalid_admin_credentials': 'Invalid admin credentials.',
        'logout_successful': 'Logged out successfully!',
        'logout_confirm': 'Are you sure you want to logout?',
        
        // Complaint messages
        'select_category': 'Please select an issue category.',
        'enter_title': 'Please enter an issue title.',
        'complaint_registered': 'Complaint registered successfully! Your complaint ID is: ',
        'location_detected': 'Location detected successfully!',
        'location_error': 'Unable to get location. Please enter manually.',
        'geolocation_not_supported': 'Geolocation not supported by this browser.',
        
        // Camera messages
        'camera_not_supported': 'Camera not supported by this browser.',
        'camera_access_denied': 'Camera access denied. Please allow camera permission and try again.',
        'camera_error': 'Error accessing camera. Please try again.',
        'photo_captured': 'Photo captured successfully!',
        
        // Search and reminder messages
        'complaint_not_found': 'Complaint not found. Please check the ID.',
        'complaint_resolved': 'This complaint has already been resolved.',
        'reminder_sent': 'Reminder sent successfully for complaint ',
        'enter_complaint_id': 'Please enter a complaint ID.',
        'no_complaints_found': 'No complaints found matching your search.',
        
        // Feedback messages
        'select_rating': 'Please select a rating.',
        'enter_feedback': 'Please enter your feedback.',
        'feedback_submitted': 'Thank you for your feedback! It has been submitted successfully.',
        
        // Profile messages
        'profile_updated': 'Profile updated successfully!',
        'password_changed': 'Password changed successfully!',
        'password_length_error': 'Password must be at least 6 characters long.',
        'deactivate_confirm': 'Are you sure you want to deactivate your account? This action cannot be undone.',
        'deactivate_final_confirm': 'This will permanently delete your account and all data. Continue?',
        'account_deactivated': 'Account deactivated successfully.',
        
        // Registration messages
        'registration_feature': 'User registration feature will be implemented in the full version.',
        'password_reset_sent': 'Password reset link sent to your mobile number via SMS.',
        'valid_mobile_required': 'Please enter a valid mobile number.',
        
        // Help messages
        'privacy_policy_msg': 'Privacy Policy: CivicConnect respects your privacy and protects your personal information according to applicable laws and regulations.',
        'terms_of_service_msg': 'Terms of Service: By using CivicConnect, you agree to report genuine civic issues and provide accurate information.',
        'help_faq_msg': `Help & FAQ:
        
        Q: How do I report an issue?
        A: Click "Register Complaint" and follow the 3-step process.
        
        Q: How can I track my complaint?
        A: Use "Track Complaint" with your complaint ID.
        
        Q: What if my issue isn't resolved?
        A: Use "Send Reminder" to follow up on pending complaints.
        
        For more help, contact: support@civicconnect.gov`,
        
        // Status messages
        'pending': 'Pending',
        'progress': 'In Progress',
        'resolved': 'Resolved',
        'sent': 'Sent',
        
        // Category names for complaint details
        'pothole': 'Pothole',
        'streetlight': 'Street Light',
        'garbage': 'Garbage',
        'water': 'Water Supply',
        'drainage': 'Drainage',
        'other': 'Other'
    },
    hi: {
        // Login messages
        'login_successful': 'लॉगिन सफल!',
        'invalid_credentials': 'अवैध क्रेडेंशियल। कृपया पुनः प्रयास करें।',
        'admin_login_successful': 'एडमिन लॉगिन सफल!',
        'invalid_admin_credentials': 'अवैध एडमिन क्रेडेंशियल।',
        'logout_successful': 'सफलतापूर्वक लॉगआउट हो गए!',
        'logout_confirm': 'क्या आप वाकई लॉगआउट करना चाहते हैं?',
        
        // Complaint messages
        'select_category': 'कृपया एक समस्या श्रेणी चुनें।',
        'enter_title': 'कृपया समस्या का शीर्षक दर्ज करें।',
        'complaint_registered': 'शिकायत सफलतापूर्वक दर्ज की गई! आपकी शिकायत आईडी है: ',
        'location_detected': 'स्थान सफलतापूर्वक पता लगाया गया!',
        'location_error': 'स्थान प्राप्त करने में असमर्थ। कृपया मैन्युअल रूप से दर्ज करें।',
        'geolocation_not_supported': 'इस ब्राउज़र द्वारा भू-स्थान समर्थित नहीं है।',
        
        // Camera messages
        'camera_not_supported': 'इस ब्राउज़र द्वारा कैमरा समर्थित नहीं है।',
        'camera_access_denied': 'कैमरा एक्सेस अस्वीकृत। कृपया कैमरा अनुमति दें और पुनः प्रयास करें।',
        'camera_error': 'कैमरा एक्सेस करने में त्रुटि। कृपया पुनः प्रयास करें।',
        'photo_captured': 'फोटो सफलतापूर्वक कैप्चर की गई!',
        
        // Search and reminder messages
        'complaint_not_found': 'शिकायत नहीं मिली। कृपया आईडी जांचें।',
        'complaint_resolved': 'यह शिकायत पहले से ही हल हो चुकी है।',
        'reminder_sent': 'शिकायत के लिए अनुस्मारक सफलतापूर्वक भेजा गया ',
        'enter_complaint_id': 'कृपया शिकायत आईडी दर्ज करें।',
        'no_complaints_found': 'आपकी खोज से मेल खाने वाली कोई शिकायत नहीं मिली।',
        
        // Feedback messages
        'select_rating': 'कृपया एक रेटिंग चुनें।',
        'enter_feedback': 'कृपया अपनी प्रतिक्रिया दर्ज करें।',
        'feedback_submitted': 'आपकी प्रतिक्रिया के लिए धन्यवाद! यह सफलतापूर्वक सबमिट हो गई है।',
        
        // Profile messages
        'profile_updated': 'प्रोफ़ाइल सफलतापूर्वक अपडेट की गई!',
        'password_changed': 'पासवर्ड सफलतापूर्वक बदल दिया गया!',
        'password_length_error': 'पासवर्ड कम से कम 6 वर्ण का होना चाहिए।',
        'deactivate_confirm': 'क्या आप वाकई अपना खाता निष्क्रिय करना चाहते हैं? यह कार्रवाई पूर्ववत नहीं की जा सकती।',
        'deactivate_final_confirm': 'यह आपके खाते और सभी डेटा को स्थायी रूप से हटा देगा। जारी रखें?',
        'account_deactivated': 'खाता सफलतापूर्वक निष्क्रिय हो गया।',
        
        // Registration messages
        'registration_feature': 'उपयोगकर्ता पंजीकरण सुविधा पूर्ण संस्करण में लागू की जाएगी।',
        'password_reset_sent': 'पासवर्ड रीसेट लिंक आपके मोबाइल नंबर पर SMS के माध्यम से भेजा गया।',
        'valid_mobile_required': 'कृपया एक वैध मोबाइल नंबर दर्ज करें।',
        
        // Help messages
        'privacy_policy_msg': 'गोपनीयता नीति: CivicConnect आपकी गोपनीयता का सम्मान करता है और लागू कानूनों और विनियमों के अनुसार आपकी व्यक्तिगत जानकारी की सुरक्षा करता है।',
        'terms_of_service_msg': 'सेवा की शर्तें: CivicConnect का उपयोग करके, आप वास्तविक नागरिक समस्याओं की रिपोर्ट करने और सटीक जानकारी प्रदान करने के लिए सहमत हैं।',
        'help_faq_msg': `सहायता और FAQ:
        
        प्रश्न: मैं समस्या की रिपोर्ट कैसे करूं?
        उत्तर: "शिकायत दर्ज करें" पर क्लिक करें और 3-चरणीय प्रक्रिया का पालन करें।
        
        प्रश्न: मैं अपनी शिकायत को कैसे ट्रैक कर सकता हूं?
        उत्तर: अपनी शिकायत आईडी के साथ "शिकायत ट्रैक करें" का उपयोग करें।
        
        प्रश्न: यदि मेरी समस्या हल नहीं होती है तो क्या करें?
        उत्तर: लंबित शिकायतों का अनुसरण करने के लिए "अनुस्मारक भेजें" का उपयोग करें।
        
        अधिक सहायता के लिए संपर्क करें: support@civicconnect.gov`,
        
        // Status messages
        'pending': 'लंबित',
        'progress': 'प्रगति में',
        'resolved': 'हल किया गया',
        'sent': 'भेजा गया',
        
        // Category names for complaint details
        'pothole': 'गड्ढा',
        'streetlight': 'स्ट्रीट लाइट',
        'garbage': 'कचरा',
        'water': 'जल आपूर्ति',
        'drainage': 'जल निकासी',
        'other': 'अन्य'
    }
};

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    showLanguageSelection();
    setupEventListeners();
    requestLocationPermission();
    requestCameraPermission();
}

// Language Selection Functions
function showLanguageSelection() {
    showPage('languageSelectionPage');
}

function selectLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('civicConnectLanguage', lang);
    updateLanguage();
    showLoginPage();
}

function updateLanguage() {
    const elements = document.querySelectorAll(`[data-${currentLanguage}]`);
    elements.forEach(element => {
        const text = element.getAttribute(`data-${currentLanguage}`);
        if (text) {
            element.textContent = text;
        }
    });
    
    // Update placeholders
    const placeholderElements = document.querySelectorAll(`[data-${currentLanguage}-placeholder]`);
    placeholderElements.forEach(element => {
        const placeholder = element.getAttribute(`data-${currentLanguage}-placeholder`);
        if (placeholder) {
            element.placeholder = placeholder;
        }
    });
    
    // Update select options
    const selectElements = document.querySelectorAll('select option');
    selectElements.forEach(option => {
        const text = option.getAttribute(`data-${currentLanguage}`);
        if (text) {
            option.textContent = text;
        }
    });
}

function getTranslation(key) {
    return translations[currentLanguage] && translations[currentLanguage][key] 
           ? translations[currentLanguage][key] 
           : translations['en'][key] || key;
}

// Setup Event Listeners
function setupEventListeners() {
    // Photo upload handler
    const photoInput = document.getElementById('photoInput');
    if (photoInput) {
        photoInput.addEventListener('change', handlePhotoUpload);
    }
    
    // Form submissions
    document.addEventListener('submit', handleFormSubmissions);
    
    // Category selection
    document.querySelectorAll('.category-item').forEach(item => {
        item.addEventListener('click', () => {
            const category = item.getAttribute('onclick').match(/'([^']+)'/)[1];
            selectCategory(category);
        });
    });
}

// Handle Form Submissions
function handleFormSubmissions(event) {
    const formClass = event.target.className;
    if (formClass.includes('login-form') || formClass.includes('complaint-form') || 
        formClass.includes('profile-form')) {
        // Form submission handling is done by specific functions
        return;
    }
}

// Location Permissions
function requestLocationPermission() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log('Location permission granted');
            },
            (error) => {
                console.log('Location permission denied or error:', error);
            }
        );
    }
}

// Camera Functions
function requestCameraPermission() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                // Stop the stream immediately after getting permission
                stream.getTracks().forEach(track => track.stop());
                console.log('Camera permission granted');
            })
            .catch(error => {
                console.log('Camera permission denied or not available');
            });
    }
}

function openCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        showErrorMessage(getTranslation('camera_not_supported'));
        return;
    }

    const video = document.getElementById('cameraVideo');
    const uploadArea = document.getElementById('photoUploadArea');
    const placeholder = document.getElementById('uploadPlaceholder');
    const cameraControls = document.getElementById('cameraControls');

    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(stream => {
            cameraStream = stream;
            video.srcObject = stream;
            video.style.display = 'block';
            placeholder.style.display = 'none';
            cameraControls.style.display = 'flex';
            uploadArea.style.cursor = 'default';
        })
        .catch(error => {
            console.error('Error accessing camera:', error);
            if (error.name === 'NotAllowedError') {
                showErrorMessage(getTranslation('camera_access_denied'));
            } else {
                showErrorMessage(getTranslation('camera_error'));
            }
        });
}

function capturePhoto() {
    const video = document.getElementById('cameraVideo');
    const canvas = document.getElementById('cameraCanvas');
    const preview = document.getElementById('previewImage');
    const placeholder = document.getElementById('uploadPlaceholder');
    const cameraControls = document.getElementById('cameraControls');

    if (!video || !canvas) return;

    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    context.drawImage(video, 0, 0);
    
    // Convert canvas to blob
    canvas.toBlob(blob => {
        currentComplaint.photo = blob;
        
        // Show preview
        const imageUrl = URL.createObjectURL(blob);
        preview.src = imageUrl;
        preview.style.display = 'block';
        
        // Hide video and controls
        video.style.display = 'none';
        cameraControls.style.display = 'none';
        
        // Stop camera stream
        closeCamera();
        
        showSuccessMessage(getTranslation('photo_captured'));
    }, 'image/jpeg', 0.8);
}

function closeCamera() {
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
    }
    
    const video = document.getElementById('cameraVideo');
    const placeholder = document.getElementById('uploadPlaceholder');
    const cameraControls = document.getElementById('cameraControls');
    const uploadArea = document.getElementById('photoUploadArea');

    if (video) video.style.display = 'none';
    if (placeholder) placeholder.style.display = 'block';
    if (cameraControls) cameraControls.style.display = 'none';
    if (uploadArea) uploadArea.style.cursor = 'pointer';
}

// Page Navigation Functions
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update language when showing pages
    if (currentLanguage && pageId !== 'languageSelectionPage') {
        setTimeout(() => updateLanguage(), 100);
    }
}

function showLoginPage() {
    showPage('loginPage');
}

function showUserLogin() {
    showPage('userLoginForm');
}

function showAdminLogin() {
    showPage('adminLoginForm');
}

function showAdminDashboard() {
    showPage('adminDashboardPage');
    loadAdminDashboard();
}

function showUserDashboard() {
    showPage('userDashboard');
    updateUserDashboard();
}

function showRegisterComplaint() {
    showPage('registerComplaintPage');
    resetComplaintForm();
}

function showTrackComplaint() {
    showPage('trackComplaintPage');
    loadComplaints();
}

function showComplaintDetailsPage() {
    showPage('complaintDetailsPage');
}

function showSendReminder() {
    showPage('sendReminderPage');
}

function showFeedback() {
    showPage('feedbackPage');
}

function showAboutUs() {
    showPage('aboutUsPage');
}

function showUserDetails() {
    showPage('userDetailsPage');
    loadUserProfile();
}

// Authentication Functions
function handleUserLogin(event) {
    event.preventDefault();
    const phone = document.getElementById('userPhone').value;
    const password = document.getElementById('userPassword').value;
    
    if (validateLogin(phone, password)) {
        currentUser = {
            name: 'Devankit Yadav',
            phone: phone,
            type: 'user',
            location: 'Pimpri-Chinchwad, Maharashtra'
        };
        showSuccessMessage(getTranslation('login_successful'));
        setTimeout(() => {
            showUserDashboard();
        }, 1000);
    } else {
        showErrorMessage(getTranslation('invalid_credentials'));
    }
}

function handleAdminLogin(event) {
    event.preventDefault();
    const adminId = document.getElementById('adminId').value;
    const password = document.getElementById('adminPassword').value;
    
    if (adminId === 'admin' && password === 'admin123') {
        currentUser = {
            name: 'Admin',
            adminId: adminId,
            type: 'admin'
        };
        showSuccessMessage(getTranslation('admin_login_successful'));
        setTimeout(() => {
            showAdminDashboard();
        }, 1000);
    } else {
        showErrorMessage(getTranslation('invalid_admin_credentials'));
    }
}

function validateLogin(phone, password) {
    // Simple validation for prototype
    return phone.length >= 10 && password.length >= 6;
}

function logout() {
    if (confirm(getTranslation('logout_confirm'))) {
        currentUser = null;
        currentComplaint = {
            category: '',
            photo: null,
            location: '',
            title: '',
            description: '',
            urgency: 'medium',
            allowContact: true
        };
        closeCamera();
        showSuccessMessage(getTranslation('logout_successful'));
        setTimeout(() => {
            showLoginPage();
        }, 1000);
    }
}

// Dashboard Functions
function updateUserDashboard() {
    if (currentUser) {
        const userNameElement = document.getElementById('userName');
        const userLocationElement = document.getElementById('userLocation');
        
        if (userNameElement) {
            const welcomeText = currentLanguage === 'hi' ? `स्वागत है, ${currentUser.name}!` : `Welcome, ${currentUser.name}!`;
            userNameElement.textContent = welcomeText;
        }
        if (userLocationElement) {
            userLocationElement.textContent = currentUser.location || 'Location not set';
        }
    }
}

// Admin Dashboard Functions
function loadAdminDashboard(filteredComplaints = complaints) {
    const feed = document.getElementById('adminComplaintFeed');
    const map = document.getElementById('mapContainer');

    if (!feed || !map) return;

    feed.innerHTML = '';
    
    // Keep the existing map image and add markers
    const existingImg = map.querySelector('img');
    const markers = map.querySelectorAll('.complaint-marker');
    markers.forEach(marker => marker.remove());

    if (filteredComplaints.length === 0) {
        feed.innerHTML = '<p class="no-results">No complaints to display.</p>';
        return;
    }

    filteredComplaints.forEach(complaint => {
        const card = createAdminComplaintCard(complaint);
        feed.appendChild(card);
        plotComplaintOnMap(complaint);
    });
}

function createAdminComplaintCard(complaint) {
    const card = document.createElement('div');
    card.className = `admin-complaint-card urgency-${complaint.urgency}`;
    card.innerHTML = `
        <h5>${complaint.title}</h5>
        <p><i class="fas fa-id-badge"></i> ${complaint.id}</p>
        <p><i class="fas fa-map-marker-alt"></i> ${complaint.location}</p>
    `;
    return card;
}

function plotComplaintOnMap(complaint) {
    const map = document.getElementById('mapContainer');
    if (!map || !complaint.lat || !complaint.lng) return;

    const marker = document.createElement('div');
    marker.className = `complaint-marker urgency-${complaint.urgency}`;
    marker.style.top = `${complaint.lat}%`;
    marker.style.left = `${complaint.lng}%`;
    marker.title = `${complaint.title} (${getTranslation(complaint.urgency)})`;
    
    map.appendChild(marker);
}

function filterAdminComplaints(severity) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    if (severity === 'all') {
        loadAdminDashboard(complaints);
    } else {
        const filtered = complaints.filter(c => c.urgency === severity);
        loadAdminDashboard(filtered);
    }
}

// Complaint Registration Functions
function resetComplaintForm() {
    currentStep = 1;
    currentComplaint = {
        category: '',
        photo: null,
        location: '',
        title: '',
        description: '',
        urgency: 'medium',
        allowContact: true
    };
    
    updateStepIndicator();
    showStep(1);
    clearForm();
    closeCamera();
}

function selectCategory(category) {
    currentComplaint.category = category;
    
    // Update UI
    document.querySelectorAll('.category-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    event.target.closest('.category-item').classList.add('selected');
    
    // Enable next button
    const nextBtn = document.getElementById('step1Next');
    if (nextBtn) {
        nextBtn.disabled = false;
    }
}

function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        currentComplaint.photo = file;
        
        // Show preview
        const reader = new FileReader();
        reader.onload = function(e) {
            const placeholder = document.getElementById('uploadPlaceholder');
            const preview = document.getElementById('previewImage');
            const video = document.getElementById('cameraVideo');
            
            if (placeholder && preview) {
                placeholder.style.display = 'none';
                preview.src = e.target.result;
                preview.style.display = 'block';
                if (video) video.style.display = 'none';
            }
        };
        reader.readAsDataURL(file);
    }
}

function getCurrentLocation() {
    const locationInput = document.getElementById('locationInput');
    const locationBtn = document.querySelector('.location-btn');
    
    if (locationBtn) {
        locationBtn.innerHTML = '<div class="loading"></div>';
    }
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                
                // Simulate reverse geocoding for Pimpri-Chinchwad area
                const location = `Pimpri-Chinchwad, Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;
                currentComplaint.location = location;
                
                if (locationInput) {
                    locationInput.value = location;
                }
                
                if (locationBtn) {
                    locationBtn.innerHTML = '<i class="fas fa-crosshairs"></i>';
                }
                
                showSuccessMessage(getTranslation('location_detected'));
            },
            (error) => {
                showErrorMessage(getTranslation('location_error'));
                if (locationInput) {
                    locationInput.removeAttribute('readonly');
                    const placeholder = currentLanguage === 'hi' ? 'अपना स्थान मैन्युअल रूप से दर्ज करें' : 'Enter your location manually';
                    locationInput.placeholder = placeholder;
                }
                if (locationBtn) {
                    locationBtn.innerHTML = '<i class="fas fa-crosshairs"></i>';
                }
            }
        );
    } else {
        showErrorMessage(getTranslation('geolocation_not_supported'));
        if (locationInput) {
            locationInput.removeAttribute('readonly');
            const placeholder = currentLanguage === 'hi' ? 'अपना स्थान मैन्युअल रूप से दर्ज करें' : 'Enter your location manually';
            locationInput.placeholder = placeholder;
        }
        if (locationBtn) {
            locationBtn.innerHTML = '<i class="fas fa-crosshairs"></i>';
        }
    }
}

function nextStep() {
    if (validateCurrentStep()) {
        currentStep++;
        if (currentStep <= 3) {
            updateStepIndicator();
            showStep(currentStep);
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        closeCamera(); // Close camera if going back
        currentStep--;
        updateStepIndicator();
        showStep(currentStep);
    }
}

function showStep(step) {
    document.querySelectorAll('.form-step').forEach(stepDiv => {
        stepDiv.classList.remove('active');
    });
    
    const currentStepDiv = document.getElementById(`formStep${step}`);
    if (currentStepDiv) {
        currentStepDiv.classList.add('active');
    }
}

function updateStepIndicator() {
    document.querySelectorAll('.step').forEach((stepEl, index) => {
        const stepNumber = index + 1;
        stepEl.classList.remove('active', 'completed');
        
        if (stepNumber < currentStep) {
            stepEl.classList.add('completed');
        } else if (stepNumber === currentStep) {
            stepEl.classList.add('active');
        }
    });
}

function validateCurrentStep() {
    switch (currentStep) {
        case 1:
            if (!currentComplaint.category) {
                showErrorMessage(getTranslation('select_category'));
                return false;
            }
            return true;
        case 2:
            // Location is optional, auto-detect or manual entry
            return true;
        case 3:
            const title = document.getElementById('complaintTitle').value.trim();
            if (!title) {
                showErrorMessage(getTranslation('enter_title'));
                return false;
            }
            return true;
        default:
            return true;
    }
}

function clearForm() {
    // Clear form inputs
    const inputs = document.querySelectorAll('#registerComplaintPage input, #registerComplaintPage textarea, #registerComplaintPage select');
    inputs.forEach(input => {
        if (input.type !== 'checkbox') {
            input.value = '';
        }
    });
    
    // Reset photo preview
    const preview = document.getElementById('previewImage');
    const placeholder = document.getElementById('uploadPlaceholder');
    if (preview && placeholder) {
        preview.style.display = 'none';
        placeholder.style.display = 'block';
    }
    
    // Reset category selection
    document.querySelectorAll('.category-item').forEach(item => {
        item.classList.remove('selected');
    });
}

function handleComplaintSubmission(event) {
    event.preventDefault();
    
    if (!validateCurrentStep()) {
        return;
    }
    
    // Collect form data
    currentComplaint.title = document.getElementById('complaintTitle').value.trim();
    currentComplaint.description = document.getElementById('complaintDescription').value.trim();
    currentComplaint.urgency = document.getElementById('urgencyLevel').value;
    currentComplaint.allowContact = document.getElementById('allowContact').checked;
    currentComplaint.location = document.getElementById('locationInput').value || 'Pimpri-Chinchwad, Maharashtra';
    
    // Generate complaint ID
    const complaintId = 'CC' + new Date().getFullYear() + String(complaints.length + 1).padStart(3, '0');
    
    // Add to complaints array
    const newComplaint = {
        id: complaintId,
        title: currentComplaint.title,
        category: currentComplaint.category,
        status: 'pending',
        date: new Date().toISOString().split('T')[0],
        location: currentComplaint.location,
        urgency: currentComplaint.urgency,
        description: currentComplaint.description,
        photo: currentComplaint.photo,
        lat: Math.random() * 100, // Random position for demo
        lng: Math.random() * 100
    };
    
    complaints.push(newComplaint);
    
    // Show success message
    showSuccessMessage(getTranslation('complaint_registered') + complaintId);
    
    // Reset form and go back to dashboard
    setTimeout(() => {
        resetComplaintForm();
        showUserDashboard();
    }, 2000);
}

// Track Complaint Functions
function loadComplaints() {
    const complaintsList = document.getElementById('complaintsList');
    if (!complaintsList) return;
    
    complaintsList.innerHTML = '';
    
    // Show user's complaints (simulate filtering by user)
    const userComplaints = complaints.slice(0, 3); // Show first 3 as user's complaints
    
    if (userComplaints.length === 0) {
        complaintsList.innerHTML = '<p class="no-results">No complaints found.</p>';
        return;
    }
    
    userComplaints.forEach(complaint => {
        const complaintItem = createComplaintItem(complaint);
        complaintsList.appendChild(complaintItem);
    });
}

function createComplaintItem(complaint) {
    const item = document.createElement('div');
    item.className = 'complaint-item';
    item.onclick = () => showComplaintDetails(complaint.id);
    
    const statusClass = `status-${complaint.status}`;
    const statusText = getTranslation(complaint.status);
    
    item.innerHTML = `
        <div class="complaint-info">
            <h4>${complaint.title}</h4>
            <p class="complaint-id">ID: ${complaint.id}</p>
            <p class="complaint-date">${formatDate(complaint.date)}</p>
        </div>
        <div class="status-badge ${statusClass}">
            <i class="fas fa-circle"></i>
            ${statusText}
        </div>
    `;
    
    return item;
}

function searchComplaints() {
    const searchTerm = document.getElementById('complaintSearch').value.trim().toLowerCase();
    if (!searchTerm) {
        loadComplaints();
        return;
    }
    
    const filteredComplaints = complaints.filter(complaint => 
        complaint.id.toLowerCase().includes(searchTerm) ||
        complaint.title.toLowerCase().includes(searchTerm) ||
        complaint.location.toLowerCase().includes(searchTerm)
    );
    
    const complaintsList = document.getElementById('complaintsList');
    complaintsList.innerHTML = '';
    
    if (filteredComplaints.length === 0) {
        complaintsList.innerHTML = '<p class="no-results">' + getTranslation('no_complaints_found') + '</p>';
        return;
    }
    
    filteredComplaints.forEach(complaint => {
        const complaintItem = createComplaintItem(complaint);
        complaintsList.appendChild(complaintItem);
    });
}

function showComplaintDetails(complaintId) {
    const complaint = complaints.find(c => c.id === complaintId);
    if (!complaint) {
        showErrorMessage(getTranslation('complaint_not_found'));
        return;
    }
    
    const detailsContent = document.getElementById('complaintDetailsContent');
    if (!detailsContent) return;
    
    const statusText = getTranslation(complaint.status);
    const categoryText = getTranslation(complaint.category);
    const urgencyText = getTranslation(complaint.urgency);
    
    detailsContent.innerHTML = `
        <div class="details-header">
            <h3>${complaint.title}</h3>
            <div class="details-meta">
                <span><i class="fas fa-id-badge"></i> ${complaint.id}</span>
                <span><i class="fas fa-calendar"></i> ${formatDate(complaint.date)}</span>
                <span class="status-badge status-${complaint.status}">
                    <i class="fas fa-circle"></i> ${statusText}
                </span>
            </div>
        </div>
        
        ${complaint.photo ? '<img src="' + URL.createObjectURL(complaint.photo) + '" class="details-image" alt="Complaint Photo">' : ''}
        
        <div class="details-grid">
            <div class="detail-item">
                <label>Category</label>
                <p>${categoryText}</p>
            </div>
            <div class="detail-item">
                <label>Urgency Level</label>
                <p>${urgencyText}</p>
            </div>
            <div class="detail-item">
                <label>Location</label>
                <p>${complaint.location}</p>
            </div>
            <div class="detail-item">
                <label>Description</label>
                <p>${complaint.description || 'No additional description provided.'}</p>
            </div>
        </div>
        
        <div class="timeline">
            <h4>Progress Timeline</h4>
            ${createTimeline(complaint)}
        </div>
    `;
    
    showComplaintDetailsPage();
}

function createTimeline(complaint) {
    const timelineItems = [
        {
            icon: 'fa-paper-plane',
            title: 'Complaint Submitted',
            date: complaint.date,
            description: 'Your complaint has been successfully submitted.'
        }
    ];
    
    if (complaint.status === 'progress' || complaint.status === 'resolved') {
        timelineItems.push({
            icon: 'fa-eye',
            title: 'Under Review',
            date: complaint.date,
            description: 'Your complaint is being reviewed by the concerned department.'
        });
    }
    
    if (complaint.status === 'resolved') {
        timelineItems.push({
            icon: 'fa-check-circle',
            title: 'Issue Resolved',
            date: complaint.date,
            description: 'The reported issue has been resolved successfully.'
        });
    }
    
    return timelineItems.map(item => `
        <div class="timeline-item">
            <div class="timeline-icon">
                <i class="fas ${item.icon}"></i>
            </div>
            <div class="timeline-content">
                <h5>${item.title}</h5>
                <p>${item.description}</p>
                <small>${formatDate(item.date)}</small>
            </div>
        </div>
    `).join('');
}

// Send Reminder Functions
function sendReminder() {
    const complaintId = document.getElementById('reminderComplaintId').value.trim();
    const message = document.getElementById('reminderMessage').value.trim();
    
    if (!complaintId) {
        showErrorMessage(getTranslation('enter_complaint_id'));
        return;
    }
    
    const complaint = complaints.find(c => c.id === complaintId);
    if (!complaint) {
        showErrorMessage(getTranslation('complaint_not_found'));
        return;
    }
    
    if (complaint.status === 'resolved') {
        showErrorMessage(getTranslation('complaint_resolved'));
        return;
    }
    
    // Simulate sending reminder
    showSuccessMessage(getTranslation('reminder_sent') + complaintId);
    
    // Clear form
    document.getElementById('reminderComplaintId').value = '';
    document.getElementById('reminderMessage').value = '';
}

// Feedback Functions
function showFeedbackTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.feedback-tab').forEach(tab => tab.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(tabName + 'FeedbackTab').classList.add('active');
}

function setRating(rating) {
    currentRating = rating;
    const stars = document.querySelectorAll('.star-rating i');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('filled');
        } else {
            star.classList.remove('filled');
        }
    });
}

function submitFeedback(event) {
    event.preventDefault();
    
    if (currentRating === 0) {
        showErrorMessage(getTranslation('select_rating'));
        return;
    }
    
    const feedbackText = document.getElementById('feedbackText').value.trim();
    if (!feedbackText) {
        showErrorMessage(getTranslation('enter_feedback'));
        return;
    }
    
    // Simulate feedback submission
    showSuccessMessage(getTranslation('feedback_submitted'));
    
    // Reset form
    document.getElementById('feedbackText').value = '';
    document.getElementById('feedbackComplaintId').value = '';
    currentRating = 0;
    document.querySelectorAll('.star-rating i').forEach(star => {
        star.classList.remove('filled');
    });
}

// Profile Functions
function loadUserProfile() {
    // Load user profile data (simulated)
    if (currentUser) {
        document.getElementById('profileFullName').value = currentUser.name;
        document.getElementById('profilePhone').value = currentUser.phone;
    }
}

function updateProfile(event) {
    event.preventDefault();
    
    const name = document.getElementById('profileFullName').value.trim();
    const email = document.getElementById('profileEmail').value.trim();
    const phone = document.getElementById('profilePhone').value.trim();
    const address = document.getElementById('profileAddress').value.trim();
    
    if (name && email && phone) {
        // Update current user
        currentUser.name = name;
        currentUser.email = email;
        currentUser.phone = phone;
        currentUser.address = address;
        
        showSuccessMessage(getTranslation('profile_updated'));
    }
}

function changePassword() {
    const newPassword = prompt(currentLanguage === 'hi' ? 'नया पासवर्ड दर्ज करें:' : 'Enter new password:');
    if (newPassword) {
        if (newPassword.length < 6) {
            showErrorMessage(getTranslation('password_length_error'));
            return;
        }
        showSuccessMessage(getTranslation('password_changed'));
    }
}

function deactivateAccount() {
    if (confirm(getTranslation('deactivate_confirm'))) {
        if (confirm(getTranslation('deactivate_final_confirm'))) {
            showSuccessMessage(getTranslation('account_deactivated'));
            setTimeout(() => {
                logout();
            }, 2000);
        }
    }
}

// Registration and Password Reset (Placeholder functions)
function showUserRegistration() {
    alert(getTranslation('registration_feature'));
}

function showForgotPassword() {
    const mobile = prompt(currentLanguage === 'hi' ? 'अपना मोबाइल नंबर दर्ज करें:' : 'Enter your mobile number:');
    if (mobile && mobile.length >= 10) {
        showSuccessMessage(getTranslation('password_reset_sent'));
    } else if (mobile) {
        showErrorMessage(getTranslation('valid_mobile_required'));
    }
}

// Help and Legal Functions
function showPrivacyPolicy() {
    alert(getTranslation('privacy_policy_msg'));
}

function showTermsOfService() {
    alert(getTranslation('terms_of_service_msg'));
}

function showHelp() {
    alert(getTranslation('help_faq_msg'));
}

// Utility Functions
function showSuccessMessage(message) {
    showToast(message, 'success');
}

function showErrorMessage(message) {
    showToast(message, 'error');
}

function showInfoMessage(message) {
    showToast(message, 'info');
}

function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        max-width: 300px;
        word-wrap: break-word;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Set background color based on type
    switch (type) {
        case 'success':
            toast.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
            break;
        case 'error':
            toast.style.background = 'linear-gradient(135deg, #dc3545 0%, #e74c3c 100%)';
            break;
        case 'info':
        default:
            toast.style.background = 'linear-gradient(135deg, #17a2b8 0%, #007bff 100%)';
            break;
    }
    
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => toast.remove(), 300);
        }
    }, 3000);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    };
    return date.toLocaleDateString(currentLanguage === 'hi' ? 'hi-IN' : 'en-US', options);
}

// Add CSS animations for toast
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
