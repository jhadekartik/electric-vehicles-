document.addEventListener('DOMContentLoaded', function() {
    // Add CSS for animations
    addAnimationStyles();
    
    // Initialize all components
    initVehicleAnimations();
    initMotorTypeAnimations();
    initCalculators();
    initUpload();
    initDownloads();
    initQuiz();
});

function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        .rotating {
            animation: rotate 2s linear infinite;
        }
        
        .component-label {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .flow-battery-to-motor {
            position: absolute;
            width: 20%;
            height: 10%;
            background: linear-gradient(90deg, #4CAF50, #2196F3);
            top: 45%;
            left: 40%;
            border-radius: 5px;
            animation: pulse 1.5s infinite alternate;
        }
        
        .flow-hybrid {
            position: absolute;
            width: 30%;
            height: 10%;
            background: linear-gradient(90deg, #FF5722, #2196F3);
            top: 45%;
            left: 35%;
            border-radius: 5px;
            animation: pulse 1.5s infinite alternate;
        }
        
        .flow-hybrid-engine {
            position: absolute;
            width: 25%;
            height: 10%;
            background: linear-gradient(90deg, #FF5722, #4CAF50, #2196F3);
            top: 45%;
            left: 35%;
            border-radius: 5px;
            animation: pulse 1.5s infinite alternate;
        }
        
        .flow-hydrogen {
            position: absolute;
            width: 40%;
            height: 10%;
            background: linear-gradient(90deg, #03A9F4, #673AB7, #4CAF50, #2196F3);
            top: 45%;
            left: 30%;
            border-radius: 5px;
            animation: pulse 1.5s infinite alternate;
        }
        
        @keyframes pulse {
            from { opacity: 0.6; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// Vehicle Animation Functions
function initVehicleAnimations() {
    const playButtons = document.querySelectorAll('.play-btn');
    
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            animateVehicle(target);
        });
    });
}

function animateVehicle(vehicleType) {
    // Reset any ongoing animations
    resetAnimations();
    
    const vehicle = document.getElementById(vehicleType);
    if (!vehicle) return;
    
    const energyFlow = vehicle.querySelector('.energy-flow');
    const wheels = vehicle.querySelectorAll('.wheel');
    
    // Show component labels
    const labels = vehicle.querySelectorAll('.component-label');
    labels.forEach(label => {
        label.style.opacity = '1';
        label.style.visibility = 'visible';
    });
    
    // Add animation classes based on vehicle type
    switch(vehicleType) {
        case 'bev':
            // Battery to motor to wheels
            energyFlow.classList.add('flow-battery-to-motor');
            break;
        case 'phev':
            // Battery and engine to motor to wheels
            energyFlow.classList.add('flow-hybrid');
            break;
        case 'hev':
            // Primarily engine with battery assist
            energyFlow.classList.add('flow-hybrid-engine');
            break;
        case 'fcev':
            // Hydrogen to fuel cell to battery to motor
            energyFlow.classList.add('flow-hydrogen');
            break;
    }
    
    // Animate wheels
    wheels.forEach(wheel => {
        wheel.classList.add('rotating');
    });
    
    // Remove animations after 5 seconds
    setTimeout(resetAnimations, 5000);
}

function resetAnimations() {
    // Remove all animation classes
    document.querySelectorAll('.energy-flow').forEach(flow => {
        flow.classList.remove('flow-battery-to-motor', 'flow-hybrid', 'flow-hybrid-engine', 'flow-hydrogen');
    });
    
    document.querySelectorAll('.wheel').forEach(wheel => {
        wheel.classList.remove('rotating');
    });
    
    // Hide component labels
    document.querySelectorAll('.component-label').forEach(label => {
        label.style.opacity = '0';
    });
}

// Upload Functionality
function initUpload() {
    const fileInput = document.getElementById('file-upload');
    const fileNameDisplay = document.getElementById('file-name');
    const previewContainer = document.getElementById('upload-preview');
    const previewContent = document.getElementById('preview-content');
    const submitButton = document.getElementById('submit-upload');
    
    if (!fileInput || !fileNameDisplay || !previewContainer || !previewContent || !submitButton) return;
    
    // Create notes section if it doesn't exist
    createNotesSection();
    
    fileInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const file = this.files[0];
            fileNameDisplay.textContent = file.name;
            
            const reader = new FileReader();
            
            reader.onload = function(e) {
                previewContainer.classList.remove('hidden');
                
                // Clear previous preview
                previewContent.innerHTML = '';
                
                // Check file type and create appropriate preview
                if (file.type.match('image.*')) {
                    // Image preview
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.alt = file.name;
                    previewContent.appendChild(img);
                } else if (file.type === 'application/pdf') {
                    // PDF preview - create an embed element
                    const embed = document.createElement('embed');
                    embed.src = e.target.result;
                    embed.type = 'application/pdf';
                    embed.width = '100%';
                    embed.height = '300px';
                    previewContent.appendChild(embed);
                    
                    // Also add a message
                    const message = document.createElement('p');
                    message.textContent = 'PDF file preview: ' + file.name;
                    previewContent.appendChild(message);
                } else {
                    // Unsupported file type
                    const message = document.createElement('p');
                    message.textContent = 'Preview not available for this file type.';
                    previewContent.appendChild(message);
                }
            };
            
            // Read the file as a data URL
            reader.readAsDataURL(file);
        } else {
            fileNameDisplay.textContent = 'No file chosen';
            previewContainer.classList.add('hidden');
        }
    });
    
    // Handle form submission
    submitButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('upload-title').value;
        const description = document.getElementById('upload-description').value;
        const category = document.getElementById('upload-category').value;
        
        if (!fileInput.files || fileInput.files.length === 0) {
            alert('Please select a file to upload.');
            return;
        }
        
        if (!title) {
            alert('Please enter a title for your upload.');
            return;
        }
        
        const file = fileInput.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            // Save to notes
            addToNotes(title, e.target.result, description, category);
            
            // Show success message
            alert(`Thank you for your submission!\n\nTitle: ${title}\nCategory: ${getCategoryName(category)}\nFile: ${file.name}\n\nYour design has been uploaded successfully and added to your notes.`);
            
            // Reset the form
            document.getElementById('upload-title').value = '';
            document.getElementById('upload-description').value = '';
            fileInput.value = '';
            fileNameDisplay.textContent = 'No file chosen';
            previewContainer.classList.add('hidden');
        };
        
        // Read the file as a data URL
        reader.readAsDataURL(file);
    });
}

function createNotesSection() {
    // Check if notes section already exists
    if (document.getElementById('notes-section')) return;
    
    // Create notes section
    const notesSection = document.createElement('section');
    notesSection.id = 'notes-section';
    notesSection.className = 'technical-content';
    notesSection.innerHTML = `
        <h2>Your Notes</h2>
        <div class="notes-container">
            <div class="notes-description">
                <p>Access your saved notes and uploaded documents here.</p>
            </div>
            <div id="notes-list" class="notebook-options">
                <p id="no-notes-message">You don't have any saved notes yet. Upload designs or download study materials to save them here.</p>
            </div>
        </div>
        <div id="notes-view" class="upload-preview hidden">
            <h3>Note Preview</h3>
            <div id="notes-content"></div>
        </div>
    `;
    
    // Add notes button to header
    const header = document.querySelector('header');
    if (header) {
        const notesButton = document.createElement('button');
        notesButton.id = 'notes-button';
        notesButton.textContent = 'My Notes';
        notesButton.style.position = 'absolute';
        notesButton.style.top = '20px';
        notesButton.style.right = '20px';
        notesButton.style.backgroundColor = '#4b6cb7';
        notesButton.style.color = 'white';
        notesButton.style.border = 'none';
        notesButton.style.padding = '8px 16px';
        notesButton.style.borderRadius = '4px';
        notesButton.style.cursor = 'pointer';
        notesButton.style.fontWeight = 'bold';
        
        notesButton.addEventListener('click', function() {
            // Scroll to notes section
            notesSection.scrollIntoView({ behavior: 'smooth' });
        });
        
        header.appendChild(notesButton);
    }
    
    // Insert notes section before footer
    const footer = document.querySelector('footer');
    if (footer) {
        footer.parentNode.insertBefore(notesSection, footer);
    } else {
        // If no footer, append to main
        const main = document.querySelector('main');
        if (main) main.appendChild(notesSection);
    }
    
    // Initialize notes from localStorage
    loadNotes();
}

function addToNotes(title, fileUrl, description, category = '') {
    // Get existing notes from localStorage
    let notes = JSON.parse(localStorage.getItem('evNotes') || '[]');
    
    // Add new note
    const newNote = {
        id: Date.now(),
        title: title,
        fileUrl: fileUrl,
        description: description,
        category: category,
        date: new Date().toLocaleDateString()
    };
    
    notes.push(newNote);
    
    // Save back to localStorage
    localStorage.setItem('evNotes', JSON.stringify(notes));
    
    // Update notes display
    loadNotes();
}

function loadNotes() {
    const notesList = document.getElementById('notes-list');
    const noNotesMessage = document.getElementById('no-notes-message');
    
    if (!notesList) return;
    
    // Get notes from localStorage
    const notes = JSON.parse(localStorage.getItem('evNotes') || '[]');
    
    // Clear current notes except the no-notes message
    Array.from(notesList.children).forEach(child => {
        if (child.id !== 'no-notes-message') {
            notesList.removeChild(child);
        }
    });
    
    // Show/hide no notes message
    if (notes.length === 0) {
        if (noNotesMessage) noNotesMessage.style.display = 'block';
    } else {
        if (noNotesMessage) noNotesMessage.style.display = 'none';
        
        // Add notes to the list
        notes.forEach(note => {
            const noteItem = document.createElement('div');
            noteItem.className = 'notebook-item';
            noteItem.innerHTML = `
                <h3>${note.title}</h3>
                <p>${note.description || 'No description provided.'}</p>
                <p><small>Date: ${note.date}</small></p>
                <button class="download-btn view-note-btn" data-note-id="${note.id}">View Note</button>
            `;
            
            notesList.appendChild(noteItem);
        });
        
        // Add event listeners to view buttons
        document.querySelectorAll('.view-note-btn').forEach(button => {
            button.addEventListener('click', function() {
                const noteId = parseInt(this.getAttribute('data-note-id'));
                viewNote(noteId);
            });
        });
    }
}

function viewNote(noteId) {
    const notes = JSON.parse(localStorage.getItem('evNotes') || '[]');
    const note = notes.find(n => n.id === noteId);
    
    if (!note) return;
    
    const notesView = document.getElementById('notes-view');
    const notesContent = document.getElementById('notes-content');
    
    if (!notesView || !notesContent) return;
    
    // Clear previous content
    notesContent.innerHTML = '';
    
    // Add note details
    const noteDetails = document.createElement('div');
    noteDetails.innerHTML = `
        <h4>${note.title}</h4>
        <p>${note.description || 'No description provided.'}</p>
        <p><small>Date: ${note.date}</small></p>
    `;
    notesContent.appendChild(noteDetails);
    
    // Check if it's a PDF or image
    if (note.fileUrl.includes('data:application/pdf')) {
        // PDF preview
        const embed = document.createElement('embed');
        embed.src = note.fileUrl;
        embed.type = 'application/pdf';
        embed.width = '100%';
        embed.height = '500px';
        notesContent.appendChild(embed);
    } else if (note.fileUrl.includes('data:image')) {
        // Image preview
        const img = document.createElement('img');
        img.src = note.fileUrl;
        img.alt = note.title;
        img.style.maxWidth = '100%';
        img.style.maxHeight = '500px';
        notesContent.appendChild(img);
    }
    
    // Show the view
    notesView.classList.remove('hidden');
    notesView.scrollIntoView({ behavior: 'smooth' });
}

// Download Functionality
function initDownloads() {
    const downloadButtons = document.querySelectorAll('.download-btn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const notebookType = this.getAttribute('data-notebook');
            downloadNotebook(notebookType);
        });
    });
}

function downloadNotebook(notebookType) {
    // Create PDF content based on notebook type
    let pdfContent;
    let fileName;
    
    switch(notebookType) {
        case 'ev-types':
            fileName = 'EV_Types_and_Working_Principles.pdf';
            pdfContent = createEVTypesPDF();
            break;
        case 'motors':
            fileName = 'Electric_Motors_in_EVs.pdf';
            pdfContent = createMotorsPDF();
            break;
        case 'batteries':
            fileName = 'Battery_Technology.pdf';
            pdfContent = createBatteriesPDF();
            break;
        case 'complete':
            fileName = 'Complete_EV_Technology_Guide.pdf';
            pdfContent = createCompletePDF();
            break;
        default:
            fileName = 'Study_Material.pdf';
            pdfContent = createDefaultPDF();
    }
    
    // Create a blob from the PDF content
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    
    // Create a link and trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 0);
    
    // Add to notes if it's the conceptswish PDF
    if (notebookType === 'complete') {
        addToNotes(fileName, url, 'Downloaded study material');
    }
}

function createEVTypesPDF() {
    // Simple text-based PDF content for demonstration
    return `%PDF-1.4
1 0 obj
<</Type /Catalog /Pages 2 0 R>>
endobj
2 0 obj
<</Type /Pages /Kids [3 0 R] /Count 1>>
endobj
3 0 obj
<</Type /Page /Parent 2 0 R /Resources 4 0 R /MediaBox [0 0 612 792] /Contents 6 0 R>>
endobj
4 0 obj
<</Font <</F1 5 0 R>>>>
endobj
5 0 obj
<</Type /Font /Subtype /Type1 /BaseFont /Helvetica>>
endobj
6 0 obj
<</Length 44>>
stream
BT /F1 24 Tf 100 700 Td (EV Types and Working Principles) Tj ET
BT /F1 12 Tf 100 650 Td (This is a sample PDF for EV Types study material) Tj ET
endstream
endobj
xref
0 7
0000000000 65535 f
0000000009 00000 n
0000000056 00000 n
0000000111 00000 n
0000000212 00000 n
0000000250 00000 n
0000000317 00000 n
trailer
<</Size 7/Root 1 0 R>>
startxref
406
%%EOF`;
}

function createMotorsPDF() {
    // Simple text-based PDF content for demonstration
    return `%PDF-1.4
1 0 obj
<</Type /Catalog /Pages 2 0 R>>
endobj
2 0 obj
<</Type /Pages /Kids [3 0 R] /Count 1>>
endobj
3 0 obj
<</Type /Page /Parent 2 0 R /Resources 4 0 R /MediaBox [0 0 612 792] /Contents 6 0 R>>
endobj
4 0 obj
<</Font <</F1 5 0 R>>>>
endobj
5 0 obj
<</Type /Font /Subtype /Type1 /BaseFont /Helvetica>>
endobj
6 0 obj
<</Length 44>>
stream
BT /F1 24 Tf 100 700 Td (Electric Motors in EVs) Tj ET
BT /F1 12 Tf 100 650 Td (This is a sample PDF for Electric Motors study material) Tj ET
endstream
endobj
xref
0 7
0000000000 65535 f
0000000009 00000 n
0000000056 00000 n
0000000111 00000 n
0000000212 00000 n
0000000250 00000 n
0000000317 00000 n
trailer
<</Size 7/Root 1 0 R>>
startxref
406
%%EOF`;
}

function createBatteriesPDF() {
    // Simple text-based PDF content for demonstration
    return `%PDF-1.4
1 0 obj
<</Type /Catalog /Pages 2 0 R>>
endobj
2 0 obj
<</Type /Pages /Kids [3 0 R] /Count 1>>
endobj
3 0 obj
<</Type /Page /Parent 2 0 R /Resources 4 0 R /MediaBox [0 0 612 792] /Contents 6 0 R>>
endobj
4 0 obj
<</Font <</F1 5 0 R>>>>
endobj
5 0 obj
<</Type /Font /Subtype /Type1 /BaseFont /Helvetica>>
endobj
6 0 obj
<</Length 44>>
stream
BT /F1 24 Tf 100 700 Td (Battery Technology) Tj ET
BT /F1 12 Tf 100 650 Td (This is a sample PDF for Battery Technology study material) Tj ET
endstream
endobj
xref
0 7
0000000000 65535 f
0000000009 00000 n
0000000056 00000 n
0000000111 00000 n
0000000212 00000 n
0000000250 00000 n
0000000317 00000 n
trailer
<</Size 7/Root 1 0 R>>
startxref
406
%%EOF`;
}

function createCompletePDF() {
    // This is the "conceptswish" PDF
    return `%PDF-1.4
1 0 obj
<</Type /Catalog /Pages 2 0 R>>
endobj
2 0 obj
<</Type /Pages /Kids [3 0 R] /Count 1>>
endobj
3 0 obj
<</Type /Page /Parent 2 0 R /Resources 4 0 R /MediaBox [0 0 612 792] /Contents 6 0 R>>
endobj
4 0 obj
<</Font <</F1 5 0 R>>>>
endobj
5 0 obj
<</Type /Font /Subtype /Type1 /BaseFont /Helvetica>>
endobj
6 0 obj
<</Length 44>>
stream
BT /F1 24 Tf 100 700 Td (ConceptSwish: Complete EV Technology Guide) Tj ET
BT /F1 14 Tf 100 650 Td (Comprehensive Electric Vehicle Technology Reference) Tj ET
BT /F1 12 Tf 100 620 Td (This guide covers all aspects of electric vehicle technology including:) Tj ET
BT /F1 12 Tf 120 590 Td (- EV Types: BEV, PHEV, HEV, FCEV) Tj ET
BT /F1 12 Tf 120 570 Td (- Motor Technologies: PMSM, ACIM, SRM) Tj ET
BT /F1 12 Tf 120 550 Td (- Battery Systems: Li-ion, Solid State, NMH) Tj ET
BT /F1 12 Tf 120 530 Td (- Charging Infrastructure) Tj ET
BT /F1 12 Tf 120 510 Td (- Performance Calculations) Tj ET
BT /F1 12 Tf 100 470 Td (ConceptSwish is your complete resource for understanding electric vehicle technology) Tj ET
BT /F1 12 Tf 100 450 Td (from basic principles to advanced engineering concepts.) Tj ET
endstream
endobj
xref
0 7
0000000000 65535 f
0000000009 00000 n
0000000056 00000 n
0000000111 00000 n
0000000212 00000 n
0000000250 00000 n
0000000317 00000 n
trailer
<</Size 7/Root 1 0 R>>
startxref
406
%%EOF`;
}

function createDefaultPDF() {
    // Simple text-based PDF content for demonstration
    return `%PDF-1.4
1 0 obj
<</Type /Catalog /Pages 2 0 R>>
endobj
2 0 obj
<</Type /Pages /Kids [3 0 R] /Count 1>>
endobj
3 0 obj
<</Type /Page /Parent 2 0 R /Resources 4 0 R /MediaBox [0 0 612 792] /Contents 6 0 R>>
endobj
4 0 obj
<</Font <</F1 5 0 R>>>>
endobj
5 0 obj
<</Type /Font /Subtype /Type1 /BaseFont /Helvetica>>
endobj
6 0 obj
<</Length 44>>
stream
BT /F1 24 Tf 100 700 Td (EV Study Material) Tj ET
BT /F1 12 Tf 100 650 Td (This is a sample PDF for EV study material) Tj ET
endstream
endobj
xref
0 7
0000000000 65535 f
0000000009 00000 n
0000000056 00000 n
0000000111 00000 n
0000000212 00000 n
0000000250 00000 n
0000000317 00000 n
trailer
<</Size 7/Root 1 0 R>>
startxref
406
%%EOF`;
}

// Quiz Functionality
function initQuiz() {
    const startQuizButton = document.getElementById('start-quiz');
    const submitQuizButton = document.getElementById('submit-quiz');
    const retryQuizButton = document.getElementById('retry-quiz');
    const quizTopicSelect = document.getElementById('quiz-topic');
    const questionsContainer = document.getElementById('quiz-questions');
    const resultsContainer = document.getElementById('quiz-results');
    const quizScore = document.getElementById('quiz-score');
    const quizFeedback = document.getElementById('quiz-feedback');
    
    if (!startQuizButton || !submitQuizButton || !retryQuizButton || !quizTopicSelect || 
        !questionsContainer || !resultsContainer || !quizScore || !quizFeedback) return;
    
    let currentQuiz = [];
    
    startQuizButton.addEventListener('click', function() {
        const topic = quizTopicSelect.value;
        loadQuiz(topic);
        submitQuizButton.disabled = false;
        resultsContainer.classList.add('hidden');
    });
    
    submitQuizButton.addEventListener('click', function() {
        evaluateQuiz();
        submitQuizButton.disabled = true;
        resultsContainer.classList.remove('hidden');
    });
    
    retryQuizButton.addEventListener('click', function() {
        const topic = quizTopicSelect.value;
        loadQuiz(topic);
        submitQuizButton.disabled = false;
        resultsContainer.classList.add('hidden');
    });
    
    function loadQuiz(topic) {
        // Get questions based on topic
        currentQuiz = getQuizQuestions(topic);
        
        // Clear previous questions
        questionsContainer.innerHTML = '';
        
        // Add questions to the container
        currentQuiz.forEach((question, index) => {
            const questionElement = document.createElement('div');
            questionElement.className = 'quiz-question';
            
            const questionText = document.createElement('p');
            questionText.textContent = `${index + 1}. ${question.question}`;
            questionElement.appendChild(questionText);
            
            // Add answer options
            question.options.forEach((option, optionIndex) => {
                const optionContainer = document.createElement('div');
                optionContainer.className = 'quiz-option';
                
                const radioInput = document.createElement('input');
                radioInput.type = 'radio';
                radioInput.name = `question-${index}`;
                radioInput.id = `question-${index}-option-${optionIndex}`;
                radioInput.value = optionIndex;
                
                const label = document.createElement('label');
                label.htmlFor = `question-${index}-option-${optionIndex}`;
                label.textContent = option;
                
                optionContainer.appendChild(radioInput);
                optionContainer.appendChild(label);
                questionElement.appendChild(optionContainer);
            });
            
            questionsContainer.appendChild(questionElement);
        });
    }
    
    function evaluateQuiz() {
        let score = 0;
        let feedback = '';
        
        currentQuiz.forEach((question, index) => {
            const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);
            
            if (selectedOption) {
                const answerIndex = parseInt(selectedOption.value);
                const isCorrect = answerIndex === question.correctAnswer;
                
                if (isCorrect) {
                    score++;
                    feedback += `<div class="feedback-correct"><p><strong>Question ${index + 1}:</strong> ${question.question}</p>
                        <p>Your answer: ${question.options[answerIndex]} ✓</p>
                    </div>`;
                } else {
                    feedback += `<div class="feedback-incorrect"><p><strong>Question ${index + 1}:</strong> ${question.question}</p>
                        <p>Your answer: ${question.options[answerIndex]} ✗</p>
                        <p>Correct answer: ${question.options[question.correctAnswer]}</p>
                    </div>`;
                }
            } else {
                feedback += `<div class="feedback-incorrect"><p><strong>Question ${index + 1}:</strong> ${question.question}</p>
                    <p>You did not answer this question.</p>
                    <p>Correct answer: ${question.options[question.correctAnswer]}</p>
                </div>`;
            }
        });
        
        quizScore.textContent = `${score}/${currentQuiz.length}`;
        quizFeedback.innerHTML = feedback;
    }
    
    function getQuizQuestions(topic) {
        // Sample questions for each topic
        const quizzes = {
            'ev-types': [
                {
                    question: 'Which type of electric vehicle runs entirely on electricity stored in battery packs?',
                    options: ['BEV', 'PHEV', 'HEV', 'FCEV'],
                    correctAnswer: 0
                },
                {
                    question: 'Which type of electric vehicle uses hydrogen as its primary energy source?',
                    options: ['BEV', 'PHEV', 'HEV', 'FCEV'],
                    correctAnswer: 3
                },
                {
                    question: 'Which type of electric vehicle cannot be plugged in to charge?',
                    options: ['BEV', 'PHEV', 'HEV', 'FCEV'],
                    correctAnswer: 2
                },
                {
                    question: 'Which vehicle type typically has the shortest electric-only range?',
                    options: ['BEV', 'PHEV', 'HEV', 'FCEV'],
                    correctAnswer: 2
                },
                {
                    question: 'Which vehicle type combines a gasoline engine with an electric motor that can be charged from an electrical outlet?',
                    options: ['BEV', 'PHEV', 'HEV', 'FCEV'],
                    correctAnswer: 1
                }
            ],
            'motor-types': [
                {
                    question: 'Which motor type uses permanent magnets embedded in the rotor?',
                    options: ['AC Induction Motor', 'Permanent Magnet Synchronous Motor', 'Switched Reluctance Motor', 'DC Brushed Motor'],
                    correctAnswer: 1
                },
                {
                    question: 'Which motor type does not require permanent magnets?',
                    options: ['Permanent Magnet Synchronous Motor', 'AC Induction Motor', 'Permanent Magnet DC Motor', 'All of the above'],
                    correctAnswer: 1
                },
                {
                    question: 'Which motor type was used in early Tesla Model S vehicles?',
                    options: ['Permanent Magnet Synchronous Motor', 'AC Induction Motor', 'Switched Reluctance Motor', 'DC Brushed Motor'],
                    correctAnswer: 1
                },
                {
                    question: 'Which motor type typically has the highest efficiency?',
                    options: ['AC Induction Motor', 'Permanent Magnet Synchronous Motor', 'Switched Reluctance Motor', 'DC Brushed Motor'],
                    correctAnswer: 1
                },
                {
                    question: 'Which motor type has the simplest construction?',
                    options: ['AC Induction Motor', 'Permanent Magnet Synchronous Motor', 'Switched Reluctance Motor', 'DC Brushed Motor'],
                    correctAnswer: 2
                }
            ],
            // Add more quiz topics as needed
            'motor-selection': [
                {
                    question: 'What is the primary factor that determines the required motor power in an EV?',
                    options: ['Vehicle weight', 'Desired acceleration', 'Top speed', 'All of the above'],
                    correctAnswer: 3
                },
                {
                    question: 'Which formula correctly calculates motor torque?',
                    options: ['Torque = Power × RPM', 'Torque = Power / RPM', 'Torque = (Power × 9550) / RPM', 'Torque = RPM / Power'],
                    correctAnswer: 2
                }
            ],
            'motor-controllers': [
                {
                    question: 'What is the main function of a motor controller in an EV?',
                    options: ['To convert AC to DC', 'To regulate power to the motor', 'To charge the battery', 'To control the brakes'],
                    correctAnswer: 1
                },
                {
                    question: 'Which component converts DC from the battery to AC for the motor?',
                    options: ['Converter', 'Inverter', 'Transformer', 'Rectifier'],
                    correctAnswer: 1
                }
            ],
            'battery-types': [
                {
                    question: 'Which battery chemistry has the highest energy density?',
                    options: ['Lead-Acid', 'Nickel-Metal Hydride', 'Lithium-Ion', 'Solid-State'],
                    correctAnswer: 2
                },
                {
                    question: 'Which battery type is commonly used in hybrid vehicles but rarely in full EVs?',
                    options: ['Lead-Acid', 'Nickel-Metal Hydride', 'Lithium-Ion', 'Solid-State'],
                    correctAnswer: 1
                }
            ],
            'battery-calculations': [
                {
                    question: 'How is battery capacity in Ah calculated?',
                    options: ['Energy (Wh) × Voltage (V)', 'Energy (Wh) ÷ Voltage (V)', 'Voltage (V) ÷ Current (A)', 'Current (A) × Time (h)'],
                    correctAnswer: 1
                },
                {
                    question: 'What does a C-rate of 2C mean?',
                    options: ['The battery will charge in 2 hours', 'The battery will discharge in 2 hours', 'The battery will discharge in 30 minutes', 'The battery capacity is doubled'],
                    correctAnswer: 2
                }
            ]
        };
        
        return quizzes[topic] || [];
    }
}