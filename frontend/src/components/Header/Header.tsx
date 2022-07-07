import { FC } from 'react';
import { Button, Layout, Row, Col } from 'antd';


const { Header } = Layout;
const HeaderComponent:FC = () => {
  return (
    <Header>
      <Row>
        <Col>
          Header
        </Col>

      </Row>
    </Header>
  )

}
export {HeaderComponent}
