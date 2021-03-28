import React from 'react';
import { useHistory, useParams } from 'react-router';
import Header from '../../components/Header/Header';
import { AuthContext } from '../../context/authContext';
import { useHttp } from '../../hooks/http.hook';
import logo from '../../assets/img/logo.png';
import Table from '../../components/UI/Table';
import DocsList from '../../components/UI/DocsList';
import BulletList from '../../components/UI/BulletList';
import Footer from '../../components/Footer/Footer';

const AbitPost = () => {
  const auth = React.useContext(AuthContext);
  const history = useHistory();
  const { request } = useHttp();
  const [post, setPost] = React.useState({});
  const [documents, setDocuments] = React.useState(null);
  const postId = useParams().id;

  const getCurrentPost = React.useCallback(async () => {
    try {
      const fetched = await request(`/api/abit/${postId}`, 'GET');

      setPost(fetched);
      setDocuments(fetched.documents);
    } catch (e) {
      history.push('/');
    }
  }, [auth.token, postId, request]);

  React.useEffect(() => {
    if (postId) {
      getCurrentPost();
    }
  }, [getCurrentPost]);

  function renderEditorData(editorData) {
    const data = JSON.parse(editorData);
    if (data) {
      return data.blocks.map((block, index) => {
        switch (block.type) {
          case 'header':
            return <h4 key={index}>{block.data.text}</h4>;

          case 'paragraph':
            return <p key={index}>{block.data.text}</p>;

          case 'table':
            return <Table key={index} content={block.data.content} />;

          case 'list':
            return <BulletList key={index} items={block.data.items} />;

          default:
            break;
        }
      });
    }
  }

  return (
    <>
      {/* Header */}
      <Header logo={logo} style={2} title={post.title ? post.title : ''}></Header>
      {/* POST */}
      <main>
        <div className="wrapper wrapper_post">
          <div className="post">
            {post.editorData && renderEditorData(post.editorData)}
            <DocsList documents={post.documents} />
          </div>
          <div className="sidebar"></div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default AbitPost;
