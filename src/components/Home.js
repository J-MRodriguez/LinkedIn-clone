/* eslint-disable jsx-a11y/anchor-is-valid */
import styled from "styled-components";
import LeftSide from "./LeftSide";
import Main from "./Main";
import RightSide from "./RightSide";
import { Redirect } from "react-router";
import { connect } from "react-redux";

const Home = (props) => {
  return (
    <Container>
      {!props.user && <Redirect to="/" />}
      <Section>
        <h5>
          <a>Hey, do you want your own website? -</a>
        </h5>
        <p>go to juanmadev.com to request a quote</p>
      </Section>
      <Layout>
        <LeftSide />
        <Main />
        <RightSide />
      </Layout>
    </Container>
  );
};

const Container = styled.div`
  padding-top: 52px;
  max-width: 100%;
`;

const Section = styled.section`
  min-height: 50px;
  padding: 6px 0;
  box-sizing: content-box;
  text-align: center;
  text-decoration: underline;
  display: flex;
  justify-content: center;
  h5 {
    color: #0a66c2;
    font-size: 14px;
    a {
      font-weight: 700;
    }
  }
  p {
    font-size: 14px;
    color: #434649;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 5px;
  }
`;

const Layout = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

export default connect(mapStateToProps)(Home);
