import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectAuthInfo } from "@/store/slicers/authSlice";

type usersObj = {
  [key: string]: {
    id: string;
    dog_img: string;
  };
};

export const SearchBar = () => {
  const [users, setUsers] = useState<usersObj>({});
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const currentUserId = useSelector(selectAuthInfo)?.id;
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get("http://localhost:3030/all-users");
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  const handleSearch = (e: any) => {
    const searchValue = e.target.value;
    if (searchValue.length === 0) {
      setShowDropdown(false);
      return;
    }

    let results = Object.keys(users).filter((key) => {
      if (currentUserId === users[key].id) return;
      let result = key;
      if (key.toLowerCase().startsWith(searchValue)) {
        return result;
      }
      return key.startsWith(searchValue);
    });
    setSearchResults(results);
    setShowDropdown(results.length > 0);
  };

  const handleFollow = async (id: string) => {
    try {
      const response = await axios.post(
        "http://localhost:3030/friends",
        { friendId: id },
        { headers: { id: currentUserId } }
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">
      <Input
        placeholder="Search Pawbook"
        type="text"
        className="hidden border-0 md:inline-flex ml-2 items-center bg-transparent outline-none placeholder-gray-500 flex-shrink text-gray-600 focus-visible:border-0 focus-visible:ring-0"
        onChange={handleSearch}
      />
      {showDropdown && (
        <div className="absolute top-full w-full border border-gray-200 bg-white rounded-md shadow-md">
          <ul>
            {searchResults.map((userName) => (
              <li
                key={users[userName].id}
                className="p-2 hover:bg-gray-100 flex justify-between"
                onClick={() => handleFollow(users[userName].id)}
              >
                {userName}
                {users[userName].dog_img && (
                  <Image
                    src={users[userName].dog_img}
                    alt="dog"
                    className="w-6 h-6 rounded-full"
                    width={24}
                    height={24}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
