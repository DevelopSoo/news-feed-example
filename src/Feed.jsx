import { useEffect, useState } from "react";
import { FaAngleUp, FaCommentDots } from "react-icons/fa6";
import { Link } from "react-router-dom";
import styled from "styled-components";
import supabase from "./lib/supabaseClient";

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
  /* text overflow 적용을 위해 width를 지정해야 함 */
  min-width: 0;
`;

const StyledFeedTitle = styled.h2`
  color: var(--dark-navy);
`;

const StyledFeedContentText = styled.p`
  color: var(--secondary-color);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
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
`;

const StyledUpVoteIcon = styled(FaAngleUp)`
  font-size: 12px;
  color: var(--primary-color);
  font-weight: bold;
`;

const StyledUpVoteCount = styled.div`
  color: var(--dark-navy);
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

const Feed = ({ feed }) => {
  const [upvotesCount, setUpvotesCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    const fetchCommentCount = async () => {
      const { count, error } = await supabase
        .from("comments")
        .select("*", { count: "exact", head: true })
        .eq("feed_id", feed.id);
      if (error) {
        return alert(error.message);
      }
      setCommentCount(count);
    };
    fetchCommentCount();
  }, [feed.id]);

  useEffect(() => {
    const fetchUpvotesCount = async () => {
      const { count, error } = await supabase
        .from("upvotes")
        .select("*", { count: "exact", head: true })
        .eq("feed_id", feed.id);
      if (error) {
        return alert(error.message);
      }
      setUpvotesCount(count);
    };
    fetchUpvotesCount();
  }, [feed.id]);

  return (
    <StyledFeed key={feed.id} as={Link} to={`/feeds/${feed.id}`}>
      <StyledUpVoteContainer>
        <StyledUpVoteButton>
          <StyledUpVoteIcon />
          <StyledUpVoteCount>{upvotesCount}</StyledUpVoteCount>
        </StyledUpVoteButton>
      </StyledUpVoteContainer>
      <StyledFeedContent>
        <StyledFeedTitle>{feed.title}</StyledFeedTitle>
        <StyledFeedContentText>{feed.content}</StyledFeedContentText>
        <StyledFeedCreatedAt>
          작성일: {new Date(feed.created_at).toLocaleDateString()}
        </StyledFeedCreatedAt>
      </StyledFeedContent>
      <StyledCommentContainer>
        <StyledCommentIcon />
        <StyledCommentCount>{commentCount}</StyledCommentCount>
      </StyledCommentContainer>
    </StyledFeed>
  );
};

export default Feed;
