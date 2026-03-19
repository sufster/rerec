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
            <span className='brand-name'>KIZUNA</span>
          </div>
            <h1 className='hero-title'>Chat. Share. Connect.</h1>
            <p className='hero-subtitle'>
              Kizuna — Connect Beyond Words, Heal Together, and Find Your Community.
            </p>
            <div className="features-list">
              <div className="feature-item">
                <span className='feature-icon'>📹</span>
                <span>Video Calling</span>
              </div>

              <div className="feature-item">
                <span className='feature-icon'>💬</span>
                <span>Peer-to-Peer Chat</span>
              </div>

              <div className="feature-item">
                <span className='feature-icon'>🛰️</span>
                <span>Join servers from anywhere</span>
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
