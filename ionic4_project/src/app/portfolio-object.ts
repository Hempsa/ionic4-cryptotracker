import { Coin } from './coin';

export class PortfolioObject extends Coin {
    timestamp: number;
    amount: number;
    
    price_usd_when_added: number;
    price_increase_percentage: string; // Update on load
}