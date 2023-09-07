const dogFacts = [
  {
    id: 1,
    fact: "Just as humans can be identified by their fingerprints, dogs can be identified by their nose prints. Every dog's nose print is unique, and it can actually be used to identify them.",
  },
  {
    id: 2,
    fact: "Dogs dream just like humans. If you've ever noticed your dog twitching or making noises in her sleep, it's likely she's dreaming. Studies have found that smaller breeds tend to dream more frequently than larger ones.",
  },
  {
    id: 3,
    fact: "Dalmatians are born completely white and develop their black or liver spots as they grow older.",
  },
  {
    id: 4,
    fact: "The Basenji dog doesn't bark like other dogs. Instead, it makes a unique yodel-like sound known as a 'barroo,' due to its uniquely shaped larynx.",
  },
  {
    id: 5,
    fact: "Greyhounds are incredibly fast runners. They can reach speeds up to 45 mph, making them the Ferraris of the dog world. Historically, they were bred for hunting because of their speed.",
  },
  {
    id: 6,
    fact: "Dogs sweat through their paw pads. It's one of the ways they regulate their body temperature since they don't sweat all over their bodies as humans do.",
  },
  {
    id: 7,
    fact: "Dogs have been our companions for a very long time. The bond between humans and dogs dates back at least 15,000 years, making dogs one of the first animals to be domesticated.",
  },
  {
    id: 8,
    fact: "A dog's sense of smell is 10,000 to 100,000 times more sensitive than humans. Some dogs are even trained to sniff out diseases like cancer or to predict seizures.",
  },
  {
    id: 9,
    fact: "Whiskers on a dog are not just for cuteness – they are highly sensitive to touch. They can sense minute changes in airflow and help dogs understand their surroundings, even in the dark.",
  },
  {
    id: 10,
    fact: "Just like humans, dogs have baby teeth that fall out. Puppies have 28 baby teeth that usually fall out by about six months of age. As adults, they have 42 teeth.",
  },
];

export default function FunFacts() {
  return (
    <div className="h-screen flex flex-col flex-grow">
      <h1 className="text-2xl font-bold p-2 mt-10">
        Fun Facts About Our Best Friends!
      </h1>
      <p className="text-md text-gray-600 m-2">Learn more about dogs!</p>
      {dogFacts.map((factObj) => (
        <div key={factObj.id} className="m-2 p-1">
          <p className="text-md text-gray-600">Did you know that...</p>
          <p className="text-sm text-gray-500">{`${factObj.fact}`}</p>
        </div>
      ))}
    </div>
  );
}
