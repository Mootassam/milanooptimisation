import React from 'react';
import { i18n } from 'src/i18n';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';
import { Link } from 'react-router-dom';
import './app.css';

function Company() {
  const menuItems = [
    {
      path: '/logo',
      icon: 'fa-solid fa-building',
      text: 'Company',
      key: 'company'
    },
    {
      path: '/companydetail',
      icon: 'fa-solid fa-circle-exclamation',
      text: 'About',
      key: 'about'
    },
    {
      path: '/tc',
      icon: 'fa-solid fa-file-contract',
      text: 'T&C',
      key: 'terms'
    },
    {
      path: '/faqs',
      icon: 'fa-solid fa-question',
      text: 'FAQs',
      key: 'faqs'
    }
  ];

  return (
    <div>
      {/* <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.company.menu'), '/company'],
        ]}
      /> */}
      
      <ContentWrapper>
        <PageTitle>
          {i18n('entities.company.title')}
        </PageTitle>

        <div className="app__company" role="navigation" aria-label="Company menu">
          {menuItems.map((item) => (
            <Link 
              key={item.key}
              to={item.path} 
              className="remove__ligne"
              aria-label={`Go to ${item.text}`}
            >
              <div className="company__item">
                <i className={`${item.icon} item__company`} aria-hidden="true"></i>
                <span className="company__text">{item.text}</span>
              </div>
            </Link>
          ))}
        </div>
      </ContentWrapper>
    </div>
  );
}

export default Company;