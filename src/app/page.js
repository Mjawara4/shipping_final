export default function Home() {
    return (
      <div className="container">
        <div className="home-cta">
          <h1>Welcome to MO Multiservices Shipping</h1>
          <p>Your trusted shipping partner for all your package needs</p>
          
          <div className="home-cta-buttons">
            <a 
              href="/ship" 
              className="home-cta-btn"
              style={{backgroundColor: '#3498db'}}
            >
              Ship a Package
            </a>
            <a 
              href="/enquiry" 
              className="home-cta-btn"
              style={{backgroundColor: '#2ecc71'}}
            >
              Ask a Question
            </a>
          </div>
        </div>
      </div>
    )
  }