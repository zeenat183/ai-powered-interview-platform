// src/common/utils/to.util.ts
export async function to<T = any>(promise: Promise<T>): Promise<[Error | null, T | null]> {
    try {
      const result = await promise;
      return [null, result];
    } catch (err) {
      return [err as Error, null];
    }
  }
  