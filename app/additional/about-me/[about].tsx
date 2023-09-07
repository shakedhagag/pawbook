import React from "react";

const aboutMeData = {
  name: "Shaked Hagag",
  age: 27,
  location: "Tel Aviv, Israel",
  bio: `My name is Shaked Hagag, I'm a frontend developer in a company called OpenWeb. 
  I just finished my Computer Science degree in Reichman University. (Fun fact, this is my last course!)
  In my free time, I enjoy reading books, working out, coding and learning new technologies. `,
  hobbies: ["Coding", "Calistenics", "Handstand", "Reading"],
};

const AboutMe = () => {
  return (
    <div className="flex h-screen flex-grow p-2">
      <div className="mt-10 p-6 max-w-md h-[600px] mx-auto bg-white rounded-xl shadow-md space-y-4">
        <h1 className="text-2xl font-bold mb-2">About Me</h1>
        <p className="text-gray-700">Age: {aboutMeData.age}</p>
        <p className="text-gray-700">Location: {aboutMeData.location}</p>
        <p className="text-gray-700 border-t border-gray-200 pt-2">
          Bio: {aboutMeData.bio}
        </p>

        <div className="border-t border-gray-200 pt-2">
          <h2 className="text-xl font-medium mb-2 mt-2">Hobbies</h2>
          <ul className="list-disc list-inside space-y-2">
            {aboutMeData.hobbies.map((hobby) => (
              <li key={hobby} className="text-gray-700">
                {hobby}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
