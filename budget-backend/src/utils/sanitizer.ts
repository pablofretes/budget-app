export class Sanitizer {
	sanitizeNumber(number: number): number {
		return Number(number.toFixed(2));
	}
}