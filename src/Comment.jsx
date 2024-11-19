import styled from "styled-components";
import Button from "./components/Button";
import { IoPersonCircleOutline } from "react-icons/io5";
import supabase from "./lib/supabaseClient";

const StyledComment = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledCommentAvatar = styled(IoPersonCircleOutline)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  padding-right: 24px;
`;

const StyledCommentContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 12px;
`;

const StyledCommentUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StyledCommentNickname = styled.div`
  color: var(--dark-navy);
  font-weight: bold;
  font-size: 14px;
`;

const StyledCommentEmail = styled.div`
  color: var(--secondary-color);
`;

const StyledCommentContentText = styled.div`
  color: var(--secondary-color);
`;

const StyledCommentButtonGroups = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 12px;
`;

const StyledCommentDeleteButton = styled(Button)`
  color: var(--danger-color);
  font-weight: bold;
`;

const StyledCommentHr = styled.hr`
  margin: 0;
  border: none;
  border-top: 1px solid #e0e0e0;
`;

const Comment = ({ comment, setComments }) => {
  const deleteComment = async () => {
    if (!confirm("정말로 삭제하시겠습니까?")) {
      return;
    }
    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("id", comment.id);
    if (error) {
      return alert(error.message);
    }
    setComments((prev) => prev.filter((c) => c.id !== comment.id));
  };

  return (
    <>
      <StyledComment>
        <StyledCommentAvatar />
        <StyledCommentContent>
          <StyledCommentUserInfo>
            <StyledCommentNickname>닉네임</StyledCommentNickname>
            <StyledCommentEmail>{comment.user.email}</StyledCommentEmail>
          </StyledCommentUserInfo>
          <StyledCommentContentText>{comment.content}</StyledCommentContentText>
        </StyledCommentContent>
        <StyledCommentButtonGroups>
          <StyledCommentDeleteButton onClick={deleteComment}>
            삭제
          </StyledCommentDeleteButton>
        </StyledCommentButtonGroups>
      </StyledComment>
      <StyledCommentHr />
    </>
  );
};

export default Comment;
