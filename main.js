// main.js

document.addEventListener('DOMContentLoaded', () => {
    const terminal = new Terminal({
        cols: 120,
        rows: 30,
        cursorBlink: true,
        theme: {
            background: '#000000',
            foreground: '#ffffff'
        }
    });

    terminal.open(document.getElementById('terminal'));

    let command = '';
    let currentDir = 'home';

    const directories = {
        home: ['projects', 'education', 'experience', 'achievements', 'contact.txt'],
        projects: ['not-weather-app.txt', 'books-manager.txt'],
        education: ['guru-gobind-singh-indraprastha-university.txt', 'guru-harkrishan-public-school.txt'],
        experience: ['intel-corporation.txt', 'progcap.txt', 'ncr-corporation.txt'],
        achievements: ['merit-based-scholarship.txt', 'accepted-research-paper.txt', 'product-manager-fellowship.txt', 'machine-learning-with-python.txt', 'aws-computer-vision.txt', 'microsoft-technical-associate.txt']
    };

    const content = {
        'contact.txt': `
    \x1b[1m\x1b[34m====================\x1b[0m
    \x1b[34m  MAYANK SHARMA\x1b[0m
    \x1b[1m\x1b[34m====================\x1b[0m
    \x1b[32m
    Phone: +91-7982691668[0m
    Location: New Delhi, India
    Email: mayank.sharma08june@gmail.com
    LinkedIn: https://www.linkedin.com/in/mayank-sharma-82ba20143/
    GitHub: https://github.com/mayank8june\x1b[0m
    `,
    
        'not-weather-app.txt': `
    \x1b[1m\x1b[33mNot Just A Weather App\x1b[0m
    \x1b[36mGitHub: https://github.com/mayank8june/Not-just-a-weather-app
    Live Demo: https://mayank8june.github.io/Not-just-a-weather-app/\x1b[0m
    
    \x1b[37m- Created a web app that suggests Spotify playlists based on the current weather.
    - Fetches real-time weather data and dynamically updates the UI.
    - Integrated Spotify API for playlist generation.
    - Used by users from 20 different countries.\x1b[0m
    
    \x1b[1m\x1b[33mTechnologies Used:\x1b[0m
    JavaScript, CSS, Spotify API, Weather API, AJAX, jQuery
    `,
    
        'books-manager.txt': `
    \x1b[1m\x1b[33mBooks Manager\x1b[0m
    \x1b[36mDocumentation: https://drive.google.com/file/d/1n27bqVFwUyq_MR-pH2USoVTQuYXpCIgk/view
    Live Demo: https://kitaabkhana.com/info\x1b[0m
    
    \x1b[37m- Created a web application for managing a book collection.
    - Allows users to add, delete, import, and export books.
    - Utilized Flask for backend, Supabase for database management.
    - Integrated CSV for data import/export functionalities.
    - Deployed on Render for hosting.\x1b[0m
    
    \x1b[1m\x1b[33mTechnologies Used:\x1b[0m
    Python, Flask, Supabase, Render, Bootstrap, Robot Framework
    `,
    
        'guru-gobind-singh-indraprastha-university.txt': `
    \x1b[1m\x1b[33mGuru Gobind Singh Indraprastha University (2022)\x1b[0m
    \x1b[37m- Bachelor of Technology (Major in Electronics And Communication)
    - CGPA: 8.5\x1b[0m
    `,
    
        'guru-harkrishan-public-school.txt': `
    \x1b[1m\x1b[33mGuru Harkrishan Public School (2018)\x1b[0m
    \x1b[37m- PCM – High School
    - Achievements: Rai Sahab Parmanand Award, merit-based scholarships
    - Percentage: 83%\x1b[0m
    `,
    
        'intel-corporation.txt': `
    \x1b[1m\x1b[33mIntel Corporation (Fortune 500) - Bengaluru\x1b[0m
    \x1b[36mSoftware Engineer – Full Time | July’24 – Present\x1b[0m
    
    \x1b[37m- Working on Intel Edge Orchestrator platform, an edge computing solution.
    - Integrates cloud-native technologies with edge-specific optimizations.
    - Writing Go code for deployment in On-prem and AWS, focusing on scalability.
    - Doing POC to incorporate K8sGPT for diagnosis and monitoring.\x1b[0m
    
    \x1b[1m\x1b[33mTech Stack:\x1b[0m
    Golang, Python, Docker, Kubernetes, RPC, Grafana
    `,
    
        'progcap.txt': `
    \x1b[1m\x1b[33mPROGCAP (Series-C Startup, funded by Google, Sequoia) - Gurgaon\x1b[0m
    \x1b[36mSoftware Engineer – Full Time | Aug’22 – July’24\x1b[0m
    
    \x1b[37m- Employee of the quarter in Q3 2023 at Progcap.
    - Real-Time Inventory Data Streaming with Kafka: Implemented Kafka for real-time data streaming.
    - Report Generator: Generates predefined and custom reports based on user queries.
    - Invoice Parser: Developed an invoice parser using Python with OCR and NLP.\x1b[0m
    
    \x1b[1m\x1b[33mTech Stack:\x1b[0m
    Python, Flask, Django, jQuery, SQL, Jupyter Notebook, MariaDB, Redis, Docker, Kafka
    `,
    
        'ncr-corporation.txt': `
    \x1b[1m\x1b[33mNCR CORPORATION (Fortune 500) - Gurgaon\x1b[0m
    \x1b[36mInternship | Jan’22 – Jul’22\x1b[0m
    
    \x1b[37m- Download Center Revamp: Spearheaded transformation of the Download Center.
    - Created UI from scratch and rewrote backend logic for file upload and download using Java.\x1b[0m
    
    \x1b[1m\x1b[33mTech Stack:\x1b[0m
    Java, JDBC, Spring Boot, JavaScript, Bootstrap
    `,
    
        'merit-based-scholarship.txt': `
    \x1b[1m\x1b[33mMerit-Based Scholarship\x1b[0m
    \x1b[37m- Awarded for academic excellence in the final year of university.\x1b[0m
    `,
    
        'accepted-research-paper.txt': `
    \x1b[1m\x1b[33mAccepted Research Paper – IEEE Conference\x1b[0m
    \x1b[37m- Published a research paper on An Empirical Analysis of Different Object Detection Algorithms for Face Recognition at the prestigious IEEE Conference.
    - Collaborated with industry professionals to conduct cutting-edge research.
    - The paper received recognition and was well-received by peers in the field.\x1b[0m
    `
    };
    
    
    
    // Greeting Message
    terminal.writeln('Welcome to Mayank Sharma\'s Interactive Portfolio!');
    terminal.writeln('Type `help` to get started.');
    terminal.write('$ ');

    // Command Handling
    terminal.onKey(e => {
        const char = e.key;
        const code = e.domEvent.keyCode;

        // Handle Enter key
        if (code === 13) {
            handleCommand(terminal, command.trim());
            command = ''; // Clear the command after processing
        } else if (code === 8) {
            // Handle Backspace key
            if (command.length > 0) {
                command = command.slice(0, -1);
                terminal.write('\b \b');
            }
        } else {
            // Add character to the command string
            command += char;
            terminal.write(char);
        }
    });

    function handleCommand(terminal, command) {
        const [cmd, arg] = command.split(' ', 2);

        switch (cmd.toLowerCase()) {
            case 'help':
                terminal.writeln('\r\nAvailable commands:');
                terminal.writeln('  ls                      - List available sections/files');
                terminal.writeln('  cd <section>            - Navigate to a section');
                terminal.writeln('  cd ..                   - Go back to the previous directory');
                terminal.writeln('  cat <file>              - View details of a section/file');
                terminal.writeln('  clear                   - Clear the terminal screen');
                terminal.writeln('  cat contact.txt         - Display contact information');
                terminal.writeln('  projects                - List all projects');
                terminal.writeln('  experience              - Show professional experience');
                terminal.writeln('  education               - Show educational background');
                terminal.writeln('  achievements            - Display achievements & certifications');
                break;
            case 'ls':
                if (directories[currentDir]) {
                    terminal.writeln(`\r\n${directories[currentDir].join('  ')}`);
                } else {
                    terminal.writeln(`\r\n${currentDir}`);
                }
                break;
            case 'clear':
                terminal.clear();
                terminal.writeln('Welcome to Mayank Sharma\'s Interactive Portfolio!');
                terminal.writeln('Type `help` to get started.');
                break;
            case 'contact':
                terminal.writeln(`\r\n${content['contact.txt']}`);
                break;
            default:
                if (cmd === 'cd') {
                    if (arg === '..') {
                        if (currentDir !== 'home') {
                            currentDir = 'home'; // Assuming a single-level directory structure
                            terminal.writeln(`\r\nNavigated to ${currentDir}`);
                        } else {
                            terminal.writeln(`\r\nAlready in the root directory`);
                        }
                    } else if (directories[currentDir] && directories[currentDir].includes(arg)) {
                        currentDir = arg;
                        terminal.writeln(`\r\nNavigated to ${arg}`);
                    } else {
                        terminal.writeln(`\r\n${arg}: No such file or directory`);
                    }
                } else if (cmd === 'cat') {
                    if (content[arg]) {
                        terminal.writeln(`\r\n${content[arg]}`);
                    } else {
                        terminal.writeln(`\r\n${arg}: No such file or directory`);
                    }
                } else {
                    terminal.writeln(`\r\n${command}: command not found`);
                }
                break;
        }
        terminal.write('$ ');
    }

});
