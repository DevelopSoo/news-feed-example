import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import supabase from "./lib/supabaseClient";
import styled from "styled-components";
import { FaAngleUp, FaCommentDots } from "react-icons/fa6";
import Button from "./components/Button";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { UserContext } from "./contexts/UserProvider";

// TODO: Home 컴포넌트에서 복붙한 스타일 컴포넌트를 분리하여 재사용
const StyledDetailContainer = styled.main`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: calc(100vh - 100px);
  margin-top: 20px;
`;

const StyledDetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledBackButtonIcon = styled.span`
  color: var(--primary-color);
  font-weight: bold;
`;

const StyledFeed = styled.div`
  background-color: white;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  text-decoration: none;
`;

const StyledFeedContent = styled.div`
  flex: 1;
  padding-left: 42px;
  padding-right: 42px;
`;

const StyledFeedTitle = styled.h2`
  color: var(--dark-navy);
`;

const StyledFeedContentText = styled.p`
  color: var(--secondary-color);
`;

const StyledFeedCreatedAt = styled.p`
  color: var(--text-color);
  font-size: 12px;
  text-align: right;
`;

const StyledUpVoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 12px;
`;

const StyledUpVoteButton = styled.button`
  padding: 12px;
  background-color: var(--background-color);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const StyledUpVoteIcon = styled(FaAngleUp)`
  font-size: 12px;
  color: var(--primary-color);
  font-weight: bold;
`;

const StyledUpVoteCount = styled.div`
  color: ${({ isUpvotedByMe }) =>
    isUpvotedByMe ? "var(--danger-color)" : "var(--dark-navy)"};
  font-weight: bold;
`;

const StyledCommentContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 12px;
`;

const StyledCommentIcon = styled(FaCommentDots)`
  color: var(--secondary-color);
  font-weight: bold;
  font-size: 20px;
`;

const StyledCommentCount = styled.div`
  color: var(--dark-navy);
  font-weight: bold;
`;

// TODO: Layout 컴포넌트에서 복붙한 스타일 컴포넌트를 분리하여 재사용
const StyledButtonGroups = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledCommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  background-color: white;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  padding: 24px;
  border-radius: 10px;
`;

const StyledCommentHeader = styled.h3`
  color: var(--dark-navy);
`;

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [feed, setFeed] = useState(null);
  const [comments, setComments] = useState([]);
  const [upvotesCount, setUpvotesCount] = useState(0);
  const [isUpvotedByMe, setIsUpvotedByMe] = useState(false);

  useEffect(() => {
    const fetchFeed = async () => {
      const { data, error } = await supabase
        .from("feeds")
        .select()
        .eq("id", id);
      if (error) {
        return alert(error.message);
      }
      setFeed(data[0]);
    };
    fetchFeed();
  }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
      const { data: commentsData, error: commentsError } = await supabase
        .from("comments")
        .select(
          `*, 
          user:user_id (
            id,
            email
          )`
        )
        .eq("feed_id", id);

      if (commentsError) {
        return alert(commentsError.message);
      }
      setComments(commentsData);
    };
    fetchComments();
  }, [id]);

  useEffect(() => {
    const fetchUpvotesCount = async () => {
      const { data, count, error } = await supabase
        .from("upvotes")
        .select("*", { count: "exact", head: false })
        .eq("feed_id", id);
      if (error) {
        return alert(error.message);
      }
      setUpvotesCount(count);
      setIsUpvotedByMe(data.some((upvote) => upvote.user_id === user.id));
    };
    fetchUpvotesCount();
  }, [id, user]);

  const deleteFeed = async () => {
    if (!confirm("정말로 삭제하시겠습니까?")) {
      return;
    }
    const { error } = await supabase.from("feeds").delete().eq("id", id);
    if (error) {
      return alert(error.message);
    }
    alert("삭제되었습니다.");
    navigate("/");
  };

  const upvote = async () => {
    if (!user) {
      return alert("로그인 후 이용해주세요.");
    }

    const { error } = await supabase.from("upvotes").insert({
      feed_id: id,
      user_id: user.id,
    });
    if (error) {
      return alert(error.message);
    }

    alert("추천되었습니다.");
    setUpvotesCount((prev) => prev + 1);
    setIsUpvotedByMe(true);
  };

  const cancelUpvote = async () => {
    if (!user) {
      return alert("로그인 후 이용해주세요.");
    }
    const { error } = await supabase
      .from("upvotes")
      .delete()
      .eq("feed_id", id)
      .eq("user_id", user.id);
    if (error) {
      return alert(error.message);
    }
    alert("추천이 취소되었습니다.");
    setUpvotesCount((prev) => prev - 1);
    setIsUpvotedByMe(false);
  };

  return (
    <StyledDetailContainer>
      <StyledDetailHeader>
        <Button as={Link} to="/" variant="transparent" color="gray">
          <StyledBackButtonIcon>{`<`}</StyledBackButtonIcon> 뒤로가기
        </Button>
        <StyledButtonGroups>
          <Button as={Link} to={`/feeds/update/${id}`} variant="warning">
            수정
          </Button>
          <Button variant="danger" onClick={deleteFeed}>
            삭제
          </Button>
        </StyledButtonGroups>
      </StyledDetailHeader>
      <StyledFeed>
        <StyledUpVoteContainer>
          <StyledUpVoteButton onClick={isUpvotedByMe ? cancelUpvote : upvote}>
            <StyledUpVoteIcon />
            <StyledUpVoteCount isUpvotedByMe={isUpvotedByMe}>
              {upvotesCount}
            </StyledUpVoteCount>
          </StyledUpVoteButton>
        </StyledUpVoteContainer>
        <StyledFeedContent>
          <StyledFeedTitle>{feed?.title}</StyledFeedTitle>
          <StyledFeedContentText>{feed?.content}</StyledFeedContentText>
          <StyledFeedCreatedAt>
            작성일: {new Date(feed?.created_at).toLocaleDateString()}
          </StyledFeedCreatedAt>
        </StyledFeedContent>
        <StyledCommentContainer>
          <StyledCommentIcon />
          <StyledCommentCount>{comments.length}</StyledCommentCount>
        </StyledCommentContainer>
      </StyledFeed>

      {/* 댓글 작성 영역 */}
      <StyledCommentsContainer>
        <StyledCommentHeader>{comments.length} Comments</StyledCommentHeader>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            setComments={setComments}
          />
        ))}
      </StyledCommentsContainer>

      {/* 댓글 작성 영역 */}
      <CommentForm feedId={id} setComments={setComments} />
    </StyledDetailContainer>
  );
};

export default Detail;
