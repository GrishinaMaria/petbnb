const str: string = 'abc';

let num: number = 123;
num = 234;

function sum(a: number, b: number): number {
  return a + b;
}

sum(1, 2);

const user = {
  id: 1,
  firstname: 'Ivan',
  lastname: 'Ivanov',
  age: 20,
  notebook: {
    id: 2,
    brand: 'Apple',
    model: 'Macbook Air M2',
  },
};

const user2 = {
  id: 1,
  firstname: 'Ivan',
  lastname: 'Ivanov',
  notebook: {
    id: 2,
    brand: 'Apple',
    model: {
      name: 'Macbook Air M2',
    },
  },
};

const user3: IPerson<Phone> = {
  id: 1,
  firstname: 'Ivan',
  lastname: 'Ivanov',
  item: {
    id: 2,
    brand: 'Apple',
    model: 'Iphone',
    color: 'Space Gray',
  },
};

type Notebook = {
  id: number;
  brand: string;
  model: string | object;
};

type Phone = {
  id: number;
  brand: string;
  model: string;
  color?: string;
};

type Person = {
  id: number;
  firstname: string;
  lastname: string;
  age?: number;
  notebook: Notebook;
};

interface IPerson<T> {
  id: number;
  firstname: string;
  lastname: string;
  age?: number;
  item: T;
}

function showPhoneModel(person: IPerson<Phone>) {
  console.log(person.item.model);
}

showPhoneModel(user3);

function showPcModel(person: IPerson<Notebook>) {
  console.log(person.item.model);
}

function showPcBrand(person: Person) {
  console.log(person.notebook.brand);
}

showPcBrand(user2);

let strsArr: string[] = ['a', 'b', 'c'];
let arr: Person[] = [user, user2];

let numsArr: number[] = [1, 2, 3];
let nums: Array<number> = [2, 3, 4];

async function getPerson(id: number | string) {
  const response: Promise<Person[]> = fs.readFile('url');
  const result: Person[] = await response;
}

function showFirst<T>(arr: T[]): T {
  return arr[0];
}

showFirst<number>([1, 1, 1]);

const a: { id: number } = { id: 1 };
const b: { name: string } = { name: 'b' };
