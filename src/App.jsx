import { useState } from "react";
import './App.css';

let totalStrength = 0;
let totalAgility = 0;

const App = () => {
  const [team, setTeam] = useState([]);
  const [money, setMoney] = useState(100);
  const [zombieFighters, setZombieFighters] = useState([
    {
      id: 1,
      name: 'Survivor',
      price: 12,
      strength: 6,
      agility: 4,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/0c2d6b.png',
    },
    {
      id: 2,
      name: 'Scavenger',
      price: 10,
      strength: 5,
      agility: 5,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/033a16.png',
    },
    {
      id: 3,
      name: 'Shadow',
      price: 18,
      strength: 7,
      agility: 8,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/262c36.png',
    },
    {
      id: 4,
      name: 'Tracker',
      price: 14,
      strength: 7,
      agility: 6,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/3c1e70.png',
    },
    {
      id: 5,
      name: 'Sharpshooter',
      price: 20,
      strength: 6,
      agility: 8,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/4b2900.png',
    },
    {
      id: 6,
      name: 'Medic',
      price: 15,
      strength: 5,
      agility: 7,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/5a1e02.png',
    },
    {
      id: 7,
      name: 'Engineer',
      price: 16,
      strength: 6,
      agility: 5,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/5e103e.png',
    },
    {
      id: 8,
      name: 'Brawler',
      price: 11,
      strength: 8,
      agility: 3,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/67060c.png',
    },
    {
      id: 9,
      name: 'Infiltrator',
      price: 17,
      strength: 5,
      agility: 9,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/ac3220.png',
    },
    {
      id: 10,
      name: 'Leader',
      price: 22,
      strength: 7,
      agility: 6,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/e41f26.png',
    },
  ]);
  
  const handleRemoveFighter = (fighter) => {
    //remove fighter from picked team members
    const updatedTeam = team.filter((member) => member.id !== fighter.id);

    const funds = money + fighter.price;

    totalStrength = updatedTeam.reduce(
      (acc, member) => acc + member.strength,
      0
    );

    totalAgility = updatedTeam.reduce(
      (acc, member) => acc + member.agility,
      0
    );

    // add fighter back to Zombie Fighters
    const updatedZombieFighters = [...zombieFighters, fighter];

    //update changed states
    setTeam(updatedTeam);
    setZombieFighters(updatedZombieFighters);
    // refunding the cost
    setMoney(funds);
  };

  const handleAddFighter = (fighter) => {
    // check if you have enough money to afford character to team
    if (fighter.price > money) {
      console.log("Not Enough Money");
    } else {
      //subtract the cost of the fighter from current money
      const funds = money - fighter.price;
      //set the sate of the money
      setMoney(funds);
      //create a new team array for the fighter to be added
      const newTeamFighters = [...team, fighter];
      //update the team's state with the new fighter
      setTeam(newTeamFighters);
      //remove the fighter from the list of available zombie fighters
      const newZombieFighters = zombieFighters.filter(
        (zombieFighter) => zombieFighter.id !== fighter.id
      );
      //update zombie fighters
      setZombieFighters(newZombieFighters);

      totalStrength = newTeamFighters.reduce(
        (acc, member) => acc + member.strength,
        0
      );
      totalAgility = newTeamFighters.reduce(
        (acc, member) => acc + member.agility,
        0
      );

    }
  };
  return (
    <>
      <h1>Zombie Fighters</h1>
      <h2>Money: {money}</h2>
      <h2>Team Strength: {totalStrength}</h2>
      <h2>Team Agility: {totalAgility}</h2>
      <h2>Team</h2>

      {team.length === 0 ? (
        <p>Pick Some Team Members</p>
      ) : (
        <>
          {/* <p>Total Strength:{totalStrength}</p>
         <p>Total Agility: {totalAgility}</p> */}
          <ul>
            {team.map((member) => (
              <li key={member.id}>
                <img src={member.img} alt="team member" />
                <h3>{member.name}</h3>
                <p>Price: {member.price}</p>
                <p>Strength: {member.strength}</p>
                <p>Agility: {member.agility}</p>
                <button onClick={() => handleRemoveFighter(member)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      <h2>Fighters:</h2>
      <ul>
        {zombieFighters.map(zombieFighter => (
          <li key={zombieFighter.id}>
            <img src={zombieFighter.img} alt="zombie fighter" />
            <h2>{zombieFighter.name}</h2>
            <p>Price: {zombieFighter.price}</p>
            <p>Strength: {zombieFighter.strength}</p>
            <p>Agility: {zombieFighter.agility}</p>
            <button onClick={() => handleAddFighter(zombieFighter)}>Add To Team</button>
          </li>

        ))}
      </ul>
    </>);
}

export default App