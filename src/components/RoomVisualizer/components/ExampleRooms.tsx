import type { RoomExample } from "../types/roomVisualizer.types";

interface Props {
  rooms: RoomExample[];
  selectedId?: string;
  onSelect: (room: RoomExample) => void;
}

export default function ExampleRooms({ rooms, selectedId, onSelect }: Props) {
  return (
    <div dir="rtl">
      <h3 className="mb-3 text-sm font-bold text-white">نمونه فضاها</h3>

      <div className="grid grid-cols-3 gap-3">
        {rooms.map((room) => {
          const isSelected = selectedId === room.id;

          return (
            <button
              key={room.id}
              type="button"
              onClick={() => onSelect(room)}
              className={`
                group relative aspect-square overflow-hidden rounded-2xl border-2 transition-all duration-200
                ${isSelected ? "border-[#8B5CF6]" : "border-transparent hover:border-white/20"}
              `}
            >
              <img
                src={room.image}
                alt={room.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-black/50 py-1 text-[11px] font-medium text-white">
                {room.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
