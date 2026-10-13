const LOOPIE_BASE_URL = 'http://localhost:8080/api/loopie';
const AUTH_BASE_URL = 'http://localhost:8080/api/auth';

// Auth

export const registerUser = async (firstName: string, lastName: string, email: string, password: string) => {
    const response = await fetch(`${AUTH_BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
    });

    if (!response.ok) {
        throw new Error(`Fehler bei der Registrierung (Status: ${response.status})`);
    }

    return response.json();
};

export const loginUser = async (email:string, password:string) => {
    const response = await fetch(`${AUTH_BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({email, password}),
    });

    if (!response.ok) {
        throw new Error(`Fehler bei dem Login bitte überprüf die Daten.`);
    }

    return response.json();
}

// Main Functions

export const fetchTotalQuantity = async (userId: string): Promise<number> => {
    const response = await fetch(`${LOOPIE_BASE_URL}/quantity/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Fehler beim Aufruf der Menge (Status: ${response.status})`);
    }

    return response.json();
};

export const fetchUserBalance = async (userId: string): Promise<number> => {
    const response = await fetch(`${LOOPIE_BASE_URL}/balance/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Fehler beim Aufruf des Geldbetrags (Status: ${response.status})`);
    }

    return response.json();
};