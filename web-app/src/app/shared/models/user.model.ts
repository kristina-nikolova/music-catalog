export class User {
  id: string;
  display_name: string;
  images: Array<Object>;

  constructor(user: any) {
    this.id = user.id;
    this.display_name = user.display_name;
    this.images = user.images;
  }
}
