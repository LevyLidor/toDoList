interface EditTodoProps {
    id: number;
    title: string;
    description: string;
    date: Date;
    isActive: boolean;
    refresh?: boolean;
    setRefresh: (e: boolean) => void;
}