import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SectionDroppable } from "./FormBuilderCanvasNew";

export const SortableSection = (props) => {
  const { section } = props;
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: section.id,
    data: {
      type: "section",
      id: section.id,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return <SectionDroppable {...props} setNodeRef={setNodeRef} attributes={attributes} listeners={listeners} style={style} />;
};
