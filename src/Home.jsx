import { Link } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import supabase from "./lib/supabaseClient";
import Button from "./components/Button";
import Feed from "./Feed";

const StyledHomeContainer = styled.main`
  max-width: 1000px;
  margin: 0 auto;
  min-height: calc(100vh - 100px);
`;

const StyledHomeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledFeedList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Home = () => {
  const [feeds, setFeeds] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchFeeds = async () => {
      const { data, error } = await supabase.from("feeds").select("*");
      if (error) {
        setIsError(true);
        return;
      }

      setFeeds(data);
    };
    fetchFeeds();
  }, []);

  return (
    <StyledHomeContainer>
      <StyledHomeHeader>
        <h1>글 목록</h1>
        <Button as={Link} to="/feeds/create">
          글쓰기
        </Button>
      </StyledHomeHeader>
      {/* 목록 */}
      <StyledFeedList>
        {isError && <div>에러가 발생했습니다.</div>}
        {feeds.map((feed) => (
          <Feed key={feed.id} feed={feed} />
        ))}
      </StyledFeedList>
    </StyledHomeContainer>
  );
};

export default Home;
