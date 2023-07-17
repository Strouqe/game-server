import { Characteristics } from "./charecters";

export class Mission {
  constructor(
    public id: number,
    public name: string,
    public dificulty: number,
    public reward: number,
    public requirements: Characteristics
  ){}
}


function generateCharacteristics(dificulty: number): Characteristics {
  let intelect = Math.floor(Math.random() * 10 )*(dificulty / 100) + 10*(dificulty / 100)
  let strength = Math.floor(Math.random() * 10 )*(dificulty / 100) + 10*(dificulty / 100)
  let dexterity = Math.floor(Math.random() * 10 )*(dificulty / 100) + 10*(dificulty / 100)
  return {intelect, strength, dexterity}
}
// generate 6 missions. 2 of 100 dificulty, 2 of 200 dificulty and 2 of 300 dificulty and return them in one array
export function createMissions(): Mission[] {
  let missions = []
  let characteristics 
  for (let i = 0; i < 6; i++) {
    let dificulty = (i % 3 + 1) * 100
    characteristics = generateCharacteristics(dificulty)
    missions.push(new Mission(i, `Mission ${i}`, dificulty, dificulty, characteristics))
  }
  console.log(missions)
  return missions
}

