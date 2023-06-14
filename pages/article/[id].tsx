
import { useRouter } from 'next/router';
import Article from '../../components/Article';

const articles = [
  { title: 'Article 1', content: 'This is the content for article 1.' },
  { title: 'Article 2', content: 'This is the content for article 2.' },
  // Add more articles as needed
];

const ArticlePage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const article = articles[Number(id)];

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <main className="container mx-auto py-4 px-6">
      <Article title={article.title} content={article.content} />
    </main>
  );
};

export default ArticlePage;