import axios from 'axios';

const setBounties = (bounties) => {
  return {
    type: 'SET_BOUNTIES',
    payload: { bounties }
  };
};

const setBountyHunters = (bountyHunters) => {
  return {
    type: 'BOUNTY_HUNTERS',
    payload: { bountyHunters }
  };
};

const setConversations = (conversations) => {
  return {
    type: 'CONVERSATIONS',
    payload: { conversations }
  };
};

export const setConversation = (conversation) => {
  return {
    type: 'CONVERSATION',
    payload: { conversation }
  };
};

export const getBounties = () => {
  return (dispatch => {
    return axios.get('/api/bounty')
      .then(res => {
        dispatch(setBounties(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  });
};

export const getConversations = (bountyId) => {
  return ((dispatch) => {
    return axios.get('/api/conversations', {
      params: { bountyId }
    })
      .then((results) => {
        const bountyHunters = [];
        results.data.forEach((convo) => {
          const user = {};
          user.username = convo.username;
          user.user_id = convo.uid;
          bountyHunters.push(user);
        });
        dispatch(setBountyHunters(bountyHunters));
        dispatch(setConversations(results.data));
        if (results.data.length > 0) {
          dispatch(setConversation(results.data[0]));
        }
      })
      .catch((err) => {
        throw err;
      });
  });
};

export default getConversations;
