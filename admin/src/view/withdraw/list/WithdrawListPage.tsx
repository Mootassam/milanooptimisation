import React from 'react';
import { i18n } from 'src/i18n';
import CouponsListFilter from 'src/view/withdraw/list/WithdrawListFilter';
import CouponsListTable from 'src/view/withdraw/list/WithdrawListTable';
import CouponsListToolbar from 'src/view/withdraw/list/WithdrawListToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';
import { Col, Container, Row } from 'react-bootstrap';

function WithdrawListPage(props) {
  return (
    <>
      {/* <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.withdraw.menu')],
        ]}
      /> */}

      <ContentWrapper>
          
      <Container fluid={true}>
          <Row>
            <Col xs={9}>
        <PageTitle>
          {i18n('entities.withdraw.list.title')}
        </PageTitle>
        </Col>
            <Col md="auto">
        <CouponsListToolbar />
        </Col>
          </Row>
        </Container>
        <CouponsListFilter />
        <CouponsListTable />
      </ContentWrapper>
    </>
  );
}

export default WithdrawListPage;
