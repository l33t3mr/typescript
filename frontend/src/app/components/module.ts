interface Material{
    id: number,
    type: string,
    name: string,
};

interface Course{
    id: number,
    name: string,
    startsOn: Date,
    endsOn: Date,
    maxCapacity: number
};

export interface User {
    id: number,
    firstName: string,
    lastName: string,
    address: string,
    dob: string,
    dep: string,
    email: string,
    role: string,
    materials: {
        [key: number]: Material
    },
    courses: {
        [key: number]: Course
    }
};

