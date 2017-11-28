import expect from 'expect';
import * as types from '../../client/src/js/constants';
import groupData from './../../client/src/js/reducers/group';
import mockTestData from '../__mock__/testDummy';

describe('Group Action Reducers', () => {
  it('should return the initial state', () => {
    expect(groupData(undefined, {})).toEqual(mockTestData.groupReducerState);
  });

  it('should handle get group', () => {
    expect(
      groupData(mockTestData.groupReducerState, {
        type: types.GET_GROUPS,
        isLoadingGroups: true
      }));
  });

  it('should handle get group success', () => {
    expect(
      groupData(mockTestData.groupReducerState2, {
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
      groupData(mockTestData.groupReducerState2, {
        type: types.GET_GROUPS_FAIL,
        groupError: undefined,
        isLoadingGroups: false
      }));
  });

  it('should set current group', () => {
    expect(
      groupData(mockTestData.groupReducerState, {
        type: types.SET_CURRENT_GROUP,
        currentGroup: mockTestData.groupReducerState3.currentGroup
      }));
  });

  it('should call add group fail', () => {
    expect(
      groupData(mockTestData.groupReducerState, {
        type: types.ADD_GROUP_FAIL,
        addError: {
          message: 'add group failure'
        }
      }));
  });

  it('should remove current group', () => {
    expect(
      groupData(mockTestData.groupReducerState3, {
        type: types.REMOVE_CURRENT_GROUP,
        currentGroup: {}
      }));
  });

  it('should get group members success', () => {
    expect(
      groupData(mockTestData.groupReducerState3, {
        type: types.GET_GROUP_MEMBERS_SUCCESS,
        currentGroupMembers: mockTestData.currentGroupMembers
      }));
  });

  it('should call remove group members success', () => {
    expect(
      groupData(mockTestData.groupReducerState4, {
        type: types.REMOVE_GROUP_MEMBER_SUCCESS,
        currentGroupMembers: []
      }));
  });

  it('should call get group members fail', () => {
    expect(
      groupData(mockTestData.groupReducerState3, {
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
        groupData(mockTestData.groupReducerState3, {
          type: types.RECEIVE_MESSAGES,
          isLoadingMessages: true,
          groupMessages: []
        }));
    });

  it('should call recieve message success and update the store', () => {
    expect(
      groupData(mockTestData.groupReducerState3, {
        type: types.RECEIVE_MESSAGES_SUCCESS,
        isLoadingMessages: false,
        groupMessages: mockTestData.groupReducerState5.groupMessages
      }));
  });

  it('should call recieve message fail and empty groupMessages state', () => {
    expect(
      groupData(mockTestData.groupReducerState3, {
        type: types.RECEIVE_MESSAGES_FAIL,
        groupMessages: [],
        isLoadingMessages: false
      }));
  });


  it('should call add message and set isAdding message true', () => {
    expect(
      groupData(mockTestData.groupReducerState5, {
        type: types.ADD_MESSAGE,
        isAddingMessage: true,
      }));
  });

  it('should add message to group messages in store succesfully', () => {
    expect(
      groupData(mockTestData.groupReducerState5, {
        type: types.ADD_MESSAGE_SUCCESS,
        isAddingMessage: false,
        message: mockTestData.messageItem
      }));
  });

  it('should call fail to add message to store', () => {
    expect(
      groupData(mockTestData.groupReducerState5, {
        type: types.ADD_MESSAGE_FAIL,
        isAddingMessage: false,
        assMsgErr: {
          message: 'error adding message'
        }
      }));
  });
});
