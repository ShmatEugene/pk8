import React from 'react';
import ContentLoader from 'react-content-loader';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../context/authContext';
import '../../../scss/account.scss';
import EditLIstCard from '../../../components/AdminPanel/EditLIstCard';
import { useHttp } from '../../../hooks/http.hook';
import AdminMenu from '../../../components/AdminPanel/AdminMenu';
import AdminHeader from '../../../components/AdminPanel/AdminHeader';

const ManageNews = () => {
  const auth = React.useContext(AuthContext);
  const [posts, setPosts] = React.useState(null);
  const { request, loading } = useHttp();

  const getPosts = React.useCallback(async () => {
    try {
      const fetched = await request('/api/news/', 'GET', null, {
        Authorization: `Bearer ${auth.token}`,
      });
      setPosts(fetched);
    } catch (e) {}
  }, [auth.token, request]);

  React.useEffect(() => {
    getPosts();
  }, [getPosts]);

  function renderPosts(posts) {
    return posts.map((post, index) => (
      <EditLIstCard
        key={index}
        post={post}
        onDeletePostHandler={onDeletePostHandler}
        postType={'news'}
      />
    ));
  }

  const onDeletePostHandler = async (postId) => {
    try {
      const fetched = await request(`/api/news/delete/${postId}`, 'DELETE', null, {
        Authorization: `Bearer ${auth.token}`,
      });
      console.log(fetched);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {/* Header */}
      <AdminHeader />

      {/* Account */}
      <div className="account-layout">
        <div className="account-layout__account-menu account-menu">
          <nav className="account-menu__nav">
            <AdminMenu />
          </nav>
        </div>
        <div className="account-layout__account-content account-content">
          <div className="account-content__title">
            <h2>Записи в разделе Новости</h2>
            <NavLink to="/admin-panel/add/news" className="account-content__add-button add-button">
              Добавить новую
            </NavLink>
          </div>
          <div className="account-content__edit-posts edit-posts">
            <div className="edit-posts__header">
              <h4 className="edit-posts__heading-title">назавание</h4>
              <h4 className="edit-posts__heading-published">опубликовано</h4>
              <h4 className="edit-posts__heading-clicks">клики</h4>
            </div>
            {loading && !posts ? (
              <ContentLoader height={350} width={'100%'}>
                <rect x="0" y="0" rx="5" ry="5" width="100%" height="66" />
                <rect x="0" y="86" rx="5" ry="5" width="100%" height="66" />
                <rect x="0" y="172" rx="5" ry="5" width="100%" height="66" />
                <rect x="0" y="258" rx="5" ry="5" width="100%" height="66" />
              </ContentLoader>
            ) : null}
            {posts && renderPosts(posts)}
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageNews;
