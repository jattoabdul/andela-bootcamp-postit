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
import mockTestData from '../__mock__/testDummy';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
chai.use(chaiFetchMock);
const expects = chai.expect;

describe('Actions', () => {
  const initialState = mockTestData.groupReducerState;
  describe('Group Actions', () => {
    it('should create an action' +
     'and getGroups when action type GET_GROUPS is dispatched', () => {
      const store = mockStore(initialState);

      store.dispatch(groupData.getGroup());

      const actions = store.getActions();
      const expectedPayload = {
        type: types.GET_GROUPS
      };
      expect(actions).toEqual([expectedPayload]);
    });

    it('should create an action and getGroup Successfully ' +
    'when action type GET_GROUPS_SUCCESS is dispatched', () => {
      const store = mockStore(initialState);

      store.dispatch(groupData.getGroupSuccess(mockData.userGroups));

      const actions = store.getActions();
      const expectedPayload = {
        type: types.GET_GROUPS_SUCCESS,
        userGroups: mockData.userGroups
      };
      expect(actions).toEqual([expectedPayload]);
    });

    it('should create an action and Fail to getGroup ' +
    'when action type GET_GROUPS_FAIL is dispatched', () => {
      const store = mockStore(initialState);
      store.dispatch(groupData.getGroupFail(mockData.groupError));

      const actions = store.getActions();
      const expectedPayload = {
        type: types.GET_GROUPS_FAIL,
        groupError: mockData.groupError
      };
      expect(actions).toEqual([expectedPayload]);
    });

    it('should create an action and set Current Group ' +
    'when action type SET_CURRENT_GROUP is dispatched', () => {
      const store = mockStore(initialState);

      store.dispatch(groupData.setCurrentGroup(mockData.currentGroup));

      const actions = store.getActions();
      const expectedPayload = {
        type: types.SET_CURRENT_GROUP,
        currentGroup: mockData.currentGroup
      };
      expect(actions).toEqual([expectedPayload]);
    });

    it('should create an action and set current GroupUsers Successfully ' +
    'when action type GET_GROUP_MEMBERS_SUCCESS is dispatched', () => {
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

    it('should create an action and fail to set currentGroup Users ' +
    'when action type GET_GROUP_MEMBERS_FAIL is dispatched', () => {
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

    it('should create an action and remove Current Group ' +
    'when action type REMOVE_CURRENT_GROUP is dispatched', () => {
      const store = mockStore(initialState);

      store.dispatch(groupData
        .removeCurrentGroup());

      const actions = store.getActions();
      const expectedPayload = {
        type: types.REMOVE_CURRENT_GROUP
      };
      expect(actions).toEqual([expectedPayload]);
    });

    it('should create an action and fail to add Group' +
    'when action type ADD_GROUP_FAIL is dispatched', () => {
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

    it('should create an action and remove Group Member' +
    'when action type REMOVE_GROUP_MEMBER_SUCCESS is dispatched', () => {
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

  describe('Group Message Actions', () => {
    // mock fetch api calls
    before(() => fetchMock.get(
      `/api/v1/groups/${mockData.groupId}/messages`,
      mockData.messagesArray)
    );

    it('should create an action and get Group Messages' +
    'when action type RECEIVE_MESSAGES is dispatched', () => {
      const store = mockStore(initialState);

      store.dispatch(groupData
        .getGroupMessages());

      const actions = store.getActions();
      const expectedPayload = {
        type: types.RECEIVE_MESSAGES
      };
      expect(actions).toEqual([expectedPayload]);
    });

    it('should create an action and Successfully get Group Messages' +
    'when action type RECEIVE_MESSAGES_SUCCESS is dispatched', () => {
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

    it('should create an action and start the messageAddition process' +
    'when action type ADD_MESSAGE is dispatched', () => {
      const store = mockStore(initialState);

      store.dispatch(groupData
        .addMessage());

      const actions = store.getActions();
      const expectedPayload = {
        type: types.ADD_MESSAGE
      };
      expect(actions).toEqual([expectedPayload]);
    });

    it('should create an action and add Message Successfully' +
    'when action type ADD_MESSAGE_SUCCESS is dispatched', () => {
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

    it('should create an action and fail to add Message' +
    'when action type ADD_MESSAGE_FAIL is dispatched', () => {
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
