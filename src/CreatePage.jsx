import styled from "styled-components";
import Button from "./components/Button";
import { useContext, useState } from "react";
import supabase from "./lib/supabaseClient";
import { UserContext } from "./contexts/UserProvider";
import { useNavigate } from "react-router-dom";

const StyledCreateContainer = styled.main`
  max-width: 768px;
  margin: 0 auto;
  min-height: calc(100vh - 100px);
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledLabel = styled.label`
  font-size: 18px;
  font-weight: 800;
  color: var(--text-color);
`;

const StyledInput = styled.input`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid var(--outline-color);
`;

const StyledTextarea = styled.textarea`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid var(--outline-color);
  resize: none;
  height: 400px;
`;

// 3. 로그인해야만 작성 페이지 접근 가능 -> private route 추가하기
const CreatePage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("feeds").insert([
      {
        title,
        content,
        userId: user.id,
      },
    ]);
    if (error) {
      return alert(error.message);
    }
    alert("글 작성이 완료되었습니다.");
    navigate("/");
  };

  return (
    <StyledCreateContainer>
      <h1>글 작성</h1>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInputContainer>
          <StyledLabel htmlFor="title">제목</StyledLabel>
          <StyledInput
            type="text"
            id="title"
            placeholder="제목"
            value={title}
            onChange={handleTitleChange}
          />
        </StyledInputContainer>
        <StyledInputContainer>
          <StyledLabel htmlFor="content">내용</StyledLabel>
          <StyledTextarea
            type="text"
            id="content"
            placeholder="내용"
            value={content}
            onChange={handleContentChange}
          />
        </StyledInputContainer>
        <Button>작성</Button>
      </StyledForm>
    </StyledCreateContainer>
  );
};

export default CreatePage;
