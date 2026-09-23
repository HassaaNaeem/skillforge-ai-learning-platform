import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useMutation } from '@tanstack/react-query';
import { TopicIcon } from '../../components/TopicIcon';
import { saveFocusQueue, type DashboardTopic } from './api';

function SortableTopic({ topic, index }: { topic: DashboardTopic; index: number }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: topic.id,
  });

  return (
    <li
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`flex items-center gap-3 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--bg)] px-3 py-2.5 ${
        isDragging ? 'opacity-70 shadow-[var(--shadow)]' : ''
      }`}
    >
      <button
        type="button"
        className="cursor-grab text-sm text-[var(--muted)] active:cursor-grabbing"
        aria-label={`Drag ${topic.name}`}
        {...attributes}
        {...listeners}
      >
        ⋮⋮
      </button>
      <span className="w-5 text-xs text-[var(--muted)]">{index + 1}</span>
      <TopicIcon slug={topic.slug} name={topic.name} size="sm" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-[var(--fg)]">{topic.name}</p>
      </div>
      <Link to={`/topics/${topic.id}`} className="text-sm font-medium text-[var(--accent)]">
        Open
      </Link>
    </li>
  );
}

export function FocusQueue({ topics }: { topics: DashboardTopic[] }) {
  const [items, setItems] = useState(topics);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );
  const saveMutation = useMutation({
    mutationFn: saveFocusQueue,
  });

  useEffect(() => {
    setItems(topics);
  }, [topics]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setItems((current) => {
      const oldIndex = current.findIndex((topic) => topic.id === active.id);
      const newIndex = current.findIndex((topic) => topic.id === over.id);
      const next = arrayMove(current, oldIndex, newIndex);
      saveMutation.mutate(next.map((topic) => topic.id));
      return next;
    });
  }

  const first = items[0];

  return (
    <section className="rounded-[14px] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[var(--shadow)]">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-[var(--fg)]">Focus queue</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Drag to set what you practice next. The top item is first.
          </p>
        </div>
        {first ? (
          <Link to={`/topics/${first.id}`} className="text-sm font-medium text-[var(--accent)]">
            Start {first.name}
          </Link>
        ) : null}
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((topic) => topic.id)} strategy={verticalListSortingStrategy}>
          <ol className="mt-4 space-y-2">
            {items.map((topic, index) => (
              <SortableTopic key={topic.id} topic={topic} index={index} />
            ))}
          </ol>
        </SortableContext>
      </DndContext>
    </section>
  );
}
