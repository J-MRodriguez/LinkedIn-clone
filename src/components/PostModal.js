import { useState } from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
import { connect } from "react-redux";

const PostModal = (props) => {
  const [editorText, setEditorText] = useState("");
  const [shareImage, setShareImage] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [assetArea, setAssetArea] = useState("");

  const handleChange = (e) => {
    const image = e.target.files[0];

    if (image === "" || image === undefined) {
      alert(`not an image, the file is a ${typeof image}`);
    }
    setShareImage(image);
  };

  const switchAssetArea = (area) => {
    setShareImage("");
    setVideoLink("");
    setAssetArea(area);
  };

  const reset = (e) => {
    setAssetArea("");
    setEditorText("");
    setShareImage("");
    setVideoLink("");
    props.handleClick(e);
  };

  return (
    <Container>
      <Content>
        <Header>
          <h2>Create a post</h2>
          <button onClick={props.onClick}>
            <img src="/images/close.svg" alt="" />
          </button>
        </Header>
        <SharedContent>
          <UserInfo>
            {props.user.photoURL ? (
              <img src={props.user.photoURL} alt="" />
            ) : (
              <img src="/images/user.svg" alt="" />
            )}
            {props.user.displayName ? (
              <span>{props.user.displayName}</span>
            ) : (
              <span>Name</span>
            )}
          </UserInfo>
          <Editor>
            <textarea
              value={editorText}
              onChange={(e) => setEditorText(e.target.value)}
              placeholder="What do you want to talk about?"
              autoFocus={true}
            />
            {assetArea === "image" ? (
              <UploadImage>
                <input
                  type="file"
                  accept="image/gif, image/jpeg, image/png"
                  name="image"
                  id="file"
                  style={{ display: "none" }}
                  onChange={handleChange}
                />
                <p>
                  <label htmlFor="file">Select an image to share</label>
                </p>
                {shareImage && (
                  <img src={URL.createObjectURL(shareImage)} alt="" />
                )}
              </UploadImage>
            ) : (
              assetArea === "media" && (
                <UploadVideo>
                  <input
                    type="text"
                    placeholder="Plase input a video link"
                    value={videoLink}
                    onChange={(e) => setVideoLink(e.target.value)}
                  />
                  {videoLink && <ReactPlayer width={"100%"} url={videoLink} />}
                </UploadVideo>
              )
            )}
          </Editor>
        </SharedContent>
        <ShareCreation>
          <AttachAssets>
            <AssetButton onClick={() => switchAssetArea("image")}>
              <img src="/images/photo3.svg" alt="" />
            </AssetButton>
            <AssetButton onClick={() => switchAssetArea("media")}>
              <img src="/images/video-icon.svg" alt="" />
            </AssetButton>
          </AttachAssets>
          <ShareComment>
            <AssetButton>
              <img src="/images/Comment-icon.svg" alt="" />
            </AssetButton>
          </ShareComment>
          <PostButton disabled={!editorText ? true : false}>Post</PostButton>
        </ShareCreation>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.3s;
`;

const Content = styled.div`
  width: 100%;
  max-width: 552px;
  color: black;
  background-color: white;
  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: block;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    height: 40px;
    width: 40px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.15);
    svg {
      width: 100%;
      pointer-events: none;
    }
  }
`;

const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  svg,
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
  }
`;

const ShareCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;

const AssetButton = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  min-width: auto;
  color: rgba(0, 0, 0, 0.5);
  img {
    width: 24px;
  }
`;

const AttachAssets = styled.div`
  display: flex;
  align-items: center;
  padding-right: 8px;
  ${AssetButton} {
    width: 40px;
  }
`;

const ShareComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
`;

const PostButton = styled.button`
  min-width: 60px;
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
  background: ${(props) => (props.disabled ? "rgba(0,0,0,0.1)" : "#0a66c2")};
  color: ${(props) => (props.disabled ? "rgba(0,0,0,0.4)" : "white")};
  &:hover {
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  }
`;

const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
    border: none;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
    &:focus {
      outline: none;
    }
  }
`;

const UploadImage = styled.div`
  display: flex;
  justify-content: center;
  img {
    width: 100%;
  }
  label {
    display: block;
    cursor: pointer;
    color: white;
    background-color: #0a66c2;
    height: 20px;
    font-size: 17px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16rem;
    height: 26px;
    border-radius: 20px;
    &:hover {
      box-sizing: border-box;
      border: 1px solid blue;
    }
  }
`;

const UploadVideo = styled.div`
  display: flex;
  input {
    margin-top: 20px;
    height: 30px;
    width: 100%;
    font-size: 20px;
    border-radius: 20px;
    border-color: rgba(0, 0, 0, 0.3);
    padding-left: 15px;
    &:focus {
      border-radius: 20px;
      border-color: #0a66c2;
      outline: none;
    }

    &::placeholder {
      padding-left: 5px;
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
