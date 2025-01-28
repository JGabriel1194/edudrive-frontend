import { BellIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../contexts/AuthConext";
import { Dropdown, Avatar, DarkThemeToggle} from "flowbite-react";
import { IMAGE_URL } from "../config/config";


interface NavbarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const Navbar = ({isOpen, setIsOpen}: NavbarProps) => {
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 sm:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="h-6 w-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            <img
              src="https://flowbite-react.com/favicon.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite React Logo"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              EduDrive
            </span>
          </div>

          <div className="ml-auto mr-3 flex items-center space-x-4">
            <div className="hidden items-center space-x-4 sm:flex">
              <DarkThemeToggle />
            </div>

            <Dropdown
              inline
              arrowIcon={false}
              label={
                <BellIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              }
              className="w-80"
            >
              <Dropdown.Header>
                <span className="block text-sm font-medium">Notifications</span>
              </Dropdown.Header>
              <Dropdown.Item>
                <a href="/notifications">View all</a>
              </Dropdown.Item>
            </Dropdown>

            <Dropdown
              arrowIcon={false}
              label={
                <Avatar
                  img={
                    IMAGE_URL + user?.profileImageUrl || "/default-profile.png"
                  }
                  rounded={true}
                />
              }
              inline={true}
            >
              <Dropdown.Header>
                <span className="block text-sm">
                  {user?.firstname} {user?.lastname}
                </span>
                <span className="block truncate text-sm font-medium">
                  {user?.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item>
                <a href="/profile">Profile</a>
              </Dropdown.Item>
              <Dropdown.Item>
                <a href="/settings">Settings</a>
              </Dropdown.Item>
              <Dropdown.Item>
                <a onClick={logout}>Logout</a>
              </Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
