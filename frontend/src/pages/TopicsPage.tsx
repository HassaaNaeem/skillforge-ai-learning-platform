import { PageHeader } from '../components/ui/PageHeader';
import { TopicsList } from '../features/topics/TopicsList';

export function TopicsPage() {
  return (
    <div>
      <PageHeader
        title="Topics"
        description="Choose a topic to practice. Sessions and scoring land here next."
      />
      <TopicsList />
    </div>
  );
}
