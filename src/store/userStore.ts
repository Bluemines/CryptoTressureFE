
// import { create } from "zustand";
// import { formatDistanceToNow } from "date-fns";

// const capitalizeStatus = (status: string) =>
//   status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

// interface FlatUser {
//   id: number;
//   username: string;
//   email: string;
//   phone: string;
//   status: string;
//   role: string;
//   level: number;
//   referralCode: string;
//   emailVerified: boolean;
//   createdAt: string; // e.g. "1 min ago"
//   updatedAt: string;
//   balance: string;
// }

// interface RawUser {
//   id: number;
//   username: string;
//   email: string;
//   phone: string;
//   status: string;
//   role: string;
//   level: number;
//   referralCode: string;
//   emailVerified: boolean;
//   createdAt: string;
//   updatedAt: string;
//   referralsReceived: any[];
//   rewards: any[];
//   wallet: {
//     balance: string;
//   };
// }

// interface UserStore {
//   users: FlatUser[];
//   setAllUsers: (users: RawUser[]) => void;
//   addUser: (user: RawUser) => void;
//   deleteUserById: (id: number) => void;
// }

// export const useUserStore = create<UserStore>((set) => ({
//   users: [],

//   setAllUsers: (users) =>
//     set(() => ({
//       users: users.map((u) => ({
//         id: u.id,
//         username: u.username,
//         email: u.email,
//         phone: u.phone,
//         status: u.status,
//         role: u.role,
//         level: u.level,
//         referralCode: u.referralCode,
//         emailVerified: u.emailVerified,
//         createdAt: formatDistanceToNow(new Date(u.createdAt), {
//           addSuffix: true,
//         }), // 👈 converts date
//         updatedAt: u.updatedAt,
//         balance: u.wallet?.balance ?? "0",
//       })),
//     })),

//   addUser: (user) =>
//     set((state) => ({
//       users: [
//         ...state.users,
//         {
//           id: user.id,
//           username: user.username,
//           email: user.email,
//           phone: user.phone,
//           status: user.status,
//           role: user.role,
//           level: user.level,
//           referralCode: user.referralCode,
//           emailVerified: user.emailVerified,
//           createdAt: formatDistanceToNow(new Date(user.createdAt), {
//             addSuffix: true,
//           }), // 👈 converts date
//           updatedAt: user.updatedAt,
//           balance: user.wallet?.balance ?? "0",
//         },
//       ],
//     })),

//   deleteUserById: (id) =>
//     set((state) => ({
//       users: state.users.filter((user) => user.id !== id),
//     })),
// }));
import { create } from "zustand";
import { formatDistanceToNow } from "date-fns";

interface FlatUser {
  id: number;
  username: string;
  email: string;
  phone: string;
  status: string;
  role: string;
  level: number;
  referralCode: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  balance: string;
}

export interface RawUser {
  id: number;
  username: string;
  email: string;
  phone: string;
  status: string;
  role: string;
  level: number;
  referralCode: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  referralsReceived: any[];
  rewards: any[];
  wallet: {
    balance: string;
  };
}

interface UserStore {
  users: FlatUser[];
  setAllUsers: (users: RawUser[]) => void;
  addUser: (user: RawUser) => void;
  deleteUserById: (id: number) => void;
}

// 👇 Helper function to capitalize status
const capitalizeStatus = (status: string) =>
  status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

export const useUserStore = create<UserStore>((set) => ({
  users: [],

  setAllUsers: (users) =>
    set(() => ({
      users: users.map((u) => ({
        id: u.id,
        username: u.username,
        email: u.email,
        phone: u.phone,
        status: capitalizeStatus(u.status),
        role: u.role,
        level: u.level,
        referralCode: u.referralCode,
        emailVerified: u.emailVerified,
        createdAt: formatDistanceToNow(new Date(u.createdAt), {
          addSuffix: true,
        }),
        updatedAt: u.updatedAt,
        balance: u.wallet?.balance ?? "0",
      })),
    })),

  addUser: (user) =>
    set((state) => ({
      users: [
        ...state.users,
        {
          id: user.id,
          username: user.username,
          email: user.email,
          phone: user.phone,
          status: capitalizeStatus(user.status),
          role: user.role,
          level: user.level,
          referralCode: user.referralCode,
          emailVerified: user.emailVerified,
          createdAt: formatDistanceToNow(new Date(user.createdAt), {
            addSuffix: true,
          }),
          updatedAt: user.updatedAt,
          balance: user.wallet?.balance ?? "0",
        },
      ],
    })),

  deleteUserById: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    })),
}));
