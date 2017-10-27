import chai from 'chai';
import expect from 'expect';
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import * as types from '../../client/src/js/constants';
import groupData from './../../client/src/js/reducers/group';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

// const expect = chai.expect;

describe('Group Action Reducers', () => {
  it('should return the initial state', () => {
    expect(groupData(undefined, {})).toEqual({
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
    });
  });

  it('should handle get group', () => {
    expect(
      groupData({
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
      }, {
        type: types.GET_GROUPS,
        isLoadingGroups: true
      }));
  });

  it('should handle get group success', () => {
    expect(
      groupData({
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
      }, {
        type: types.GET_GROUPS_SUCCESS,
        userGroups: [
          {
            id: 4,
            name: 'Latest Groupies',
            desc: 'a group of the latest people in town',
            isArchived: '0',
            createdAt: '2017-10-23T12:49:21.947Z',
            updatedAt: '2017-10-23T12:49:21.947Z'
          }
        ],
        isLoadingGroups: false
      }));
  });

  it('should handle get group fail', () => {
    expect(
      groupData({
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
      }, {
        type: types.GET_GROUPS_FAIL,
        groupError: undefined,
        isLoadingGroups: false
      }));
  });

  it('should set current group', () => {
    expect(
      groupData({
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
      }, {
        type: types.SET_CURRENT_GROUP,
        currentGroup: {
          id: 6,
          name: 'Search Engine',
          desc: 'a google user group',
          isArchived: '0',
          updatedAt: '2017-10-24T11:28:25.840Z',
          createdAt: '2017-10-24T11:28:25.840Z'
        }
      }));
  });

  it('should call add group fail', () => {
    expect(
      groupData({
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
      }, {
        type: types.ADD_GROUP_FAIL,
        addError: {
          message: 'add group failure'
        }
      }));
  });
  
  it('should remove current group', () => {
    expect(
      groupData({
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
      }, {
        type: types.REMOVE_CURRENT_GROUP,
        currentGroup: {}
      }));
  });

  it('should get group members success', () => {
    expect(
      groupData({
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
      }, {
        type: types.GET_GROUP_MEMBERS_SUCCESS,
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
        ]
      }));
  });

  it('should call remove group members success', () => {
    expect(
      groupData({
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
      }, {
        type: types.REMOVE_GROUP_MEMBER_SUCCESS,
        currentGroupMembers: []
      }));
  });

  it('should call get group members fail', () => {
    expect(
      groupData({
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
      }, {
        type: types.GET_GROUP_MEMBERS_FAIL,
        groupMembersError: {
          message: 'get group members fail'
        }
      }));
  });
});

describe('Group Message Action Reducers', () => {
  it('should call recieve message action and set isloadingMessages true',
    () => {
      expect(
        groupData({
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
        }, {
          type: types.RECEIVE_MESSAGES,
          isLoadingMessages: true,
          groupMessages: []
        }));
    });

  it('should call recieve message success', () => {
    expect(
      groupData({
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
      }, {
        type: types.RECEIVE_MESSAGES_SUCCESS,
        isLoadingMessages: false,
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
        ]
      }));
  });

  it('should call recieve message fail', () => {
    expect(
      groupData({
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
      }, {
        type: types.RECEIVE_MESSAGES_FAIL,
        groupMessages: [],
        isLoadingMessages: false
      }));
  });


  it('should call ADD_MESSAGE reducer', () => {
    expect(
      groupData({
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
      }, {
        type: types.ADD_MESSAGE,
        isAddingMessage: true,
      }));
  });

  it('should call ADD_MESSAGE_SUCCESS reducer', () => {
    expect(
      groupData({
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
        isAddingMessage: true,
        isLoadingGroups: false,
        userAdded: false
      }, {
        type: types.ADD_MESSAGE_SUCCESS,
        isAddingMessage: false,
        message: {
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
        }
      }));
  });

  it('should call ADD_MESSAGE_FAIL reducer', () => {
    expect(
      groupData({
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
        isAddingMessage: true,
        isLoadingGroups: false,
        userAdded: false
      }, {
        type: types.ADD_MESSAGE_FAIL,
        isAddingMessage: false,
        assMsgErr: {
          message: 'error adding message'
        }
      }));
  });
});
