

export class ITask {
    id: string;
    title: string;
    description: string;
    category: string;
    client: {
        id: string;
        name: string;
    };
    location: {
        street: string;
        city: string;
        state: string;
        zipcode: string;
        country: string;
    };
    estimated_hours: number;
    time: number;
    rating: number;
    status: string;
}
