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
  }
};
