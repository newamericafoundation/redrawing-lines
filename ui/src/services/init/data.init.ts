import { DataService } from 'src/services/data.service';

const dataService = new DataService(import.meta.env.VITE_SOURCE);

export default dataService;
