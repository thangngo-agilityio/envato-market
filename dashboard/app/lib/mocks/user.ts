import { TEmployee, TUserDetail } from '@/lib/interfaces';

export const USER_MOCK: TEmployee = {
  avatarURL: 'https://cdn-icons-png.flaticon.com/512/5556/5556468.png',
  firstName: 'Abdur',
  lastName: 'Rohman',
  lastActive: '2 days ago',
  workTime: 'Full Time',
  level: 'Senior Level',
  position: 'Jakarta',
  lastPlace: 'Indonesia',
  jobTitle: 'Finance managers',
  id: '1',
  createdAt: 3123123,
  salary: 1234,
  experience: '2-4 Years',
  hiringAgent: {
    firstName: 'Huy',
    lastName: 'Pham',
    role: 'HR Specialist',
    experience: '10 Years',
    avatarURL: 'https://cdn-icons-png.flaticon.com/512/5556/5556468.png',
  },
};

export const USERS_MOCK = [
  {
    avatarURL: 'https://cdn-icons-png.flaticon.com/512/5556/5556468.png',
    firstName: 'Abdur',
    lastName: 'Rohman',
    lastActive: '2 days ago',
    workTime: 'Full Time',
    level: 'Senior Level',
    position: 'Finance managers',
    lastPlace: 'Jakarta, Indonesia',
    id: '1',
    createdAt: 3123123,
    salary: 1234,
    experience: '3-4 Years',
    hiringAgent: {
      firstName: 'Huy',
      lastName: 'Pham',
      role: 'HR Specialist',
      experience: '10 Years',
      avatarURL: 'https://cdn-icons-png.flaticon.com/512/5556/5556468.png',
    },
  },
  {
    avatarURL: 'https://cdn-icons-png.flaticon.com/512/5556/5556468.png',
    firstName: 'Devon',
    lastName: 'Rohman',
    lastActive: '4 days ago',
    workTime: 'Full Time',
    level: 'Senior Level',
    position: 'Finance managers',
    lastPlace: 'Jakarta, Indonesia',
    id: '2',
    createdAt: 132312321,
    salary: 1234,
    experience: '1-2 Years',
    hiringAgent: {
      firstName: 'Huy',
      lastName: 'Pham',
      role: 'HR Specialist',
      experience: '10 Years',
      avatarURL: 'https://cdn-icons-png.flaticon.com/512/5556/5556468.png',
    },
  },
];

export const INITIAL_USER = {
  avatarURL: '',
  firstName: '',
  lastName: '',
  lastActive: '',
  workTime: '',
  level: '',
  position: '',
  lastPlace: '',
  id: '',
  createdAt: 0,
  salary: 0,
  experience: '',
  jobTitle: '',
  hiringAgent: {
    firstName: '',
    lastName: '',
    role: '',
    experience: '',
    avatarURL: '',
  },
};

export const MOCK_USER_DATA = {
  user: {
    firstName: 'Duong',
    lastName: 'Pham',
    email: 'duong.pham2@asnet.com.vn',
    creatAt: 1703059988,
    avatarURL: '/images/avatar-sign-up.webp',
    phoneNumber: 'phoneNumber 20',
    country: 'country 20',
    postalCode: 'postalCode 20',
    facebookURL: 'facebookURL 20',
    twitterURL: 'twitterURL 20',
    linkedinURL: 'linkedinURL 20',
    youtubeURL: 'youtubeURL 20',
    id: '20',
    createdAt: 1703061187583,
  },
  isRemember: false,
  date: 1703210585.219,
};

export const MOCK_USERS_DATA = [
  {
    firstName: 'Ni',
    lastName: 'Ngo',
    email: 'ni.ngo611@gmail.com',
    password: 'Admin@123',
    createAt: 1702370430,
    avatarURL: '/images/avatar-sign-up.webp',
    phoneNumber: 'phoneNumber 4',
    country: 'country 4',
    postalCode: 'postalCode 4',
    facebookURL: 'facebookURL 4',
    twitterURL: 'twitterURL 4',
    linkedinURL: 'linkedinURL 4',
    youtubeURL: 'youtubeURL 4',
    id: '4',
    createdAt: 1702370669826,
  },

  {
    firstName: 'Huy',
    lastName: 'Pham',
    email: 'huypham273@gmail.com',
    password: 'Abcd@123',
    creatAt: 1702434936,
    avatarURL: '/images/avatar-sign-up.webp',
    phoneNumber: 'phoneNumber 6',
    country: 'country 6',
    postalCode: 'postalCode 6',
    facebookURL: 'facebookURL 6',
    twitterURL: 'twitterURL 6',
    linkedinURL: 'linkedinURL 6',
    youtubeURL: 'youtubeURL 6',
    id: '6',
    createdAt: 1702435295737,
  },

  {
    firstName: 'Canh',
    lastName: 'Vo',
    email: 'canhvo@gamil.com',
    password: 'Canhvo@123',
    creatAt: 1702873992,
    avatarURL: '/images/avatar-sign-up.webp',
    phoneNumber: 'phoneNumber 10',
    country: 'country 10',
    postalCode: 'postalCode 10',
    facebookURL: 'facebookURL 10',
    twitterURL: 'twitterURL 10',
    linkedinURL: 'linkedinURL 10',
    youtubeURL: 'youtubeURL 10',
    id: '10',
    createdAt: 1702874591858,
  },

  {
    firstName: 'nguyen',
    lastName: 'ha',
    email: 'nguyen.ha+4@asnet.com.vn',
    password: 'Asnet@1234',
    creatAt: 1702881128,
    avatarURL: '/images/avatar-sign-up.webp',
    phoneNumber: 'phoneNumber 14',
    country: 'country 14',
    postalCode: 'postalCode 14',
    facebookURL: 'facebookURL 14',
    twitterURL: 'twitterURL 14',
    linkedinURL: 'linkedinURL 14',
    youtubeURL: 'youtubeURL 14',
    id: '14',
    createdAt: 1702881967661,
  },
  {
    firstName: 'test2',
    lastName: 'test',
    email: 'test2.test@gmail.com',
    password: 'Asnet@1234',
    creatAt: 1702881953,
    avatarURL: '/images/avatar-sign-up.webp',
    phoneNumber: 'phoneNumber 15',
    country: 'country 15',
    postalCode: 'postalCode 15',
    facebookURL: 'facebookURL 15',
    twitterURL: 'twitterURL 15',
    linkedinURL: 'linkedinURL 15',
    youtubeURL: 'youtubeURL 15',
    id: '15',
    createdAt: 1702882852315,
  },
  {
    firstName: 'Thuong',
    lastName: 'Hoai',
    email: 'thuong.buihoai@asnet.com.vn',
    password: 'Thuong25*',
    creatAt: 1702894418,
    avatarURL: 'https://i.ibb.co/GdNXmxv/t-t.jpg',
    phoneNumber: '',
    country: 'country 16',
    postalCode: 'postalCode 16',
    facebookURL: 'facebookURL 16',
    twitterURL: 'twitterURL 16',
    linkedinURL: 'linkedinURL 16',
    youtubeURL: 'youtubeURL 16',
    id: '16',
    createdAt: 1702895393765,
    address: '',
    city: '',
  },
  {
    firstName: 'kien',
    lastName: 'nguyen',
    email: 'kien.nguyen@asnet.com.vn',
    password: 'Kien@1234',
    creatAt: 1702976388,
    avatarURL: '/images/avatar-sign-up.webp',
    phoneNumber: 'phoneNumber 17',
    country: 'country 17',
    postalCode: 'postalCode 17',
    facebookURL: 'facebookURL 17',
    twitterURL: 'twitterURL 17',
    linkedinURL: 'linkedinURL 17',
    youtubeURL: 'youtubeURL 17',
    id: '17',
    createdAt: 1702977407234,
  },
  {
    firstName: 'Duong',
    lastName: 'Pham',
    email: 'duong.pham11@asnet.com.vn',
    password: 'Asnet@12345',
    creatAt: 1703043000,
    avatarURL: '/images/avatar-sign-up.webp',
    phoneNumber: 'phoneNumber 18',
    country: 'country 18',
    postalCode: 'postalCode 18',
    facebookURL: 'facebookURL 18',
    twitterURL: 'twitterURL 18',
    linkedinURL: 'linkedinURL 18',
    youtubeURL: 'youtubeURL 18',
    id: '18',
    createdAt: 1703044079353,
  },
];

export const MOCK_USER_DETAIL: TUserDetail = {
  id: '1',
  _id: '1',
  title: 'What is the issues',
  avatarURL: 'https://cdn-icons-png.flaticon.com/512/5556/5556468.png',
  password: '123456',
  phoneNumber: '02342423',
  country: 'LD',
  city: 'DL',
  address: '123 TMT',
  postalCode: '1234',
  firstName: 'Abdur',
  lastName: 'Rohman',
  email: 'test@gmail.com',
  role: 'member',
  description: 'description',
  createdAt: 3123123,
  isBlock: false,
  uid: '1',
};

export const MOCK_USER_DETAIL_WITHOUT_IMAGE: TUserDetail = {
  id: '1',
  _id: '1',
  uid: '2',
  title: 'What is the issues',
  password: '123456',
  phoneNumber: '02342423',
  country: 'LD',
  city: 'DL',
  address: '123 TMT',
  postalCode: '1234',
  firstName: 'Abdur',
  lastName: 'Rohman',
  email: 'test@gmail.com',
  role: 'member',
  description: 'description',
  createdAt: 3123123,
  isBlock: false,
};

export const USER_DETAIL_MOCK = [
  {
    _id: '1',
    title: 'What is the issues',
    avatarURL: 'https://cdn-icons-png.flaticon.com/512/5556/5556468.png',
    password: '123456',
    phoneNumber: '02342423',
    country: 'LD',
    city: 'DL',
    address: '123 TMT',
    postalCode: '1234',
    firstName: 'Abdur',
    lastName: 'Rohman',
    email: 'test@gmail.com',
    role: 'member',
    description: 'description',
    createdAt: 3123123,
    isBlock: false,
    uid: '1',
  },
];

export const RESULT_LIST_USER = {
  data: {
    result: [
      {
        _id: '123',
        firstName: 'John',
        lastName: 'Does',
        email: 'test@gmail.com',
        phone: '01212465433',
        title: 'Test title',
        description: 'Test description',
        userId: '1',
        avatar:
          'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/af53d53d-561f-450a-a483-70a7ceee380f/dunk-low-shoes-t9dFBx.png',
        createdAt: '11111111111',
        updatedAt: '22222222222',
      },
    ],
    totalPage: 12,
  },
  pageParams: 1,
};

export const RESULT_LIST_USER_EXPECT = [
  {
    _id: '123',
    avatar:
      'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/af53d53d-561f-450a-a483-70a7ceee380f/dunk-low-shoes-t9dFBx.png',
    createdAt: '11111111111',
    description: 'Test description',
    email: 'test@gmail.com',
    firstName: 'John',
    lastName: 'Does',
    phone: '01212465433',
    title: 'Test title',
    updatedAt: '22222222222',
    userId: '1',
  },
];

export const CUSTOMER_ISSUE_MOCK = [
  {
    _id: '1',
    firstName: 'Abdur',
    lastName: 'Rohman',
    email: 'test@gmail.com',
    phone: '02342423',
    title: 'What is the issues',
    description: 'description',
    userId: '1',
    avatar: 'https://cdn-icons-png.flaticon.com/512/5556/5556468.png',
    createdAt: '11111111111',
    updatedAt: '22222222222',
  },
];

export const MOCK_USER_WITH_BLOCK = [
  {
    id: '1',
    _id: '1',
    title: 'What is the issues',
    avatarURL: 'https://cdn-icons-png.flaticon.com/512/5556/5556468.png',
    password: '123456',
    phoneNumber: '02342423',
    country: 'LD',
    city: 'DL',
    address: '123 TMT',
    postalCode: '1234',
    firstName: 'Abdur',
    lastName: 'Rohman',
    email: 'test@gmail.com',
    role: 'member',
    description: 'description',
    createdAt: 3123123,
    isBlock: true,
    uid: '1',
  },
  {
    id: '2',
    _id: '3',
    title: 'What is the issues',
    avatarURL: 'https://cdn-icons-png.flaticon.com/512/5556/5556468.png',
    password: '123456',
    phoneNumber: '02342423',
    country: 'LD',
    city: 'DL',
    address: '123 TMT',
    postalCode: '1234',
    firstName: 'Abdur',
    lastName: 'Rohman',
    email: 'test@gmail.com',
    role: 'member',
    description: 'description',
    createdAt: 3123123,
    isBlock: false,
    uid: '1',
  },
];

export const INIT_USER_DETAIL: TUserDetail = {
  id: '',
  _id: '',
  title: '',
  avatarURL: '',
  password: '',
  phoneNumber: '',
  country: '',
  city: '',
  address: '',
  postalCode: '',
  firstName: '',
  lastName: '',
  email: '',
  role: '',
  description: '',
  createdAt: 0,
  isBlock: false,
  uid: '',
};

export const USER_SIGN_IN = {
  email: 'test@example.com',
  password: '1@Dzxcvb',
  fcmToken: '',
};

export const USER_SIGN_UP = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'test@example.com',
  password: '1@Dzxcvb',
  fcmToken: '',
};

export const USER_DATA = {
  userId: '123',
  adminId: 'admin123',
  avatarUrl: 'avatar-url',
  avatarAdminUrl: 'admin-avatar-url',
  displayName: 'John Doe',
};

export const MOCK_FILTER_DATA_USER = [
  { _id: '1', email: 'userone@example.com' },
  { _id: '2', email: 'usertwo@example.com' },
  { _id: '3', email: 'userthree@example.com' },
];

export const MOCK_ROOM_CHAT_USER = {
  userId: '123',
  roomChatId: 'room123',
  adminId: 'admin123',
  avatarUrl: 'avatar-url',
  avatarAdminUrl: 'admin-avatar-url',
  displayName: 'John Doe',
};
