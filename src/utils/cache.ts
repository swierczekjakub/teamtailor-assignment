type CacheEntry<T> = {
	data: T;
	timestamp: number;
};

const CACHE_EXPIRATION_TIME =  2 * 60 * 60 * 1000;

export class Cache<T> {
	private cache = new Map<number, CacheEntry<T>>();

	isValid(timestamp: number): boolean {
		return Date.now() - timestamp < CACHE_EXPIRATION_TIME;
	}

	get(key: number): CacheEntry<T> | null {
		const entry = this.cache.get(key);
		if (entry && this.isValid(entry.timestamp)) {
			return entry;
		}
		if (entry) {
			this.cache.delete(key);
		}
		return null;
	}

	set(key: number, data: T): void {
		this.cache.set(key, {data, timestamp: Date.now()});
	}
}
