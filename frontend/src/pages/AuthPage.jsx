import { Show, SignInButton, SignUpButton, UserButton} from '@clerk/react'
import "../styles/auth.css"
//SignInButton mode='modal'/>
//<SignUpButton mode='modal'/>

const AuthPage = () => {
  return (
    <div className='auth-container'>
      <div className="auth-left">
        <div className="auth-hero">
          <div className="brand-container">
            <img src="..\logo-re.png" alt="Rewired Recovery" className='brand-logo'/>
            <span className='brand-name'>Rewired Recovery</span>
          </div>
            <h1 className='hero-title'>Reconnect. Recover. Rewire.</h1>
            <p className='hero-subtitle'>
              Rewired Recovery — a safe space to connect, heal, and support each other through addiction and mental health challenges.
            </p>
            <div className="features-list">
              <div className="feature-item">
                <span className='feature-icon'>🎯</span>
                <span>Goal Setting & Reminders</span>
              </div>

              <div className="feature-item">
                <span className='feature-icon'>💬</span>
                <span>Peer-to-Peer Chat</span>
              </div>

              <div className="feature-item">
                <span className='feature-icon'>📅</span>
                <span>Daily Check-Ins</span>
              </div>

            </div>
            <SignInButton mode='modal'>
              <button className='cta-button'>Login or Sign-Up<span>➜</span></button>
            </SignInButton>
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-image-container">
          <img src="..\auth-i.png" alt="" className='auth-image'/>
          <div className="image-overlay"></div>
        </div>
      </div>  
    </div>
  )
}

export default AuthPage;
