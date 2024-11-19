import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import supabase from "./lib/supabaseClient";
import Button from "./components/Button";

// TODO: CreatePage의 style과 합치기
const StyledUpdateContainer = styled.main`
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

const UpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchFeed = async () => {
      const { data, error } = await supabase
        .from("feeds")
        .select("*")
        .eq("id", id);
      if (error) {
        return alert(error.message);
      }
      setTitle(data[0].title);
      setContent(data[0].content);
    };
    fetchFeed();
  }, [id]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from("feeds")
      .update({
        title,
        content,
      })
      .eq("id", id);
    if (error) {
      return alert(error.message);
    }
    alert("글 수정이 완료되었습니다.");
    navigate("/");
  };

  return (
    <StyledUpdateContainer>
      <h1>글 수정</h1>
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
        <Button>수정</Button>
      </StyledForm>
    </StyledUpdateContainer>
  );
};

export default UpdatePage;
