import Client from "@/structures/Client";

export default class Base {
  public client: Client

  constructor() {
    // @ts-ignore
    this.client = global.client
  }
}