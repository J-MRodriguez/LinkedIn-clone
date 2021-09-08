/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import PostModal from "./PostModal";
import { getArticlesAPI } from "../actions";
import ReactPlayer from "react-player";

const Main = (props) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    props.getArticles();
  }, []);

  const handleModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <>
      <Container>
        <ShareBox>
          <div>
            {props.user ? (
              <img src={props.user.photoURL} alt="" />
            ) : (
              <img src="/images/user.svg" alt="" />
            )}

            <button
              onClick={handleModal}
              disabled={props.loading ? true : false}
            >
              Start a post
            </button>
          </div>
          <div>
            <button
              onClick={handleModal}
              disabled={props.loading ? true : false}
            >
              <img src="/images/photo3.svg" alt="" />
              <span>Photo</span>
            </button>
            <button
              onClick={handleModal}
              disabled={props.loading ? true : false}
            >
              <img src="/images/video-icon.svg" alt="" />
              <span>Video</span>
            </button>
            <button
              onClick={handleModal}
              disabled={props.loading ? true : false}
            >
              <img src="/images/event-icon.svg" alt="" />
              <span>Event</span>
            </button>
            <button
              onClick={handleModal}
              disabled={props.loading ? true : false}
            >
              <img src="/images/article-icon.svg" alt="" />
              <span>Article</span>
            </button>
          </div>
        </ShareBox>
        <Content>
          {props.loading && <img src="/images/loading.svg" alt="" />}
          {props.articles.length > 0 &&
            props.articles.map((article, key) => (
              <Article key={key}>
                <SharedActor>
                  <a>
                    <img src={article.actor.image} alt="" />

                    <div>
                      <span>{article.actor.title}</span>
                      <span>
                        <img src="/images/global.svg" alt="" />
                      </span>
                      <span>
                        {article.actor.date.toDate().toLocaleDateString()}
                      </span>
                    </div>
                  </a>
                  <button>
                    <img src="/images/ellipsis.svg" alt="" />
                  </button>
                </SharedActor>
                <Description>{article.description}</Description>
                <SharedImg>
                  <a>
                    {!article.sharedImg && article.video ? (
                      <ReactPlayer width={"100%"} url={article.video} />
                    ) : (
                      article.sharedImg && (
                        <img src={article.sharedImg} alt="" />
                      )
                    )}
                  </a>
                </SharedImg>
                <SocialCounts>
                  <li>
                    <button>
                      <img src="/images/like-icon.svg" alt="" />
                      <img src="/images/love-icon.svg" alt="" />
                      <img src="/images/clap-icon.svg" alt="" />
                      <span>{article.likes}</span>
                    </button>
                  </li>
                  <li>
                    <div>
                      <a>{article.comments} comments</a>
                    </div>
                  </li>
                </SocialCounts>
                <SocialActions>
                  <button>
                    <img src="/images/like2-icon.svg" alt="" />
                    <span>Like</span>
                  </button>
                  <button>
                    <img src="/images/comment-icon.svg" alt="" />
                    <span>Comments</span>
                  </button>
                  <button>
                    <img src="/images/share-icon.svg" alt="" />
                    <span>Share</span>
                  </button>
                  <button>
                    <img src="/images/send-icon.svg" alt="" />
                    <span>Send</span>
                  </button>
                </SocialActions>
              </Article>
            ))}
        </Content>
        {showModal && <PostModal onClick={() => setShowModal(false)} />}
      </Container>
    </>
  );
};

const Container = styled.div`
  grid-area: main;
  max-width: 580px;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 10px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;
  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
      cursor: pointer;
      img {
        width: 20px;
      }
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0px 16px;

      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 35px;
        background-color: white;
        text-align: left;
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;

      button {
        img {
          margin: 0 4px 0 -2px;
        }
        span {
          color: #70b5f9;
        }
      }
    }
  }
`;

const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;

const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  button {
    margin-top: 5px;
    cursor: pointer;
  }
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;

    img {
      border-radius: 50%;
      width: 48px;
      height: 48px;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        & > img {
          width: 16px;
          height: 16px;
        }
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }
        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }

  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;
  }
`;

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;

const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;

  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  li {
    margin-right: 5px;
    font-size: 12px;

    div {
      padding-top: 1px;
    }
    button {
      display: flex;
      border: none;
      background-color: white;
    }
  }

  img {
    width: 15px;
    padding: 0 2px;
  }
`;

const SocialActions = styled.div`
  align-items: center;
  display: flex;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
  justify-content: space-evenly;
  button {
    display: inline-flex;
    align-items: center;
    padding: 8px;
    color: #7a7a7a;
    border: none;
    background-color: white;
    cursor: pointer;
    img {
      width: 24px;
    }
    span {
      margin-left: 8px;
    }
  }
  @media (max-width: 768px) {
    padding: 4px 0px;
    button {
      padding: 3px;
      img {
        width: 20px;
      }
    }
  }
`;

const Content = styled.div`
  text-align: center;
  & > img {
    width: 30px;
  }
`;

const mapStateToProps = (state) => {
  return {
    loading: state.articleState.loading,
    user: state.userState.user,
    articles: state.articleState.articles,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getArticles: () => dispatch(getArticlesAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
