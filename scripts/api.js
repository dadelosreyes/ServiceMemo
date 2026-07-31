import axios from 'axios';

export const fetchTasks = async () => {
    try {
        const response = await
        axios.get("http://10.0.2.2:5011/api/ServiceMemo"); //emulator
        return response.data;
    } catch (error){
        throw error; 
    }
};