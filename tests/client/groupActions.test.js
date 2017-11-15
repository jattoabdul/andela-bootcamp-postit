import chai from 'chai';
import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import chaiFetchMock from 'chai-fetch-mock';
import * as types from '../../client/src/js/constants';
import * as groupData from './../../client/src/js/actions/groupAction';

// import mock data
import mockData from '../__mock__/dummy';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
chai.use(chaiFetchMock);
const expects = chai.expect;

describe('Group Actions', () => {
  const initialState = {
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
  };
  describe('Get Group Actions', () => {
    it('should dispatch getGroup', () => {
      const store = mockStore(initialState);

      store.dispatch(groupData.getGroup());

      const actions = store.getActions();
      const expectedPayload = {
        type: types.GET_GROUPS
      };
      expect(actions).toEqual([expectedPayload]);
    });

    it('should dispatch getGroupSuccess', () => {
      const store = mockStore(initialState);

      store.dispatch(groupData.getGroupSuccess(mockData.userGroups));

      const actions = store.getActions();
      const expectedPayload = {
        type: types.GET_GROUPS_SUCCESS,
        userGroups: mockData.userGroups
      };
      expect(actions).toEqual([expectedPayload]);
    });

    it('should dispatch getGroupFail', () => {
      const store = mockStore(initialState);
      store.dispatch(groupData.getGroupFail(mockData.groupError));

      const actions = store.getActions();
      const expectedPayload = {
        type: types.GET_GROUPS_FAIL,
        groupError: mockData.groupError
      };
      expect(actions).toEqual([expectedPayload]);
    });

    it('should dispatch setCurrentGroup', () => {
      const store = mockStore(initialState);

      store.dispatch(groupData.setCurrentGroup(mockData.currentGroup));

      const actions = store.getActions();
      const expectedPayload = {
        type: types.SET_CURRENT_GROUP,
        currentGroup: mockData.currentGroup
      };
      expect(actions).toEqual([expectedPayload]);
    });

    it('should dispatch setcurrentGroupUsersSuccess', () => {
      const store = mockStore(initialState);

      store.dispatch(groupData
        .setCurrentGroupUsersSuccess(mockData.currentGroupMembers));

      const actions = store.getActions();
      const expectedPayload = {
        type: types.GET_GROUP_MEMBERS_SUCCESS,
        currentGroupMembers: mockData.currentGroupMembers
      };
      expect(actions).toEqual([expectedPayload]);
    });

    it('should dispatch setcurrentGroupUsersFail', () => {
      const store = mockStore(initialState);

      store.dispatch(groupData
        .setCurrentGroupUsersFail(mockData.errorObject));

      const actions = store.getActions();
      const expectedPayload = {
        type: types.GET_GROUP_MEMBERS_FAIL,
        groupMembersError: mockData.errorObject
      };
      expect(actions).toEqual([expectedPayload]);
    });

    it('should dispatch removeCurrentGroup', () => {
      const store = mockStore(initialState);

      store.dispatch(groupData
        .removeCurrentGroup());

      const actions = store.getActions();
      const expectedPayload = {
        type: types.REMOVE_CURRENT_GROUP
      };
      expect(actions).toEqual([expectedPayload]);
    });

    it('should dispatch addGroupFail', () => {
      const store = mockStore(initialState);

      store.dispatch(groupData
        .addGroupFail(mockData.errorObject));

      const actions = store.getActions();
      const expectedPayload = {
        type: types.ADD_GROUP_FAIL,
        addError: mockData.errorObject
      };
      expect(actions).toEqual([expectedPayload]);
    });

    it('should dispatch removeGroupMember', () => {
      const store = mockStore(initialState);

      store.dispatch(groupData
        .removeGroupMember(mockData.userTwoId));

      const actions = store.getActions();
      const expectedPayload = {
        type: types.REMOVE_GROUP_MEMBER_SUCCESS,
        userId: mockData.userTwoId
      };
      expect(actions).toEqual([expectedPayload]);
    });
  });

  describe('Group Messages Action', () => {
    // mock fetch api calls
    before(() => fetchMock.get(
      `/api/v1/groups/${mockData.groupId}/messages`,
      mockData.messagesArray)
    );

    it('should dispatch getGroupMessages action', () => {
      const store = mockStore(initialState);

      store.dispatch(groupData
        .getGroupMessages());

      const actions = store.getActions();
      const expectedPayload = {
        type: types.RECEIVE_MESSAGES
      };
      expect(actions).toEqual([expectedPayload]);
    });

    it('should dispatch getGroupMessagesSuccess action', () => {
      const store = mockStore(initialState);

      store.dispatch(groupData
        .getGroupMessagesSuccess(mockData.messagesArray));

      const actions = store.getActions();
      const expectedPayload = {
        type: types.RECEIVE_MESSAGES_SUCCESS,
        groupMessages: mockData.messagesArray
      };
      expect(actions).toEqual([expectedPayload]);
    });

    it('should dispatch addMessage action', () => {
      const store = mockStore(initialState);

      store.dispatch(groupData
        .addMessage());

      const actions = store.getActions();
      const expectedPayload = {
        type: types.ADD_MESSAGE
      };
      expect(actions).toEqual([expectedPayload]);
    });

    it('should dispatch addMessageSuccess action', () => {
      const store = mockStore(initialState);

      store.dispatch(groupData
        .addMessageSuccess(mockData.singleMessage));

      const actions = store.getActions();
      const expectedPayload = {
        type: types.ADD_MESSAGE_SUCCESS,
        message: mockData.singleMessage
      };
      expect(actions).toEqual([expectedPayload]);
    });

    it('should dispatch addMessageFail action', () => {
      const store = mockStore(initialState);

      store.dispatch(groupData
        .addMessageFail(mockData.errorObject));

      const actions = store.getActions();
      const expectedPayload = {
        type: types.ADD_MESSAGE_FAIL,
        addMsgErr: mockData.errorObject
      };
      expect(actions).toEqual([expectedPayload]);
    });

    it('should call the fetchMessages actionCreator and make api call',
      () => {
        const args = {
          method: 'get'
        };
        fetch(`/api/v1/groups/${mockData.groupId}/messages`, args)
          .then(() => expects(fetchMock)
            .route(`/api/v1/groups/${mockData.groupId}/messages`)
            .to.have.been.called);
      });

    after(() => fetchMock.restore());
  });
});
