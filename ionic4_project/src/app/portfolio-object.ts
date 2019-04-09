export class PortfolioObject {
    id: string;
    name: string;
    symbol: string;
    timestamp: number;
    price_usd_when_added: number;

    price_usd_now: number; // Update on load
    price_increase_percentage: string; // Update on load
}