import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import {
  DndContext,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  useDroppable,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Calendar,
  CircleCheck,
  LayoutDashboard,
  Users,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { seatingGuests, seatingTables } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type GuestSeat = {
  id: string;
  name: string;
  code: string;
};

const UNASSIGNED = "sin-asignar";
const TABLE_CAPACITY = 8;

const defaultAssignments: Record<string, GuestSeat[]> = {
  "Mesa 1": seatingGuests.slice(0, 4),
  "Mesa 2": seatingGuests.slice(4, 7),
  "Mesa 3": seatingGuests.slice(7, 8),
  "Mesa 4": [],
  "Mesa 5": [],
  "Mesa 6": [],
};

const assignedIds = new Set(
  Object.values(defaultAssignments)
    .flat()
    .map((guest) => guest.id),
);

const defaultUnassigned = seatingGuests.filter(
  (guest) => !assignedIds.has(guest.id),
);

export function SeatingPlannerPage() {
  const [tables, setTables] = useState<Record<string, GuestSeat[]>>(
    defaultAssignments,
  );
  const [unassigned, setUnassigned] = useState<GuestSeat[]>(defaultUnassigned);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6,
      },
    }),
  );

  const findContainer = (id: string) => {
    if (id === UNASSIGNED) return UNASSIGNED;
    if (tables[id]) return id;
    if (unassigned.find((guest) => guest.id === id)) return UNASSIGNED;
    return seatingTables.find((tableId) =>
      tables[tableId]?.some((guest) => guest.id === id),
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeContainer = findContainer(String(active.id));
    const overContainer = findContainer(String(over.id));

    if (!activeContainer || !overContainer) return;
    if (activeContainer === overContainer) {
      reorderWithinContainer(activeContainer, active.id as string, over.id as string);
      return;
    }

    if (
      overContainer !== UNASSIGNED &&
      tables[overContainer].length >= TABLE_CAPACITY
    ) {
      toast.warning("Mesa llena", {
        description: "Esta mesa ya tiene 8 invitados asignados.",
      });
      return;
    }

    moveBetweenContainers(activeContainer, overContainer, active.id as string, over.id as string);
  };

  const reorderWithinContainer = (
    container: string,
    activeId: string,
    overId: string,
  ) => {
    if (container === UNASSIGNED) {
      setUnassigned((items) => {
        const oldIndex = items.findIndex((guest) => guest.id === activeId);
        const newIndex = items.findIndex((guest) => guest.id === overId);
        if (oldIndex === -1 || newIndex === -1) return items;
        return arrayMove(items, oldIndex, newIndex);
      });
    } else {
      setTables((prev) => {
        const items = prev[container];
        const oldIndex = items.findIndex((guest) => guest.id === activeId);
        const newIndex = items.findIndex((guest) => guest.id === overId);
        if (oldIndex === -1 || newIndex === -1) return prev;
        return {
          ...prev,
          [container]: arrayMove(items, oldIndex, newIndex),
        };
      });
    }
  };

  const moveBetweenContainers = (
    from: string,
    to: string,
    activeId: string,
    overId: string,
  ) => {
    if (from === UNASSIGNED) {
      setUnassigned((items) => {
        const guestIndex = items.findIndex((guest) => guest.id === activeId);
        if (guestIndex === -1) return items;
        const [guest] = items.splice(guestIndex, 1);
        setTables((prev) => insertIntoTable(prev, to, guest, overId));
        return [...items];
      });
    } else if (to === UNASSIGNED) {
      setTables((prev) => {
        const originItems = [...prev[from]];
        const guestIndex = originItems.findIndex((guest) => guest.id === activeId);
        if (guestIndex === -1) return prev;
        const [guest] = originItems.splice(guestIndex, 1);
        setUnassigned((items) => insertIntoList(items, guest, overId));
        return {
          ...prev,
          [from]: originItems,
        };
      });
    } else {
      setTables((prev) => {
        const originItems = [...prev[from]];
        const guestIndex = originItems.findIndex((guest) => guest.id === activeId);
        if (guestIndex === -1) return prev;
        const [guest] = originItems.splice(guestIndex, 1);
        const updated = {
          ...prev,
          [from]: originItems,
        };
        return insertIntoTable(updated, to, guest, overId);
      });
    }
  };

  const insertIntoTable = (
    current: Record<string, GuestSeat[]>,
    tableId: string,
    guest: GuestSeat,
    overId: string,
  ) => {
    const items = [...current[tableId]];
    if (items.some((item) => item.id === guest.id)) return current;
    const index = items.findIndex((item) => item.id === overId);
    if (index === -1) {
      items.push(guest);
    } else {
      items.splice(index, 0, guest);
    }
    return {
      ...current,
      [tableId]: items,
    };
  };

  const insertIntoList = (items: GuestSeat[], guest: GuestSeat, overId: string) => {
    const updated = [...items];
    if (updated.some((item) => item.id === guest.id)) return updated;
    const index = updated.findIndex((item) => item.id === overId);
    if (index === -1) {
      updated.push(guest);
    } else {
      updated.splice(index, 0, guest);
    }
    return updated;
  };

  return (
    <div className="container space-y-8 py-10">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/50 px-3 py-1 text-xs uppercase tracking-[0.35em] text-foreground/50">
            Vista de recepción
          </span>
          <h1 className="mt-3 font-display text-3xl text-foreground md:text-4xl">
            Planificador visual de asientos
          </h1>
          <p className="text-sm text-foreground/60">
            Arrastra invitados entre mesas, valida capacidad y genera layout para tu equipo de producción.
          </p>
        </div>
        <Card className="max-w-sm border border-border/60 bg-white/75">
          <CardHeader className="py-4">
            <CardTitle className="text-lg">Resumen</CardTitle>
            <CardDescription>
              {seatingGuests.length} invitados · {seatingTables.length} mesas (8 pax)
            </CardDescription>
          </CardHeader>
        </Card>
      </header>

      <section className="grid gap-6 xl:grid-cols-[2fr,1fr]">
        <Card className="border border-border/60 bg-white/75">
          <CardHeader>
            <CardTitle>Distribución de mesas</CardTitle>
            <CardDescription>
              Organiza por afinidad, familia o bloques. Exporta para tu equipo de logística.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCorners}
              onDragEnd={handleDragEnd}
            >
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {seatingTables.map((tableId) => (
                  <TableBoard
                    key={tableId}
                    id={tableId}
                    guests={tables[tableId]}
                  />
                ))}
              </div>
              <SortableContext
                items={unassigned.map((guest) => guest.id)}
                strategy={rectSortingStrategy}
              >
                <UnassignedGuests
                  guests={unassigned}
                  capacity={seatingGuests.length - assignedCount(tables)}
                />
              </SortableContext>
            </DndContext>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="border border-border/60 bg-white/60">
            <CardHeader>
              <CardTitle>Notas de producción</CardTitle>
              <CardDescription>
                Comparte con tu equipo de wedding planning y proveedores.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-foreground/65">
              <Note icon={LayoutDashboard} title="Entregables">
                Exporta PDF para hostesses y comparte CSV con tu planner logístico.
              </Note>
              <Note icon={CircleCheck} title="Validación">
                Se notificará si una mesa supera 8 invitados para mantener equilibrio.
              </Note>
              <Note icon={Users} title="Experiencia">
                Agrupa por afinidad (familia, amigos, proveedores) y personaliza seating cards.
              </Note>
              <Note icon={Calendar} title="Día del evento">
                Genera códigos QR para check-in y visualiza mesa asignada al escanear.
              </Note>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

function TableBoard({ id, guests }: { id: string; guests: GuestSeat[] }) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "rounded-[26px] border border-border/60 bg-gradient-to-br from-white/80 to-primary/5 p-4 shadow-inner transition",
        isOver && "border-primary/50 shadow-glow",
      )}
    >
      <div className="flex items-center justify-between">
        <p className="font-semibold text-foreground">{id}</p>
        <Badge variant="outline" className="bg-white/60">
          {guests.length} / {TABLE_CAPACITY}
        </Badge>
      </div>
      <SortableContext items={guests.map((guest) => guest.id)} strategy={rectSortingStrategy}>
        <div className="mt-4 grid gap-3">
          {guests.map((guest) => (
            <GuestChip key={guest.id} guest={guest} />
          ))}
          {guests.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border/70 bg-white/50 p-6 text-center text-sm text-foreground/50">
              Arrastra invitados aquí
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  );
}

function GuestChip({ guest }: { guest: GuestSeat }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({
      id: guest.id,
    });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={cn(
        "flex cursor-grab items-center justify-between rounded-2xl border border-transparent bg-white/80 px-4 py-3 text-sm shadow-sm transition",
        isDragging && "cursor-grabbing border-primary/40 bg-white",
      )}
      {...attributes}
      {...listeners}
    >
      <div>
        <p className="font-semibold text-foreground">{guest.name}</p>
        <p className="text-xs uppercase tracking-wide text-foreground/50">{guest.code}</p>
      </div>
      <Badge variant="outline" className="bg-primary/10 text-primary">
        Invitado
      </Badge>
    </div>
  );
}

function UnassignedGuests({
  guests,
  capacity,
}: {
  guests: GuestSeat[];
  capacity: number;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: UNASSIGNED,
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "mt-8 rounded-[30px] border border-border/60 bg-white/70 p-5 shadow-inner transition",
        isOver && "border-primary/50 shadow-glow",
      )}
    >
      <div className="flex items-center justify-between">
        <p className="font-semibold text-foreground">Invitados sin asignar</p>
        <Badge variant="outline" className="bg-muted/60 text-foreground/60">
          {guests.length} pendientes
        </Badge>
      </div>
      <p className="mt-1 text-xs text-foreground/50">
        Capacidad restante total: {capacity} sillas disponibles.
      </p>
      <div className="mt-4 grid gap-3">
        {guests.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border/60 bg-white/50 p-8 text-center text-sm text-foreground/50">
            Todos los invitados tienen asignación.
          </div>
        )}
        {guests.map((guest) => (
          <GuestChip key={guest.id} guest={guest} />
        ))}
      </div>
    </div>
  );
}

function Note({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof LayoutDashboard;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-transparent bg-white/60 p-3 text-foreground/65 shadow-inner">
      <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/15 text-primary">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="font-semibold text-foreground">{title}</p>
        <p className="text-sm">{children}</p>
      </div>
    </div>
  );
}

function assignedCount(tables: Record<string, GuestSeat[]>) {
  return Object.values(tables).reduce((sum, guests) => sum + guests.length, 0);
}
