import React, { useState, useEffect, useRef } from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom/client";

const countries = ["United States", "Canada", "United Kingdom", "Australia", "Germany", "France", "India", "Japan"];

// --- Helper Icon Components ---
const Icon = ({ path, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 ${className}`}>
        <path fillRule="evenodd" d={path} clipRule="evenodd" />
    </svg>
);
const ICONS = {
    search: "M10.875 3.375a7.5 7.5 0 100 15 7.5 7.5 0 000-15zM2.625 10.875a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.625 10.875z",
    arrowRight: "M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z",
    mic: "M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3zM19 12a1 1 0 01-1 1h-1a5 5 0 01-5 5 5 5 0 01-5-5H6a1 1 0 01-1-1 7 7 0 0114 0z",
    paperClip: "M12.553 3.103a.75.75 0 011.06 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l7.5-7.5zM8.707 9.293a2.25 2.25 0 103.182 3.182l6.84-6.84a3.75 3.75 0 00-5.303-5.303l-8.22 8.22a5.25 5.25 0 007.424 7.424l8.22-8.22a.75.75 0 111.06 1.06l-8.22 8.22a6.75 6.75 0 01-9.545-9.545l8.22-8.22a5.25 5.25 0 017.424 7.424l-6.84 6.84a3.75 3.75 0 11-5.303-5.303l6.84-6.84a.75.75 0 011.06 1.06l-6.84 6.84a2.25 2.25 0 00-3.182-3.182L8.707 9.293z",
    send: "M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z",
    menu: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5",
    close: "M6.28 5.22a.75.75 0 00-1.06 1.06L10.94 12l-5.72 5.72a.75.75 0 101.06 1.06L12 13.06l5.72 5.72a.75.75 0 101.06-1.06L13.06 12l5.72-5.72a.75.75 0 00-1.06-1.06L12 10.94 6.28 5.22z",
    plus: "M12 4.5a.75.75 0 01.75.75v6h6a.75.75 0 010 1.5h-6v6a.75.75 0 01-1.5 0v-6h-6a.75.75 0 010-1.5h6v-6A.75.75 0 0112 4.5z",
    clock: "M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z",
    users: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 19.5a3 3 0 013-3h6a3 3 0 013 3v.75a.75.75 0 01-.75.75h-10.5a.75.75 0 01-.75-.75v-.75z",
    logout: "M11.25 3.75a.75.75 0 01.75-.75h6a.75.75 0 01.75.75v16.5a.75.75 0 01-.75.75h-6a.75.75 0 01-.75-.75V3.75zM6.31 11.47a.75.75 0 010 1.06l-2.25 2.25a.75.75 0 01-1.06 0l-2.25-2.25a.75.75 0 111.06-1.06l1.72 1.72V6.75a.75.75 0 011.5 0v6.44l1.72-1.72a.75.75 0 011.06 0z",
};

// --- Auth Components ---
const RegisterPage = ({ onLoginSwitch, onRegister }) => {
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', dob: '', country: '', password: '', confirmPassword: '', terms: false
    });
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        if (!formData.terms) {
            alert("You must agree to the terms and conditions!");
            return;
        }
        onRegister(formData);
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
             <div className="form-row">
                <div className="input-group"><input type="text" name="firstName" required placeholder=" " onChange={handleChange} /><label>First Name</label></div>
                <div className="input-group"><input type="text" name="lastName" required placeholder=" " onChange={handleChange} /><label>Last Name</label></div>
            </div>
            <div className="input-group"><input type="email" name="email" required placeholder=" " onChange={handleChange} /><label>Email</label></div>
            <div className="form-row">
                <div className="input-group"><input type="date" name="dob" required placeholder=" " onChange={handleChange} style={{ colorScheme: 'dark' }} /><label>Date of Birth</label></div>
                <div className="input-group">
                    <select name="country" required onChange={handleChange} defaultValue="">
                        <option value="" disabled>Select Country</option>
                        {countries.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
            </div>
            <div className="input-group"><input type="password" name="password" required placeholder=" " onChange={handleChange} /><label>Password</label></div>
            <div className="input-group"><input type="password" name="confirmPassword" required placeholder=" " onChange={handleChange} /><label>Confirm Password</label></div>
            <div className="checkbox-group">
                <input type="checkbox" id="terms" name="terms" checked={formData.terms} onChange={handleChange} />
                <label htmlFor="terms" style={{position: 'static', background: 'none'}}>I agree to the terms and conditions</label>
            </div>
            <button type="submit" className="auth-button">Register</button>
            <p className="auth-switch">Already have an account? <span onClick={onLoginSwitch}>Login</span></p>
        </form>
    );
};

const LoginPage = ({ onRegisterSwitch, onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin({ email }); // Simulate login
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <div className="input-group"><input type="email" required placeholder=" " value={email} onChange={e => setEmail(e.target.value)} /><label>Email</label></div>
            <div className="input-group"><input type="password" required placeholder=" " value={password} onChange={e => setPassword(e.target.value)} /><label>Password</label></div>
            <p className="auth-switch" style={{textAlign: 'right', marginTop: '-1rem', marginBottom: '1.5rem'}}><span>Forgot Password?</span></p>
            <button type="submit" className="auth-button">Login</button>
            <p className="auth-switch">Don't have an account? <span onClick={onRegisterSwitch}>Register</span></p>
        </form>
    );
};

const AuthPage = ({ setView, setUser }) => {
    const [isLogin, setIsLogin] = useState(false);

    const handleRegister = (userData) => {
        const simpleUser = {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            dob: userData.dob,
            country: userData.country
        };
        setUser(simpleUser);
        setView('chat');
    };
    
    const handleLogin = (loginData) => {
        // Mock user data for login
        const mockUser = {
            firstName: 'Alex', lastName: 'Doe', email: loginData.email, dob: '1995-08-15', country: 'United States'
        };
        setUser(mockUser);
        setView('chat');
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header"><h1>Welcome to <span>Pro Nex AI</span></h1></div>
                {isLogin ? 
                    <LoginPage onRegisterSwitch={() => setIsLogin(false)} onLogin={handleLogin} /> : 
                    <RegisterPage onLoginSwitch={() => setIsLogin(true)} onRegister={handleRegister} />
                }
            </div>
        </div>
    );
};

// --- Chat Components ---
const ProfileModal = ({ user, onClose, onLogout }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}><Icon path={ICONS.close}/></button>
                <h2>My Profile</h2>
                <div className="profile-details">
                    <p><strong>First Name:</strong> {user.firstName}</p>
                    <p><strong>Last Name:</strong> {user.lastName}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Date of Birth:</strong> {user.dob}</p>
                    <p><strong>Country:</strong> {user.country}</p>
                </div>
                <button className="auth-button logout-btn" onClick={onLogout}>
                    <Icon path={ICONS.logout} />
                    Logout
                </button>
            </div>
        </div>
    );
};

const Sidebar = ({ user, onProfileClick, isSidebarOpen }) => {
    const exploreItems = [
        { name: 'Recent', icon: ICONS.clock },
        { name: 'Shared with you', icon: ICONS.users },
    ];

    return (
        <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
                <h2>Pro Nex AI</h2>
            </div>
            <div className="search-box">
                <span className="icon"><Icon path={ICONS.search} /></span>
                <input type="text" placeholder="Search chats..." />
            </div>
            <button className="new-chat-btn">
                <Icon path={ICONS.plus} />
                New Chat
            </button>
            <div className="chat-history">
                <h3>Explore</h3>
                {exploreItems.map(item => (
                    <div key={item.name} className="chat-history-item">
                        <Icon path={item.icon} />
                        <span>{item.name}</span>
                    </div>
                ))}
            </div>
            <div className="profile-section" onClick={onProfileClick}>
                <div className="avatar">{user.firstName[0]}{user.lastName[0]}</div>
                <div className="username">{user.firstName} {user.lastName}</div>
                <Icon path={ICONS.arrowRight} />
            </div>
        </aside>
    );
};

const ChatArea = ({ messages, onSendMessage, onMenuClick }) => {
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);
    const textareaRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);
    
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [input]);

    const handleSend = () => {
        if (input.trim()) {
            onSendMessage(input);
            setInput('');
        }
    };
    
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <main className="chat-area">
            <header className="chat-header">
                <button className="menu-btn" onClick={onMenuClick}><Icon path={ICONS.menu} /></button>
                <h3>AI Chat Bot</h3>
            </header>
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        <div className="avatar">
                            {msg.sender === 'user' ? 'U' : 'AI'}
                        </div>
                        <div className="message-content">
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="chat-input-area">
                 <div className="input-wrapper">
                    <textarea 
                        ref={textareaRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message..."
                        rows={1}
                    />
                    <button aria-label="Voice input" className="icon-btn-inside">
                        <Icon path={ICONS.mic} />
                    </button>
                </div>
                <button className="icon-btn" aria-label="Attach file">
                    <Icon path={ICONS.paperClip} />
                </button>
                <button className="send-btn" aria-label="Send message" onClick={handleSend}>
                    <Icon path={ICONS.send} />
                </button>
            </div>
        </main>
    );
};


const ChatInterface = ({ user, setView, setUser }) => {
    const [isProfileOpen, setProfileOpen] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
    const [messages, setMessages] = useState([
        { sender: 'ai', text: `Hello ${user.firstName}! How can I assist you today?` }
    ]);
    
    const handleSendMessage = (text) => {
        const newUserMessage = { sender: 'user', text };
        setMessages(prev => [...prev, newUserMessage]);

        // Simulate AI response
        setTimeout(() => {
            const aiResponse = { sender: 'ai', text: 'This is a simulated AI response. The backend is not connected.' };
            setMessages(prev => [...prev, aiResponse]);
        }, 1000);
    };

    const handleLogout = () => {
        setUser(null);
        setView('login');
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setSidebarOpen(true);
            } else {
                setSidebarOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="chat-app">
            <Sidebar 
                user={user} 
                onProfileClick={() => setProfileOpen(true)} 
                isSidebarOpen={isSidebarOpen} 
            />
            <ChatArea 
                messages={messages} 
                onSendMessage={handleSendMessage} 
                onMenuClick={() => setSidebarOpen(prev => !prev)}
            />
            {isProfileOpen && (
                <ProfileModal 
                    user={user} 
                    onClose={() => setProfileOpen(false)} 
                    onLogout={handleLogout} 
                />
            )}
        </div>
    );
};


// --- Main App Component ---
const App = () => {
  const [view, setView] = useState('register'); // 'register', 'login', 'chat'
  const [user, setUser] = useState(null);

  switch (view) {
    case 'chat':
      return user ? <ChatInterface user={user} setView={setView} setUser={setUser} /> : <AuthPage setView={setView} setUser={setUser} />;
    case 'login':
    case 'register':
    default:
      return <AuthPage setView={setView} setUser={setUser} />;
  }
};

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);