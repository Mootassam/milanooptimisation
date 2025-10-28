import React from 'react'
import SubHeader from 'src/view/shared/Header/SubHeader'

function about() {
  return (
    <>

  <SubHeader title="About"  />
  {/* Page Title */}
  <div className="page-title"></div>
 
  {/* Our Story Section */}
<div className="content-section">
    <h2 className="section-title">
      <i className="fas fa-book-open" />
      Our Story
    </h2>
    <div className="section-content">
      <p>
        Founded in 2013 by Christian Raisson and Philippe de Chanville, ManoMano was created with a powerful vision: to revolutionize the home improvement and gardening market by making it accessible to all.
      </p>
      <p>
        From a small French startup, we have grown into Europe's leading online platform for DIY, gardening, and home improvement, serving millions of customers with a seamless mix of European convenience and key services for Africa, like cash-on-delivery.
      </p>
    </div>
  </div>

  {/* Stats Section */}
  <div className="content-section">
    <h2 className="section-title">
      <i className="fas fa-chart-line" />
      By The Numbers
    </h2>
    <div className="stats-container">
      <div className="stat-item">
        <div className="stat-value">10M+</div>
        <div className="stat-label">Products</div>
      </div>
      <div className="stat-item">
        <div className="stat-value">8+</div>
        <div className="stat-label">Countries</div>
      </div>
      <div className="stat-item">
        <div className="stat-value">3.6K+</div>
        <div className="stat-label">Partner Sellers</div>
      </div>
      <div className="stat-item">
        <div className="stat-value">1,200+</div>
        <div className="stat-label">Manas & Manos</div>
      </div>
    </div>
  </div>

  {/* Timeline Section */}
  <div className="content-section">
    <h2 className="section-title">
      <i className="fas fa-history" />
      Our Journey
    </h2>
    <div className="timeline">
      <div className="timeline-item">
        <div className="timeline-dot" />
        <div className="timeline-year">2013</div>
        <div className="timeline-content">
          ManoMano founded in France by Christian Raisson and Philippe de Chanville
        </div>
      </div>
      <div className="timeline-item">
        <div className="timeline-dot" />
        <div className="timeline-year">2015</div>
        <div className="timeline-content">Expanded into Spain and Italy</div>
      </div>
      <div className="timeline-item">
        <div className="timeline-dot" />
        <div className="timeline-year">2017</div>
        <div className="timeline-content">Launched in Belgium and Germany</div>
      </div>
      <div className="timeline-item">
        <div className="timeline-dot" />
        <div className="timeline-year">2019</div>
        <div className="timeline-content">
          Introduced ManoMano Pro for professional clients
        </div>
      </div>
      <div className="timeline-item">
        <div className="timeline-dot" />
        <div className="timeline-year">2021</div>
        <div className="timeline-content">
          Achieved unicorn status with $355 million in Series F funding
        </div>
      </div>
      <div className="timeline-item">
        <div className="timeline-dot" />
        <div className="timeline-year">2023</div>
        <div className="timeline-content">
          Strengthened our growth and presence across Europe and Africa
        </div>
      </div>
    </div>
  </div>

  {/* Values Section */}
  <div className="content-section">
    <h2 className="section-title">
      <i className="fas fa-heart" />
      Our Values
    </h2>
    <div className="values-container">
      <div className="value-item">
        <div className="value-icon">
          <i className="fas fa-lightbulb" />
        </div>
        <div className="value-content">
          <h4>Customer Centricity</h4>
          <p>
            We put our customers first, constantly innovating our platform and services, from advice to delivery, to meet their unique needs.
          </p>
        </div>
      </div>
      <div className="value-item">
        <div className="value-icon">
          <i className="fas fa-hands-helping" />
        </div>
        <div className="value-content">
          <h4>Boldness</h4>
          <p>
            We are entrepreneurs at heart, daring to challenge the status quo and expand into new markets to make DIY accessible for everyone.
          </p>
        </div>
      </div>
      <div className="value-item">
        <div className="value-icon">
          <i className="fas fa-seedling" />
        </div>
        <div className="value-content">
          <h4>Commitment</h4>
          <p>
            We are committed to our community and the planet, promoting sustainable products and responsible practices in home improvement.
          </p>
        </div>
      </div>
    </div>
  </div>

  {/* Team Section */}
  <div className="content-section">
    <h2 className="section-title">
      <i className="fas fa-users" />
      Leadership Team
    </h2>
    <div className="team-grid">
      <div className="team-member">
        <div className="member-photo">
          <i className="fas fa-user" />
        </div>
        <div className="member-name">Christian Raisson</div>
        <div className="member-role">Co-Founder & CEO</div>
      </div>
      <div className="team-member">
        <div className="member-photo">
          <i className="fas fa-user" />
        </div>
        <div className="member-name">Philippe de Chanville</div>
        <div className="member-role">Co-Founder & Chief Operating Officer</div>
      </div>
    </div>
  </div>

  {/* CTA Section */}
  <div className="cta-section">
    <h3 className="cta-title">Join the ManoMano Community</h3>
    <p className="cta-text">
      Discover why millions of DIY enthusiasts and professionals trust ManoMano for all their home improvement and gardening projects.
    </p>
    <a href="#" className="cta-button">
      Start Your Project
    </a>
  </div>
  {/* Bottom Navigation */}

  <style>{`
        /* Content Sections */
        .content-section {
            background: white;
            border-radius: 12px;
            padding: 20px;
            margin: 0 15px 20px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }
        
        .section-title {
            color: #0f2161;
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
        }
        
        .section-title i {
            margin-right: 10px;
            background: #f0f4ff;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #0f2161;
        }
        
        .section-content {
            color: #5a6370;
            line-height: 1.6;
            font-size: 15px;
        }
        
        .section-content p {
            margin-bottom: 15px;
        }
        
        /* Stats Section */
        .stats-container {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin-top: 15px;
        }
        
        .stat-item {
            text-align: center;
            padding: 15px 10px;
            background: #f8f9ff;
            border-radius: 10px;
        }
        
        .stat-value {
            font-size: 24px;
            font-weight: 800;
            color: #0f2161;
            margin-bottom: 5px;
        }
        
        .stat-label {
            font-size: 14px;
            color: #7b8796;
        }
        
        /* Values Section */
        .values-container {
            margin-top: 15px;
        }
        
        .value-item {
            display: flex;
            align-items: flex-start;
            margin-bottom: 15px;
            padding: 15px;
            background: #f8f9ff;
            border-radius: 10px;
        }
        
        .value-icon {
            width: 40px;
            height: 40px;
            background: #0f2161;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 18px;
            margin-right: 15px;
            flex-shrink: 0;
        }
        
        .value-content h4 {
            color: #0f2161;
            margin-bottom: 5px;
            font-size: 16px;
        }
        
        .value-content p {
            color: #5a6370;
            font-size: 14px;
            line-height: 1.5;
        }
        
        /* Team Section */
        .team-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin-top: 15px;
        }
        
        .team-member {
            text-align: center;
        }
        
        .member-photo {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: #f0f4ff;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 10px;
            color: #0f2161;
            font-size: 30px;
            overflow: hidden;
        }
        
        .member-photo img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .member-name {
            font-weight: 700;
            color: #0f2161;
            font-size: 15px;
            margin-bottom: 3px;
        }
        
        .member-role {
            font-size: 13px;
            color: #7b8796;
        }
        
        /* Timeline */
        .timeline {
            position: relative;
            margin: 20px 0 0;
            padding-left: 30px;
        }
        
        .timeline:before {
            content: '';
            position: absolute;
            left: 10px;
            top: 5px;
            height: calc(100% - 10px);
            width: 2px;
            background: #0f2161;
        }
        
        .timeline-item {
            position: relative;
            margin-bottom: 20px;
        }
        
        .timeline-item:last-child {
            margin-bottom: 0;
        }
        
        .timeline-dot {
            position: absolute;
            left: -30px;
            top: 5px;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #0f2161;
            border: 4px solid #f0f4ff;
        }
        
        .timeline-year {
            font-weight: 700;
            color: #0f2161;
            margin-bottom: 5px;
            font-size: 16px;
        }
        
        .timeline-content {
            color: #5a6370;
            font-size: 14px;
            line-height: 1.5;
        }
        
        /* CTA Section */
        .cta-section {
            text-align: center;
            padding: 25px 15px;
            background: linear-gradient(135deg, #0f2161 0%, #1a3a8f 100%);
            border-radius: 12px;
            margin: 0 15px 20px;
            color: white;
        }
        
        .cta-title {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 10px;
        }
        
        .cta-text {
            margin-bottom: 20px;
            opacity: 0.9;
            line-height: 1.5;
        }
        
        .cta-button {
            display: inline-block;
            background: white;
            color: #0f2161;
            padding: 12px 25px;
            border-radius: 30px;
            text-decoration: none;
            font-weight: 700;
            transition: all 0.3s ease;
        }
        
        .cta-button:active {
            transform: scale(0.95);
        }
        
        /* Bottom Navigation */
        .bottom-nav {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: white;
            display: flex;
            justify-content: space-around;
            padding: 12px 0;
            box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            max-width: 400px;
            margin: 0 auto;
        }
        
        .nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-decoration: none;
            color: #7b8796;
            font-size: 12px;
            width: 20%;
        }
        
        .nav-item.active {
            color: #0f2161;
        }
        
        .nav-item i {
            font-size: 20px;
            margin-bottom: 4px;
        }
        
        /* Responsive adjustments */
        @media (max-width: 340px) {
            .stats-container,
            .team-grid {
                grid-template-columns: 1fr;
            }
            
            .value-item {
                flex-direction: column;
                text-align: center;
            }
            
            .value-icon {
                margin-right: 0;
                margin-bottom: 10px;
            }
        }`}</style>
</>

  )
}

export default about