import sinon from 'sinon';
import faker from 'faker';

export default {
  func: sinon.spy(),
  emptyArray: [],
  emptyObject: {},
  emptyString: '',
  number: 1,
  usersId: 1,
  userTwoId: 2,
  groupId: 1,
  groupTwoId: 2,
  userGroups: [{
    id: 2,
    name: 'Andela Fellows',
    desc: 'a descritpion of group ',
    isArchived: '0',
    createdAt: '2017-11-13T17:55:31.264Z',
    updatedAt: '2017-11-13T17:55:31.264Z',
    users: [
      {
        id: 5,
        username: 'jattoade',
        fullName: 'Amin Jatto Abdulqahhar',
        lastLogin: '2017-11-13T17:55:12.129Z',
        email: 'jattoade@gmail.com',
        phoneNumber: '08162740850',
        createdAt: '2017-11-13T17:55:12.096Z',
        updatedAt: '2017-11-13T17:55:12.096Z',
        GroupsUsers: {}
      }
    ]
  }],
  currentGroup: {
    id: 2,
    name: 'Andela Fellows',
    desc: 'a descritpion of group ',
    isArchived: '0',
    createdAt: '2017-11-13T17:55:31.264Z',
    updatedAt: '2017-11-13T17:55:31.264Z',
    users: [
      {
        id: 5,
        username: 'jattoade',
        fullName: 'Amin Jatto Abdulqahhar',
        lastLogin: '2017-11-13T17:55:12.129Z',
        email: 'jattoade@gmail.com',
        phoneNumber: '08162740850',
        createdAt: '2017-11-13T17:55:12.096Z',
        updatedAt: '2017-11-13T17:55:12.096Z',
        GroupsUsers: {}
      }
    ]
  },
  groupData: {
    currentGroup: {
      id: 2,
      name: 'Andela Fellows',
      desc: 'a descritpion of group ',
      isArchived: '0',
      createdAt: '2017-11-13T17:55:31.264Z',
      updatedAt: '2017-11-13T17:55:31.264Z',
      users: [
        {
          id: 5,
          username: 'jattoade',
          fullName: 'Amin Jatto Abdulqahhar',
          lastLogin: '2017-11-13T17:55:12.129Z',
          email: 'jattoade@gmail.com',
          phoneNumber: '08162740850',
          createdAt: '2017-11-13T17:55:12.096Z',
          updatedAt: '2017-11-13T17:55:12.096Z',
          GroupsUsers: {}
        }
      ]
    }
  },
  groupError: {
    message: 'error has occured'
  },
  errorObject: {
    message: 'error has occured'
  },
  singleMessage: {
    id: 4,
    text: 'a normal message',
    userId: 5,
    groupId: 2,
    priority: 'Normal',
    readBy: [
      'jattoade'
    ],
    createdAt: '2017-11-13T17:55:42.292Z',
    user: {
      id: 5,
      username: 'jattoade',
      fullName: 'Amin Jatto Abdulqahhar'
    }
  },
  messagesArray: [{
    id: 4,
    text: 'a normal message',
    userId: 5,
    groupId: 2,
    priority: 'Normal',
    readBy: [
      'jattoade'
    ],
    createdAt: '2017-11-13T17:55:42.292Z',
    user: {
      id: 5,
      username: 'jattoade',
      fullName: 'Amin Jatto Abdulqahhar'
    }
  }],
  currentMember: {
    id: 5,
    username: 'jattoade',
    password: '$2a$05$baYIq23aOVSSSvVlPxLy/uhVMgCkcwSEQNPm.MV4xtuLXEa1kdPH2',
    fullName: 'Amin Jatto Abdulqahhar',
    lastLogin: '2017-11-13T17:55:12.129Z',
    email: 'jattoade@gmail.com',
    phoneNumber: '08162740850',
    createdAt: '2017-11-13T17:55:12.096Z',
    updatedAt: '2017-11-13T17:55:12.096Z',
    GroupsUsers: {}
  },
  currentGroupMembers: [{
    id: 5,
    username: 'jattoade',
    password: '$2a$05$baYIq23aOVSSSvVlPxLy/uhVMgCkcwSEQNPm.MV4xtuLXEa1kdPH2',
    fullName: 'Amin Jatto Abdulqahhar',
    lastLogin: '2017-11-13T17:55:12.129Z',
    email: 'jattoade@gmail.com',
    phoneNumber: '08162740850',
    createdAt: '2017-11-13T17:55:12.096Z',
    updatedAt: '2017-11-13T17:55:12.096Z',
    GroupsUsers: {}
  }],
  staticToken: 'cdvdsgvrefgscxvxvb134fvqIrrdxzvvfb',
  string: faker.lorem.word(),
  longString: faker.lorem.sentences(),
  username: faker.internet.userName(),
  fullName: faker.name.findName(),
  email: faker.internet.email(),
  phoneNumber: '08162740860',
  password: faker.internet.password(),
  validUsername: 'johndoe',
  validFullName: 'john doe',
  validEmail: 'johndoe@test.com',
  inValidEmail: 'janetdoe',
  validPhoneNumber: '08162740850',
  validPassword: 'jas123',
  validUsernameTwo: 'janetjoe',
  validFullNameTwo: 'janet joe',
  validEmailTwo: 'janetjoe@test.com',
  validPhoneNumberTwo: '08162740860',
  validPasswordTwo: 'jas456',
  groupName: 'andelabootcamp24',
  groupDesc: 'campers group for cycle 24',
  isArchived: '0',
  isNotArchived: '1',
  messageString: 'my test message'
};
