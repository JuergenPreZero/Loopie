const BASE_URL = 'http://localhost:8080/api/loopie';

export const fetchTotalQuantity = async (userId: number): Promise<number> => {
    const response = await fetch(`${BASE_URL}/quantity/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Error when trying to call quantity (Status: ${response.status})`);
    }

    return response.json();
};

export const fetchUserBalance = async (userId: number): Promise<number> => {
    const response = await fetch(`${BASE_URL}/balance/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Error when trying to call balance (Status: ${response.status})`);
    }

    return response.json();
};