import sinon from 'sinon';
import faker from 'faker';
import mockData from './dummy';

export default {
  func: sinon.spy(),
  emptyArray: [],
  emptyObject: {},
  eventObject: {
    preventDefault: sinon.spy()
  },
  priority: 'Normal',
  number: 1,
  usersId: 1,
  userTwoId: 2,
  groupId: 1,
  groupTwoId: 2,
  staticToken: 'cdvdsgvrefgscxvxvb134fvqIrrdxzvvfb',
  string: faker.lorem.word(),
  longString: faker.lorem.sentences(),
  username: faker.internet.userName(),
  fullName: faker.name.findName(),
  email: faker.internet.email(),
  phoneNumber: '08162740860',
  password: faker.internet.password(),
  loginProps: {
    onLoginUser: sinon.spy(),
    authData: {},
    history: {
      push: sinon.spy()
    }
  },
  registerProps: {
    onRegisterUser: sinon.spy(),
    onLoginUser: sinon.spy(),
    authData: {},
    history: {
      push: sinon.spy()
    }
  },
  updatePasswordProps: {
    updatePassword: sinon.spy(),
    history: {
      push: sinon.spy()
    }
  },
  notFound: {
    history: {
      push: sinon.spy()
    }
  },
  resetPasswordProps: {
    requestResetPassword: sinon.spy(),
    history: {
      push: sinon.spy()
    }
  },
  sideMenuProps: {
    handleLogout: sinon.spy(),
    userGroups: [],
    handleOpenMessageBoard: sinon.spy(),
    toggleSideNav: sinon.spy(),
    sideNavStatus: true,
    username: 'jattoade',
    fullName: 'Aminujatto Abdulqahhar',
    currentGroup: {},
    location: {
      path: '/sidemenu'
    }
  },
  paginationProps: {
    handlePageClick: sinon.spy(),
    pageCount: 1
  },
  baseDashboardProps: {
    fetchUserGroups: sinon.spy(),
    setSelectedGroupAsCurrent: sinon.spy(),
    setSelectedGroupMembers: sinon.spy(),
    fetchMessages: sinon.spy(),
    onLogoutUser: sinon.spy(),
    groupData: {},
    authData: {},
    currentGroup: {},
    location: {
      path: '/sidemenu'
    },
    history: {
      push: sinon.spy()
    }
  },
  createGroupBoardProps: {
    createGroup: sinon.spy(),
    fetchUserGroups: sinon.spy(),
    history: {
      push: sinon.spy()
    }
  },
  addUserToGroupBoardProps: {
    onSearchUser: sinon.spy(),
    onAddUser: sinon.spy(),
    fetchMessages: sinon.spy(),
    groupData: mockData.groupData,
    nextProps: {
      groupData: mockData.groupData
    },
    match: {
      params: {
        groupId: 1
      }
    },
    location: {
      pathname: '/addusertogroup/1/1'
    },
    history: {
      push: sinon.spy()
    }
  },
  messageBoardProps: {
    handleSendMessage: sinon.spy(),
    onRemoveUser: sinon.spy(),
    onSearchUser: sinon.spy(),
    onAddUser: sinon.spy(),
    resetCurrentGroup: sinon.spy(),
    groupData: {},
    authData: {},
    location: {
      path: '/sidemenu'
    },
    match: {
      params: {
        groupId: 1
      }
    },
    currentGroupMembers: [],
    currentGroup: {},
    groupMessages: []
  },
  userViewProps: {
    onAddUserToGroup: sinon.spy(),
    totalPageCount: 2,
    isSelected: [],
    selectedUsers: [],
    activeMessageReaders: [],
    removeGroupMember: sinon.spy(),
    onSearchUserInGroup: sinon.spy(),
    currentGroup: {}
  },
  mainNavProps: {
    toggleSideNav: sinon.spy(),
    handleLogout: sinon.spy()
  },
  messageItemProps: {
    updateReadBy: sinon.spy(),
    id: 1,
    username: mockData.validUsername,
    createdAt: mockData.string,
    text: mockData.string,
    sender: mockData.username,
    senderFullName: mockData.fullName,
    readBy: mockData.emptyArray
  },
  messageListProps: {
    updateReadBy: sinon.spy(),
    username: mockData.validUsername,
    fullName: mockData.fullName,
    messages: mockData.messagesArray
  },
  messageInputProps: {
    appendChatMessage: sinon.spy()
  },
  dashboardProps: {
    username: mockData.validUsername,
    fullName: mockData.validFullName
  },
  signupData: {
    username: mockData.validUsername,
    email: mockData.validEmail,
    password: mockData.validPassword,
    fullName: mockData.validFullName,
    phoneNumber: mockData.validPhoneNumber
  },
  signupData2: {
    username: mockData.validUsernameTwo,
    email: mockData.validEmailTwo,
    password: mockData.validPasswordTwo,
    fullName: mockData.validFullNameTwo,
    phoneNumber: mockData.validPhoneNumberTwo
  },
  invalidSignupData: {
    username: mockData.username,
    email: mockData.email,
    fullName: mockData.fullName,
    phoneNumber: mockData.phoneNumber
  },
  invalidSignupData2: {
    email: mockData.email,
    password: mockData.password,
    fullName: mockData.fullName,
    phoneNumber: mockData.phoneNumber
  },
  invalidSignupData3: {
    username: mockData.username,
    password: mockData.password,
    fullName: mockData.fullName,
    phoneNumber: mockData.phoneNumber
  },
  invalidSignupData4: {
    username: mockData.username,
    email: mockData.email,
    password: mockData.password,
    fullName: mockData.fullName
  },
  invalidSignupData5: {
    username: mockData.username,
    email: mockData.validEmail,
    password: mockData.password,
    fullName: mockData.fullName,
    phoneNumber: mockData.phoneNumber
  },
  invalidSignupData6: {
    username: mockData.validUsername,
    email: mockData.email,
    password: mockData.password,
    fullName: mockData.fullName,
    phoneNumber: mockData.phoneNumber
  },
  invalidSignupData7: {
    username: mockData.username,
    email: mockData.inValidEmail,
    password: mockData.password,
    fullName: mockData.fullName,
    phoneNumber: mockData.phoneNumber
  },
  invalidSignupData8: {
    username: mockData.username,
    email: mockData.email,
    password: '  ',
    fullName: mockData.fullName,
    phoneNumber: mockData.phoneNumber
  },
  invalidSignupData9: {
    username: '  ',
    email: mockData.email,
    password: mockData.password,
    fullName: mockData.fullName,
    phoneNumber: mockData.phoneNumber
  },
  invalidSignupData10: {
    username: mockData.username,
    email: '  ',
    password: mockData.password,
    fullName: mockData.fullName,
    phoneNumber: mockData.phoneNumber
  },
  invalidSignupData11: {
    username: mockData.username,
    email: mockData.email,
    password: mockData.password,
    fullName: mockData.fullName,
    phoneNumber: '  '
  },
  newGroup: {
    name: mockData.groupName,
    desc: mockData.groupDesc,
    isArchived: mockData.isArchived,
    UsersId: mockData.usersId
  },
  noGroupName: {
    desc: mockData.groupDesc,
    isArchived: mockData.isArchived,
    UsersId: mockData.usersId
  },
  groupReducerState: {
    userGroups: [],
    currentGroup: {},
    matchedUsers: [],
    groupError: {},
    addError: {},
    addMsgErr: {},
    message: {},
    groupMessages: [],
    currentGroupMembers: [],
    isLoadingMessages: false,
    isAddingMessage: false,
    isLoadingGroups: false,
    userAdded: false
  },
  groupReducerState2: {
    userGroups: [],
    currentGroup: {},
    matchedUsers: [],
    groupError: {},
    addError: {},
    addMsgErr: {},
    message: {},
    groupMessages: [],
    currentGroupMembers: [],
    isLoadingMessages: false,
    isAddingMessage: false,
    isLoadingGroups: true,
    userAdded: false
  },
  groupReducerState3: {
    userGroups: [],
    currentGroup: {
      id: 6,
      name: 'Search Engine',
      desc: 'a google user group',
      isArchived: '0',
      updatedAt: '2017-10-24T11:28:25.840Z',
      createdAt: '2017-10-24T11:28:25.840Z'
    },
    matchedUsers: [],
    groupError: {},
    addError: {},
    addMsgErr: {},
    message: {},
    groupMessages: [],
    currentGroupMembers: [],
    isLoadingMessages: false,
    isAddingMessage: false,
    isLoadingGroups: false,
    userAdded: false
  },
  groupReducerState4: {
    userGroups: [],
    currentGroup: {
      id: 6,
      name: 'Search Engine',
      desc: 'a google user group',
      isArchived: '0',
      updatedAt: '2017-10-24T11:28:25.840Z',
      createdAt: '2017-10-24T11:28:25.840Z'
    },
    matchedUsers: [],
    groupError: {},
    addError: {},
    addMsgErr: {},
    message: {},
    groupMessages: [],
    currentGroupMembers: [
      {
        id: 14,
        username: 'jattoade',
        password: '$2a$05$yE3V3lcy4IofbD4gDA7qs.edYXWn3A2rRf2RiVh.vVfzv43vKn/Hu',
        fullName: 'Aminujatto Abdulqahhar',
        lastLogin: '2017-10-20T12:45:12.430Z',
        email: 'jattoade@gmail.com',
        phoneNumber: '08162740850',
        createdAt: '2017-10-20T12:45:12.398Z',
        updatedAt: '2017-10-20T12:45:12.398Z',
        GroupsUsers: {}
      }
    ],
    isLoadingMessages: false,
    isAddingMessage: false,
    isLoadingGroups: false,
    userAdded: false
  },
  groupReducerState5: {
    userGroups: [],
    currentGroup: {
      id: 6,
      name: 'Search Engine',
      desc: 'a google user group',
      isArchived: '0',
      updatedAt: '2017-10-24T11:28:25.840Z',
      createdAt: '2017-10-24T11:28:25.840Z'
    },
    matchedUsers: [],
    groupError: {},
    addError: {},
    addMsgErr: {},
    message: {},
    groupMessages: [
      {
        id: 6,
        text: 'hello people',
        userId: 14,
        groupId: 6,
        priority: 'Normal',
        readBy: [
          'jattoade'
        ],
        createdAt: '2017-10-24T12:03:27.836Z',
        user: {
          id: 14,
          username: 'jattoade',
          fullName: 'Aminujatto Abdulqahhar'
        }
      }
    ],
    currentGroupMembers: [],
    isLoadingMessages: false,
    isAddingMessage: false,
    isLoadingGroups: false,
    userAdded: false
  },
  currentGroupMembers: [
    {
      id: 14,
      username: 'jattoade',
      password: '$2a$05$yE3V3lcy4IofbD4gDA7qs.edYXWn3A2rRf2RiVh.vVfzv43vKn/Hu',
      fullName: 'Aminujatto Abdulqahhar',
      lastLogin: '2017-10-20T12:45:12.430Z',
      email: 'jattoade@gmail.com',
      phoneNumber: '08162740850',
      createdAt: '2017-10-20T12:45:12.398Z',
      updatedAt: '2017-10-20T12:45:12.398Z',
      GroupsUsers: {}
    }
  ],
  messageItem: {
    isArchived: '0',
    id: 7,
    userId: 14,
    groupId: 6,
    text: 'newest message',
    priority: 'Normal',
    readBy: [
      'jattoade'
    ],
    updatedAt: '2017-10-24T15:11:18.188Z',
    createdAt: '2017-10-24T15:11:18.188Z'
  },
  currentUserData: {
    data: {
      email: mockData.validEmail,
      fullName: mockData.validFullName,
      id: mockData.usersId,
      phoneNumber: mockData.validPhoneNumber,
      username: mockData.validUsername
    },
    exp: 1508589912,
    iat: 1508503512
  }
};
