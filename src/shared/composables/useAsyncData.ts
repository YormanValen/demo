import { ref } from 'vue'

type AsyncFn<TArgs extends unknown[], TResult> = (...args: TArgs) => Promise<TResult>

export function useAsyncData<TArgs extends unknown[], TResult>(fn: AsyncFn<TArgs, TResult>) {
  const isLoading = ref(false)
  const error = ref<unknown>(null)
  const data = ref<TResult | null>(null)

  const execute = async (...args: TArgs) => {
    isLoading.value = true
    error.value = null

    try {
      const result = await fn(...args)
      data.value = result
      return result
    } catch (err) {
      error.value = err
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    data,
    error,
    isLoading,
    execute
  }
}
