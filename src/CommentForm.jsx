import styled from "styled-components";
import Button from "./components/Button";
import { useContext, useState } from "react";
import { UserContext } from "./contexts/UserProvider";
import supabase from "./lib/supabaseClient";

const StyledCommentFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: white;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  padding: 24px;
  border-radius: 10px;
`;

const StyledCommentFormHeader = styled.h2`
  color: var(--dark-navy);
`;

const StyledCommentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledCommentTextarea = styled.textarea`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  height: 100px;
  padding: 12px;
  resize: none;
`;

const StyledCommentFormButton = styled(Button)`
  align-self: flex-end;
  color: white;
`;

const CommentForm = ({ feedId, setComments }) => {
  const { user } = useContext(UserContext);
  const [comment, setComment] = useState("");

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      return;
    }

    const { data, error } = await supabase.from("comments").insert({
      content: comment,
      feed_id: feedId,
      user_id: user.id,
    }).select(`*, 
          user:user_id (
            id,
            email
          )`);

    if (error) {
      return alert("댓글 작성에 실패했습니다.");
    }

    setComments((prev) => [...prev, data[0]]);
    setComment("");
  };

  return (
    <StyledCommentFormContainer>
      <StyledCommentFormHeader>댓글 작성</StyledCommentFormHeader>
      <StyledCommentForm onSubmit={handleSubmit}>
        <StyledCommentTextarea value={comment} onChange={handleChange} />
        <StyledCommentFormButton variant="primary">
          작성
        </StyledCommentFormButton>
      </StyledCommentForm>
    </StyledCommentFormContainer>
  );
};

export default CommentForm;
