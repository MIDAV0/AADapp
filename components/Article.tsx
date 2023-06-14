interface ArticleProps {
    title: string;
    content: string;
}

const Article: React.FC<ArticleProps> = ({ title, content }) => (
  <article className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow duration-200">
    <h2 className="text-2xl font-bold mb-2">{title}</h2>
    <p className="text-gray-700">{content}</p>
  </article>
);

export default Article;