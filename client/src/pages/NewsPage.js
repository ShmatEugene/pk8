import React from 'react';
import logo from '../assets/img/logo.png';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import NewsList from '../components/Home/NewsList';
import { useHttp } from '../hooks/http.hook';

const NewsPage = () => {
  const [posts, setPosts] = React.useState(null);
  const { request, loading } = useHttp();

  const getPosts = React.useCallback(async () => {
    try {
      const fetched = await request('/api/news/', 'GET');
      setPosts(fetched);
    } catch (e) {}
  }, [request]);

  React.useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <>
      {/* Header */}
      <Header logo={logo} style={2} title="Новости"></Header>

      {/* POST */}
      <main>
        <div className="wrapper wrapper__news-list wrapper_post">
          <NewsList news={posts} />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default NewsPage;
