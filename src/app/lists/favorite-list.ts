import { Repository } from './../types/repository.type';

export const favorite_lists: Repository[] = []
export let count = 0
export function counter1(){
  count++
}
export function reset() {
  count = 0
}