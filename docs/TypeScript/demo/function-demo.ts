export interface Phone {
  playGame: (name: string) => void;
}
export class DIStudent {
  constructor(private name: string, private phone: Phone) {
    this.phone = phone;
    this.name = name;
  }
  getName() {
    return this.name;
  }
  play() {
    this.phone.playGame(this.name);
  }
}

class Android implements Phone {
  playGame(name: string) {
    console.log(`${name} use android play game`);
  }
}
const student1 = new DIStudent("toimc1", new Android());
student1.play();
