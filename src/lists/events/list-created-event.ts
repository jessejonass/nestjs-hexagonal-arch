import { List } from '../entities';

export class ListCreatedEvent {
  constructor(public list: List) {}
}
